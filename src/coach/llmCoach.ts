import { ChatMessage, CoachEngine, CoachResponse, Correction, SessionContext, SessionSummary } from '../types'

interface LlmSettings {
  apiKey: string
  endpoint: string
  model: string
}

function systemPrompt(level: string, personaName: string): string {
  return `You are ${personaName}, a warm, patient and encouraging AI English conversation coach for a French-speaking learner at CEFR level ${level}.
Rules:
- "reply" must be ONLY in English, natural and conversational, 1 to 3 sentences, adapted to level ${level}. Ask a follow-up question to keep the conversation going.
- If the learner writes in French or mixes French words, gently give the English word(s) inside your reply.
- "replyFr" is the French translation of "reply".
- "corrections" lists the learner's mistakes in their LAST message: grammar, vocabulary, unnatural expressions. Each item: { original, corrected, explanation (in FRENCH, short), category (grammar|vocabulary|expression|pronunciation), severity ("error"|"tip") }. Also add "betterWay" suggestions as severity "tip" when the learner uses a very basic phrase. Do NOT correct pronunciation of the transcript itself, but you may add a pronunciation tip for tricky words (th, live/life, ship/sheep...).
- "userFr" is the French translation of the learner's corrected sentence.
- "score" is an integer 0-100 for the learner's last message (100 = perfect, subtract ~15 per error, bonus for rich/long sentences).
- "tip" is one short actionable tip in FRENCH for the learner.
- Respond with ONLY a valid JSON object, no markdown fences, with keys: reply, replyFr, userFr, corrections, score, tip.`
}

function extractJson(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (fenced) return fenced[1]
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start >= 0 && end > start) return text.slice(start, end + 1)
  return text
}

export class LlmCoach implements CoachEngine {
  constructor(private settings: LlmSettings, private fallback: CoachEngine) {}

  private async call(messages: { role: string; content: string }[], level: string, personaName: string): Promise<CoachResponse & { userFr?: string }> {
    const res = await fetch(this.settings.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.settings.apiKey}`,
      },
      body: JSON.stringify({
        model: this.settings.model,
        messages: [{ role: 'system', content: systemPrompt(level, personaName) }, ...messages],
        temperature: 0.7,
        response_format: { type: 'json_object' },
      }),
    })
    if (!res.ok) throw new Error(`LLM HTTP ${res.status}`)
    const data = await res.json()
    const content: string = data.choices?.[0]?.message?.content ?? ''
    const parsed = JSON.parse(extractJson(content))
    const corrections: Correction[] = Array.isArray(parsed.corrections)
      ? parsed.corrections.map((c: Partial<Correction>) => ({
          original: String(c.original ?? ''),
          corrected: String(c.corrected ?? ''),
          explanation: String(c.explanation ?? ''),
          category: (['grammar', 'vocabulary', 'expression', 'pronunciation'].includes(c.category as string)
            ? c.category
            : 'grammar') as Correction['category'],
          severity: c.severity === 'tip' ? 'tip' : 'error',
          translation: c.translation ? String(c.translation) : undefined,
        }))
      : []
    return {
      reply: String(parsed.reply ?? "I'm not sure I understood — could you say that again?"),
      replyFr: parsed.replyFr ? String(parsed.replyFr) : undefined,
      userFr: parsed.userFr ? String(parsed.userFr) : undefined,
      corrections,
      score: Math.max(0, Math.min(100, Number(parsed.score ?? 80))),
      tip: parsed.tip ? String(parsed.tip) : undefined,
    }
  }

  async startSession(ctx: SessionContext): Promise<CoachResponse> {
    try {
      const topic = ctx.topic ?? ctx.scenarioId ?? 'any topic the learner likes'
      const r = await this.call(
        [{ role: 'user', content: `Start a brand new conversation session with me about: ${topic}. Greet me warmly in English (level ${ctx.level}) and ask me an opening question. corrections must be an empty array.` }],
        ctx.level,
        ctx.personaName || 'Alex',
      )
      return { reply: r.reply, replyFr: r.replyFr, corrections: [], score: 100 }
    } catch {
      return this.fallback.startSession(ctx)
    }
  }

  async respond(userText: string, ctx: SessionContext): Promise<CoachResponse> {
    try {
      const history = ctx.history.slice(-12).map((m: ChatMessage) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.role === 'user' ? m.text : m.text,
      }))
      const r = await this.call([...history, { role: 'user', content: userText }], ctx.level, ctx.personaName || 'Alex')
      if (r.userFr) {
        const lastUser = [...ctx.history].reverse().find((m) => m.role === 'user')
        if (lastUser) lastUser.textFr = r.userFr
      }
      return { reply: r.reply, replyFr: r.replyFr, corrections: r.corrections, score: r.score, tip: r.tip }
    } catch {
      return this.fallback.respond(userText, ctx)
    }
  }

  endSession(messages: ChatMessage[]): SessionSummary {
    return this.fallback.endSession(messages)
  }
}

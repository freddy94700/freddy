import { analyzeUserText } from '../grammar'
import { getScenario, Scenario } from '../scenarios'
import { bandForLevel, getTopic, Topic, TOPICS } from '../topics'
import { ChatMessage, CoachEngine, CoachResponse, SessionContext, SessionSummary } from '../types'

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const REACTIONS = [
  { en: "That's interesting! Tell me more.", fr: "C'est intéressant ! Dis-m'en plus." },
  { en: 'Nice! What else?', fr: 'Sympa ! Et sinon ?' },
  { en: 'I see! Go on.', fr: 'Je vois ! Continue.' },
  { en: 'Great! And how did that feel?', fr: "Génial ! Et comment tu t'es senti ?" },
  { en: 'Cool! What happened next?', fr: "Cool ! Et qu'est-ce qui s'est passé ensuite ?" },
  { en: 'Really? That sounds fun!', fr: "Vraiment ? Ça a l'air sympa !" },
]

const PRAISE = [
  { en: 'Well said!', fr: 'Bien dit !' },
  { en: 'Excellent!', fr: 'Excellent !' },
  { en: 'You sound very natural!', fr: 'Tu as l’air très naturel(le) !' },
  { en: 'Great job!', fr: 'Bravo !' },
]

export class LocalCoach implements CoachEngine {
  private rng = mulberry32(Date.now())
  private turn = 0
  private scenario: Scenario | undefined
  private scenarioStep = 0
  private topic: Topic | undefined

  private pick<T>(arr: T[]): T {
    return arr[Math.floor(this.rng() * arr.length)]
  }

  startSession(ctx: SessionContext): Promise<CoachResponse> {
    this.turn = 0
    this.scenario = ctx.scenarioId ? getScenario(ctx.scenarioId) : undefined
    this.scenarioStep = 0
    this.topic = ctx.topic ? getTopic(ctx.topic) : undefined
    const band = bandForLevel(ctx.level)

    if (this.scenario) {
      const step = this.scenario.steps[0]
      return Promise.resolve({
        reply: step.prompt.en,
        replyFr: step.prompt.fr,
        corrections: [],
        score: 100,
      })
    }

    const topic = this.topic ?? this.pickTopicFromInterests(ctx)
    this.topic = topic
    const starter = this.pick(topic.starters[band])
    const name = ctx.personaName || 'your English coach'
    const opening =
      ctx.level === 'A1' || ctx.level === 'A2'
        ? { en: `Hi! I'm ${name}, your English coach. Let's chat! `, fr: `Salut ! Je suis ${name}, ton coach d'anglais. Discutons ! ` }
        : ctx.level === 'B1' || ctx.level === 'B2'
          ? { en: `Hey, great to see you! I'm ${name}. Ready for a chat? `, fr: `Salut, ravi de te voir ! Je suis ${name}. Prêt(e) pour discuter ? ` }
          : { en: `Hey! Great to have you here, I'm ${name}. Shall we dive into something interesting? `, fr: `Salut ! Ravi de t'avoir ici, je suis ${name}. On plonge dans quelque chose d'intéressant ? ` }
    return Promise.resolve({
      reply: opening.en + starter.en,
      replyFr: opening.fr + starter.fr,
      corrections: [],
      score: 100,
    })
  }

  respond(userText: string, ctx: SessionContext): Promise<CoachResponse> {
    this.turn += 1
    const { corrected, corrections, score } = analyzeUserText(userText)
    const band = bandForLevel(ctx.level)

    if (this.scenario) {
      return Promise.resolve(this.respondScenario(userText, corrected, corrections, score, band))
    }

    const topic = this.topic ?? this.pickTopicFromInterests(ctx)
    this.topic = topic
    const reaction = this.pick(REACTIONS)
    const followup = this.pick(topic.followups[band])
    let reply = `${reaction.en} ${followup.en}`
    let replyFr = `${reaction.fr} ${followup.fr}`
    if (corrections.some((c) => c.severity === 'error') && this.turn % 2 === 0) {
      reply = `Good try! ${followup.en}`
      replyFr = `Bien essayé ! Regarde les corrections ci-dessous. ${followup.fr}`
    } else if (this.turn % 4 === 0) {
      const praise = this.pick(PRAISE)
      reply = `${praise.en} ${followup.en}`
      replyFr = `${praise.fr} ${followup.fr}`
    }
    const tip =
      corrections.find((c) => c.severity === 'error')?.explanation ??
      corrections.find((c) => c.category === 'pronunciation')?.explanation

    return Promise.resolve({
      reply,
      replyFr,
      corrections,
      score,
      tip,
    })
  }

  private respondScenario(
    userText: string,
    corrected: string,
    corrections: import('../types').Correction[],
    score: number,
    band: 'low' | 'mid' | 'high',
  ): CoachResponse {
    const sc = this.scenario!
    const step = sc.steps[Math.min(this.scenarioStep, sc.steps.length - 1)]
    const lower = corrected.toLowerCase()
    const matched = step.keywords.some((k) => lower.includes(k))
    const tip = corrections.find((c) => c.severity === 'error')?.explanation

    if (matched) {
      this.scenarioStep += 1
      const next = sc.steps[this.scenarioStep]
      if (!next) {
        return {
          reply: step.praise.en,
          replyFr: step.praise.fr,
          corrections,
          score,
          tip,
        }
      }
      return {
        reply: `${step.praise.en} ${next.prompt.en}`,
        replyFr: `${step.praise.fr} ${next.prompt.fr}`,
        corrections,
        score,
        tip,
      }
    }

    const hint = step.hint
    const gentle =
      band === 'low'
        ? { en: "Almost! Try again. ", fr: "Presque ! Réessaie. " }
        : band === 'mid'
          ? { en: "Not quite — give it another go. ", fr: "Pas tout à fait — réessaie. " }
          : { en: "Interesting attempt, but let's steer back on track. ", fr: "Tentative intéressante, mais revenons sur la bonne piste. " }
    return {
      reply: `${gentle.en}${hint.en} ${step.prompt.en}`,
      replyFr: `${gentle.fr}${hint.fr} ${step.prompt.fr}`,
      corrections,
      score,
      tip,
    }
  }

  endSession(messages: ChatMessage[]): SessionSummary {
    const userMessages = messages.filter((m) => m.role === 'user')
    const scores = userMessages.map((m) => m.score ?? 100)
    const score = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 100
    const all = userMessages.flatMap((m) => m.corrections ?? [])
    const errors = all.filter((c) => c.severity === 'error')
    const tips = all.filter((c) => c.severity === 'tip')
    const top = errors.slice(0, 5)
    const tip =
      errors.length === 0
        ? 'Zéro erreur, bravo ! Essaie des phrases plus longues la prochaine fois pour progresser davantage.'
        : `Conseil : revois « ${top[0].corrected} » — ${top[0].explanation}`
    return { score, errorCount: errors.length, tipCount: tips.length, tip, highlights: top }
  }

  private pickTopicFromInterests(ctx: SessionContext): Topic {
    const pool = ctx.interests
      .map((id) => getTopic(id))
      .filter((t): t is Topic => Boolean(t))
    if (pool.length === 0) return this.pick(TOPICS)
    return this.pick(pool)
  }
}

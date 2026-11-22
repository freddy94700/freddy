import { useEffect, useMemo, useRef, useState } from 'react'
import { createCoach, isOnlineCoach } from '../coach'
import { recognitionSupported, speak, startRecognition, stopSpeaking, RecognitionHandle, ttsSupported } from '../speech'
import { AppState, ChatMessage, SessionContext, SessionSummary, Settings, avatarOf } from '../types'
import { CATEGORY_LABELS } from '../types'
import { uid } from '../storage'

export interface ActiveSession {
  kind: 'topic' | 'scenario'
  topic?: string
  scenarioId?: string
  label: string
}

interface Props {
  state: AppState
  session: ActiveSession
  onEnd: (messages: ChatMessage[], summary: SessionSummary) => void
}

export default function Conversation({ state, session, onEnd }: Props) {
  const settings: Settings = state.settings
  const engine = useMemo(() => createCoach(settings), [settings])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const messagesRef = useRef<ChatMessage[]>([])
  const [busy, setBusy] = useState(false)
  const [input, setInput] = useState('')
  const [listening, setListening] = useState(false)
  const [interim, setInterim] = useState('')
  const [micError, setMicError] = useState<string | null>(null)
  const [showFr, setShowFr] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const recRef = useRef<RecognitionHandle | null>(null)
  const startedRef = useRef(Date.now())
  const endedRef = useRef(false)

  const push = (msgs: ChatMessage[]) => {
    messagesRef.current = [...messagesRef.current, ...msgs]
    setMessages(messagesRef.current)
  }

  const avatar = avatarOf(state.profile!.avatar)

  const baseCtx = (): SessionContext => ({
    level: state.profile!.level,
    interests: state.profile!.interests,
    personaName: avatar.name,
    kind: session.kind,
    topic: session.topic,
    scenarioId: session.scenarioId,
    history: messagesRef.current,
  })

  useEffect(() => {
    let cancelled = false
    engine.startSession(baseCtx()).then((res) => {
      if (cancelled) return
      push([{ id: uid(), role: 'coach', text: res.reply, textFr: res.replyFr, ts: Date.now() }])
      if (settings.sound) speak(res.reply)
    })
    return () => {
      cancelled = true
      recRef.current?.stop()
      stopSpeaking()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - startedRef.current) / 1000)), 1000)
    return () => clearInterval(t)
  }, [])

  const send = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || busy || endedRef.current) return
    setBusy(true)
    setInput('')
    setInterim('')
    try {
      const res = await engine.respond(trimmed, baseCtx())
      const userMsg: ChatMessage = {
        id: uid(),
        role: 'user',
        text: trimmed,
        corrections: res.corrections,
        score: res.score,
        ts: Date.now(),
      }
      const coachMsg: ChatMessage = {
        id: uid(),
        role: 'coach',
        text: res.reply,
        textFr: res.replyFr,
        ts: Date.now(),
      }
      push([userMsg, coachMsg])
      if (settings.sound) speak(res.reply)
    } finally {
      setBusy(false)
    }
  }

  const toggleMic = () => {
    setMicError(null)
    if (listening) {
      recRef.current?.stop()
      recRef.current = null
      setListening(false)
      return
    }
    const handle = startRecognition({
      lang: 'en-US',
      onFinal: (t) => {
        if (t) send(t)
      },
      onInterim: setInterim,
      onEnd: () => setListening(false),
      onError: (e) => {
        setMicError(e === 'not-allowed' ? "Accès au micro refusé. Autorise le micro dans ton navigateur." : `Micro indisponible (${e}). Tu peux écrire.`)
        setListening(false)
      },
    })
    if (handle) {
      recRef.current = handle
      setListening(true)
    } else {
      setMicError('Reconnaissance vocale non supportée par ce navigateur — écris ton message.')
    }
  }

  const finish = () => {
    if (endedRef.current) return
    endedRef.current = true
    recRef.current?.stop()
    stopSpeaking()
    const summary = engine.endSession(messagesRef.current)
    onEnd(messagesRef.current, summary)
  }

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  return (
    <div className="screen conversation">
      <header className="conv-header">
        <div className="conv-title">
          <span className="avatar" style={{ background: avatar.color }}>
            {avatar.emoji}
          </span>
          <div>
            <strong>{avatar.name} · {session.kind === 'scenario' ? '🎭' : '💬'} {session.label}</strong>
            <span className="timer">⏱ {fmt(elapsed)}</span>
            <span className={`net ${isOnlineCoach(settings) ? 'on' : 'off'}`}>
              {isOnlineCoach(settings) ? '🟢 IA en ligne (LLM)' : '⚪ hors-ligne'}
            </span>
          </div>
        </div>
        <div className="header-actions">
          <button className={`mini ${showFr ? 'on' : ''}`} onClick={() => setShowFr((v) => !v)} title="Traduction française">
            FR
          </button>
          <button className="mini danger" onClick={finish}>
            Terminer
          </button>
        </div>
      </header>

      <div className="messages">
        {messages.map((m) => (
          <div key={m.id} className={`bubble-row ${m.role}`}>
            {m.role === 'coach' && (
              <span className="avatar sm" style={{ background: avatar.color }} title={avatar.name}>
                {avatar.emoji}
              </span>
            )}
            <div className={`bubble ${m.role}`}>
              <p>{m.text}</p>
              {m.role === 'coach' && showFr && m.textFr && <p className="fr">{m.textFr}</p>}
              {m.role === 'user' && (
                <div className="user-meta">
                {typeof m.score === 'number' && (
                  <span className={`score-badge ${m.score >= 80 ? 'good' : m.score >= 50 ? 'mid' : 'bad'}`}>{m.score}/100</span>
                )}
                  {m.corrections && m.corrections.length > 0 && (
                    <details className="corrections">
                      <summary>
                        ✏️ {m.corrections.filter((c) => c.severity === 'error').length} correction(s),{' '}
                        {m.corrections.filter((c) => c.severity === 'tip').length} astuce(s)
                      </summary>
                      <ul>
                        {m.corrections.map((c, i) => (
                          <li key={i} className={c.severity}>
                            <span className="cat">{CATEGORY_LABELS[c.category]}</span>
                            <div className="corr-line">
                              <s>{c.original}</s> → <strong>{c.corrected}</strong>
                            </div>
                            <p className="expl">{c.explanation}</p>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        {busy && <div className="bubble coach typing">Le coach réfléchit…</div>}
      </div>

      <div className="input-area">
        {interim && <div className="interim">{interim}…</div>}
        {micError && <div className="mic-error">{micError}</div>}
        <div className="input-row">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') send(input)
            }}
            placeholder="Écris en anglais…"
            disabled={busy}
          />
          <button className="send" onClick={() => send(input)} disabled={busy || !input.trim()}>
            ➤
          </button>
          <button
            className={`mic ${listening ? 'listening' : ''}`}
            onClick={toggleMic}
            title={recognitionSupported() ? 'Parler' : 'Reconnaissance vocale non disponible'}
          >
            {listening ? '⏹' : '🎤'}
          </button>
        </div>
        {!recognitionSupported() && !ttsSupported() && (
          <p className="hint">Mode texte uniquement dans ce navigateur (micro/voix non disponibles).</p>
        )}
      </div>
    </div>
  )
}

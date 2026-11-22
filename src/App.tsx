import { useState } from 'react'
import Conversation, { ActiveSession } from './components/Conversation'
import Home, { SessionChoice } from './components/Home'
import Onboarding from './components/Onboarding'
import PremiumModal from './components/PremiumModal'
import Progress from './components/Progress'
import Review from './components/Review'
import { loadState, saveState, uid, canStartSession } from './storage'
import { AppState, AvatarId, ChatMessage, Level, SessionRecord, SessionSummary } from './types'

type Screen = 'home' | 'conversation' | 'review' | 'progress'

export default function App() {
  const [state, setState] = useState<AppState>(loadState)
  const [screen, setScreen] = useState<Screen>('home')
  const [session, setSession] = useState<ActiveSession | null>(null)
  const [review, setReview] = useState<{ label: string; summary: SessionSummary; messages: ChatMessage[]; durationSec: number } | null>(null)
  const [showPremium, setShowPremium] = useState(false)

  const update = (patch: Partial<AppState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch }
      saveState(next)
      return next
    })
  }

  const handleDoneOnboarding = (level: Level, interests: string[], avatar: AvatarId) => {
    update({ profile: { level, interests, avatar, createdAt: Date.now() } })
    setScreen('home')
  }

  const handleStart = (choice: SessionChoice) => {
    if (!canStartSession(state)) {
      setShowPremium(true)
      return
    }
    setSession(choice)
    setScreen('conversation')
  }

  const handleEnd = (messages: ChatMessage[], summary: SessionSummary) => {
    if (!session) return
    const startedAt = Date.now() - 0 // approximé ci-dessous via messages
    const first = messages[0]?.ts ?? Date.now()
    const last = messages[messages.length - 1]?.ts ?? Date.now()
    const record: SessionRecord = {
      id: uid(),
      startedAt: first,
      endedAt: last,
      durationSec: Math.max(5, Math.round((last - first) / 1000)),
      score: summary.score,
      errorCount: summary.errorCount,
      tipCount: summary.tipCount,
      kind: session.kind,
      label: session.label,
    }
    update({ sessions: [...state.sessions, record] })
    setReview({ label: session.label, summary, messages, durationSec: record.durationSec })
    setScreen('review')
  }

  if (!state.profile) {
    return <Onboarding onDone={handleDoneOnboarding} />
  }

  return (
    <div className="app">
      {screen === 'home' && (
        <>
          <Home state={state} onStart={handleStart} />
          <nav className="tabbar">
            <button className="tab active">🏠 Accueil</button>
            <button className="tab" onClick={() => setScreen('progress')}>
              📈 Progression
            </button>
          </nav>
        </>
      )}

      {screen === 'conversation' && session && (
        <Conversation state={state} session={session} onEnd={handleEnd} />
      )}

      {screen === 'review' && review && (
        <Review
          label={review.label}
          summary={review.summary}
          messages={review.messages}
          durationSec={review.durationSec}
          onHome={() => setScreen('home')}
          onProgress={() => setScreen('progress')}
        />
      )}

      {screen === 'progress' && (
        <>
          <Progress
            state={state}
            onChange={update}
            onBack={() => setScreen('home')}
            onReset={() => {
              const fresh = { ...state, sessions: [], premium: true, profile: state.profile }
              setState(fresh)
              saveState(fresh)
            }}
          />
          <nav className="tabbar">
            <button className="tab" onClick={() => setScreen('home')}>
              🏠 Accueil
            </button>
            <button className="tab active">📈 Progression</button>
          </nav>
        </>
      )}

      {showPremium && (
        <PremiumModal
          onClose={() => setShowPremium(false)}
          onActivate={() => {
            update({ premium: true })
            setShowPremium(false)
          }}
        />
      )}
    </div>
  )
}

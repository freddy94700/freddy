import { AppState, SessionRecord } from '../types'
import { canStartSession, currentStreak, FREE_SESSIONS_PER_DAY, masteryScore, sessionsOn, weekProgress, WEEKLY_GOAL } from '../storage'
import { SCENARIOS } from '../scenarios'
import { TOPICS } from '../topics'

export interface SessionChoice {
  kind: 'topic' | 'scenario'
  topic?: string
  scenarioId?: string
  label: string
}

interface Props {
  state: AppState
  onStart: (choice: SessionChoice) => void
}

function ScoreRing({ score }: { score: number }) {
  const r = 34
  const c = 2 * Math.PI * r
  const offset = c - (score / 100) * c
  return (
    <div className="ring">
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r={r} className="ring-bg" />
        <circle
          cx="44"
          cy="44"
          r={r}
          className="ring-fg"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform="rotate(-90 44 44)"
        />
      </svg>
      <div className="ring-label">
        <strong>{score}</strong>
        <span>/100</span>
      </div>
    </div>
  )
}

export default function Home({ state, onStart }: Props) {
  const now = Date.now()
  const streak = currentStreak(state, now)
  const mastery = masteryScore(state)
  const week = weekProgress(state, now)
  const today = sessionsOn(state, now).length
  const free = canStartSession(state, now)
  const recent = [...state.sessions].sort((a, b) => b.startedAt - a.startedAt).slice(0, 3)

  return (
    <div className="screen home">
      <header className="home-header">
        <div>
          <div className="logo small">🗣️</div>
          <h1>SpeakPal</h1>
        </div>
        <div className="level-badge">{state.profile?.level}</div>
      </header>

      <div className="stats-row">
        <div className="stat-card">
          <ScoreRing score={mastery} />
          <span className="stat-label">Maîtrise</span>
        </div>
        <div className="stat-card">
          <div className="stat-big">🔥 {streak}</div>
          <span className="stat-label">Série de jours</span>
        </div>
        <div className="stat-card">
          <div className="stat-big">💬 {state.sessions.length}</div>
          <span className="stat-label">Conversations</span>
        </div>
      </div>

      <div className="goal-card">
        <div className="goal-head">
          <span>🎯 Objectif hebdo : {WEEKLY_GOAL} conversations</span>
          <strong>
            {Math.min(week.done, week.goal)}/{week.goal}
          </strong>
        </div>
        <div className="bar">
          <div className="bar-fill" style={{ width: `${Math.min(100, (week.done / week.goal) * 100)}%` }} />
        </div>
      </div>

      <div className={`free-card ${free ? 'ok' : 'used'}`}>
        {free
          ? state.premium
            ? '⭐ Premium actif : conversations illimitées.'
            : `🎁 Version gratuite : encore ${FREE_SESSIONS_PER_DAY - today} conversation aujourd'hui.`
          : '🎁 Ta conversation gratuite du jour est utilisée. Passe en Premium pour continuer !'}
      </div>

      <h2>Choisis un sujet</h2>
      <div className="topic-grid">
        {TOPICS.map((t) => (
          <button key={t.id} className="topic-card" onClick={() => onStart({ kind: 'topic', topic: t.id, label: t.label })}>
            <span className="topic-icon">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
        <button
          className="topic-card surprise"
          onClick={() => {
            const t = TOPICS[Math.floor(Math.random() * TOPICS.length)]
            onStart({ kind: 'topic', topic: t.id, label: `${t.label} (surprise !)` })
          }}
        >
          <span className="topic-icon">🎲</span>
          <span>Surprise-moi</span>
        </button>
      </div>

      <h2>Jeux de rôle</h2>
      <div className="scenario-list">
        {SCENARIOS.map((s) => (
          <button key={s.id} className="scenario-card" onClick={() => onStart({ kind: 'scenario', scenarioId: s.id, label: s.title })}>
            <span className="topic-icon">{s.icon}</span>
            <div className="scenario-text">
              <strong>{s.title}</strong>
              <span>{s.description}</span>
            </div>
            <span className="arrow">›</span>
          </button>
        ))}
      </div>

      {recent.length > 0 && (
        <>
          <h2>Dernières conversations</h2>
          <div className="recent-list">
            {recent.map((s: SessionRecord) => (
              <div key={s.id} className="recent-item">
                <span>{s.kind === 'scenario' ? '🎭' : '💬'} {s.label}</span>
                <strong>{s.score}/100</strong>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

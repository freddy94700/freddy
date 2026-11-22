import { AppState, CoachMode, PROVIDERS } from '../types'
import { currentStreak, masteryScore, masteryTrend, weekProgress, WEEKLY_GOAL } from '../storage'

interface Props {
  state: AppState
  onChange: (patch: Partial<AppState>) => void
  onBack: () => void
  onReset: () => void
}

function providerKey(s: AppState['settings']): string {
  const hit = Object.entries(PROVIDERS).find(
    ([, p]) => p.endpoint === s.endpoint && p.model === s.model,
  )
  return hit ? hit[0] : 'custom'
}

export default function Progress({ state, onChange, onBack, onReset }: Props) {
  const s = state.settings
  const trend = masteryTrend(state)
  const week = weekProgress(state)
  const max = Math.max(...trend.map((t) => t.score), 100)

  const setSettings = (patch: Partial<AppState['settings']>) => {
    onChange({ settings: { ...s, ...patch } })
  }

  return (
    <div className="screen progress">
      <header className="home-header">
        <h1>Ma progression</h1>
        <button className="mini" onClick={onBack}>
          ← Retour
        </button>
      </header>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-big">🔥 {currentStreak(state)}</div>
          <span className="stat-label">Série</span>
        </div>
        <div className="stat-card">
          <div className="stat-big">📊 {masteryScore(state)}</div>
          <span className="stat-label">Maîtrise moyenne</span>
        </div>
        <div className="stat-card">
          <div className="stat-big">🎯 {Math.min(week.done, week.goal)}/{WEEKLY_GOAL}</div>
          <span className="stat-label">Objectif hebdo</span>
        </div>
      </div>

      <h2>Tendance de maîtrise</h2>
      <div className="chart">
        {trend.length === 0 && <p className="hint">Aucune conversation pour le moment.</p>}
        {trend.map((t) => (
          <div key={t.id} className="chart-bar-wrap" title={`${t.label} — ${t.score}/100`}>
            <div className="chart-bar" style={{ height: `${(t.score / max) * 100}%` }} />
            <span className="chart-val">{t.score}</span>
          </div>
        ))}
      </div>

      <h2>Coach IA</h2>
      <div className="settings-card">
        <label>
          Fournisseur (préréglage)
          <select
            value={providerKey(s)}
            onChange={(e) => {
              const p = PROVIDERS[e.target.value]
              if (p) setSettings({ endpoint: p.endpoint, model: p.model })
            }}
          >
            {Object.entries(PROVIDERS).map(([k, p]) => (
              <option key={k} value={k}>
                {p.label}
              </option>
            ))}
            <option value="custom">Personnalisé</option>
          </select>
        </label>
        <label>
          Mode du coach
          <select value={s.mode} onChange={(e) => setSettings({ mode: e.target.value as CoachMode })}>
            <option value="llm">LLM en ligne (repli hors-ligne si pas de clé/erreur)</option>
            <option value="auto">Auto (API si clé fournie, sinon hors-ligne)</option>
            <option value="local">Hors-ligne (règles intégrées)</option>
          </select>
        </label>
        {(s.mode === 'llm' || s.mode === 'auto') && !s.apiKey.trim() && (
          <p className="hint">Aucune clé API renseignée : le coach hors-ligne est utilisé automatiquement. Ajoute une clé ci-dessous pour activer le mode en ligne (LLM).</p>
        )}
        <label>
          Clé API (stockée localement, jamais envoyée ailleurs que vers le endpoint choisi)
          <input
            type="password"
            value={s.apiKey}
            placeholder="sk-…"
            onChange={(e) => setSettings({ apiKey: e.target.value })}
          />
        </label>
        <label>
          Endpoint
          <input value={s.endpoint} onChange={(e) => setSettings({ endpoint: e.target.value })} />
        </label>
        <label>
          Modèle
          <input value={s.model} onChange={(e) => setSettings({ model: e.target.value })} />
        </label>
        <label className="row">
          <input type="checkbox" checked={s.sound} onChange={(e) => setSettings({ sound: e.target.checked })} />
          Voix du coach activée 🔊
        </label>
      </div>

      <h2>Compte</h2>
      <div className="settings-card">
        <label className="row">
          <input
            type="checkbox"
            checked={state.premium}
            onChange={(e) => onChange({ premium: e.target.checked })}
          />
          Premium activé (démo) ⭐ — conversations illimitées
        </label>
        <p className="hint">Niveau actuel : {state.profile?.level} · {state.sessions.length} conversation(s) au total</p>
        <button className="ghost danger-text" onClick={onReset}>
          Réinitialiser toutes mes données
        </button>
      </div>
    </div>
  )
}

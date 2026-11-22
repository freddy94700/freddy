import { ChatMessage, SessionSummary } from '../types'
import { CATEGORY_LABELS } from '../types'

interface Props {
  label: string
  summary: SessionSummary
  messages: ChatMessage[]
  durationSec: number
  onHome: () => void
  onProgress: () => void
}

export default function Review({ label, summary, messages, durationSec, onHome, onProgress }: Props) {
  const all = messages.flatMap((m) => m.corrections ?? [])
  const errors = all.filter((c) => c.severity === 'error')
  const tips = all.filter((c) => c.severity === 'tip')
  const fmt = (s: number) => `${Math.floor(s / 60)} min ${s % 60} s`

  return (
    <div className="screen review">
      <h1>Bilan de la leçon</h1>
      <p className="review-label">{label}</p>

      <div className="score-hero">
        <div className={`score-num ${summary.score >= 80 ? 'good' : summary.score >= 50 ? 'mid' : 'bad'}`}>
          {summary.score}
          <span>/100</span>
        </div>
        <p>{summary.score >= 80 ? 'Excellent ! 🎉' : summary.score >= 50 ? 'Bien joué ! 👍' : 'Bien essayé, continue ! 💪'}</p>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-big">⏱ {fmt(durationSec)}</div>
          <span className="stat-label">Durée</span>
        </div>
        <div className="stat-card">
          <div className="stat-big">✏️ {errors.length}</div>
          <span className="stat-label">Erreurs</span>
        </div>
        <div className="stat-card">
          <div className="stat-big">💡 {tips.length}</div>
          <span className="stat-label">Astuces</span>
        </div>
      </div>

      {summary.tip && (
        <div className="tip-card">
          <strong>💡 Conseil du coach</strong>
          <p>{summary.tip}</p>
        </div>
      )}

      {errors.length > 0 && (
        <>
          <h2>À corriger</h2>
          <ul className="review-list">
            {errors.map((c, i) => (
              <li key={i}>
                <span className="cat">{CATEGORY_LABELS[c.category]}</span>
                <div className="corr-line">
                  <s>{c.original}</s> → <strong>{c.corrected}</strong>
                </div>
                <p className="expl">{c.explanation}</p>
              </li>
            ))}
          </ul>
        </>
      )}

      {tips.length > 0 && (
        <>
          <h2>Astuces</h2>
          <ul className="review-list">
            {tips.map((c, i) => (
              <li key={i} className="tip">
                <span className="cat">{CATEGORY_LABELS[c.category]}</span>
                <p className="expl">{c.explanation}</p>
              </li>
            ))}
          </ul>
        </>
      )}

      <button className="cta" onClick={onHome}>
        Nouvelle conversation 🚀
      </button>
      <button className="ghost" onClick={onProgress}>
        Voir ma progression 📈
      </button>
    </div>
  )
}

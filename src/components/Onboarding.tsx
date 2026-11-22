import { useState } from 'react'
import { INTEREST_OPTIONS } from '../topics'
import { Level, LEVELS } from '../types'

interface Props {
  onDone: (level: Level, interests: string[]) => void
}

export default function Onboarding({ onDone }: Props) {
  const [level, setLevel] = useState<Level>('B1')
  const [interests, setInterests] = useState<string[]>(['work', 'travel'])

  const toggle = (id: string) => {
    setInterests((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  return (
    <div className="screen onboarding">
      <div className="logo">🗣️</div>
      <h1>SpeakPal</h1>
      <p className="tagline">
        Ton coach d'anglais personnel par IA. Parle, écoute, corrige — 24h/24, 7j/7.
      </p>

      <h2>1. Ton niveau d'anglais</h2>
      <div className="level-grid">
        {LEVELS.map((l) => (
          <button
            key={l.value}
            className={`level-card ${level === l.value ? 'selected' : ''}`}
            onClick={() => setLevel(l.value)}
          >
            <strong>{l.label}</strong>
            <span>{l.desc}</span>
          </button>
        ))}
      </div>

      <h2>2. Tes centres d'intérêt</h2>
      <div className="chip-row">
        {INTEREST_OPTIONS.map((o) => (
          <button
            key={o.id}
            className={`chip ${interests.includes(o.id) ? 'selected' : ''}`}
            onClick={() => toggle(o.id)}
          >
            {o.icon} {o.label}
          </button>
        ))}
      </div>

      <button className="cta" onClick={() => onDone(level, interests)} disabled={interests.length === 0}>
        Commencer 🚀
      </button>
      {interests.length === 0 && <p className="hint">Choisis au moins un centre d'intérêt.</p>}
    </div>
  )
}

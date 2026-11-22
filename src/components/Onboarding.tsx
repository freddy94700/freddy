import { useState } from 'react'
import { INTEREST_OPTIONS } from '../topics'
import { AvatarId, Level } from '../types'
import AvatarPicker from './AvatarPicker'
import LevelPicker from './LevelPicker'

interface Props {
  onDone: (level: Level, interests: string[], avatar: AvatarId) => void
}

export default function Onboarding({ onDone }: Props) {
  const [avatar, setAvatar] = useState<AvatarId>('female')
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

      <h2>1. Choisis ton coach</h2>
      <AvatarPicker value={avatar} onChange={setAvatar} />

      <h2>2. Ton niveau d'anglais</h2>
      <LevelPicker value={level} onChange={setLevel} />

      <h2>3. Tes centres d'intérêt</h2>
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

      <button className="cta" onClick={() => onDone(level, interests, avatar)} disabled={interests.length === 0}>
        Commencer 🚀
      </button>
      {interests.length === 0 && <p className="hint">Choisis au moins un centre d'intérêt.</p>}
    </div>
  )
}

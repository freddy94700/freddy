import { AvatarId, AVATARS } from '../types'

interface Props {
  value: AvatarId
  onChange: (id: AvatarId) => void
}

export default function AvatarPicker({ value, onChange }: Props) {
  return (
    <div className="avatar-grid">
      {AVATARS.map((a) => (
        <button
          key={a.id}
          className={`avatar-card ${value === a.id ? 'selected' : ''}`}
          onClick={() => onChange(a.id)}
        >
          <span className="avatar big" style={{ background: a.color }}>
            {a.emoji}
          </span>
          <strong>{a.name}</strong>
          <span className="avatar-sub">{a.id === 'female' ? 'Coach femme' : 'Coach homme'}</span>
        </button>
      ))}
    </div>
  )
}

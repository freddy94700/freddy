import { Level, LEVELS } from '../types'

interface Props {
  value: Level
  onChange: (level: Level) => void
}

export default function LevelPicker({ value, onChange }: Props) {
  return (
    <div className="level-grid">
      {LEVELS.map((l) => (
        <button
          key={l.value}
          className={`level-card ${value === l.value ? 'selected' : ''}`}
          onClick={() => onChange(l.value)}
        >
          <strong>{l.label}</strong>
          <span>{l.desc}</span>
        </button>
      ))}
    </div>
  )
}

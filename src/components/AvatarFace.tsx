import { Avatar } from '../types'

interface Props {
  avatar: Avatar
  speaking: boolean
  mood: 'neutral' | 'happy'
  size?: number
}

export default function AvatarFace({ avatar, speaking, mood, size = 120 }: Props) {
  const long = avatar.hairStyle === 'long'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={`avatar-face ${speaking ? 'speaking' : ''}`}
      role="img"
      aria-label={`Avatar de ${avatar.name}`}
    >
      <defs>
        <radialGradient id={`skin-${avatar.id}`} cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor={avatar.skin} stopOpacity="1" />
          <stop offset="100%" stopColor={avatar.skin} stopOpacity="0.82" />
        </radialGradient>
      </defs>

      {/* épaules / torse */}
      <path d={`M22 120 Q22 92 60 92 Q98 92 98 120 Z`} fill={avatar.shirt} />
      {/* cou */}
      <rect x="52" y="78" width="16" height="16" rx="6" fill={avatar.skin} />

      {/* cheveux arrière (longs) */}
      {long && <path d="M26 58 Q22 18 60 16 Q98 18 94 58 L94 92 Q88 96 84 90 L82 60 L38 60 L36 90 Q32 96 26 92 Z" fill={avatar.hair} />}

      {/* tête */}
      <g className="head">
        <circle cx="60" cy="54" r="28" fill={`url(#skin-${avatar.id})`} />
        {/* cheveux dessus */}
        {long ? (
          <path d="M32 50 Q30 22 60 20 Q90 22 88 50 Q84 32 60 32 Q36 32 32 50 Z" fill={avatar.hair} />
        ) : (
          <path d="M32 48 Q34 20 60 20 Q86 20 88 48 Q78 32 60 33 Q42 32 32 48 Z" fill={avatar.hair} />
        )}

        {/* sourcils */}
        <path d="M42 45 Q49 42 55 45" stroke={avatar.hair} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M65 45 Q71 42 78 45" stroke={avatar.hair} strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* yeux (clignent) */}
        <g className="eye">
          <ellipse cx="49" cy="52" rx="4.6" ry="5.2" fill="#fff" />
          <circle cx="49" cy="53" r="2.4" fill="#33261d" />
        </g>
        <g className="eye">
          <ellipse cx="71" cy="52" rx="4.6" ry="5.2" fill="#fff" />
          <circle cx="71" cy="53" r="2.4" fill="#33261d" />
        </g>

        {/* nez */}
        <path d="M60 55 Q58 61 60 63" stroke={avatar.skin} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />

        {/* bouche */}
        <g className={`mouth ${speaking ? 'talk' : ''}`}>
          {speaking ? (
            <ellipse cx="60" cy="69" rx="4.6" ry="3.4" fill="#8c3b3b" />
          ) : mood === 'happy' ? (
            <path d="M50 66 Q60 76 70 66" stroke="#8c3b3b" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          ) : (
            <path d="M52 68 Q60 71 68 68" stroke="#8c3b3b" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          )}
        </g>
      </g>
    </svg>
  )
}

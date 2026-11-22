interface Props {
  onClose: () => void
  onActivate: () => void
}

export default function PremiumModal({ onClose, onActivate }: Props) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="logo">⭐</div>
        <h2>SpeakPal Premium</h2>
        <p>Avec la version gratuite, tu as droit à <strong>1 conversation par jour</strong>.</p>
        <ul>
          <li>💬 Conversations illimitées, 24h/24</li>
          <li>🎭 Tous les jeux de rôle</li>
          <li>📈 Suivi de progression avancé</li>
          <li>🔊 Voix naturelle du coach</li>
        </ul>
        <button className="cta" onClick={onActivate}>
          Activer Premium (démo gratuite)
        </button>
        <button className="ghost" onClick={onClose}>
          Plus tard
        </button>
      </div>
    </div>
  )
}

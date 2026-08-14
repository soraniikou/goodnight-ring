import { FINGER_SIGNS } from "../data/fingerSigns";

export function CompletionScreen() {
  return (
    <div className="completion">
      <div className="completion-emoji">🌙</div>
      <h2>Goodnight</h2>
      <p>You found them all</p>

      <div className="completion-list">
        {FINGER_SIGNS.map((sign) => (
          <div key={sign.id} className="completion-item">
            <span className="completion-item-emoji">{sign.emoji}</span>
            <span className="completion-item-word">{sign.word}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
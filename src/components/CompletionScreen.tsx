import { FINGER_SIGNS } from "../data/fingerSigns";

type CompletionScreenProps = {
  onReset: () => void;
};

export function CompletionScreen({ onReset }: CompletionScreenProps) {
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

      <p className="completion-farewell">Sweet dreams. 🌙</p>

      <button type="button" className="reset-btn" onClick={onReset}>
        Play again
      </button>

      <p className="completion-note">
        These are gentle, made-up gestures. Real sign languages — like JSL
        and ASL — are full languages with their own grammar, used every day
        by Deaf and hard-of-hearing communities around the world.
      </p>

      <p className="completion-cta">
        Curious? Search "Japanese Sign Language basics" to see the real
        thing.
      </p>
    </div>
  );
}
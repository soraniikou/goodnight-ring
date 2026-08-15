import type { FingerSign } from "../data/fingerSigns";

type SignPanelProps = {
  sign: FingerSign | null;
  visible: boolean;
};

export function SignPanel({ sign, visible }: SignPanelProps) {
  return (
    <div className={`panel${visible && sign ? " show" : ""}`} aria-live="polite">
      {sign ? (
        <>
          <div className="emoji">{sign.emoji}</div>
          <div className="word">{sign.word}</div>
          <div className="desc">{sign.desc}</div>
        </>
      ) : null}
    </div>
  );
}
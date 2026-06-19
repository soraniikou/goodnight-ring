import type { FingerSign } from "../data/fingerSigns";

type FingerRingProps = {
  sign: FingerSign;
  active: boolean;
  onSelect: (id: FingerSign["id"]) => void;
};

export function FingerRing({ sign, active, onSelect }: FingerRingProps) {
  return (
    <button
      type="button"
      className={`finger${active ? " active" : ""}`}
      data-id={sign.id}
      onClick={() => onSelect(sign.id)}
      aria-pressed={active}
      aria-label={sign.label}
    >
      <div className="ring" />
      <div className="label">{sign.label}</div>
    </button>
  );
}

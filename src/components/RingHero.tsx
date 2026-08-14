import { useCallback, useRef, useState } from "react";
import { FINGER_SIGNS } from "../data/fingerSigns";
import type { FingerId } from "../data/fingerSigns";
import { FingerRing } from "./FingerRing";
import { SignPanel } from "./SignPanel";
import { Starfield } from "./Starfield";
import { CompletionScreen } from "./CompletionScreen";

export function RingHero() {
  const [activeId, setActiveId] = useState<FingerId | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [discoveredIds, setDiscoveredIds] = useState<Set<FingerId>>(new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeSign = activeId
    ? FINGER_SIGNS.find((sign) => sign.id === activeId) ?? null
    : null;

  const allFound = discoveredIds.size === FINGER_SIGNS.length;

  const handleSelect = useCallback((id: FingerId) => {
    setActiveId(id);
    setPanelVisible(false);
    setDiscoveredIds((prev) => new Set(prev).add(id));
    requestAnimationFrame(() => {
      setPanelVisible(true);
    });
  }, []);

  const handlePlay = useCallback(() => {
    if (!activeSign) return;

    const player = audioRef.current ?? new Audio();
    audioRef.current = player;
    player.src = activeSign.audio;
    player.play().catch(() => {
      window.alert(`Audio file not found: ${activeSign.audio}`);
    });
  }, [activeSign]);

  return (
    <>
      <Starfield />

      {allFound ? (
        <CompletionScreen />
      ) : (
        <>
          <h1>Goodnight, Little Fingers</h1>
          <p className="subtitle">Tap a finger and see what it says</p>

          <div className="stars">
            {FINGER_SIGNS.map((sign) => (
              <span
                key={sign.id}
                className={`star${discoveredIds.has(sign.id) ? " found" : ""}`}
              >
                ⭐
              </span>
            ))}
          </div>

          <div className="hand">
            {FINGER_SIGNS.map((sign) => (
              <FingerRing
                key={sign.id}
                sign={sign}
                active={activeId === sign.id}
                onSelect={handleSelect}
              />
            ))}
          </div>

          <SignPanel sign={activeSign} visible={panelVisible} onPlay={handlePlay} />
        </>
      )}

      <footer>
        Inspired by the idea of hand gestures — not a real sign language, and not a
        substitute for learning JSL or ASL.
      </footer>
    </>
  );
}
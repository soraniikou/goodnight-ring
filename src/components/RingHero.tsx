import { useCallback, useRef, useState } from "react";
import { FINGER_SIGNS } from "../data/fingerSigns";
import type { FingerId } from "../data/fingerSigns";
import { FingerRing } from "./FingerRing";
import { SignPanel } from "./SignPanel";
import { Starfield } from "./Starfield";

export function RingHero() {
  const [activeId, setActiveId] = useState<FingerId | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeSign = activeId
    ? FINGER_SIGNS.find((sign) => sign.id === activeId) ?? null
    : null;

  const handleSelect = useCallback((id: FingerId) => {
    setActiveId(id);
    setPanelVisible(false);
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

      <h1>Which finger gets the ring?</h1>

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

      <footer>
        Inspired by sign language gestures, not a substitute for learning JSL or
        ASL.
        <br />
        Learn more at{" "}
        <a href="https://www.jfd.or.jp/" target="_blank" rel="noopener noreferrer">
          Japanese Federation of the Deaf
        </a>
      </footer>
    </>
  );
}

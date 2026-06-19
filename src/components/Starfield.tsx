import { useMemo } from "react";

type Star = {
  left: number;
  top: number;
  delay: number;
};

const STAR_COUNT = 60;

function createStars(): Star[] {
  return Array.from({ length: STAR_COUNT }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3,
  }));
}

export function Starfield() {
  const stars = useMemo(() => createStars(), []);

  return (
    <div className="stars" aria-hidden="true">
      {stars.map((star, index) => (
        <span
          key={index}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

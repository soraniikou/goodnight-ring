export type FingerId = "thumb" | "index" | "middle" | "ring" | "pinky";

export type FingerSign = {
  id: FingerId;
  label: string;
  emoji: string;
  word: string;
  desc: string;
  audio: string;
};

export const FINGER_SIGNS: FingerSign[] = [
  {
    id: "thumb",
    label: "Thumb",
    emoji: "🙏",
    word: "Thank you",
    desc: "Inspired by a gesture meaning gratitude — one hand held flat, gently tapped by the other, lifting upward each time.",
    audio: "/audio/arigatou.mp3",
  },
  {
    id: "index",
    label: "Index",
    emoji: "👋",
    word: "Hello",
    desc: "Inspired by a gesture meaning greeting — index and middle fingers raised like clock hands, bending near the forehead.",
    audio: "/audio/konnichiwa.mp3",
  },
  {
    id: "middle",
    label: "Middle",
    emoji: "💗",
    word: "I like it",
    desc: "Inspired by a gesture meaning fondness — thumb and index finger drawn from the chin downward as they close.",
    audio: "/audio/suki.mp3",
  },
  {
    id: "ring",
    label: "Ring",
    emoji: "👌",
    word: "Congratulations",
    desc: "Inspired by a gesture meaning celebration — both hands cupped near the chest, opening upward like a flower blooming.",
    audio: "/audio/omedetou.mp3",
  },
  {
    id: "pinky",
    label: "Pinky",
    emoji:"🙌",
    word: "Friend",
    desc: "Inspired by a gesture meaning connection — the fingers of both hands curled and linked firmly together.",
    audio: "/audio/tomodachi.mp3",
  },
];

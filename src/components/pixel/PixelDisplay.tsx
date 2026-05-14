import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS, TYPE } from "./constants";
import { AtomKind, ATOM_FONT_FAMILY, geistPixelSquare } from "./font";

const ALL_ATOMS: AtomKind[] = ["square", "grid", "circle", "triangle", "line"];

export type PixelDisplayProps = {
  text: string;
  atom?: AtomKind | Partial<Record<string, AtomKind>>;
  fontSize?: number;
  color?: string;
  letterSpacing?: number;
  center?: boolean;
  x?: number;
  y?: number;
  className?: string;
  /**
   * If true, periodically swap one random letter's font-family to a different atom
   * for a few frames — adds "alive" micro-motion to held hero text.
   */
  flicker?: boolean;
  /** Frames between flickers. Default 22. */
  flickerEvery?: number;
  /** Frames the flicker is held. Default 3. */
  flickerDuration?: number;
  /** Seed for deterministic flicker pattern. Default 1. */
  flickerSeed?: number;
  /**
   * Entrance animation. Default "fade" (8-frame opacity in).
   * "scaleIn" — start at 1.3× and shrink to 1.0×
   * "scaleOut" — start at 0.7× and grow to 1.0×
   * "slideUp" — slide up 60px while fading in
   * "none" — instant
   */
  enter?: "fade" | "scaleIn" | "scaleOut" | "slideUp" | "none";
  /** Frames over which entrance plays. Default 8. */
  enterFrames?: number;
  /**
   * Exit animation triggered N frames before scene ends. Requires sceneEndFrame to be passed.
   */
  exit?: "fade" | "scaleIn" | "scaleOut" | "slideUp" | "none";
  /** Scene-relative frame at which exit begins. Required if exit is set. */
  exitAt?: number;
  /** Frames over which exit plays. Default 6. */
  exitFrames?: number;
};

export const PixelDisplay: React.FC<PixelDisplayProps> = ({
  text,
  atom,
  fontSize = TYPE.display.fontSize,
  color = COLORS.fg,
  letterSpacing = 0,
  center = true,
  x,
  y,
  className,
  flicker = false,
  flickerEvery = 22,
  flickerDuration = 3,
  flickerSeed = 1,
  enter = "fade",
  enterFrames = 8,
  exit = "none",
  exitAt,
  exitFrames = 6,
}) => {
  const frame = useCurrentFrame();

  // === Entrance / exit animation ===
  const enterProgress = interpolate(frame, [0, enterFrames], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });
  const exitProgress = exit !== "none" && exitAt !== undefined
    ? interpolate(frame, [exitAt, exitAt + exitFrames], [0, 1], {
        easing: Easing.in(Easing.cubic),
        extrapolateRight: "clamp",
      })
    : 0;

  let animTransform = "";
  let animOpacity = 1;
  switch (enter) {
    case "fade":      animOpacity *= enterProgress; break;
    case "scaleIn":   animTransform += ` scale(${1.3 - 0.3 * enterProgress})`; animOpacity *= enterProgress; break;
    case "scaleOut":  animTransform += ` scale(${0.7 + 0.3 * enterProgress})`; animOpacity *= enterProgress; break;
    case "slideUp":   animTransform += ` translateY(${(1 - enterProgress) * 60}px)`; animOpacity *= enterProgress; break;
    case "none":      break;
  }
  switch (exit) {
    case "fade":      animOpacity *= 1 - exitProgress; break;
    case "scaleIn":   animTransform += ` scale(${1 + 0.3 * exitProgress})`; animOpacity *= 1 - exitProgress; break;
    case "scaleOut":  animTransform += ` scale(${1 - 0.3 * exitProgress})`; animOpacity *= 1 - exitProgress; break;
    case "slideUp":   animTransform += ` translateY(${-exitProgress * 60}px)`; animOpacity *= 1 - exitProgress; break;
    case "none":      break;
  }

  const getAtomFor = (char: string): AtomKind => {
    if (!atom) return "square";
    if (typeof atom === "string") return atom;
    return (atom[char.toUpperCase()] as AtomKind | undefined) ?? "square";
  };

  // Compute which letter (if any) is currently flickering to which atom
  let flickerIdx: number | null = null;
  let flickerAtom: AtomKind | null = null;
  if (flicker && text.length > 0) {
    const cycleIdx = Math.floor(frame / flickerEvery);
    const cyclePhase = frame % flickerEvery;
    if (cyclePhase < flickerDuration) {
      // Pick a deterministic letter for this cycle
      const seed = (cycleIdx * 9301 + flickerSeed * 49297) % 233280;
      flickerIdx = seed % text.length;
      // Pick a different atom than the letter's normal one
      const normalAtom = getAtomFor(text[flickerIdx]);
      const candidates = ALL_ATOMS.filter((a) => a !== normalAtom);
      flickerAtom = candidates[seed % candidates.length];
    }
  }

  const containerStyle: React.CSSProperties = {
    position: "absolute",
    color,
    fontSize,
    lineHeight: 1.0,
    letterSpacing,
    fontWeight: 400,
    fontFamily: geistPixelSquare,
    whiteSpace: "pre",
    transform: animTransform || undefined,
    transformOrigin: "center",
    opacity: animOpacity,
    ...(center
      ? {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }
      : { left: x ?? 0, top: y ?? 0 }),
  };

  return (
    <div style={containerStyle} className={className}>
      {Array.from(text).map((ch, i) => {
        const usedAtom =
          i === flickerIdx && flickerAtom !== null ? flickerAtom : getAtomFor(ch);
        return (
          <span
            key={i}
            style={{
              fontFamily: ch === " " ? geistPixelSquare : ATOM_FONT_FAMILY[usedAtom],
              display: "inline-block",
            }}
          >
            {ch}
          </span>
        );
      })}
    </div>
  );
};

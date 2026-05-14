import React from "react";
import { useCurrentFrame } from "remotion";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*-=";

export type PulseScrambleTypeProps = {
  text: string;
  /** Frame at which initial typing starts. */
  startFrame?: number;
  /** Frames per character during initial type-in. Default 2. */
  stepFrames?: number;
  /** After fully typed, re-scramble for this many frames every `pulseEvery` frames. Default 4. */
  pulseDuration?: number;
  /** Frames between pulses. Default 50. Set to 0 to disable pulsing. */
  pulseEvery?: number;
  /** Number of trailing characters to pulse. Default 3 (the "px" suffix area). */
  pulseChars?: number;
  /** If false, just shows the full text immediately. */
  run?: boolean;
};

/**
 * A ScrambleType that, after typing in, periodically re-scrambles its trailing characters.
 * Used in the HUD dimensions to give the chrome a "live readout" feel — the kind of micro-detail
 * that makes the reference reel feel like instrumented design tooling, not static branding.
 */
export const PulseScrambleType: React.FC<PulseScrambleTypeProps> = ({
  text,
  startFrame = 0,
  stepFrames = 2,
  pulseDuration = 4,
  pulseEvery = 50,
  pulseChars = 3,
  run = true,
}) => {
  const frame = useCurrentFrame();
  if (!run) return <>{text}</>;

  const elapsed = frame - startFrame;
  if (elapsed < 0) return <>{"\u00A0".repeat(text.length)}</>;

  // Initial type-in phase
  const typeInTotal = text.length * stepFrames;
  if (elapsed < typeInTotal) {
    const settledLength = Math.floor(elapsed / stepFrames);
    const settled = text.slice(0, settledLength);
    const activeIndex = (elapsed * 7 + settledLength * 13) % SCRAMBLE_CHARS.length;
    const activeChar = settledLength < text.length ? SCRAMBLE_CHARS[activeIndex] : "";
    return <>{settled + activeChar}</>;
  }

  // Post-type-in pulse phase: re-scramble trailing chars every `pulseEvery` frames
  if (pulseEvery <= 0) return <>{text}</>;

  const sincePulseStart = (elapsed - typeInTotal) % pulseEvery;
  const isPulsing = sincePulseStart < pulseDuration;
  if (!isPulsing) return <>{text}</>;

  const head = text.slice(0, text.length - pulseChars);
  const tail = text.slice(text.length - pulseChars);
  const scrambled = tail
    .split("")
    .map((_, i) => {
      const idx = (frame * 11 + i * 17) % SCRAMBLE_CHARS.length;
      return SCRAMBLE_CHARS[idx];
    })
    .join("");
  return <>{head + scrambled}</>;
};

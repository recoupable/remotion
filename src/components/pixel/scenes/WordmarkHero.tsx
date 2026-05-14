import React from "react";
import { Canvas } from "../Canvas";
import { PixelDisplay } from "../PixelDisplay";
import { COLORS } from "../constants";
import type { AtomKind } from "../font";
import { HudProps } from "../Hud";

/**
 * Scene type — the Recoupable wordmark in pixel atoms, full canvas width.
 * Used as the brand stamp before the outro icon. Per-letter atom variation gives
 * the "PIXEL" effect that defines this style.
 */
export type WordmarkHeroProps = {
  hud: HudProps;
  text?: string;
  fontSize?: number;
};

// Vowels = circle, consonants = square, with a few sharp-letter exceptions
const RECOUPABLE_ATOM_MAP: Partial<Record<string, AtomKind>> = {
  R: "square",
  E: "circle",
  C: "circle",
  O: "circle",
  U: "circle",
  P: "square",
  A: "triangle",
  B: "square",
  L: "line",
};

export const WordmarkHero: React.FC<WordmarkHeroProps> = ({
  hud,
  text = "RECOUPABLE.",
  fontSize = 110,
}) => (
  <Canvas hud={hud} rainSeed={307}>
    <PixelDisplay
      text={text}
      atom={RECOUPABLE_ATOM_MAP}
      fontSize={fontSize}
      color={COLORS.fg}
      flicker
      flickerEvery={18}
    />
  </Canvas>
);

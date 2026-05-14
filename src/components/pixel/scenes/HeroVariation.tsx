import React from "react";
import { Canvas } from "../Canvas";
import { PixelDisplay } from "../PixelDisplay";
import { COLORS } from "../constants";
import type { AtomKind } from "../font";
import { HudProps } from "../Hud";

/**
 * Scene type — a static word rendered with a single atom variant.
 * Used as a quick "atom variation" scene after a resolve, e.g.,
 * MUSIC particle resolves (default mixed atoms), then hard cut to MUSIC × all triangle,
 * then hard cut to MUSIC × all line. Each variation scene is ~15-18 frames (~0.5s).
 */
export type HeroVariationProps = {
  hud: HudProps;
  text: string;
  atom: AtomKind;
  fontSize?: number;
  rainSeed?: number;
  enter?: "fade" | "scaleIn" | "scaleOut" | "slideUp" | "none";
  exit?: "fade" | "scaleIn" | "scaleOut" | "slideUp" | "none";
  exitAt?: number;
};

/**
 * Static word in a single atom variant — designed for atom-variation hard cuts after a resolve.
 * Default: enter=none (instant) so the word appears on the same beat as the previous word ends.
 * This makes a sequence of "MUSIC × triangle → MUSIC × line" feel like one word morphing
 * through atom states, not 3 separate scenes.
 */
export const HeroVariation: React.FC<HeroVariationProps> = ({
  hud,
  text,
  atom,
  fontSize = 240,
  rainSeed,
  enter = "none",
  exit = "none",
  exitAt,
}) => (
  <Canvas hud={hud} rainSeed={rainSeed}>
    <PixelDisplay
      text={text}
      atom={atom}
      fontSize={fontSize}
      color={COLORS.fg}
      flicker
      flickerEvery={12}
      enter={enter}
      exit={exit}
      exitAt={exitAt}
    />
  </Canvas>
);

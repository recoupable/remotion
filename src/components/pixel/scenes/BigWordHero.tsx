import React from "react";
import { Canvas } from "../Canvas";
import { PixelDisplay } from "../PixelDisplay";
import { COLORS } from "../constants";
import type { AtomKind } from "../font";
import { HudProps } from "../Hud";

/**
 * Scene type — single big word in pixel atoms.
 * Used for the workload reveal sequence: "RELEASES." → "STREAMS." → "ROYALTIES." → "CATALOG."
 * Each appears for ~25 frames as a hard cut.
 *
 * Different from HeroVariation in that this is meant to be the *first* appearance of the
 * word, not a variation of an already-shown word. Same component shape; just used differently.
 */
export type BigWordHeroProps = {
  hud: HudProps;
  text: string;
  atom?: AtomKind | Partial<Record<string, AtomKind>>;
  fontSize?: number;
  rainSeed?: number;
  /** Entrance animation. Default scaleOut (grow from small). */
  enter?: "fade" | "scaleIn" | "scaleOut" | "slideUp" | "none";
  /** Exit animation. Default fade. */
  exit?: "fade" | "scaleIn" | "scaleOut" | "slideUp" | "none";
  /** Frame at which exit begins (scene-relative). */
  exitAt?: number;
};

export const BigWordHero: React.FC<BigWordHeroProps> = ({
  hud,
  text,
  atom = "square",
  fontSize = 200,
  rainSeed,
  enter = "scaleOut",
  exit = "fade",
  exitAt,
}) => (
  <Canvas hud={hud} rainSeed={rainSeed}>
    <PixelDisplay
      text={text}
      atom={atom}
      fontSize={fontSize}
      color={COLORS.fg}
      flicker
      flickerEvery={14}
      enter={enter}
      exit={exit}
      exitAt={exitAt}
    />
  </Canvas>
);

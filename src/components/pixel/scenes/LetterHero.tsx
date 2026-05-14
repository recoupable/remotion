import React from "react";
import { Canvas } from "../Canvas";
import { COLORS, CANVAS } from "../constants";
import { ATOM_FONT_FAMILY, AtomKind } from "../font";
import { HudProps } from "../Hud";

/**
 * Scene type — single huge letter, rendered with a Geist Pixel variant.
 * Reference: frame ~8.5s where a giant "P" in circles dominates the canvas.
 * Use to give a single character maximum impact / negative space.
 */
export type LetterHeroProps = {
  hud: HudProps;
  letter: string;
  atom?: AtomKind;
  /** Font size. Default 700 (huge — fills most of canvas). */
  fontSize?: number;
  rainSeed?: number;
};

export const LetterHero: React.FC<LetterHeroProps> = ({
  hud,
  letter,
  atom = "circle",
  fontSize = 700,
  rainSeed,
}) => (
  <Canvas hud={hud} rainSeed={rainSeed}>
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: ATOM_FONT_FAMILY[atom],
        fontSize,
        lineHeight: 1.0,
        color: COLORS.fg,
      }}
    >
      {letter}
    </div>
  </Canvas>
);

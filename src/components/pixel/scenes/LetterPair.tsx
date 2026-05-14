import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Canvas } from "../Canvas";
import { COLORS, CANVAS } from "../constants";
import { fontFamily, ATOM_FONT_FAMILY, AtomKind } from "../font";
import { HudProps } from "../Hud";

/**
 * Scene 12 — Letter pair comparison with callouts.
 * Two huge letters side by side, both rendered in the same atom (typically circle for the
 * dotted-grid look). Each has a thin callout line + uppercase label (DEFAULT / ALT).
 * Reference: frame ~19.5s — the iconic "RR" comparison.
 *
 * Use to highlight "we have the system, here are the variants" — even if both letters look
 * basically identical, the act of comparing them communicates "designed deliberately."
 */
export type LetterPairProps = {
  hud: HudProps;
  /** The two letters to display. Default both "M" (works as a music callback). */
  letters?: [string, string];
  /** Atom for both letters. Default "circle" (mirrors reference). */
  atom?: AtomKind;
  /** Labels on the callouts */
  labels?: [string, string];
  /** Font size of each letter. Default 480. */
  fontSize?: number;
};

export const LetterPair: React.FC<LetterPairProps> = ({
  hud,
  letters = ["M", "M"],
  atom = "circle",
  labels = ["DEFAULT", "ALT-01"],
  fontSize = 480,
}) => {
  const frame = useCurrentFrame();
  const cy = CANVAS.height / 2;
  // Two letters split the canvas roughly into thirds
  const lx = CANVAS.width / 3;
  const rx = (CANVAS.width / 3) * 2;
  const fadeIn = (delay: number) =>
    interpolate(frame - delay, [0, 6], [0, 1], { extrapolateRight: "clamp" });

  return (
    <Canvas hud={hud} rainSeed={113}>
      {/* Left letter */}
      <div
        style={{
          position: "absolute",
          left: lx - fontSize / 2,
          top: cy - fontSize / 2,
          width: fontSize,
          height: fontSize,
          color: COLORS.fg,
          fontFamily: ATOM_FONT_FAMILY[atom],
          fontSize,
          lineHeight: 1.0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: fadeIn(0),
        }}
      >
        {letters[0]}
      </div>
      {/* Right letter */}
      <div
        style={{
          position: "absolute",
          left: rx - fontSize / 2,
          top: cy - fontSize / 2,
          width: fontSize,
          height: fontSize,
          color: COLORS.fg,
          fontFamily: ATOM_FONT_FAMILY[atom],
          fontSize,
          lineHeight: 1.0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: fadeIn(4),
        }}
      >
        {letters[1]}
      </div>
      {/* Callout left: line going up from below letter */}
      <div
        style={{
          position: "absolute",
          left: lx,
          top: cy + fontSize / 2 + 8,
          width: 1,
          height: 60,
          background: COLORS.dim,
          opacity: fadeIn(8),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: lx - 60,
          top: cy + fontSize / 2 + 78,
          width: 120,
          textAlign: "center",
          fontFamily,
          fontSize: 14,
          color: COLORS.fg,
          letterSpacing: 0.6,
          opacity: fadeIn(10),
        }}
      >
        {labels[0]}
      </div>
      {/* Callout right */}
      <div
        style={{
          position: "absolute",
          left: rx,
          top: cy - fontSize / 2 - 60,
          width: 1,
          height: 60,
          background: COLORS.dim,
          opacity: fadeIn(8),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: rx - 60,
          top: cy - fontSize / 2 - 90,
          width: 120,
          textAlign: "center",
          fontFamily,
          fontSize: 14,
          color: COLORS.fg,
          letterSpacing: 0.6,
          opacity: fadeIn(10),
        }}
      >
        {labels[1]}
      </div>
    </Canvas>
  );
};

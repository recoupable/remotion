import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { Canvas } from "../Canvas";
import { COLORS, CANVAS } from "../constants";
import { ATOM_FONT_FAMILY, AtomKind, geistSans, geistPixelSquare } from "../font";
import { HudProps } from "../Hud";

/**
 * Hero text that ENTERS via motion — slides up from below, scales in, or rotates in.
 * Replaces static "appear and hold" hero scenes with motivated motion entrances.
 *
 * Each "kind" is a distinct entrance + exit pattern:
 *   "scaleIn"   — text scales from 1.6× to 1.0× (zooms in like camera focus)
 *   "scaleOut"  — text scales from 0.4× to 1.0× (grows from tiny)
 *   "slideUp"   — text slides up from below (cinematic title)
 *   "slideDown" — text slides down from above
 *   "rotate"    — text rotates in 12° → 0°
 *
 * Use these to make scenes feel motion-motivated instead of static-then-cut.
 */
export type KineticHeroProps = {
  hud: HudProps;
  text: string;
  kind?: "scaleIn" | "scaleOut" | "slideUp" | "slideDown" | "rotate";
  /** Geist Pixel atom or smooth Geist Sans */
  atom?: AtomKind | "sans";
  fontSize?: number;
  /** Optional hold-then-exit pattern */
  exitAt?: number;
};

export const KineticHero: React.FC<KineticHeroProps> = ({
  hud,
  text,
  kind = "scaleOut",
  atom = "square",
  fontSize = 220,
  exitAt,
}) => {
  const frame = useCurrentFrame();

  // Entrance over first 10 frames
  const entryProgress = interpolate(frame, [0, 12], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });

  // Optional exit — scales/slides out before scene end
  const exitProgress = exitAt !== undefined
    ? interpolate(frame, [exitAt, exitAt + 8], [0, 1], {
        easing: Easing.in(Easing.cubic),
        extrapolateRight: "clamp",
      })
    : 0;

  let transform = "";
  let opacity = 1;
  switch (kind) {
    case "scaleIn":
      transform = `scale(${1.6 - 0.6 * entryProgress + 0.3 * exitProgress})`;
      opacity = entryProgress * (1 - exitProgress);
      break;
    case "scaleOut":
      transform = `scale(${0.4 + 0.6 * entryProgress - 0.3 * exitProgress})`;
      opacity = entryProgress * (1 - exitProgress);
      break;
    case "slideUp":
      transform = `translateY(${(1 - entryProgress) * 100 - exitProgress * 80}px)`;
      opacity = entryProgress * (1 - exitProgress);
      break;
    case "slideDown":
      transform = `translateY(${(entryProgress - 1) * 100 + exitProgress * 80}px)`;
      opacity = entryProgress * (1 - exitProgress);
      break;
    case "rotate":
      transform = `rotate(${(1 - entryProgress) * 12 - exitProgress * 12}deg) scale(${0.8 + 0.2 * entryProgress})`;
      opacity = entryProgress * (1 - exitProgress);
      break;
  }

  const fontFamily = atom === "sans" ? geistSans : ATOM_FONT_FAMILY[atom];
  const isSans = atom === "sans";

  return (
    <Canvas hud={hud}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily,
          fontSize,
          fontWeight: isSans ? 700 : 400,
          color: COLORS.fg,
          letterSpacing: isSans ? -3 : 0,
          lineHeight: 1.0,
          textAlign: "center",
          padding: "0 60px",
          transform,
          opacity,
        }}
      >
        {text}
      </div>
    </Canvas>
  );
};

import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { Canvas } from "../Canvas";
import { COLORS, CANVAS } from "../constants";
import { ATOM_FONT_FAMILY, geistSans, AtomKind } from "../font";
import { HudProps } from "../Hud";

/**
 * Camera-zoom illusion — text dramatically scales across the scene.
 * Two modes:
 *   "in"  — starts tiny (a dot in the distance) and grows to fill canvas
 *   "out" — starts massive (filling canvas) and shrinks to nothing
 *
 * Use to bridge scenes with motion energy. The viewer's eye reads it as the
 * camera moving toward or away from the text. Massive psychological "one shot" cue.
 */
export type ScaleZoomProps = {
  hud: HudProps;
  text: string;
  mode?: "in" | "out";
  atom?: AtomKind | "sans";
  /** Final font size (or starting if mode=out). Default 360. */
  fontSize?: number;
  /** Inverted bg? */
  inverted?: boolean;
};

export const ScaleZoom: React.FC<ScaleZoomProps> = ({
  hud,
  text,
  mode = "in",
  atom = "sans",
  fontSize = 360,
  inverted = false,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [0, 24], [0, 1], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateRight: "clamp",
  });

  // mode "in": scale from 0.05 → 1.0 (a dot growing massive)
  // mode "out": scale from 1.0 → 4.0 (massive growing past the camera)
  const scale = mode === "in" ? 0.05 + 0.95 * progress : 1.0 + 3.0 * progress;
  const opacity = mode === "in"
    ? interpolate(frame, [0, 6, 24], [0, 1, 1], { extrapolateRight: "clamp" })
    : interpolate(frame, [0, 18, 24], [1, 1, 0], { extrapolateRight: "clamp" });

  const fontFamily = atom === "sans" ? geistSans : ATOM_FONT_FAMILY[atom];
  const isSans = atom === "sans";
  const fg = inverted ? COLORS.fgInverted : COLORS.fg;

  return (
    <Canvas hud={hud} inverted={inverted}>
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
          color: fg,
          letterSpacing: isSans ? -4 : 0,
          lineHeight: 1.0,
          textAlign: "center",
          transform: `scale(${scale})`,
          transformOrigin: "center",
          opacity,
        }}
      >
        {text}
      </div>
    </Canvas>
  );
};

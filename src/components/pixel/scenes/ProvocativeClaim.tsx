import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Canvas } from "../Canvas";
import { ScrambleType } from "../ScrambleType";
import { fontFamily, geistSans } from "../font";
import { COLORS, CANVAS } from "../constants";
import { HudProps } from "../Hud";

/**
 * Scene type — a single bold provocative statement.
 * Use for "ZERO MEETINGS.", "WE RUN OUR OWN LABEL.", "NOW SHIPPING."
 * Smooth Geist Sans, large, lowercase or sentence case for personality.
 * Brackets around the text optionally signal it's a "system claim" vs prose.
 */
export type ProvocativeClaimProps = {
  hud: HudProps;
  text: string;
  /** Font size. Default 130. */
  fontSize?: number;
  /** Whether to wrap in brackets. Default false. */
  bracketed?: boolean;
  /** Optional accent line above (creates a "callout" feel). Default true. */
  accentLine?: boolean;
  /** Color. Default white. */
  color?: string;
  /** Inverted (white bg)? */
  inverted?: boolean;
};

export const ProvocativeClaim: React.FC<ProvocativeClaimProps> = ({
  hud,
  text,
  fontSize = 130,
  bracketed = false,
  accentLine = true,
  color = COLORS.fg,
  inverted = false,
}) => {
  const frame = useCurrentFrame();
  const lineWidth = interpolate(frame, [0, 10], [0, 200], {
    extrapolateRight: "clamp",
  });
  const fg = inverted ? COLORS.fgInverted : color;

  return (
    <Canvas hud={hud} inverted={inverted}>
      {accentLine && (
        <div
          style={{
            position: "absolute",
            left: CANVAS.width / 2 - lineWidth / 2,
            top: CANVAS.height / 2 - fontSize / 2 - 36,
            width: lineWidth,
            height: 2,
            background: fg,
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: geistSans,
          fontSize,
          fontWeight: 700,
          color: fg,
          letterSpacing: -3,
          lineHeight: 1.0,
          textAlign: "center",
          padding: "0 80px",
        }}
      >
        <ScrambleType
          text={bracketed ? `[ ${text} ]` : text}
          startFrame={0}
          stepFrames={1}
        />
      </div>
      {/* Tiny "claim" tag below */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: CANVAS.height / 2 + fontSize / 2 + 24,
          textAlign: "center",
          fontFamily,
          fontSize: 12,
          color: inverted ? COLORS.dimInv : COLORS.dim,
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        — claim —
      </div>
    </Canvas>
  );
};

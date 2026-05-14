import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { Canvas } from "../Canvas";
import { ScrambleType } from "../ScrambleType";
import { fontFamily, geistSans } from "../font";
import { COLORS, CANVAS } from "../constants";
import { HudProps } from "../Hud";

/**
 * Scene type — large hero number with tiny supporting label.
 * Use for proof points: "$18K / MRR", "10 / LABELS", "$100M / GOAL".
 * The number is rendered HUGE in Geist Sans (smooth) — high impact, fast read.
 *
 * Optional ramp-up: if `rampFrom` is provided, the number animates from `rampFrom` → `value`
 * over 12 frames (with scramble characters mid-ramp). Use for "counting up" feel.
 */
export type NumberFlexProps = {
  hud: HudProps;
  /** Final value to display, e.g., "$18K", "10", "$100M" */
  value: string;
  /** Tiny label below, e.g., "MRR", "LABELS", "GOAL" */
  label: string;
  /** If set, scramble in to the value (faster than typing) */
  scramble?: boolean;
  /** Font size for the big number. Default 360. */
  fontSize?: number;
};

export const NumberFlex: React.FC<NumberFlexProps> = ({
  hud,
  value,
  label,
  scramble = true,
  fontSize = 360,
}) => {
  const frame = useCurrentFrame();
  // Slight scale-in for the number
  const scale = interpolate(frame, [0, 8], [0.92, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });

  return (
    <Canvas hud={hud}>
      {/* Hero number */}
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
          color: COLORS.fg,
          letterSpacing: -8,
          lineHeight: 1.0,
          transform: `scale(${scale})`,
          transformOrigin: "center",
        }}
      >
        {scramble ? <ScrambleType text={value} startFrame={0} stepFrames={1} /> : value}
      </div>
      {/* Tiny label below — uppercase, letter-spaced, dim */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: CANVAS.height / 2 + fontSize / 2 - 30,
          textAlign: "center",
          fontFamily,
          fontSize: 18,
          color: COLORS.dim,
          letterSpacing: 3,
          textTransform: "uppercase",
        }}
      >
        — <ScrambleType text={label} startFrame={6} stepFrames={1} /> —
      </div>
    </Canvas>
  );
};

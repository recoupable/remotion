import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { Canvas } from "../Canvas";
import { fontFamily, geistSans } from "../font";
import { COLORS, CANVAS } from "../constants";
import { HudProps } from "../Hud";

/**
 * Animated number counter that ticks up from 0 → final value over the scene.
 * Reads as "live data, real-time, accelerating." Use for metrics, growth, plays, etc.
 *
 * Prefix and suffix wrap the number ("$" + value + "K", "+" + value + "M", etc.).
 */
export type CounterTickProps = {
  hud: HudProps;
  /** Final numeric value (the count-up target) */
  value: number;
  /** Prefix string (e.g., "$", "+", "") */
  prefix?: string;
  /** Suffix string (e.g., "K", "M", "%", "") */
  suffix?: string;
  /** Tiny label below */
  label?: string;
  /** Font size for the number. Default 360. */
  fontSize?: number;
  /** Frames over which to count up. Default 16. */
  countFrames?: number;
};

export const CounterTick: React.FC<CounterTickProps> = ({
  hud,
  value,
  prefix = "",
  suffix = "",
  label,
  fontSize = 360,
  countFrames = 16,
}) => {
  const frame = useCurrentFrame();

  const t = interpolate(frame, [0, countFrames], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });

  const current = Math.round(value * t);

  return (
    <Canvas hud={hud}>
      {/* Hero counter */}
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
        }}
      >
        {prefix}{current}{suffix}
      </div>
      {/* Tiny label */}
      {label && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: CANVAS.height / 2 + fontSize / 2 - 30,
            textAlign: "center",
            fontFamily,
            fontSize: 16,
            color: COLORS.dim,
            letterSpacing: 3,
            textTransform: "lowercase",
          }}
        >
          — {label} —
        </div>
      )}
    </Canvas>
  );
};

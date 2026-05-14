import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { Canvas } from "../Canvas";
import { COLORS, CANVAS } from "../constants";
import { fontFamily } from "../font";
import { HudProps } from "../Hud";

/**
 * Music-domain visual scene — vertical EQ-like bars across the canvas.
 * Each bar is a column whose height oscillates over time using deterministic noise.
 * Reads as "music data, live, animated" — the visual language of audio waveforms.
 *
 * Use as a break from text-heavy scenes in the middle. No text, just rhythm.
 */
function bandHeight(seed: number, frame: number, i: number): number {
  // Two superposed sine waves at different speeds for an organic wave pattern
  const t = frame / 30;
  const a = Math.sin(t * 3 + i * 0.5 + seed) * 0.5 + 0.5;
  const b = Math.sin(t * 5.5 + i * 0.3 + seed * 1.7) * 0.3 + 0.5;
  // Bias by lane position (lower at edges, higher in middle — like a bell)
  const center = 0.5 - Math.abs(i / 24 - 0.5);
  return Math.max(0.05, (a * 0.6 + b * 0.4) * (0.5 + center));
}

export type WaveBarsProps = {
  hud: HudProps;
  /** Number of bars across the canvas. Default 24. */
  bandCount?: number;
  /** Optional small label below the bars */
  label?: string;
  seed?: number;
};

export const WaveBars: React.FC<WaveBarsProps> = ({
  hud,
  bandCount = 24,
  label = "[ live :: signal ]",
  seed = 1,
}) => {
  const frame = useCurrentFrame();
  // Container occupies central band of canvas
  const top = 360;
  const containerH = 360;
  const containerLeft = 100;
  const containerW = CANVAS.width - 200;
  const bandW = containerW / bandCount;
  const bandPad = 6;

  // Slight intro: bars rise from 0 to full over first 8 frames
  const introScale = interpolate(frame, [0, 10], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });

  return (
    <Canvas hud={hud}>
      {/* Bars */}
      {Array.from({ length: bandCount }).map((_, i) => {
        const h = bandHeight(seed, frame, i) * containerH * introScale;
        const x = containerLeft + i * bandW + bandPad / 2;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: top + (containerH - h),
              width: bandW - bandPad,
              height: h,
              background: COLORS.fg,
            }}
          />
        );
      })}
      {/* Baseline */}
      <div
        style={{
          position: "absolute",
          left: containerLeft,
          top: top + containerH + 1,
          width: containerW,
          height: 1,
          background: COLORS.dim,
        }}
      />
      {/* Tiny label */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: top + containerH + 24,
          textAlign: "center",
          fontFamily,
          fontSize: 14,
          color: COLORS.dim,
          letterSpacing: 1.5,
          textTransform: "lowercase",
        }}
      >
        {label}
      </div>
    </Canvas>
  );
};

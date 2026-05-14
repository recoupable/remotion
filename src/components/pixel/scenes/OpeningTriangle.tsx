import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "../constants";

/**
 * Scene 01 — Strong opening hook on white background.
 * Huge solid black triangle slowly shrinks. No HUD, no grid — pure form.
 * The whole point is the inversion that follows feels EARNED.
 * Reference: frame 0-1.5s of the source reel.
 */
export type OpeningTriangleProps = {
  /** Starting size in px (default 760, ~70% of canvas) */
  startSize?: number;
  /** End size in px after shrink (default 540, ~50% of canvas) */
  endSize?: number;
};

export const OpeningTriangle: React.FC<OpeningTriangleProps> = ({
  startSize = 760,
  endSize = 540,
}) => {
  const frame = useCurrentFrame();
  const size = interpolate(frame, [0, 36], [startSize, endSize], {
    easing: Easing.out(Easing.quad),
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: COLORS.bgInverted,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${size}px solid ${COLORS.fgInverted}`,
        }}
      />
    </div>
  );
};

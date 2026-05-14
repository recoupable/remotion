import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "../constants";

/**
 * Scene 1 — Brand opening on white.
 * A single solid black rounded square draws in from nothing → grows to full size.
 * Sets up the "before" state: ONE thing. Anticipating the split that follows.
 *
 * This is OUR opening hook (replacing the Vercel triangle).
 */
export type LogoFormationProps = {
  size?: number;
};

export const LogoFormation: React.FC<LogoFormationProps> = ({ size = 280 }) => {
  const frame = useCurrentFrame();
  // Scale from 0 → 1 with strong ease-out for a confident appearance
  const scale = interpolate(frame, [0, 14], [0, 1], {
    easing: Easing.out(Easing.cubic),
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
          width: size,
          height: size,
          background: COLORS.fgInverted,
          borderRadius: 32,
          transform: `scale(${scale})`,
          transformOrigin: "center",
        }}
      />
    </div>
  );
};

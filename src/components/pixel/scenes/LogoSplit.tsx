import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "../constants";
import { RecoupableLogo } from "../RecoupableLogo";

/**
 * Scene 2 — The signature animation.
 * The single rounded square pulls apart: one half goes up-right, one goes down-left.
 * Mid-separation, the Recoupable logo (the interlocking shape) is visible — that IS
 * the moment of separation. After full separation, two distinct squares remain.
 *
 * This is the brand statement made motion: "Recoupable = the act of recouping/separating,
 * captured in the moment between."
 *
 * Implementation: Three layered elements:
 *   - Left/bottom square: starts at center, animates to bottom-left
 *   - Right/top square: starts at center, animates to top-right
 *   - Recoupable logo: appears at peak split, fades out as the squares finish separating
 */
export type LogoSplitProps = {
  squareSize?: number;
  /** How far each square travels from center, in px */
  separation?: number;
};

export const LogoSplit: React.FC<LogoSplitProps> = ({
  squareSize = 280,
  separation = 100,
}) => {
  const frame = useCurrentFrame();

  // Phase 1 (frames 0-12): squares overlapping (still appears as one)
  // Phase 2 (frames 8-18): logo appears, squares start separating
  // Phase 3 (frames 18-24): logo fades, squares fully separated

  // Square offsets (one goes up-left, one down-right — diagonal split)
  const splitProgress = interpolate(frame, [4, 22], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const offset = separation * splitProgress;

  // Logo opacity: appears mid-split, fades by end
  const logoOpacity = interpolate(frame, [8, 14, 20], [0, 1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
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
      {/* Right/top square */}
      <div
        style={{
          position: "absolute",
          width: squareSize * 0.85,
          height: squareSize * 0.85,
          background: COLORS.fgInverted,
          borderRadius: 28,
          transform: `translate(${offset}px, ${-offset}px)`,
        }}
      />
      {/* Left/bottom square */}
      <div
        style={{
          position: "absolute",
          width: squareSize * 0.85,
          height: squareSize * 0.85,
          background: COLORS.fgInverted,
          borderRadius: 28,
          transform: `translate(${-offset}px, ${offset}px)`,
        }}
      />
      {/* The Recoupable logo at peak split — the brand statement */}
      <div
        style={{
          position: "absolute",
          opacity: logoOpacity,
        }}
      >
        <RecoupableLogo size={squareSize * 1.4} color={COLORS.fgInverted} />
      </div>
    </div>
  );
};

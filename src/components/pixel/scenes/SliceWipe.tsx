import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { AbsoluteFill } from "remotion";
import { COLORS, CANVAS } from "../constants";
import { fontFamily } from "../font";

/**
 * Transition bridge — a single tall vertical bar sweeps across the canvas, white-on-black.
 * Smoother than hard cut, faster than fade. Use between acts that need a clean wipe.
 *
 * Brief overlay text in the bar can name the next chapter.
 */
export type SliceWipeProps = {
  /** Optional chapter label visible during the wipe */
  label?: string;
};

export const SliceWipe: React.FC<SliceWipeProps> = ({ label }) => {
  const frame = useCurrentFrame();
  // Bar width is full-screen at peak, narrow at start and end (sweeps across)
  // x position: 0 → 100% over the duration
  const xPct = interpolate(frame, [0, 12], [0, 100], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateRight: "clamp",
  });
  // Bar width: 0 → wide → 0
  const widthPx = interpolate(frame, [0, 6, 12], [40, 280, 40], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <div
        style={{
          position: "absolute",
          left: `${xPct}%`,
          top: 0,
          height: "100%",
          width: widthPx,
          background: COLORS.fg,
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {label && (
          <div
            style={{
              fontFamily,
              fontSize: 16,
              color: COLORS.bg,
              letterSpacing: 2,
              textTransform: "uppercase",
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
          >
            {label}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { Canvas } from "../Canvas";
import { COLORS, CANVAS } from "../constants";
import { fontFamily } from "../font";
import { ScrambleType } from "../ScrambleType";
import { HudProps } from "../Hud";

/**
 * Transition bridge — a thin horizontal line draws across the canvas, optionally
 * with a small label that scrambles in mid-line. Use between major acts to
 * maintain motion continuity instead of dead hard-cuts.
 *
 * Reference: between major scenes, there's often a single "instrument-feel"
 * element (line draw, callout) that bridges the cut. Keeps the eye moving.
 */
export type TransitionLineDrawProps = {
  hud: HudProps;
  /** Optional centered label that appears mid-draw */
  label?: string;
  /** Y position of the line (px from top). Default canvas center. */
  y?: number;
  /** Inverted (white bg)? Default false. */
  inverted?: boolean;
};

export const TransitionLineDraw: React.FC<TransitionLineDrawProps> = ({
  hud,
  label,
  y = CANVAS.height / 2,
  inverted = false,
}) => {
  const frame = useCurrentFrame();
  const lineProgress = interpolate(frame, [0, 8], [0, 1], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateRight: "clamp",
  });
  const lineColor = inverted ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)";

  return (
    <Canvas hud={hud} inverted={inverted}>
      {/* The line itself — full width, drawing in from center outward */}
      <div
        style={{
          position: "absolute",
          left: CANVAS.width / 2,
          top: y,
          width: (CANVAS.width - 200) * lineProgress,
          height: 1,
          background: lineColor,
          transform: "translateX(-50%)",
        }}
      />
      {label && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: y - 30,
            textAlign: "center",
            fontFamily,
            fontSize: 14,
            color: inverted ? COLORS.fgInverted : COLORS.fg,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          <ScrambleType text={label} startFrame={4} stepFrames={1} />
        </div>
      )}
    </Canvas>
  );
};

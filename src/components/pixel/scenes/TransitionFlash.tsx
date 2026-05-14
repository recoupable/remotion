import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Canvas } from "../Canvas";
import { fontFamily } from "../font";
import { COLORS } from "../constants";
import { HudProps } from "../Hud";

/**
 * Transition bridge — single bracketed tag flashes at center, very brief.
 * Use as a "chapter slate" between acts: [act ii: domain], [act iii: system], etc.
 * 12-15 frames total. Reads as a tooling micro-state, not a slow card.
 */
export type TransitionFlashProps = {
  hud: HudProps;
  /** The tag content, e.g., "[ act ii :: domain ]". Brackets = signature pattern. */
  tag: string;
};

export const TransitionFlash: React.FC<TransitionFlashProps> = ({ hud, tag }) => {
  const frame = useCurrentFrame();
  // Quick fade: in over 2 frames, hold 8, out over 4
  const opacity = interpolate(frame, [0, 2, 10, 14], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <Canvas hud={hud}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity,
        }}
      >
        <span
          style={{
            fontFamily,
            fontSize: 32,
            color: COLORS.fg,
            letterSpacing: 1.2,
            textTransform: "lowercase",
            border: "1px solid rgba(255,255,255,0.3)",
            padding: "10px 22px",
          }}
        >
          {tag}
        </span>
      </div>
    </Canvas>
  );
};

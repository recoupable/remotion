import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Canvas } from "../Canvas";
import { ScrambleType } from "../ScrambleType";
import { fontFamily, geistSans } from "../font";
import { COLORS, CANVAS } from "../constants";
import { HudProps } from "../Hud";

/**
 * Scene type — left vs right comparison with an arrow between.
 * Use for problem→solution: "GENERIC AI." → "AGENTS.", "MANUAL." → "AUTONOMOUS."
 * The left side is rendered in DIM gray (the "bad"); the right in full white (the "good").
 * Arrow appears mid-scene to bridge.
 */
export type BeforeAfterCompareProps = {
  hud: HudProps;
  before: string;
  after: string;
  /** Font size. Default 100. */
  fontSize?: number;
  /** Bottom label, e.g., "INDUSTRY → US". */
  bottomLabel?: string;
};

export const BeforeAfterCompare: React.FC<BeforeAfterCompareProps> = ({
  hud,
  before,
  after,
  fontSize = 100,
  bottomLabel,
}) => {
  const frame = useCurrentFrame();
  const arrowOpacity = interpolate(frame, [6, 10], [0, 1], {
    extrapolateRight: "clamp",
  });
  const afterOpacity = interpolate(frame, [10, 16], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <Canvas hud={hud}>
      {/* Before (left, dim) */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: CANVAS.width / 2,
          top: CANVAS.height / 2 - fontSize / 2,
          textAlign: "right",
          fontFamily: geistSans,
          fontSize,
          fontWeight: 700,
          color: COLORS.dim,
          letterSpacing: -2,
          lineHeight: 1.0,
          paddingRight: 50,
          textDecoration: "line-through",
          textDecorationColor: "rgba(255,255,255,0.4)",
          textDecorationThickness: 4,
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        <ScrambleType text={before} startFrame={0} stepFrames={1} />
      </div>
      {/* Arrow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily,
          fontSize: 50,
          color: COLORS.fg,
          opacity: arrowOpacity,
        }}
      >
        →
      </div>
      {/* After (right, bright) */}
      <div
        style={{
          position: "absolute",
          left: CANVAS.width / 2,
          right: 0,
          top: CANVAS.height / 2 - fontSize / 2,
          textAlign: "left",
          fontFamily: geistSans,
          fontSize,
          fontWeight: 700,
          color: COLORS.fg,
          letterSpacing: -2,
          lineHeight: 1.0,
          paddingLeft: 50,
          opacity: afterOpacity,
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        <ScrambleType text={after} startFrame={10} stepFrames={1} />
      </div>
      {bottomLabel && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: CANVAS.height / 2 + fontSize / 2 + 60,
            textAlign: "center",
            fontFamily,
            fontSize: 14,
            color: COLORS.dim,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          {bottomLabel}
        </div>
      )}
    </Canvas>
  );
};

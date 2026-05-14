import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Canvas } from "../Canvas";
import { ATOM_FONT_FAMILY, AtomKind, fontFamily } from "../font";
import { COLORS, CANVAS } from "../constants";
import { HudProps } from "../Hud";

/**
 * Scene type — canvas split into 4 quadrants, each with a different sub-scene.
 * Bold creative choice: 4 things at once instead of one.
 * Default: same word in 4 different atom variations + label per quadrant.
 *
 * Reference reel doesn't have this — it's our own pizzaz.
 */
export type QuadrantSplitProps = {
  hud: HudProps;
  /** Word to render in each quadrant */
  text: string;
  /** Atom for each quadrant: top-left, top-right, bottom-left, bottom-right */
  atoms?: [AtomKind, AtomKind, AtomKind, AtomKind];
  /** Optional per-quadrant label */
  labels?: [string, string, string, string];
  /** Font size for each quadrant's text */
  fontSize?: number;
};

export const QuadrantSplit: React.FC<QuadrantSplitProps> = ({
  hud,
  text,
  atoms = ["square", "circle", "triangle", "line"],
  labels = ["square", "circle", "triangle", "line"],
  fontSize = 90,
}) => {
  const frame = useCurrentFrame();
  // Quadrants appear staggered: TL → TR → BL → BR, 4 frames apart
  const stagger = [0, 3, 6, 9];

  // Quadrant centers (within each half of the canvas)
  const positions = [
    { x: CANVAS.width / 4,     y: CANVAS.height / 4     }, // top-left
    { x: CANVAS.width * 3 / 4, y: CANVAS.height / 4     }, // top-right
    { x: CANVAS.width / 4,     y: CANVAS.height * 3 / 4 }, // bottom-left
    { x: CANVAS.width * 3 / 4, y: CANVAS.height * 3 / 4 }, // bottom-right
  ];

  return (
    <Canvas hud={hud}>
      {/* Cross dividers */}
      <div
        style={{
          position: "absolute",
          left: CANVAS.width / 2,
          top: 100,
          bottom: 100,
          width: 1,
          background: "rgba(255,255,255,0.18)",
          transform: "translateX(-50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: CANVAS.height / 2,
          left: 100,
          right: 100,
          height: 1,
          background: "rgba(255,255,255,0.18)",
          transform: "translateY(-50%)",
        }}
      />
      {atoms.map((atom, i) => {
        const opacity = interpolate(
          frame - stagger[i],
          [0, 5],
          [0, 1],
          { extrapolateRight: "clamp" }
        );
        if (opacity <= 0) return null;
        const p = positions[i];
        return (
          <React.Fragment key={i}>
            {/* Quadrant text */}
            <div
              style={{
                position: "absolute",
                left: p.x - 200,
                top: p.y - fontSize / 2,
                width: 400,
                textAlign: "center",
                fontFamily: ATOM_FONT_FAMILY[atom],
                fontSize,
                color: COLORS.fg,
                lineHeight: 1.0,
                opacity,
              }}
            >
              {text}
            </div>
            {/* Quadrant label */}
            <div
              style={{
                position: "absolute",
                left: p.x - 100,
                top: p.y + fontSize / 2 + 20,
                width: 200,
                textAlign: "center",
                fontFamily,
                fontSize: 12,
                color: COLORS.dim,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                opacity,
              }}
            >
              [{i + 1}] {labels[i]}
            </div>
          </React.Fragment>
        );
      })}
    </Canvas>
  );
};

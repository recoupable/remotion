import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Canvas } from "../Canvas";
import { PixelDisplay } from "../PixelDisplay";
import { COLORS, CANVAS } from "../constants";
import { fontFamily, AtomKind } from "../font";
import { HudProps } from "../Hud";

/**
 * Scene type — same word in 3 different atom treatments, top/middle/bottom.
 * Mirrors the reference reel's "áaa" specimen scene at ~17.5s.
 * This is the **multi-instance density** technique the reference uses heavily.
 * Three rows visible simultaneously — much higher density than one resolved word.
 *
 * Each row uses a DIFFERENT atom (font variant) to render the same string.
 * Optional callout label per row identifies the variant.
 */
export type TripleSpecimenProps = {
  hud: HudProps;
  /** The word to render in all 3 rows */
  text: string;
  /** Atoms for the 3 rows, top to bottom. Default ["square", "circle", "triangle"]. */
  atoms?: [AtomKind, AtomKind, AtomKind];
  /** Per-row labels for the callouts, top to bottom. */
  labels?: [string, string, string];
  /** Font size per row */
  fontSize?: number;
};

export const TripleSpecimen: React.FC<TripleSpecimenProps> = ({
  hud,
  text,
  atoms = ["square", "circle", "triangle"],
  labels = ["DEFAULT", "ALT-01", "ALT-02"],
  fontSize = 200,
}) => {
  const frame = useCurrentFrame();
  // Each row appears 6 frames apart (180ms)
  const rowAppears = [0, 6, 12];
  // Spacing: split canvas into 3 horizontal bands
  const yPositions = [220, 540, 860];

  return (
    <Canvas hud={hud} rainSeed={91}>
      {atoms.map((atom, i) => {
        const visible = frame >= rowAppears[i];
        if (!visible) return null;
        const opacity = interpolate(
          frame - rowAppears[i],
          [0, 4],
          [0, 1],
          { extrapolateRight: "clamp" }
        );
        return (
          <React.Fragment key={i}>
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: yPositions[i] - fontSize / 2,
                opacity,
                textAlign: "center",
              }}
            >
              <PixelDisplay
                text={text}
                atom={atom}
                fontSize={fontSize}
                color={COLORS.fg}
                center={false}
                flicker={false}
              />
            </div>
            {/* Small label to the right of each row */}
            <div
              style={{
                position: "absolute",
                right: 100,
                top: yPositions[i] + fontSize / 2 + 8,
                fontFamily,
                fontSize: 12,
                color: COLORS.dim,
                letterSpacing: 0.5,
                opacity,
              }}
            >
              {labels[i]}
            </div>
          </React.Fragment>
        );
      })}
    </Canvas>
  );
};

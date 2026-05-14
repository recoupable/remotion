import React from "react";
import { useCurrentFrame } from "remotion";
import { Canvas } from "../Canvas";
import { ScrambleType } from "../ScrambleType";
import { COLORS, CANVAS } from "../constants";
import { fontFamily, ATOM_FONT_FAMILY, AtomKind } from "../font";
import { HudProps } from "../Hud";

/**
 * Scene 03 — The iconic atom showcase.
 * Five atoms shown in a row, each rendered using the actual Geist Pixel font variant.
 * Below each atom, a small label scramble-types in (square, grid, circle, triangle, line).
 * Reference: frame ~13s — this is the moment that reveals "here are the building blocks."
 *
 * Implementation note: rather than rendering each atom as a single primitive, render each
 * as a representative letter ("M") in the corresponding GeistPixel variant — this shows
 * the FONT itself, not just an abstract shape. Communicates "these are font variants" not
 * "these are arbitrary primitives."
 */
const ATOMS: { kind: AtomKind; label: string; sample: string }[] = [
  { kind: "square", label: "square", sample: "M" },
  { kind: "grid", label: "grid", sample: "M" },
  { kind: "circle", label: "circle", sample: "M" },
  { kind: "triangle", label: "triangle", sample: "M" },
  { kind: "line", label: "line", sample: "M" },
];

export type AtomShowcaseProps = {
  hud: HudProps;
};

export const AtomShowcase: React.FC<AtomShowcaseProps> = ({ hud }) => {
  const frame = useCurrentFrame();
  const colW = CANVAS.width / (ATOMS.length + 1);
  const startX = colW;
  const sampleSize = 160;
  const labelStartFrame = 6;

  return (
    <Canvas hud={hud} rainSeed={51}>
      {ATOMS.map((a, i) => {
        const cx = startX + i * colW;
        const cy = CANVAS.height / 2 - 20;
        // Stagger atom appearance: 4 frames apart
        const visibleFrame = i * 3;
        const visible = frame >= visibleFrame;
        if (!visible) return null;
        return (
          <React.Fragment key={a.kind}>
            <div
              style={{
                position: "absolute",
                left: cx - sampleSize / 2,
                top: cy - sampleSize / 2,
                width: sampleSize,
                height: sampleSize,
                color: COLORS.fg,
                fontFamily: ATOM_FONT_FAMILY[a.kind],
                fontSize: sampleSize,
                lineHeight: 1.0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {a.sample}
            </div>
            <div
              style={{
                position: "absolute",
                left: cx - 60,
                top: cy + sampleSize / 2 + 24,
                width: 120,
                fontFamily,
                fontSize: 16,
                color: COLORS.dim,
                textAlign: "center",
                letterSpacing: 0.5,
              }}
            >
              <ScrambleType
                text={a.label}
                startFrame={labelStartFrame + i * 3}
                stepFrames={1}
              />
            </div>
          </React.Fragment>
        );
      })}
    </Canvas>
  );
};

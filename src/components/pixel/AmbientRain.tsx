import React from "react";
import { useCurrentFrame } from "remotion";
import { Atom } from "./Atom";
import { CANVAS } from "./constants";
import { fontFamily, AtomKind } from "./font";

/**
 * Faint particle rain — only used in scenes where the rain itself adds value
 * (resolves, transitions, terminal log moments). NOT a constant background.
 *
 * Mix of atoms AND alphanumeric chars (1, 0, 8) with variable sizes per particle.
 * Reference reel does this — pure shape rain looks generic; mixed shape+char looks
 * "instrumented." Matches the data-tooling vibe of the rest of the design system.
 */
type RainKind = AtomKind | "1" | "0" | "8";
const KINDS: RainKind[] = [
  "square", "square", "square",
  "circle", "circle",
  "triangle",
  "line",
  "1", "1", "0", "0", "8",
];

function prn(seed: number, i: number): number {
  const x = Math.sin(seed * 9301 + i * 49297) * 233280;
  return x - Math.floor(x);
}

export type AmbientRainProps = {
  /** Number of particles. Default 80. */
  count?: number;
  /** Base atom size in px. Particles vary 0.6× to 1.4× this. Default 16. */
  size?: number;
  /** Opacity of the whole layer. Default 0.22. */
  opacity?: number;
  /** Number of vertical lanes. Default 24. */
  lanes?: number;
  /** Color */
  color?: string;
  /** Seed for deterministic randomness */
  seed?: number;
};

export const AmbientRain: React.FC<AmbientRainProps> = ({
  count = 80,
  size = 16,
  opacity = 0.22,
  lanes = 24,
  color = "#FFFFFF",
  seed = 99,
}) => {
  const frame = useCurrentFrame();
  const laneWidth = CANVAS.width / lanes;

  return (
    <div style={{ position: "absolute", inset: 0, opacity, pointerEvents: "none" }}>
      {/* Faint vertical lane lines — adds the "data column" feel */}
      {Array.from({ length: lanes }).map((_, i) => (
        <div
          key={`lane-${i}`}
          style={{
            position: "absolute",
            left: i * laneWidth,
            top: 0,
            width: 1,
            height: CANVAS.height,
            background: "rgba(255,255,255,0.04)",
          }}
        />
      ))}
      {Array.from({ length: count }).map((_, i) => {
        const lane = Math.floor(prn(seed, i) * lanes);
        const yStart = -prn(seed, i + 1000) * CANVAS.height * 1.5;
        const velocity = 5 + prn(seed, i + 2000) * 8;
        const y = (yStart + frame * velocity) % (CANVAS.height + 60);
        // Variable sizing: 0.6× to 1.4× base — adds depth (parallax feel)
        const sizeMult = 0.6 + prn(seed, i + 4000) * 0.8;
        const psize = size * sizeMult;
        const x = lane * laneWidth + (laneWidth - psize) / 2;
        const kind = KINDS[Math.floor(prn(seed, i + 3000) * KINDS.length)];

        // Character particles render via font; shape particles via Atom
        if (kind === "1" || kind === "0" || kind === "8") {
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: psize,
                height: psize,
                color,
                fontSize: psize,
                fontFamily,
                lineHeight: 1,
                textAlign: "center",
              }}
            >
              {kind}
            </div>
          );
        }
        return <Atom key={i} kind={kind as AtomKind} x={x} y={y} size={psize} color={color} />;
      })}
    </div>
  );
};

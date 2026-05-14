import React from "react";
import { useCurrentFrame } from "remotion";
import { getPixelCells, GLYPH_W, GLYPH_H } from "./glyphs";
import { Atom } from "./Atom";
import type { AtomKind } from "./font";
import { PixelDisplay } from "./PixelDisplay";
import { CANVAS, COLORS } from "./constants";

export type ParticleResolveProps = {
  word: string;
  cellSize?: number;
  atomMap?: Record<string, AtomKind>;
  resolveStartFrame?: number;
  resolveWindow?: number;
  color?: string;
  decoyRatio?: number;
  seed?: number;
  /** Add per-letter atom flicker to the resolved hero state. Default true. */
  flicker?: boolean;
  /** Frames between flickers. Default 22. */
  flickerEvery?: number;
};

const DECOY_KINDS: AtomKind[] = ["square", "circle", "triangle", "line"];

function prn(seed: number, i: number): number {
  const x = Math.sin(seed * 9301 + i * 49297) * 233280;
  return x - Math.floor(x);
}

const DecoyRain: React.FC<{
  count: number;
  lanes: number;
  laneWidth: number;
  cellSize: number;
  color: string;
  seed: number;
  frame: number;
  opacity: number;
}> = ({ count, lanes, laneWidth, cellSize, color, seed, frame, opacity }) => (
  <div style={{ opacity }}>
    {Array.from({ length: count }).map((_, i) => {
      const lane = Math.floor(prn(seed, i + 5000) * lanes);
      const yStart = -prn(seed, i + 6000) * CANVAS.height;
      const velocity = 8 + prn(seed, i + 7000) * 6;
      const y = (yStart + frame * velocity) % (CANVAS.height + 100);
      const x = lane * laneWidth + (laneWidth - cellSize) / 2;
      const kind = DECOY_KINDS[Math.floor(prn(seed, i + 8000) * DECOY_KINDS.length)];
      return <Atom key={i} kind={kind} x={x} y={y} size={cellSize} color={color} />;
    })}
  </div>
);

export const ParticleResolve: React.FC<ParticleResolveProps> = ({
  word,
  cellSize = 28,
  atomMap = {},
  resolveStartFrame = 10,
  resolveWindow = 14,
  color = COLORS.fg,
  decoyRatio = 0.1,
  seed = 1,
  flicker = true,
  flickerEvery = 22,
}) => {
  const frame = useCurrentFrame();

  const cells = getPixelCells(word);
  const totalW = (word.length * (GLYPH_W + 1) - 1) * cellSize;
  const totalH = GLYPH_H * cellSize;
  const offsetX = (CANVAS.width - totalW) / 2;
  const offsetY = (CANVAS.height - totalH) / 2;

  const targets = cells.map((c) => ({
    x: offsetX + c.x * cellSize,
    y: offsetY + c.y * cellSize,
    atom: (atomMap[c.char] as AtomKind) ?? "square",
    char: c.char,
  }));

  const decoyCount = Math.floor(targets.length * decoyRatio);
  const totalParticles = targets.length + decoyCount;

  const lanes = 22;
  const laneWidth = CANVAS.width / lanes;

  const resolveCompleteFrame = resolveStartFrame + resolveWindow + 4;
  const isFullyResolved = frame >= resolveCompleteFrame;

  // PixelDisplay fontSize that approximates the procedural grid's height
  const displayFontSize = cellSize * GLYPH_H * 1.2;

  if (isFullyResolved) {
    return (
      <PixelDisplay
        text={word}
        atom={atomMap}
        fontSize={displayFontSize}
        color={color}
        flicker={flicker}
        flickerEvery={flickerEvery}
        flickerSeed={seed}
      />
    );
  }

  return (
    <>
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
      {Array.from({ length: totalParticles }).map((_, i) => {
        const isDecoy = i >= targets.length;
        const target = isDecoy ? null : targets[i];
        const lane = isDecoy
          ? Math.floor(prn(seed, i + 5000) * lanes)
          : Math.floor((target!.x / CANVAS.width) * lanes);
        const yStart = -prn(seed, i + 100) * CANVAS.height;
        const velocity = 10 + prn(seed, i + 200) * 6;
        const atom: AtomKind = isDecoy
          ? DECOY_KINDS[Math.floor(prn(seed, i + 400) * DECOY_KINDS.length)]
          : target!.atom;

        const snapDelay = isDecoy
          ? Infinity
          : resolveStartFrame +
            Math.floor((1 - target!.y / CANVAS.height) * resolveWindow * 0.5) +
            Math.floor(prn(seed, i + 500) * resolveWindow * 0.5);

        const isSnapped = !isDecoy && frame >= snapDelay;

        if (isSnapped) {
          return <Atom key={i} kind={atom} x={target!.x} y={target!.y} size={cellSize} color={color} />;
        }

        const y = (yStart + frame * velocity) % (CANVAS.height + 100);
        const x = lane * laneWidth + (laneWidth - cellSize) / 2;
        return <Atom key={i} kind={atom} x={x} y={y} size={cellSize} color={color} />;
      })}
    </>
  );
};

import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { AbsoluteFill } from "remotion";
import { Atom } from "../Atom";
import { COLORS, CANVAS } from "../constants";
import type { AtomKind } from "../font";

/**
 * Particles fall from above and ASSEMBLE into the silhouette of a rounded square
 * (the same shape that LogoFormation starts at). Used as the opening hook —
 * gives the brand reveal motion-motivated drama before the logo appears.
 *
 * Implementation: each particle has a target position inside a rounded-square mask.
 * Particles fall from above, snap to their target position with bottom-up timing.
 * After all snap, hard-cut to LogoFormation (which picks up with the assembled square).
 */
const KINDS: AtomKind[] = ["square", "square", "square", "circle", "triangle", "line"];

function prn(seed: number, i: number): number {
  const x = Math.sin(seed * 9301 + i * 49297) * 233280;
  return x - Math.floor(x);
}

/**
 * Compute a list of (x, y) target positions inside a rounded-square mask.
 * The mask is centered on the canvas, ~280px wide.
 */
function computeTargets(squareSize: number): Array<{ x: number; y: number }> {
  const targets: Array<{ x: number; y: number }> = [];
  const cx = CANVAS.width / 2;
  const cy = CANVAS.height / 2;
  const half = squareSize / 2;
  const cornerRadius = 32;
  const cellSize = 14;
  const cells = Math.floor(squareSize / cellSize);

  for (let cy_idx = 0; cy_idx < cells; cy_idx++) {
    for (let cx_idx = 0; cx_idx < cells; cx_idx++) {
      const localX = cx_idx * cellSize;
      const localY = cy_idx * cellSize;
      const dx = Math.min(localX, squareSize - localX - cellSize);
      const dy = Math.min(localY, squareSize - localY - cellSize);
      if (dx < cornerRadius && dy < cornerRadius) {
        const cornerDist = Math.sqrt(
          (cornerRadius - dx) * (cornerRadius - dx) + (cornerRadius - dy) * (cornerRadius - dy)
        );
        if (cornerDist > cornerRadius) continue;
      }
      targets.push({
        x: cx - half + localX,
        y: cy - half + localY,
      });
    }
  }
  return targets;
}

export type ParticleAssembleProps = {
  /** Final square size when all particles are assembled. Default 280. */
  squareSize?: number;
  /** Frames before particles begin snapping. Default 8. */
  fallFrames?: number;
  /** Frames over which all particles snap into place. Default 16. */
  assembleWindow?: number;
  /** Color of the particles */
  color?: string;
  seed?: number;
};

export const ParticleAssemble: React.FC<ParticleAssembleProps> = ({
  squareSize = 280,
  fallFrames = 8,
  assembleWindow = 16,
  color = COLORS.fgInverted,
  seed = 5,
}) => {
  const frame = useCurrentFrame();

  const targets = computeTargets(squareSize);
  const cellSize = 14;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgInverted }}>
      {targets.map((target, i) => {
        // Each particle assigned a snap delay (top-down: higher targets snap first)
        const yProgress = (target.y - (CANVAS.height / 2 - squareSize / 2)) / squareSize;
        const snapAt =
          fallFrames +
          Math.floor(yProgress * assembleWindow) +
          Math.floor(prn(seed, i + 100) * 4);

        const isSnapped = frame >= snapAt;

        if (isSnapped) {
          return <Atom key={i} kind="square" x={target.x} y={target.y} size={cellSize} color={color} />;
        }

        // Falling: from top of canvas, lane = target.x lane, velocity per particle
        const fallStart = -prn(seed, i + 200) * CANVAS.height * 0.8 - 60;
        const velocity = 22 + prn(seed, i + 300) * 8;
        const y = fallStart + frame * velocity;
        // Once the particle would have passed the target, freeze just above target
        const renderY = Math.min(y, target.y - 4);
        const x = target.x;
        return <Atom key={i} kind="square" x={x} y={renderY} size={cellSize} color={color} />;
      })}
    </AbsoluteFill>
  );
};

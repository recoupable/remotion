import React from "react";
import { useCurrentFrame } from "remotion";
import { Canvas } from "../Canvas";
import { Atom } from "../Atom";
import { CANVAS, COLORS } from "../constants";
import type { AtomKind } from "../font";
import { HudProps } from "../Hud";

/**
 * Scene type — pure chaotic particle scatter.
 * No resolve, no hero word. Just particles falling fast, dense.
 * Use as a brief (15-30 frame) bridge before a resolve scene to amp up the energy.
 * Reference: frame ~5s — the chaos before PIXEL resolves.
 */
const KINDS: AtomKind[] = ["square", "square", "circle", "triangle", "line"];

function prn(seed: number, i: number): number {
  const x = Math.sin(seed * 9301 + i * 49297) * 233280;
  return x - Math.floor(x);
}

export type ParticleScatterProps = {
  hud: HudProps;
  /** Number of particles. Default 140 (high density). */
  count?: number;
  size?: number;
  seed?: number;
};

export const ParticleScatter: React.FC<ParticleScatterProps> = ({
  hud,
  count = 140,
  size = 18,
  seed = 7,
}) => {
  const frame = useCurrentFrame();
  const lanes = 24;
  const laneWidth = CANVAS.width / lanes;

  return (
    <Canvas hud={hud} rainSeed={seed} showAmbientRain={false}>
      {Array.from({ length: count }).map((_, i) => {
        const lane = Math.floor(prn(seed, i) * lanes);
        const yStart = -prn(seed, i + 1000) * CANVAS.height * 1.5;
        const velocity = 14 + prn(seed, i + 2000) * 10;
        const y = (yStart + frame * velocity) % (CANVAS.height + 100);
        const x = lane * laneWidth + (laneWidth - size) / 2;
        const kind = KINDS[Math.floor(prn(seed, i + 3000) * KINDS.length)];
        return <Atom key={i} kind={kind} x={x} y={y} size={size} color={COLORS.fg} />;
      })}
    </Canvas>
  );
};

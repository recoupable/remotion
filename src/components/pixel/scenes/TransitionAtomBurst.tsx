import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Canvas } from "../Canvas";
import { Atom } from "../Atom";
import { CANVAS } from "../constants";
import type { AtomKind } from "../font";
import { HudProps } from "../Hud";

/**
 * Transition bridge — a single atom appears at center, then explodes outward in 8 directions.
 * Quick (12-15 frame) bridge between scenes that adds visual punctuation without dead air.
 */
const KINDS: AtomKind[] = ["square", "circle", "triangle", "line"];

function prn(seed: number, i: number): number {
  const x = Math.sin(seed * 9301 + i * 49297) * 233280;
  return x - Math.floor(x);
}

export type TransitionAtomBurstProps = {
  hud: HudProps;
  /** Atom to burst. Default "square". */
  kind?: AtomKind;
  /** Number of particles to burst out. Default 14. */
  count?: number;
  seed?: number;
};

export const TransitionAtomBurst: React.FC<TransitionAtomBurstProps> = ({
  hud,
  kind = "square",
  count = 14,
  seed = 1,
}) => {
  const frame = useCurrentFrame();
  // Center atom: appears frame 0, holds, fades by 6
  const centerOpacity = interpolate(frame, [0, 1, 5, 8], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });
  const centerSize = 32;
  const cx = CANVAS.width / 2 - centerSize / 2;
  const cy = CANVAS.height / 2 - centerSize / 2;

  // Burst particles: invisible until frame 4, then expand outward
  const burstProgress = interpolate(frame, [4, 14], [0, 1], {
    extrapolateRight: "clamp",
  });
  const burstOpacity = interpolate(frame, [4, 6, 12, 14], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <Canvas hud={hud}>
      {/* Center atom (the spark) */}
      <div style={{ opacity: centerOpacity }}>
        <Atom kind={kind} x={cx} y={cy} size={centerSize} color="#FFFFFF" />
      </div>
      {/* Bursting particles in 8 + jitter directions */}
      <div style={{ opacity: burstOpacity }}>
        {Array.from({ length: count }).map((_, i) => {
          const angle = (i / count) * Math.PI * 2 + prn(seed, i) * 0.3;
          const distance = 250 + prn(seed, i + 100) * 100;
          const x = CANVAS.width / 2 + Math.cos(angle) * distance * burstProgress - centerSize / 2;
          const y = CANVAS.height / 2 + Math.sin(angle) * distance * burstProgress - centerSize / 2;
          const k = KINDS[Math.floor(prn(seed, i + 200) * KINDS.length)];
          const psize = 16 + prn(seed, i + 300) * 12;
          return <Atom key={i} kind={k} x={x} y={y} size={psize} color="#FFFFFF" />;
        })}
      </div>
    </Canvas>
  );
};

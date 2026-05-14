import React from "react";
import { useCurrentFrame } from "remotion";
import { Canvas } from "../Canvas";
import { ScrambleType } from "../ScrambleType";
import { fontFamily, geistPixelSquare } from "../font";
import { COLORS, CANVAS } from "../constants";
import { HudProps } from "../Hud";

/**
 * Scene type — the autonomous-agent loop visualization.
 * Four nodes around a center, with arrows: BRIEF → AGENT → REVIEW → SHIP → BRIEF...
 *
 * Each node lights up in sequence (chase-light effect) suggesting the loop runs forever.
 * This is the "self-driving label" promise made visual.
 */
const NODES = [
  { label: "BRIEF",  pos: "top" },
  { label: "AGENT",  pos: "right" },
  { label: "REVIEW", pos: "bottom" },
  { label: "SHIP",   pos: "left" },
] as const;

const NODE_OFFSET = 230; // distance from center

export type AutonomousLoopProps = {
  hud: HudProps;
  /** Frames per active node. Default 8. */
  framesPerNode?: number;
};

export const AutonomousLoop: React.FC<AutonomousLoopProps> = ({
  hud,
  framesPerNode = 8,
}) => {
  const frame = useCurrentFrame();
  const activeIdx = Math.floor(frame / framesPerNode) % NODES.length;
  const cx = CANVAS.width / 2;
  const cy = CANVAS.height / 2;

  const positions: Record<string, { x: number; y: number }> = {
    top:    { x: cx, y: cy - NODE_OFFSET },
    right:  { x: cx + NODE_OFFSET, y: cy },
    bottom: { x: cx, y: cy + NODE_OFFSET },
    left:   { x: cx - NODE_OFFSET, y: cy },
  };

  return (
    <Canvas hud={hud}>
      {/* Center label */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: cy - 16,
          textAlign: "center",
          fontFamily,
          fontSize: 22,
          color: COLORS.dim,
          letterSpacing: 1.2,
          textTransform: "lowercase",
        }}
      >
        autonomous
      </div>

      {/* Connecting lines (dim) */}
      {NODES.map((n, i) => {
        const next = NODES[(i + 1) % NODES.length];
        const a = positions[n.pos];
        const b = positions[next.pos];
        const isActive = i === activeIdx;
        return (
          <svg
            key={`line-${i}`}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: CANVAS.width,
              height: CANVAS.height,
              pointerEvents: "none",
            }}
          >
            <line
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={isActive ? "#FFFFFF" : "rgba(255,255,255,0.18)"}
              strokeWidth={isActive ? 2 : 1}
            />
          </svg>
        );
      })}

      {/* Nodes */}
      {NODES.map((n, i) => {
        const p = positions[n.pos];
        const isActive = i === activeIdx;
        const ringSize = 90;
        return (
          <React.Fragment key={n.label}>
            {/* Ring */}
            <div
              style={{
                position: "absolute",
                left: p.x - ringSize / 2,
                top: p.y - ringSize / 2,
                width: ringSize,
                height: ringSize,
                borderRadius: 4,
                border: isActive ? "2px solid #FFFFFF" : "1px solid rgba(255,255,255,0.3)",
                background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
              }}
            />
            {/* Label */}
            <div
              style={{
                position: "absolute",
                left: p.x - 80,
                top: p.y - 12,
                width: 160,
                textAlign: "center",
                fontFamily: geistPixelSquare,
                fontSize: 22,
                color: isActive ? COLORS.fg : COLORS.dim,
                letterSpacing: 0.5,
              }}
            >
              <ScrambleType
                text={n.label}
                startFrame={isActive ? activeIdx * framesPerNode : 0}
                stepFrames={1}
                run={isActive}
              />
            </div>
          </React.Fragment>
        );
      })}
    </Canvas>
  );
};

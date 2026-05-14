import React from "react";
import { useCurrentFrame } from "remotion";
import { Canvas } from "../Canvas";
import { PixelDisplay } from "../PixelDisplay";
import { ScrambleType } from "../ScrambleType";
import { HudProps } from "../Hud";
import { COLORS } from "../constants";
import { fontFamily, geistPixelSquare, AtomKind } from "../font";

export type WorkloadStackProps = {
  hud: HudProps;
};

/**
 * Scene 4 — proves the INFRASTRUCTURE claim with concrete music workloads.
 * INFRASTRUCTURE shrinks and anchors at the top (visual continuity from scene 3).
 * The four music labels are pre-laid-out as ghosts (faint outlines) from frame 0,
 * so the scene reads as full from the very first frame, then fills in via scramble.
 * Density-from-frame-0 — no waiting for the layout to become legible.
 */
const ANCHOR_ATOM: Record<string, AtomKind> = {
  I: "circle",
  N: "square",
  F: "square",
  R: "square",
  A: "circle",
  S: "square",
  T: "square",
  U: "circle",
  C: "square",
  E: "circle",
};

type Workload = { label: string; startFrame: number };

// Tightened: all 4 workloads visible (with scramble) within first 24 frames
// so the scene reads at a 24-30 frame budget.
const WORKLOADS: Workload[] = [
  { label: "RELEASES.", startFrame: 0 },
  { label: "STREAMS.", startFrame: 5 },
  { label: "ROYALTIES.", startFrame: 10 },
  { label: "CATALOG.", startFrame: 15 },
];

export const WorkloadStack: React.FC<WorkloadStackProps> = ({ hud }) => {
  const frame = useCurrentFrame();

  return (
    <Canvas hud={hud} rainSeed={211}>
      {/* Anchor: INFRASTRUCTURE small at top (continuity from scene 3) */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 180,
          textAlign: "center",
        }}
      >
        <PixelDisplay
          text="INFRASTRUCTURE"
          atom={ANCHOR_ATOM}
          fontSize={56}
          color={COLORS.fg}
          center={false}
          flicker
          flickerEvery={20}
          flickerSeed={42}
        />
      </div>
      {/* Ghost preview of all 4 workloads from frame 0, then fill in via scramble */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 380,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        {WORKLOADS.map((w, i) => {
          const visible = frame >= w.startFrame;
          // Ghost: render the same string but with low opacity until scramble starts
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 22,
                fontFamily,
                lineHeight: 1.0,
                opacity: visible ? 1 : 0.18,
                transition: "none",
              }}
            >
              <span
                style={{
                  fontSize: 28,
                  color: visible ? COLORS.dim : COLORS.ghost,
                  fontFamily,
                  letterSpacing: 0.5,
                  width: 28,
                  textAlign: "right",
                }}
              >
                →
              </span>
              <span
                style={{
                  fontSize: 64,
                  fontFamily: geistPixelSquare,
                  letterSpacing: 0,
                  color: COLORS.fg,
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                {visible ? (
                  <ScrambleType text={w.label} startFrame={w.startFrame} stepFrames={1} />
                ) : (
                  w.label
                )}
              </span>
            </div>
          );
        })}
      </div>
    </Canvas>
  );
};

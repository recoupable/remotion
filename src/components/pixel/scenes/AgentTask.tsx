import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { Canvas } from "../Canvas";
import { ScrambleType } from "../ScrambleType";
import { fontFamily } from "../font";
import { COLORS, CANVAS } from "../constants";
import { HudProps } from "../Hud";

/**
 * "Agent in action" scene — shows a single agent running a specific task with an
 * animated progress bar. Reads as: "this isn't a slide deck, this is a system doing work."
 *
 * Layout:
 *   [agent.cmo]
 *   task: generating campaign brief
 *   ████████░░░░░░░░  47%
 *
 * Use as a drill-in moment after the AGENTS hero or AgentRing — one specific agent zoomed in.
 */
export type AgentTaskProps = {
  hud: HudProps;
  /** e.g. "[agent.cmo]" — keep brackets for signature feel */
  agent: string;
  /** What the agent is doing — short description */
  task: string;
  /** Final percent value (0-100). Default 100. */
  finalPercent?: number;
  /** Frames to fill the progress bar. Default 30. */
  fillFrames?: number;
};

export const AgentTask: React.FC<AgentTaskProps> = ({
  hud,
  agent,
  task,
  finalPercent = 100,
  fillFrames = 30,
}) => {
  const frame = useCurrentFrame();

  const fillT = interpolate(frame, [4, 4 + fillFrames], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });
  const currentPct = Math.round(finalPercent * fillT);

  // Progress bar: 40 cells, filled left-to-right
  const cells = 40;
  const filled = Math.round(cells * fillT);

  // Center the entire block
  const blockY = CANVAS.height / 2 - 100;
  const blockLeft = 120;
  const blockRight = 120;
  const blockW = CANVAS.width - blockLeft - blockRight;

  return (
    <Canvas hud={hud}>
      {/* Agent identifier (top of block) */}
      <div
        style={{
          position: "absolute",
          left: blockLeft,
          top: blockY,
          width: blockW,
          fontFamily,
          fontSize: 28,
          color: COLORS.dim,
          letterSpacing: 0.5,
        }}
      >
        <ScrambleType text={agent} startFrame={0} stepFrames={1} />
      </div>
      {/* Task description */}
      <div
        style={{
          position: "absolute",
          left: blockLeft,
          top: blockY + 50,
          width: blockW,
          fontFamily,
          fontSize: 44,
          color: COLORS.fg,
          lineHeight: 1.2,
        }}
      >
        <ScrambleType text={task} startFrame={Math.max(0, agent.length)} stepFrames={1} />
      </div>
      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          left: blockLeft,
          top: blockY + 170,
          width: blockW,
          display: "flex",
          gap: 4,
          alignItems: "center",
        }}
      >
        {Array.from({ length: cells }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 22,
              background: i < filled ? COLORS.fg : "rgba(255,255,255,0.12)",
            }}
          />
        ))}
      </div>
      {/* Percent + status */}
      <div
        style={{
          position: "absolute",
          left: blockLeft,
          right: blockRight,
          top: blockY + 220,
          display: "flex",
          justifyContent: "space-between",
          fontFamily,
          fontSize: 22,
          color: COLORS.dim,
          letterSpacing: 0.5,
        }}
      >
        <span>{currentPct}%</span>
        <span>{currentPct >= finalPercent ? "[done]" : "[running]"}</span>
      </div>
    </Canvas>
  );
};

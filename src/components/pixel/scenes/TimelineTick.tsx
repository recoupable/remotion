import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { Canvas } from "../Canvas";
import { ScrambleType } from "../ScrambleType";
import { fontFamily } from "../font";
import { COLORS, CANVAS } from "../constants";
import { HudProps } from "../Hud";

/**
 * Horizontal timeline showing agent tasks scheduled across hours.
 * Reads as: "the agents have a workday — here's what they're doing today."
 *
 * Visual: a horizontal line with hour ticks (00, 04, 08, 12, 16, 20, 24).
 * Above the line, agent task blocks appear at specific hour positions.
 * A vertical "now" cursor sweeps across the line over time, highlighting tasks as it passes.
 */
type TimelineTask = {
  /** Agent name e.g. "agent.cmo" */
  agent: string;
  /** Task description */
  task: string;
  /** Start hour (0-24) */
  startHour: number;
  /** Duration in hours */
  durationHours: number;
};

const DEFAULT_TASKS: TimelineTask[] = [
  { agent: "agent.cmo", task: "campaign brief",      startHour: 1,  durationHours: 4 },
  { agent: "agent.cdo", task: "catalog sync",        startHour: 6,  durationHours: 3 },
  { agent: "agent.cmo", task: "ig post",             startHour: 9,  durationHours: 1 },
  { agent: "agent.cfo", task: "royalty recon",       startHour: 11, durationHours: 4 },
  { agent: "agent.cco", task: "brand audit",         startHour: 13, durationHours: 5 },
  { agent: "agent.cto", task: "infra check",         startHour: 16, durationHours: 2 },
  { agent: "agent.cmo", task: "newsletter",          startHour: 19, durationHours: 2 },
  { agent: "agent.coo", task: "ops check",           startHour: 21, durationHours: 1 },
];

export type TimelineTickProps = {
  hud: HudProps;
  tasks?: TimelineTask[];
};

export const TimelineTick: React.FC<TimelineTickProps> = ({
  hud,
  tasks = DEFAULT_TASKS,
}) => {
  const frame = useCurrentFrame();

  const padX = 100;
  const lineY = CANVAS.height / 2 + 60;
  const trackW = CANVAS.width - padX * 2;
  const hours = 24;
  const hourW = trackW / hours;

  // "Now" cursor sweeps from hour 0 → 24 over the scene
  const nowProgress = interpolate(frame, [4, 50], [0, 1], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateRight: "clamp",
  });
  const nowX = padX + nowProgress * trackW;
  const nowHour = nowProgress * 24;

  // Tasks appear in advance via scramble
  return (
    <Canvas hud={hud}>
      {/* Title */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: lineY - 280,
          textAlign: "center",
          fontFamily,
          fontSize: 14,
          color: COLORS.dim,
          letterSpacing: 2,
          textTransform: "lowercase",
        }}
      >
        — agent schedule · today —
      </div>

      {/* Tasks (above the line) */}
      {tasks.map((task, i) => {
        const taskStartX = padX + task.startHour * hourW;
        const taskW = task.durationHours * hourW - 4;
        const isActive = nowHour >= task.startHour && nowHour < task.startHour + task.durationHours;
        const hasPassed = nowHour >= task.startHour + task.durationHours;
        const isAhead = nowHour < task.startHour;

        // Stack tasks vertically (so they don't overlap)
        const lane = i % 4;
        const taskTop = lineY - 220 + lane * 50;

        const opacity = interpolate(frame - i * 1, [0, 4], [0, 1], { extrapolateRight: "clamp" });

        const fillColor = hasPassed ? COLORS.dim : isActive ? COLORS.fg : "rgba(255,255,255,0.18)";
        const labelColor = hasPassed ? COLORS.dim : isActive ? COLORS.fg : COLORS.dim;

        return (
          <React.Fragment key={i}>
            <div
              style={{
                position: "absolute",
                left: taskStartX,
                top: taskTop,
                width: taskW,
                height: 26,
                background: fillColor,
                opacity,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: taskStartX,
                top: taskTop + 30,
                fontFamily,
                fontSize: 11,
                color: labelColor,
                letterSpacing: 0.4,
                opacity,
              }}
            >
              [{task.agent}] {task.task}
            </div>
          </React.Fragment>
        );
      })}

      {/* Hour ticks (below the line) */}
      {Array.from({ length: hours / 4 + 1 }).map((_, i) => {
        const hr = i * 4;
        const x = padX + hr * hourW;
        return (
          <React.Fragment key={i}>
            <div
              style={{
                position: "absolute",
                left: x - 1,
                top: lineY,
                width: 2,
                height: 12,
                background: COLORS.dim,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: x - 14,
                top: lineY + 18,
                width: 28,
                textAlign: "center",
                fontFamily,
                fontSize: 11,
                color: COLORS.dim,
                letterSpacing: 1,
              }}
            >
              {hr.toString().padStart(2, "0")}h
            </div>
          </React.Fragment>
        );
      })}

      {/* The horizontal timeline line */}
      <div
        style={{
          position: "absolute",
          left: padX,
          top: lineY + 6,
          width: trackW,
          height: 1,
          background: COLORS.dim,
        }}
      />

      {/* "Now" cursor — vertical line that sweeps */}
      <div
        style={{
          position: "absolute",
          left: nowX,
          top: lineY - 240,
          width: 2,
          height: 280,
          background: COLORS.fg,
        }}
      />
      {/* "Now" label that follows the cursor */}
      <div
        style={{
          position: "absolute",
          left: nowX - 30,
          top: lineY + 50,
          width: 60,
          textAlign: "center",
          fontFamily,
          fontSize: 11,
          color: COLORS.fg,
          letterSpacing: 1,
        }}
      >
        now
      </div>
    </Canvas>
  );
};

import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { Canvas } from "../Canvas";
import { ScrambleType } from "../ScrambleType";
import { fontFamily } from "../font";
import { COLORS, CANVAS } from "../constants";
import { HudProps } from "../Hud";

/**
 * Two agents exchanging a message — visualized as `[agent.a] → [agent.b] : message`.
 * The arrow draws in mid-scene with a small particle traveling along it.
 *
 * Reads as: "agents talk to each other. The system has a plurality of working entities."
 * Use to follow up the AGENTS or AgentRing scene with a concrete interaction.
 */
export type AgentMessageProps = {
  hud: HudProps;
  from: string;
  to: string;
  message: string;
};

export const AgentMessage: React.FC<AgentMessageProps> = ({
  hud,
  from,
  to,
  message,
}) => {
  const frame = useCurrentFrame();

  const fromX = 140;
  const toX = CANVAS.width - 360;
  const lineY = CANVAS.height / 2;

  // Scramble in the from name first, then the line draws, then the to name appears
  const fromCharCount = from.length;
  const lineDrawProgress = interpolate(
    frame,
    [fromCharCount + 2, fromCharCount + 12],
    [0, 1],
    { easing: Easing.inOut(Easing.cubic), extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  const messageStartFrame = fromCharCount + 14;
  // Particle traveling along the line (a small atom that flies from → to)
  const particleProgress = interpolate(
    frame,
    [fromCharCount + 4, fromCharCount + 14],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  const particleX = fromX + 200 + (toX - fromX - 200) * particleProgress;
  const particleVisible = particleProgress > 0 && particleProgress < 1;

  return (
    <Canvas hud={hud}>
      {/* From (left) */}
      <div
        style={{
          position: "absolute",
          left: fromX,
          top: lineY - 18,
          fontFamily,
          fontSize: 36,
          color: COLORS.fg,
          letterSpacing: 0.5,
        }}
      >
        <ScrambleType text={from} startFrame={0} stepFrames={1} />
      </div>
      {/* Connecting line */}
      <div
        style={{
          position: "absolute",
          left: fromX + 200,
          top: lineY - 1,
          width: (toX - fromX - 200) * lineDrawProgress,
          height: 2,
          background: COLORS.dim,
        }}
      />
      {/* Arrowhead */}
      {lineDrawProgress > 0.95 && (
        <div
          style={{
            position: "absolute",
            left: toX - 20,
            top: lineY - 12,
            fontFamily,
            fontSize: 28,
            color: COLORS.dim,
            lineHeight: 1,
          }}
        >
          →
        </div>
      )}
      {/* Particle traveling along the line */}
      {particleVisible && (
        <div
          style={{
            position: "absolute",
            left: particleX,
            top: lineY - 6,
            width: 12,
            height: 12,
            background: COLORS.fg,
          }}
        />
      )}
      {/* To (right) */}
      <div
        style={{
          position: "absolute",
          left: toX,
          top: lineY - 18,
          fontFamily,
          fontSize: 36,
          color: COLORS.fg,
          letterSpacing: 0.5,
        }}
      >
        <ScrambleType text={to} startFrame={fromCharCount + 12} stepFrames={1} />
      </div>
      {/* Message below the line */}
      <div
        style={{
          position: "absolute",
          left: 140,
          right: 140,
          top: lineY + 50,
          fontFamily,
          fontSize: 28,
          color: COLORS.fg,
          textAlign: "center",
          letterSpacing: 0.3,
        }}
      >
        <ScrambleType text={message} startFrame={messageStartFrame} stepFrames={1} />
      </div>
    </Canvas>
  );
};

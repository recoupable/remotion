import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { Canvas } from "../Canvas";
import { COLORS, CANVAS } from "../constants";
import { fontFamily, geistPixelSquare } from "../font";
import { HudProps } from "../Hud";

/**
 * Agent role labels arranged in a rotating ring around a center label.
 * 6 roles equally spaced, slowly rotating, with the active one (closest to top)
 * highlighted. Reads as "many agents working in concert."
 *
 * Replaces the flat AgentRoleCycle for scenes where a more dynamic visual is wanted.
 */
const ROLES = ["CMO", "CFO", "CTO", "CCO", "COO", "CDO"];
const RING_RADIUS = 280;

export type AgentRingProps = {
  hud: HudProps;
  /** Center label (default "agents" lowercase) */
  centerLabel?: string;
  /** Frames per full rotation. Default 90 (3s/rotation). */
  framesPerRotation?: number;
  roles?: string[];
};

export const AgentRing: React.FC<AgentRingProps> = ({
  hud,
  centerLabel = "agents",
  framesPerRotation = 90,
  roles = ROLES,
}) => {
  const frame = useCurrentFrame();
  const cx = CANVAS.width / 2;
  const cy = CANVAS.height / 2;

  // Rotation angle (radians) — full 2π per framesPerRotation
  const baseAngle = (frame / framesPerRotation) * Math.PI * 2;

  // Intro: ring appears over first 8 frames
  const introOpacity = interpolate(frame, [0, 10], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });
  const introScale = interpolate(frame, [0, 10], [0.7, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });

  return (
    <Canvas hud={hud}>
      {/* Center label */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: cy - 20,
          textAlign: "center",
          fontFamily,
          fontSize: 32,
          color: COLORS.dim,
          letterSpacing: 2,
          textTransform: "lowercase",
          opacity: introOpacity,
        }}
      >
        {centerLabel}
      </div>
      {/* Subtle ring outline */}
      <div
        style={{
          position: "absolute",
          left: cx - RING_RADIUS,
          top: cy - RING_RADIUS,
          width: RING_RADIUS * 2,
          height: RING_RADIUS * 2,
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: "50%",
          opacity: introOpacity,
          transform: `scale(${introScale})`,
          transformOrigin: "center",
        }}
      />
      {/* Role labels around the ring */}
      {roles.map((role, i) => {
        // Each role is at base angle + slot offset
        const slotAngle = baseAngle + (i / roles.length) * Math.PI * 2 - Math.PI / 2;
        const rx = cx + Math.cos(slotAngle) * RING_RADIUS * introScale;
        const ry = cy + Math.sin(slotAngle) * RING_RADIUS * introScale;
        // Active = whichever is closest to TOP (angle nearest -π/2)
        // Simpler: active = i closest to (frame / framesPerRotation × roles.length) % roles.length
        const activeIdx = Math.floor((frame / framesPerRotation) * roles.length) % roles.length;
        const isActive = i === activeIdx;
        return (
          <React.Fragment key={role}>
            {/* Atom dot at slot */}
            <div
              style={{
                position: "absolute",
                left: rx - 8,
                top: ry - 8,
                width: 16,
                height: 16,
                background: isActive ? COLORS.fg : COLORS.dim,
                borderRadius: 2,
                opacity: introOpacity,
              }}
            />
            {/* Label, offset outward from center */}
            <div
              style={{
                position: "absolute",
                left: rx - 80 + Math.cos(slotAngle) * 40,
                top: ry - 18 + Math.sin(slotAngle) * 30,
                width: 160,
                textAlign: "center",
                fontFamily: geistPixelSquare,
                fontSize: 36,
                color: isActive ? COLORS.fg : COLORS.dim,
                letterSpacing: 0.5,
                opacity: introOpacity,
              }}
            >
              {role}
            </div>
          </React.Fragment>
        );
      })}
    </Canvas>
  );
};

import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Canvas } from "../Canvas";
import { fontFamily, geistSans } from "../font";
import { COLORS, CANVAS } from "../constants";
import { HudProps } from "../Hud";

/**
 * Brief white-bg breathing-room scene. A small phrase (lowercase) lives in massive
 * negative space. Use between dense scenes to give the eye a moment.
 *
 * "real artists." "real labels." "actual revenue." "shipped." "and counting." etc.
 *
 * Inverted — when surrounding scenes are dark, this jumps out.
 */
export type PunchCardProps = {
  hud: HudProps;
  text: string;
  /** Font size. Default 88. */
  fontSize?: number;
  /** Position: "top", "center", "bottom". Default "center". */
  position?: "top" | "center" | "bottom";
};

export const PunchCard: React.FC<PunchCardProps> = ({
  hud,
  text,
  fontSize = 88,
  position = "center",
}) => {
  const frame = useCurrentFrame();
  // Quick fade in
  const opacity = interpolate(frame, [0, 4], [0, 1], { extrapolateRight: "clamp" });

  const yPos =
    position === "top" ? CANVAS.height * 0.3 :
    position === "bottom" ? CANVAS.height * 0.7 :
    CANVAS.height * 0.5;

  return (
    <Canvas hud={hud} inverted>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: yPos - fontSize / 2,
          textAlign: "center",
          fontFamily: geistSans,
          fontSize,
          fontWeight: 600,
          color: COLORS.fgInverted,
          letterSpacing: -2,
          lineHeight: 1.0,
          opacity,
        }}
      >
        {text}
      </div>
      {/* Tiny accent dot */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: yPos + fontSize / 2 + 28,
          textAlign: "center",
          fontFamily,
          fontSize: 12,
          color: COLORS.dimInv,
          letterSpacing: 2,
          opacity,
        }}
      >
        ·
      </div>
    </Canvas>
  );
};

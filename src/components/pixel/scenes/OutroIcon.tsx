import React from "react";
import { useCurrentFrame, spring, useVideoConfig } from "remotion";
import { Canvas } from "../Canvas";
import { COLORS, CANVAS } from "../constants";
import { fontFamily } from "../font";
import { ScrambleType } from "../ScrambleType";
import { HudProps } from "../Hud";

/**
 * Scene 14 — Outro: small pixel-grid framed icon + signature text.
 * Reference: frame ~27.5s — the definitive sign-off.
 * Small triangle (or any logomark) inside a 16x16 pixel grid frame, centered on canvas.
 * Below: "developed by [BRAND]" types in.
 */
export type OutroIconProps = {
  hud: HudProps;
  signature: string;
  /** Inside-icon shape. Default "triangle". */
  iconShape?: "triangle" | "square" | "circle";
};

export const OutroIcon: React.FC<OutroIconProps> = ({
  hud,
  signature,
  iconShape = "triangle",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const settle = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  const iconSize = 130;
  const cellSize = iconSize / 16;

  return (
    <Canvas hud={hud} rainSeed={251}>
      <div
        style={{
          position: "absolute",
          left: CANVAS.width / 2 - iconSize / 2,
          top: CANVAS.height / 2 - iconSize / 2,
          width: iconSize,
          height: iconSize,
          transform: `scale(${settle})`,
          transformOrigin: "center center",
          backgroundImage:
            "repeating-linear-gradient(to right, rgba(255,255,255,0.4) 0 1px, transparent 1px " +
            cellSize + "px), " +
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.4) 0 1px, transparent 1px " +
            cellSize + "px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {iconShape === "triangle" && (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${iconSize / 4}px solid transparent`,
              borderRight: `${iconSize / 4}px solid transparent`,
              borderBottom: `${iconSize / 2}px solid ${COLORS.fg}`,
            }}
          />
        )}
        {iconShape === "square" && (
          <div style={{ width: iconSize / 2, height: iconSize / 2, background: COLORS.fg }} />
        )}
        {iconShape === "circle" && (
          <div
            style={{
              width: iconSize / 2,
              height: iconSize / 2,
              background: COLORS.fg,
              borderRadius: "50%",
            }}
          />
        )}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: CANVAS.height / 2 + iconSize / 2 + 20,
          textAlign: "center",
          fontFamily,
          fontSize: 16,
          color: COLORS.fg,
          letterSpacing: 0.5,
        }}
      >
        <ScrambleType text={signature} startFrame={20} stepFrames={2} />
      </div>
    </Canvas>
  );
};

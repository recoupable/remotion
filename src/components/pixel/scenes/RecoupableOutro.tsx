import React from "react";
import { useCurrentFrame, spring, useVideoConfig } from "remotion";
import { Canvas } from "../Canvas";
import { COLORS, CANVAS } from "../constants";
import { fontFamily } from "../font";
import { ScrambleType } from "../ScrambleType";
import { RecoupableLogo } from "../RecoupableLogo";
import { HudProps } from "../Hud";

/**
 * Scene 26 — final outro. Small Recoupable logo (replaces the triangle from the previous
 * version), centered, with "developed by recoupable · 2026" signature below.
 * Reference: frame ~27.5s. The icon settles with a spring; the signature scrambles in.
 */
export type RecoupableOutroProps = {
  hud: HudProps;
  signature?: string;
};

export const RecoupableOutro: React.FC<RecoupableOutroProps> = ({
  hud,
  signature = "developed by recoupable · 2026",
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
        <RecoupableLogo size={iconSize * 0.65} color={COLORS.fg} />
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
        <ScrambleType text={signature} startFrame={4} stepFrames={1} />
      </div>
    </Canvas>
  );
};

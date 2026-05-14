import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "./constants";
import { DotGrid } from "./DotGrid";
import { Hud, HudProps } from "./Hud";
import { AmbientRain } from "./AmbientRain";

export type CanvasProps = {
  inverted?: boolean;
  hud?: HudProps;
  showHud?: boolean;
  showGrid?: boolean;
  /** Show the always-on faint particle rain. Default true on black canvas, false on inverted. */
  /** Show the always-on faint particle rain. **Off by default** — opt in per scene where it adds value. */
  showAmbientRain?: boolean;
  /** Override the rain seed so successive scenes get visually different rain patterns */
  rainSeed?: number;
  children?: React.ReactNode;
};

export const Canvas: React.FC<CanvasProps> = ({
  inverted = false,
  hud,
  showHud = true,
  showGrid = true,
  showAmbientRain = false,
  rainSeed = 99,
  children,
}) => {
  const bg = inverted ? COLORS.bgInverted : COLORS.bg;
  const rainOn = showAmbientRain && !inverted;
  return (
    <AbsoluteFill style={{ backgroundColor: bg, overflow: "hidden" }}>
      {showGrid && <DotGrid inverted={inverted} />}
      {rainOn && <AmbientRain seed={rainSeed} />}
      {children}
      {showHud && hud && <Hud {...hud} inverted={inverted} />}
    </AbsoluteFill>
  );
};

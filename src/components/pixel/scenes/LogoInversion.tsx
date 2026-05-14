import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { Canvas } from "../Canvas";
import { RecoupableLogo } from "../RecoupableLogo";
import { CANVAS } from "../constants";
import { HudProps } from "../Hud";

/**
 * Scene 4 — Hard inversion. White bg flips to black. The Recoupable logo is now
 * a small white mark at center. HUD scrambles in. We are now "inside the design tool."
 * Replaces the previous HardInversion scene which used a triangle atom.
 */
export type LogoInversionProps = {
  hud: HudProps;
};

export const LogoInversion: React.FC<LogoInversionProps> = ({ hud }) => {
  const frame = useCurrentFrame();
  // Logo continues shrinking from where Scene 3 left off
  const size = interpolate(frame, [0, 24], [200, 110], {
    easing: Easing.out(Easing.quad),
    extrapolateRight: "clamp",
  });
  const x = (CANVAS.width - size) / 2;
  const y = (CANVAS.height - size) / 2;

  return (
    <Canvas hud={{ ...hud, typeInFrames: 24 }} rainSeed={3}>
      <div style={{ position: "absolute", left: x, top: y }}>
        <RecoupableLogo size={size} color="#FFFFFF" />
      </div>
    </Canvas>
  );
};

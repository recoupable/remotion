import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { Canvas } from "../Canvas";
import { Atom } from "../Atom";
import { CANVAS } from "../constants";
import { HudProps } from "../Hud";

/**
 * Scene 02 — Hard inversion + HUD type-in.
 * Frame 0: hard cut to black canvas (the inversion). The triangle from Scene 01 is now
 * rendered as a small white pixel-atom triangle, slowly shrinking.
 * Frames 0-30: HUD scramble-types in (handled by Canvas's built-in HUD with typeInFrames).
 * The viewer reads: "we are now inside the design tool."
 */
export type HardInversionProps = {
  hud: HudProps;
};

export const HardInversion: React.FC<HardInversionProps> = ({ hud }) => {
  const frame = useCurrentFrame();
  // The atom-triangle continues shrinking from where Scene 01 left off
  const size = interpolate(frame, [0, 24], [180, 96], {
    easing: Easing.out(Easing.quad),
    extrapolateRight: "clamp",
  });
  const x = (CANVAS.width - size) / 2;
  const y = (CANVAS.height - size) / 2;

  return (
    <Canvas hud={{ ...hud, typeInFrames: 24 }} rainSeed={3}>
      <Atom kind="triangle" x={x} y={y} size={size} color="#FFFFFF" />
    </Canvas>
  );
};

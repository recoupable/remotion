import React from "react";
import { Canvas } from "../Canvas";
import { ScrambleType } from "../ScrambleType";
import { HudProps } from "../Hud";
import { COLORS } from "../constants";
import { geistSans } from "../font";

export type BuiltByCardProps = {
  hud: HudProps;
};

/**
 * Scene 5 — hard inversion to white background. Smooth Geist Sans large type.
 * White-bg "card" moment — clean, signed, attributed. Lowercase = designer-signature.
 * stepFrames=2 so it types in fast (~0.4s for 19 chars).
 */
export const BuiltByCard: React.FC<BuiltByCardProps> = ({ hud }) => (
  <Canvas inverted hud={hud}>
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: geistSans,
        fontSize: 130,
        fontWeight: 600,
        color: COLORS.fgInverted,
        letterSpacing: -3,
        lineHeight: 1.0,
      }}
    >
      <ScrambleType text="built by recoupable." startFrame={0} stepFrames={2} />
    </div>
  </Canvas>
);

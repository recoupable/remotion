import React from "react";
import { Canvas } from "../Canvas";
import { ScrambleType } from "../ScrambleType";
import { HudProps } from "../Hud";
import { COLORS } from "../constants";
import { geistSans } from "../font";

/**
 * White-bg inversion card. Smooth Geist Sans large type.
 * Reference: frame ~27s — the white-bg specimen moment.
 * Use as a hard-cut "card" to land a thesis or attribution. Lowercase = signature feel.
 */
export type InversionCardProps = {
  hud: HudProps;
  text: string;
  /** Font size. Default 130. */
  fontSize?: number;
  /** Font weight. Default 600. */
  fontWeight?: number;
  /** Letter spacing. Default -3. */
  letterSpacing?: number;
};

export const InversionCard: React.FC<InversionCardProps> = ({
  hud,
  text,
  fontSize = 130,
  fontWeight = 600,
  letterSpacing = -3,
}) => (
  <Canvas inverted hud={hud}>
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: geistSans,
        fontSize,
        fontWeight,
        color: COLORS.fgInverted,
        letterSpacing,
        lineHeight: 1.0,
      }}
    >
      <ScrambleType text={text} startFrame={0} stepFrames={1} />
    </div>
  </Canvas>
);

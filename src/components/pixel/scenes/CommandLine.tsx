import React from "react";
import { Canvas } from "../Canvas";
import { COLORS, CANVAS } from "../constants";
import { fontFamily } from "../font";
import { ScrambleType } from "../ScrambleType";
import { HudProps } from "../Hud";

/**
 * Scene type — single big command line, isolated.
 * Reference: frame ~25s — "$ npm i geist" centered on canvas.
 * High-impact moment of clarity. One line, big, with massive negative space.
 * Use for install commands, callouts, or any "do this" CTA.
 */
export type CommandLineProps = {
  hud: HudProps;
  /** The command to display, e.g., "$ npm install recoupable" */
  command: string;
  /** Font size. Default 64. */
  fontSize?: number;
};

export const CommandLine: React.FC<CommandLineProps> = ({
  hud,
  command,
  fontSize = 64,
}) => (
  <Canvas hud={hud} rainSeed={199}>
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
        fontSize,
        color: COLORS.fg,
        letterSpacing: 0.5,
      }}
    >
      <ScrambleType text={command} startFrame={0} stepFrames={1} />
    </div>
  </Canvas>
);

import React from "react";
import { Canvas } from "../Canvas";
import { HudProps } from "../Hud";

export type PreludeProps = {
  hud: HudProps;
};

/**
 * Scene 1 — black canvas, HUD types in, nothing else happening.
 * Establishes the canvas and puts the chrome in place before any content lands.
 */
export const Prelude: React.FC<PreludeProps> = ({ hud }) => (
  <Canvas hud={{ ...hud, typeInFrames: 30 }} />
);

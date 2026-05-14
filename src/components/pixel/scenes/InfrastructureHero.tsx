import React from "react";
import { Canvas } from "../Canvas";
import { ParticleResolve } from "../ParticleResolve";
import { HudProps } from "../Hud";
import type { AtomKind } from "../font";

export type InfrastructureHeroProps = {
  hud: HudProps;
};

/**
 * Scene 3 — answers "what did you build?" with INFRASTRUCTURE.
 * 14 chars → cellSize=13 to fit 1080px canvas with margins.
 * Wide-thin treatment intentionally contrasts MUSIC (chunky-tall in scene 2).
 * Same vowel/consonant atom rule. Inherits the fast resolve + flicker defaults.
 */
const ATOM_MAP: Record<string, AtomKind> = {
  I: "circle",
  N: "square",
  F: "square",
  R: "square",
  A: "circle",
  S: "square",
  T: "square",
  U: "circle",
  C: "square",
  E: "circle",
};

export const InfrastructureHero: React.FC<InfrastructureHeroProps> = ({ hud }) => (
  <Canvas hud={hud} rainSeed={143}>
    <ParticleResolve
      word="INFRASTRUCTURE"
      cellSize={13}
      atomMap={ATOM_MAP}
      seed={42}
      flickerEvery={18}
    />
  </Canvas>
);

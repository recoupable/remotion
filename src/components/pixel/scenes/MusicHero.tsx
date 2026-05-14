import React from "react";
import { Canvas } from "../Canvas";
import { ParticleResolve } from "../ParticleResolve";
import { HudProps } from "../Hud";
import type { AtomKind } from "../font";

export type MusicHeroProps = {
  hud: HudProps;
};

/**
 * Scene 2 — answers "what's this about?" with one word: MUSIC.
 * Vowels = circle, consonants = square. Chunky cellSize=32 so the word commands the canvas.
 * Defaults: resolveStartFrame=10, resolveWindow=14, flicker=true.
 * Resolve completes at ~frame 28; remaining time is held with letter-flicker + ambient rain.
 */
const ATOM_MAP: Record<string, AtomKind> = {
  M: "square",
  U: "circle",
  S: "square",
  I: "circle",
  C: "square",
};

export const MusicHero: React.FC<MusicHeroProps> = ({ hud }) => (
  <Canvas hud={hud} rainSeed={71}>
    <ParticleResolve word="MUSIC" cellSize={32} atomMap={ATOM_MAP} seed={7} />
  </Canvas>
);

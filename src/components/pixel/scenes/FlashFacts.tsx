import React from "react";
import { useCurrentFrame } from "remotion";
import { Canvas } from "../Canvas";
import { fontFamily, geistSans } from "../font";
import { COLORS, CANVAS } from "../constants";
import { HudProps } from "../Hud";

/**
 * Rapid bombardment — cycles through 4-8 facts at 4-6 frames each (super fast).
 * Each fact alternates dark/light bg + alternates position (top/bottom/center).
 * Total scene length: facts.length × framesPerFact (typically 24-36 frames = 0.8-1.2s).
 *
 * Reads as "the firehose" — way too much info coming at you, like a teaser ad.
 * Reference reel doesn't have this — pure pizzaz.
 */
export type FactItem = {
  text: string;
  /** Optional small tag below the text */
  tag?: string;
  /** Inverted (white bg)? */
  inverted?: boolean;
};

export type FlashFactsProps = {
  hud: HudProps;
  facts: FactItem[];
  /** Frames per fact. Default 5 (very fast). */
  framesPerFact?: number;
  /** Font size. Default 110. */
  fontSize?: number;
};

export const FlashFacts: React.FC<FlashFactsProps> = ({
  hud,
  facts,
  framesPerFact = 5,
  fontSize = 110,
}) => {
  const frame = useCurrentFrame();
  const idx = Math.min(facts.length - 1, Math.floor(frame / framesPerFact));
  const fact = facts[idx];
  const inverted = fact.inverted ?? false;
  const fg = inverted ? COLORS.fgInverted : COLORS.fg;
  const dim = inverted ? COLORS.dimInv : COLORS.dim;

  // Position alternates by index
  const posY =
    idx % 3 === 0 ? CANVAS.height * 0.5 :
    idx % 3 === 1 ? CANVAS.height * 0.4 :
    CANVAS.height * 0.6;

  return (
    <Canvas hud={hud} inverted={inverted}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: posY - fontSize / 2,
          textAlign: "center",
          fontFamily: geistSans,
          fontSize,
          fontWeight: 700,
          color: fg,
          letterSpacing: -2,
          lineHeight: 1.0,
          padding: "0 60px",
        }}
      >
        {fact.text}
      </div>
      {fact.tag && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: posY + fontSize / 2 + 18,
            textAlign: "center",
            fontFamily,
            fontSize: 14,
            color: dim,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {fact.tag}
        </div>
      )}
      {/* Tiny scene-progress indicator (top-left, dim) */}
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 60,
          fontFamily,
          fontSize: 12,
          color: dim,
          letterSpacing: 1.2,
        }}
      >
        [{idx + 1}/{facts.length}] flash
      </div>
    </Canvas>
  );
};

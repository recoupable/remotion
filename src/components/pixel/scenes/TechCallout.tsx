import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { Canvas } from "../Canvas";
import { ScrambleType } from "../ScrambleType";
import { COLORS, CANVAS } from "../constants";
import { ATOM_FONT_FAMILY, AtomKind, fontFamily } from "../font";
import { HudProps } from "../Hud";

/**
 * Single letter rendered massive with a thin callout line + technical metadata label.
 * Mirrors the Vercel reel's "RR with SS04 callout" pattern but adapted for our story:
 * one letter from INFRASTRUCTURE with technical specs that feel like a system readout.
 *
 * Use as the "design system" moment in the INFRASTRUCTURE act — replaces the redundant
 * MUSIC triple specimen with something more on-theme.
 */
export type TechCalloutProps = {
  hud: HudProps;
  letter: string;
  atom?: AtomKind;
  /** Multi-line metadata (one item per line). e.g. ["// type: layer", "// agents: 6"] */
  metadata: string[];
  /** Letter font size. Default 560. */
  fontSize?: number;
  /** Position of the letter: "left" or "center". Default "left" so callout has room. */
  letterPosition?: "left" | "center";
};

export const TechCallout: React.FC<TechCalloutProps> = ({
  hud,
  letter,
  atom = "circle",
  metadata,
  fontSize = 560,
  letterPosition = "left",
}) => {
  const frame = useCurrentFrame();

  // Letter slot
  const letterX = letterPosition === "left" ? 120 : (CANVAS.width - fontSize) / 2;
  const letterY = (CANVAS.height - fontSize) / 2;

  // Callout line that draws from letter toward the right side
  const lineProgress = interpolate(frame, [4, 14], [0, 1], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateRight: "clamp",
  });
  const lineStartX = letterX + fontSize * 0.7;
  const lineStartY = CANVAS.height / 2 - 30;
  const lineEndX = CANVAS.width - 200;
  const lineLen = (lineEndX - lineStartX) * lineProgress;

  // Metadata block appears after line draws
  const metaOpacity = interpolate(frame, [14, 22], [0, 1], { extrapolateRight: "clamp" });
  const metaY = lineStartY - 20;

  return (
    <Canvas hud={hud}>
      {/* Big letter */}
      <div
        style={{
          position: "absolute",
          left: letterX,
          top: letterY,
          width: fontSize,
          height: fontSize,
          fontFamily: ATOM_FONT_FAMILY[atom],
          fontSize,
          color: COLORS.fg,
          lineHeight: 1.0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {letter}
      </div>
      {/* Callout line */}
      <div
        style={{
          position: "absolute",
          left: lineStartX,
          top: lineStartY,
          width: lineLen,
          height: 1,
          background: COLORS.dim,
        }}
      />
      {/* Endpoint marker */}
      {lineProgress > 0.95 && (
        <div
          style={{
            position: "absolute",
            left: lineStartX + lineLen - 3,
            top: lineStartY - 3,
            width: 6,
            height: 6,
            background: COLORS.dim,
          }}
        />
      )}
      {/* Metadata block right of the line */}
      <div
        style={{
          position: "absolute",
          left: lineEndX + 16,
          top: metaY,
          width: 200,
          fontFamily,
          fontSize: 16,
          color: COLORS.fg,
          letterSpacing: 0.5,
          lineHeight: 1.6,
          opacity: metaOpacity,
        }}
      >
        {metadata.map((line, i) => (
          <div key={i} style={{ color: i === 0 ? COLORS.fg : COLORS.dim }}>
            <ScrambleType
              text={line}
              startFrame={22 + i * 6}
              stepFrames={1}
            />
          </div>
        ))}
      </div>
      {/* Tiny anchor label below the letter */}
      <div
        style={{
          position: "absolute",
          left: letterX,
          top: letterY + fontSize - 24,
          width: fontSize,
          textAlign: "center",
          fontFamily,
          fontSize: 12,
          color: COLORS.dim,
          letterSpacing: 1.5,
          textTransform: "uppercase",
        }}
      >
        — letter [{letter.toLowerCase()}] —
      </div>
    </Canvas>
  );
};

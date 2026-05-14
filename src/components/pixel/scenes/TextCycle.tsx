import React from "react";
import { useCurrentFrame } from "remotion";
import { Canvas } from "../Canvas";
import { fontFamily, geistSans } from "../font";
import { COLORS, CANVAS } from "../constants";
import { HudProps } from "../Hud";

/**
 * Scene type — cycles through a list of strings rapidly, one at a time.
 * Use for: artist roster (Gatsby Grace, Black Veil Brides, ...), label partners
 * (Atlantic, 300, Rostrum, Seeker), agent roles, anything that benefits from
 * "many things, named" energy.
 *
 * Each entry replaces the previous. Optional persistent label below ("ARTISTS",
 * "PARTNERS", etc.) gives context.
 */
export type TextCycleProps = {
  hud: HudProps;
  /** Strings to cycle through */
  items: string[];
  /** Frames per item. Default 8 (~0.27s each). */
  framesPerItem?: number;
  /** Use Geist Sans (smooth) or Geist Pixel (chunky). Default sans for legibility. */
  smooth?: boolean;
  /** Font size. Default 96. */
  fontSize?: number;
  /** Optional persistent label below the cycling text */
  contextLabel?: string;
};

export const TextCycle: React.FC<TextCycleProps> = ({
  hud,
  items,
  framesPerItem = 8,
  smooth = true,
  fontSize = 96,
  contextLabel,
}) => {
  const frame = useCurrentFrame();
  const idx = Math.min(items.length - 1, Math.floor(frame / framesPerItem));
  const current = items[idx];

  return (
    <Canvas hud={hud}>
      {/* Current item */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: smooth ? geistSans : fontFamily,
          fontSize,
          fontWeight: smooth ? 600 : 400,
          color: COLORS.fg,
          letterSpacing: smooth ? -2 : 0,
          lineHeight: 1.0,
          textAlign: "center",
          padding: "0 80px",
        }}
      >
        {current}
      </div>
      {/* Persistent context label */}
      {contextLabel && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: CANVAS.height / 2 + fontSize / 2 + 30,
            textAlign: "center",
            fontFamily,
            fontSize: 14,
            color: COLORS.dim,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          [{idx + 1}/{items.length}] {contextLabel}
        </div>
      )}
    </Canvas>
  );
};

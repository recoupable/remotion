import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Canvas } from "../Canvas";
import { fontFamily, geistSans } from "../font";
import { COLORS, CANVAS } from "../constants";
import { HudProps } from "../Hud";

/**
 * "A × B = C" deal visualization.
 * Three text blocks horizontally separated by × and = symbols.
 * Use to show co-creation deals: "ROSTRUM × GATSBY = JV".
 *
 * Each block fades in sequentially: A → × → B → = → C.
 */
export type DealCardProps = {
  hud: HudProps;
  left: string;
  right: string;
  result: string;
  /** Operator between left and right. Default "×". */
  operator?: string;
  /** Operator between right and result. Default "=". */
  resultOperator?: string;
  /** Tiny label below */
  label?: string;
  /** Font size for the three blocks. Default 90. */
  fontSize?: number;
};

export const DealCard: React.FC<DealCardProps> = ({
  hud,
  left,
  right,
  result,
  operator = "×",
  resultOperator = "=",
  label = "co-creation",
  fontSize = 90,
}) => {
  const frame = useCurrentFrame();
  const fadeIn = (delay: number) =>
    interpolate(frame - delay, [0, 4], [0, 1], { extrapolateRight: "clamp" });

  return (
    <Canvas hud={hud}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: CANVAS.height / 2 - fontSize / 2,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
          gap: 30,
          fontFamily: geistSans,
          fontSize,
          fontWeight: 700,
          color: COLORS.fg,
          letterSpacing: -2,
          lineHeight: 1.0,
        }}
      >
        <span style={{ opacity: fadeIn(0) }}>{left}</span>
        <span style={{ opacity: fadeIn(2), color: COLORS.dim, fontSize: fontSize * 0.7 }}>
          {operator}
        </span>
        <span style={{ opacity: fadeIn(4) }}>{right}</span>
        <span style={{ opacity: fadeIn(8), color: COLORS.dim, fontSize: fontSize * 0.7 }}>
          {resultOperator}
        </span>
        <span style={{ opacity: fadeIn(10) }}>{result}</span>
      </div>
      {/* Tiny label */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: CANVAS.height / 2 + fontSize / 2 + 28,
          textAlign: "center",
          fontFamily,
          fontSize: 14,
          color: COLORS.dim,
          letterSpacing: 2,
          textTransform: "uppercase",
          opacity: fadeIn(12),
        }}
      >
        {label}
      </div>
    </Canvas>
  );
};

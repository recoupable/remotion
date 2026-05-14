import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, CANVAS } from "./constants";

export const DotGrid: React.FC<{ inverted?: boolean }> = ({ inverted }) => {
  const color = inverted ? COLORS.gridInv : COLORS.grid;
  const dots: React.ReactNode[] = [];
  for (let x = 0; x < CANVAS.gridDots; x++) {
    for (let y = 0; y < CANVAS.gridDots; y++) {
      const left = CANVAS.gridSpacing + x * CANVAS.gridSpacing;
      const top = CANVAS.gridSpacing + y * CANVAS.gridSpacing;
      dots.push(
        <div
          key={`${x}-${y}`}
          style={{
            position: "absolute",
            left,
            top,
            width: 2,
            height: 2,
            background: color,
          }}
        />
      );
    }
  }
  return <AbsoluteFill style={{ pointerEvents: "none" }}>{dots}</AbsoluteFill>;
};

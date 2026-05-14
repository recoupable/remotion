import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { Canvas } from "../Canvas";
import { RecoupableLogo } from "../RecoupableLogo";
import { COLORS, CANVAS } from "../constants";
import { fontFamily } from "../font";
import { HudProps } from "../Hud";

/**
 * Multiple Recoupable logos tiled in a grid, building up over time.
 * Reads as "the brand mark, repeated, scaling" — implies multiplicity, scale,
 * "one for every label" energy.
 *
 * Logos appear in a staggered diagonal sweep (top-left → bottom-right).
 */
export type LogoGridProps = {
  hud: HudProps;
  /** Grid dimensions. Default 4x4. */
  cols?: number;
  rows?: number;
  /** Cell padding (margin between logos) */
  pad?: number;
  /** Frames per logo to appear (stagger) */
  framesPerCell?: number;
  /** Optional small label */
  label?: string;
};

export const LogoGrid: React.FC<LogoGridProps> = ({
  hud,
  cols = 4,
  rows = 4,
  pad = 30,
  framesPerCell = 1,
  label = "[ one for every label ]",
}) => {
  const frame = useCurrentFrame();
  const containerLeft = 120;
  const containerTop = 200;
  const containerRight = 120;
  const containerBottom = 200;
  const cellW = (CANVAS.width - containerLeft - containerRight) / cols;
  const cellH = (CANVAS.height - containerTop - containerBottom) / rows;
  const logoSize = Math.min(cellW, cellH) - pad;

  const total = cols * rows;

  return (
    <Canvas hud={hud}>
      {Array.from({ length: total }).map((_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        // Diagonal sweep order (top-left → bottom-right)
        const orderIdx = c + r;
        const appearAt = orderIdx * framesPerCell;
        const opacity = interpolate(frame - appearAt, [0, 4], [0, 1], {
          extrapolateRight: "clamp",
        });
        const scale = interpolate(frame - appearAt, [0, 8], [0.6, 1], {
          easing: Easing.out(Easing.cubic),
          extrapolateRight: "clamp",
        });
        if (opacity <= 0) return null;

        const x = containerLeft + c * cellW + (cellW - logoSize) / 2;
        const y = containerTop + r * cellH + (cellH - logoSize) / 2;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              opacity,
              transform: `scale(${scale})`,
              transformOrigin: "center",
            }}
          >
            <RecoupableLogo size={logoSize} color={COLORS.fg} />
          </div>
        );
      })}
      {label && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 100,
            textAlign: "center",
            fontFamily,
            fontSize: 14,
            color: COLORS.dim,
            letterSpacing: 1.5,
            textTransform: "lowercase",
          }}
        >
          {label}
        </div>
      )}
    </Canvas>
  );
};

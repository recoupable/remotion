import React from "react";
import { useCurrentFrame } from "remotion";
import { Canvas } from "../Canvas";
import { fontFamily } from "../font";
import { COLORS, CANVAS } from "../constants";
import { HudProps } from "../Hud";

/**
 * Horizontal scrolling activity ticker — a live data feed bar.
 * Reads as: "the system is humming, things are happening continuously."
 *
 * No specific dollar amounts (privacy-friendly). Items are activity tags + counts.
 * Three rows scrolling at slightly different speeds for parallax.
 */
const DEFAULT_ITEMS = [
  "[release] track=neon  scheduled=q1",
  "[stream] platform=spotify  trend=up",
  "[catalog] items=1247  pending=3",
  "[campaign] id=launch_24  status=running",
  "[agent.cmo] task=brief  status=ok",
  "[release] track=ascend  scheduled=q2",
  "[stream] platform=apple  delta=+",
  "[catalog] sync=daily  health=100",
  "[agent.cfo] task=royalty_recon  status=ok",
  "[loop] cycle=124  uptime=99.8",
  "[campaign] id=grammy_prep  agent=cmo",
  "[release] format=lp  status=mastered",
];

export type ScrollingMetricsProps = {
  hud: HudProps;
  items?: string[];
  /** Pixels per frame for the scroll. Default 4. */
  scrollSpeed?: number;
  /** Number of rows. Default 3. */
  rows?: number;
};

export const ScrollingMetrics: React.FC<ScrollingMetricsProps> = ({
  hud,
  items = DEFAULT_ITEMS,
  scrollSpeed = 4,
  rows = 3,
}) => {
  const frame = useCurrentFrame();

  // Build a long string per row (with separators); we duplicate it so it scrolls forever
  const sep = "  ·  ";
  const oneRow = items.join(sep) + sep;

  return (
    <Canvas hud={hud}>
      {/* Center label — what these rows ARE */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: CANVAS.height / 2 - 16,
          textAlign: "center",
          fontFamily,
          fontSize: 14,
          color: COLORS.dim,
          letterSpacing: 2.5,
          textTransform: "lowercase",
          zIndex: 2,
          background: "rgba(0,0,0,0.6)",
          padding: "8px 0",
        }}
      >
        — live activity —
      </div>
      {/* Scrolling rows */}
      {Array.from({ length: rows }).map((_, r) => {
        // Each row scrolls at slightly different speed and starts at different offset
        const rowSpeed = scrollSpeed * (1 + r * 0.15);
        const rowOffset = r * 240;
        const x = -((frame * rowSpeed + rowOffset) % 2000);
        const yPositions = [320, 520, 720];
        return (
          <div
            key={r}
            style={{
              position: "absolute",
              left: x,
              top: yPositions[r] || (320 + r * 200),
              whiteSpace: "nowrap",
              fontFamily,
              fontSize: 28,
              color: r === 1 ? COLORS.fg : COLORS.dim,
              letterSpacing: 0.5,
            }}
          >
            {/* Render the row twice so the scroll wraps seamlessly */}
            {oneRow}{oneRow}
          </div>
        );
      })}
    </Canvas>
  );
};

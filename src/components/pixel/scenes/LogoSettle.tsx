import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "../constants";
import { RecoupableLogo } from "../RecoupableLogo";

/**
 * Scene 3 — After the split: the Recoupable logo fully formed, settled, on white.
 * The two-squares state from Scene 2 has resolved INTO the logo proper.
 * This is the "branded card" — the logo at full size, holding briefly.
 */
export type LogoSettleProps = {
  size?: number;
};

export const LogoSettle: React.FC<LogoSettleProps> = ({ size = 380 }) => {
  const frame = useCurrentFrame();
  // Subtle scale settle — comes in slightly large, settles to size
  const scale = interpolate(frame, [0, 8], [1.08, 1.0], {
    easing: Easing.out(Easing.quad),
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: COLORS.bgInverted,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ transform: `scale(${scale})` }}>
        <RecoupableLogo size={size} color={COLORS.fgInverted} />
      </div>
    </div>
  );
};

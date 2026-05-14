import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../constants";
import { RecoupableLogo } from "../RecoupableLogo";

/**
 * Final brand stamp — the LAST scene of the video.
 * Pure white background, single Recoupable logo at full size, NO HUD, NO chrome.
 * Holds for the full duration. The "fade to black" of the film.
 *
 * After all the system noise (HUD, scenes, content), the video resolves to a
 * single brand mark — quiet, definitive. The closing breath.
 */
export type BrandStampProps = {
  /** Logo render size. Default 320. */
  size?: number;
};

export const BrandStamp: React.FC<BrandStampProps> = ({ size = 320 }) => {
  const frame = useCurrentFrame();
  // Subtle entrance — logo fades in over 6 frames, then holds
  const opacity = interpolate(frame, [0, 6], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, 8], [0.96, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgInverted,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ opacity, transform: `scale(${scale})` }}>
        <RecoupableLogo size={size} color={COLORS.fgInverted} />
      </div>
    </AbsoluteFill>
  );
};

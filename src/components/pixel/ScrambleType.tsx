import React from "react";
import { useCurrentFrame } from "remotion";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*-=";

export type ScrambleTypeProps = {
  text: string;
  startFrame?: number;
  /** Frames per character before settling. Default 1 (very fast). */
  stepFrames?: number;
  run?: boolean;
  /**
   * If set, text MUST be fully visible by this many frames into the scene.
   * If text wouldn't otherwise complete in time, stepFrames + startFrame
   * are clamped down so text always finishes by `mustCompleteByFrame`.
   * Use this on every scene to guarantee text reads.
   */
  mustCompleteByFrame?: number;
  /** Skip animation entirely — just show full text. */
  instant?: boolean;
};

export const ScrambleType: React.FC<ScrambleTypeProps> = ({
  text,
  startFrame = 0,
  stepFrames = 1,
  run = true,
  mustCompleteByFrame,
  instant = false,
}) => {
  const frame = useCurrentFrame();
  if (!run || instant) return <>{text}</>;

  // Auto-clamp: if mustCompleteByFrame is set and the natural completion
  // (startFrame + text.length * stepFrames) would exceed it, scale down stepFrames.
  let effectiveStartFrame = startFrame;
  let effectiveStepFrames = stepFrames;
  if (mustCompleteByFrame !== undefined && text.length > 0) {
    const naturalEnd = startFrame + text.length * stepFrames;
    if (naturalEnd > mustCompleteByFrame) {
      // Try keeping startFrame, scale stepFrames down (allow fractional)
      const availableFrames = Math.max(1, mustCompleteByFrame - startFrame);
      effectiveStepFrames = Math.max(0.25, availableFrames / text.length);
      // If still doesn't fit, drop startFrame to 0
      if (startFrame + text.length * effectiveStepFrames > mustCompleteByFrame) {
        effectiveStartFrame = 0;
        effectiveStepFrames = mustCompleteByFrame / text.length;
      }
    }
  }

  const elapsed = frame - effectiveStartFrame;
  if (elapsed < 0) return <>{"\u00A0".repeat(text.length)}</>;
  if (elapsed >= text.length * effectiveStepFrames) return <>{text}</>;

  const settledLength = Math.floor(elapsed / effectiveStepFrames);
  const settled = text.slice(0, settledLength);
  const activeIndex = (frame * 7 + settledLength * 13) % SCRAMBLE_CHARS.length;
  const activeChar = settledLength < text.length ? SCRAMBLE_CHARS[activeIndex] : "";

  return <>{settled + activeChar}</>;
};

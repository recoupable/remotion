import React from "react";
import { useCurrentFrame } from "remotion";
import { Canvas } from "../Canvas";
import { COLORS, CANVAS } from "../constants";
import { fontFamily } from "../font";
import { ScrambleType } from "../ScrambleType";
import { HudProps } from "../Hud";

/**
 * Scene 13 — Terminal log scroll.
 * Lines accumulate from top, each with a `[tag]` prefix (dim) and key=value pairs (white).
 * Reference: frame ~22.5s — gives the video a "this is real, this is running" technical feel.
 * For a music-business video, use music-domain tags: [release], [stream], [royalty], [catalog].
 */
export type LogLine = {
  tag: string;
  message: string;
};

export type TerminalLogProps = {
  hud: HudProps;
  lines: LogLine[];
  /** Frames between line appearances. Default 8. */
  framesPerLine?: number;
};

export const TerminalLog: React.FC<TerminalLogProps> = ({
  hud,
  lines,
  framesPerLine = 8,
}) => {
  const frame = useCurrentFrame();
  const visibleCount = Math.min(lines.length, Math.floor(frame / framesPerLine) + 1);

  return (
    <Canvas hud={hud} rainSeed={167}>
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 200,
          fontFamily,
          fontSize: 28,
          lineHeight: 1.5,
          color: COLORS.fg,
        }}
      >
        {lines.slice(0, visibleCount).map((line, i) => {
          const lineStartFrame = i * framesPerLine;
          // Calculate width for tag column so values align
          return (
            <div key={i} style={{ display: "flex", whiteSpace: "pre" }}>
              <span
                style={{
                  color: COLORS.dim,
                  display: "inline-block",
                  width: 180,
                  flexShrink: 0,
                }}
              >
                <ScrambleType
                  text={line.tag}
                  startFrame={lineStartFrame}
                  stepFrames={1}
                />
              </span>
              <span style={{ color: COLORS.fg }}>
                <ScrambleType
                  text={line.message}
                  startFrame={lineStartFrame + line.tag.length}
                  stepFrames={1}
                />
              </span>
            </div>
          );
        })}
      </div>
    </Canvas>
  );
};

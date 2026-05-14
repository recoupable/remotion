import React from "react";
import { COLORS, TYPE, CANVAS } from "./constants";
import { fontFamily } from "./font";
import { ScrambleType } from "./ScrambleType";
import { PulseScrambleType } from "./PulseScrambleType";

export type HudProps = {
  topLine: string;
  bottomLine: string;
  license: string;
  showDimensions?: boolean;
  typeInFrames?: number;
  inverted?: boolean;
  hidden?: boolean;
  sceneTag?: string;
};

export const Hud: React.FC<HudProps> = ({
  topLine,
  bottomLine,
  license,
  showDimensions = true,
  typeInFrames = 0,
  inverted = false,
  hidden = false,
  sceneTag,
}) => {
  if (hidden) return null;

  const fg = inverted ? COLORS.fgInverted : COLORS.fg;
  const dim = inverted ? COLORS.dimInv : COLORS.dim;

  const baseStyle: React.CSSProperties = {
    position: "absolute",
    fontFamily,
    fontSize: TYPE.hud.fontSize,
    fontWeight: TYPE.hud.fontWeight,
    lineHeight: TYPE.hud.lineHeight,
    letterSpacing: TYPE.hud.letterSpacing,
    color: fg,
    pointerEvents: "none",
  };

  const animate = typeInFrames > 0;

  return (
    <>
      {showDimensions && (
        <div
          style={{
            ...baseStyle,
            top: CANVAS.hudPadding,
            right: CANVAS.hudPadding,
            color: dim,
            textAlign: "right",
          }}
        >
          <PulseScrambleType
            text={`[w : ${CANVAS.width}px]`}
            startFrame={0}
            stepFrames={2}
            pulseChars={4}
            pulseEvery={48}
            pulseDuration={3}
            run={animate}
          />
          <br />
          <PulseScrambleType
            text={`[h : ${CANVAS.height}px]`}
            startFrame={3}
            stepFrames={2}
            pulseChars={4}
            pulseEvery={56}
            pulseDuration={3}
            run={animate}
          />
          {sceneTag && (
            <>
              <br />
              <ScrambleType text={sceneTag} startFrame={6} stepFrames={2} run={animate} />
            </>
          )}
        </div>
      )}
      <div
        style={{
          ...baseStyle,
          bottom: CANVAS.hudPadding,
          left: CANVAS.hudPadding,
          textAlign: "left",
        }}
      >
        <ScrambleType text={topLine} startFrame={0} stepFrames={2} run={animate} />
        <br />
        <ScrambleType text={bottomLine} startFrame={topLine.length * 2 + 2} stepFrames={2} run={animate} />
      </div>
      <div
        style={{
          ...baseStyle,
          bottom: CANVAS.hudPadding,
          right: CANVAS.hudPadding,
          color: dim,
          textAlign: "right",
        }}
      >
        <ScrambleType text={license} startFrame={(topLine.length + bottomLine.length) * 2} stepFrames={2} run={animate} />
      </div>
    </>
  );
};

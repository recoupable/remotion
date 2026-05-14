import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { Canvas } from "../Canvas";
import { ScrambleType } from "../ScrambleType";
import { fontFamily } from "../font";
import { COLORS, CANVAS } from "../constants";
import { HudProps } from "../Hud";

/**
 * Visual stack diagram — stacked horizontal layers, each labeled.
 * Reads as: "this is the architecture: agents on top of workloads on top of data."
 *
 * Layers stack bottom-to-top with labels right-aligned. Each layer has a slight
 * inset so the stack reads as a "pyramid" of abstraction.
 */
export type StackLayer = {
  label: string;
  /** Brightness modifier — 1 = full white, 0.4 = dim. Default 1. */
  brightness?: number;
};

export type ArchitectureStackProps = {
  hud: HudProps;
  /** Layers from BOTTOM to TOP (data layer first, abstract last) */
  layers: StackLayer[];
  /** Top-of-stack label, e.g. "the recoupable stack" */
  title?: string;
};

export const ArchitectureStack: React.FC<ArchitectureStackProps> = ({
  hud,
  layers,
  title = "the recoupable stack",
}) => {
  const frame = useCurrentFrame();
  const layerH = 80;
  const layerGap = 6;
  const baseW = CANVAS.width - 240;
  const stackTotalH = layers.length * layerH + (layers.length - 1) * layerGap;
  const stackBottom = CANVAS.height / 2 + stackTotalH / 2;

  return (
    <Canvas hud={hud}>
      {/* Title */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: CANVAS.height / 2 - stackTotalH / 2 - 70,
          textAlign: "center",
          fontFamily,
          fontSize: 16,
          color: COLORS.dim,
          letterSpacing: 2.5,
          textTransform: "lowercase",
        }}
      >
        — {title} —
      </div>
      {/* Layers (bottom up) */}
      {layers.map((layer, i) => {
        // Each layer narrows slightly from the bottom (pyramid feel)
        const w = baseW - i * 60;
        const x = (CANVAS.width - w) / 2;
        const y = stackBottom - (i + 1) * (layerH + layerGap);
        // Stagger entrance — bottom layer first
        const appearAt = i * 4;
        const opacity = interpolate(frame - appearAt, [0, 6], [0, 1], {
          extrapolateRight: "clamp",
        });
        const scale = interpolate(frame - appearAt, [0, 8], [0.9, 1], {
          easing: Easing.out(Easing.cubic),
          extrapolateRight: "clamp",
        });
        const brightness = layer.brightness ?? 1;
        return (
          <React.Fragment key={i}>
            <div
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: w,
                height: layerH,
                background: `rgba(255,255,255,${0.05 + brightness * 0.06})`,
                border: `1px solid rgba(255,255,255,${0.2 + brightness * 0.3})`,
                opacity,
                transform: `scale(${scale})`,
                transformOrigin: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: 28,
                paddingRight: 28,
              }}
            >
              <span
                style={{
                  fontFamily,
                  fontSize: 32,
                  color: `rgba(255,255,255,${0.6 + brightness * 0.4})`,
                  letterSpacing: 0.5,
                }}
              >
                <ScrambleType text={layer.label} startFrame={appearAt + 2} stepFrames={1} />
              </span>
              <span
                style={{
                  fontFamily,
                  fontSize: 14,
                  color: COLORS.dim,
                  letterSpacing: 1.5,
                }}
              >
                [{layers.length - i}]
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </Canvas>
  );
};

import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const colors = {
  black: "#050505",
  white: "#ffffff",
  brand: "#345A5D",
  muted: "rgba(0, 0, 0, 0.42)",
  border: "rgba(0, 0, 0, 0.08)",
  soft: "#f5f5f2",
  panel: "#f8f8f5",
};

export const clamp = (
  frame: number,
  input: [number, number],
  output: [number, number],
  easing?: (value: number) => number,
) =>
  interpolate(frame, input, output, {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const typedText = (text: string, frame: number, speed = 1.5) =>
  text.slice(0, Math.max(0, Math.floor(frame / speed)));

export const cameraTransform = ({
  frame,
  scale = [0.96, 1],
  x = [0, 0],
  y = [0, 0],
  duration = 45,
}: {
  frame: number;
  scale?: [number, number];
  x?: [number, number];
  y?: [number, number];
  duration?: number;
}) =>
  `translate(${clamp(frame, [0, duration], x, Easing.out(Easing.cubic))}px, ${clamp(
    frame,
    [0, duration],
    y,
    Easing.out(Easing.cubic),
  )}px) scale(${clamp(frame, [0, duration], scale, Easing.out(Easing.cubic))})`;

export const useSoftEntrance = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
    durationInFrames: 24,
  });
};

export const SceneShell = ({
  children,
  dark = false,
  style,
}: {
  children: ReactNode;
  dark?: boolean;
  style?: CSSProperties;
}) => (
  <AbsoluteFill
    style={{
      alignItems: "center",
      backgroundColor: dark ? colors.black : colors.white,
      color: dark ? colors.white : colors.black,
      fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      justifyContent: "center",
      overflow: "hidden",
      ...style,
    }}
  >
    {children}
  </AbsoluteFill>
);

export const StageGrid = ({ dark = false, opacity = 1 }: { dark?: boolean; opacity?: number }) => (
  <AbsoluteFill
    style={{
      backgroundImage: `radial-gradient(${dark ? "rgba(255,255,255,0.13)" : "rgba(0,0,0,0.09)"} 1px, transparent 1px)`,
      backgroundSize: "36px 36px",
      opacity,
    }}
  />
);

export const TinyLabel = ({ children, dark = false }: { children: ReactNode; dark?: boolean }) => (
  <div
    style={{
      color: dark ? "rgba(255,255,255,0.55)" : colors.muted,
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: "0.09em",
      textTransform: "uppercase",
    }}
  >
    {children}
  </div>
);

export const ApiCard = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div
    style={{
      background: colors.white,
      border: `1px solid ${colors.border}`,
      borderRadius: 28,
      boxShadow: "0 24px 80px rgba(0,0,0,0.08)",
      color: colors.black,
      padding: 34,
      width: 620,
      ...style,
    }}
  >
    {children}
  </div>
);

export const SystemPill = ({
  children,
  active = false,
  style,
}: {
  children: ReactNode;
  active?: boolean;
  style?: CSSProperties;
}) => (
  <div
    style={{
      background: active ? colors.black : colors.white,
      border: `1px solid ${active ? colors.black : colors.border}`,
      borderRadius: 999,
      color: active ? colors.white : colors.black,
      fontFamily: "monospace",
      fontSize: 13,
      fontWeight: 800,
      padding: "10px 15px",
      ...style,
    }}
  >
    {children}
  </div>
);

export const CursorDot = ({ style }: { style?: CSSProperties }) => (
  <div
    style={{
      alignItems: "center",
      background: colors.black,
      borderRadius: 999,
      color: colors.white,
      display: "flex",
      fontSize: 10,
      fontWeight: 800,
      height: 32,
      justifyContent: "center",
      position: "absolute",
      width: 32,
      ...style,
    }}
  >
    +
  </div>
);

export const ConnectorLine = ({ style }: { style?: CSSProperties }) => (
  <div
    style={{
      background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.22), transparent)",
      height: 1,
      position: "absolute",
      transformOrigin: "left center",
      width: 180,
      ...style,
    }}
  />
);

export const assetGradient = (index: number) => {
  const palettes = [
    ["#1f2937", "#e5e7eb"],
    ["#345A5D", "#d9e7e4"],
    ["#111827", "#9ca3af"],
    ["#6b7280", "#f8fafc"],
    ["#0f172a", "#cbd5e1"],
    ["#222222", "#f1efe7"],
  ];
  const [start, end] = palettes[index % palettes.length];

  return `linear-gradient(135deg, ${start}, ${end})`;
};

export const kineticScale = (frame: number, duration = 34) =>
  clamp(frame, [0, duration], [0.94, 1], Easing.out(Easing.cubic));

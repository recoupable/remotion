export const COLORS = {
  bg: "#000000",
  fg: "#FFFFFF",
  bgInverted: "#FFFFFF",
  fgInverted: "#000000",
  ghost: "rgba(255,255,255,0.18)",
  dim: "rgba(255,255,255,0.35)",
  grid: "rgba(255,255,255,0.12)",
  ghostInv: "rgba(0,0,0,0.18)",
  dimInv: "rgba(0,0,0,0.35)",
  gridInv: "rgba(0,0,0,0.12)",
} as const;

export const TYPE = {
  hud: { fontSize: 14, fontWeight: 400, lineHeight: 1.4, letterSpacing: 0.5 },
  label: { fontSize: 20, fontWeight: 500, lineHeight: 1.3, letterSpacing: 0.3 },
  body: { fontSize: 28, fontWeight: 400, lineHeight: 1.4, letterSpacing: 0 },
  display: { fontSize: 200, fontWeight: 400, lineHeight: 1.0, letterSpacing: 0 },
  zoom: { fontSize: 320, fontWeight: 700, lineHeight: 1.0, letterSpacing: -4 },
} as const;

export const TIMING = {
  hardCut: 0,
  scrambleStep: 4,
  particleFallSpeed: 12,
  resolveWindow: 24,
  hold: 30,
  holdLong: 60,
  fadeQuick: 6,
} as const;

export const CANVAS = {
  width: 1080,
  height: 1080,
  fps: 30,
  hudPadding: 60,
  gridDots: 9,
  gridSpacing: 1080 / 10,
} as const;

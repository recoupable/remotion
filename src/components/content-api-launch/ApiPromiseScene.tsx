import { useCurrentFrame } from "remotion";
import type { ContentApiLaunchData } from "../../data/contentApiLaunchData";
import { clamp, colors, SceneShell, StageGrid } from "./shared";

export const ApiPromiseScene = ({ data }: { data: ContentApiLaunchData }) => {
  const frame = useCurrentFrame();
  const scale = clamp(frame, [0, 42], [1.36, 0.94]);
  const opacity = clamp(frame, [0, 14], [0, 1]);
  const phrase = data.promise.replace(" generates ", "\ngenerates\n");

  return (
    <SceneShell dark>
      <StageGrid dark opacity={0.18} />
      <div
        style={{
          color: "rgba(255,255,255,0.08)",
          fontSize: 220,
          fontWeight: 950,
          left: clamp(frame, [0, 66], [-360, 250]),
          letterSpacing: "-0.12em",
          lineHeight: 0.82,
          position: "absolute",
          top: 250,
          whiteSpace: "nowrap",
        }}
      >
        API API API
      </div>
      <div
        style={{
          color: colors.white,
          fontSize: 116,
          fontWeight: 950,
          letterSpacing: "-0.085em",
          lineHeight: 0.78,
          maxWidth: 850,
          opacity,
          textAlign: "center",
          transform: `translateX(${clamp(frame, [0, 42], [-46, 0])}px) scale(${scale})`,
          whiteSpace: "pre-line",
        }}
      >
        {phrase}
      </div>
      <div
        style={{
          bottom: 82,
          color: "rgba(255,255,255,0.58)",
          fontFamily: "monospace",
          fontSize: 15,
          fontWeight: 700,
          position: "absolute",
          transform: `translateY(${clamp(frame, [20, 66], [24, -8])}px)`,
        }}
      >
        {data.endpoint}
      </div>
    </SceneShell>
  );
};

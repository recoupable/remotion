import { Img, staticFile, useCurrentFrame } from "remotion";
import type { ContentApiLaunchData } from "../../data/contentApiLaunchData";
import { clamp, colors, SceneShell, StageGrid, TinyLabel } from "./shared";

export const CtaScene = ({ data }: { data: ContentApiLaunchData }) => {
  const frame = useCurrentFrame();
  const opacity = clamp(frame, [0, 18], [0, 1]);

  return (
    <SceneShell>
      <StageGrid opacity={0.08} />
      <Img
        src={staticFile("content-api-launch/gatsby-grace-asset-wall.png")}
        style={{
          filter: "grayscale(0.12)",
          height: 520,
          objectFit: "cover",
          opacity: clamp(frame, [0, 22], [0, 0.2]),
          position: "absolute",
          transform: `scale(${clamp(frame, [0, 60], [1.04, 1.16])})`,
          width: 920,
        }}
      />
      <div
        style={{
          opacity,
          textAlign: "center",
          transform: `translateY(${clamp(frame, [0, 60], [24, -8])}px) scale(${clamp(frame, [0, 36], [0.94, 1])})`,
        }}
      >
        <Img src={staticFile("recoup-logo.svg")} style={{ height: 30, marginBottom: 22, width: 112 }} />
        <TinyLabel>Content API</TinyLabel>
        <div
          style={{
            color: colors.black,
            fontSize: 72,
            fontWeight: 950,
            letterSpacing: "-0.08em",
            lineHeight: 0.82,
            marginTop: 18,
          }}
        >
          Recoup ships the release kit.
        </div>
        <div
          style={{
            color: colors.black,
            fontSize: 34,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            marginTop: 16,
          }}
        >
          {data.cta}
        </div>
      </div>
      <div
        style={{
          bottom: 62,
          color: colors.muted,
          fontFamily: "monospace",
          fontSize: 12,
          fontWeight: 800,
          opacity: clamp(frame, [22, 42], [0, 1]),
          position: "absolute",
        }}
      >
        POST /api/content/create
      </div>
    </SceneShell>
  );
};

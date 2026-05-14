import { Img, staticFile, useCurrentFrame } from "remotion";
import type { ContentApiLaunchData } from "../../data/contentApiLaunchData";
import { cameraTransform, clamp, colors, SceneShell, StageGrid, SystemPill, TinyLabel } from "./shared";

export const ArtistContextScene = ({ data }: { data: ContentApiLaunchData }) => {
  const frame = useCurrentFrame();
  const headline = data.audienceLine.replace("shipping", "shipping\n");
  const lockups = ["API", "tasks", "CLI", "agents"];

  return (
    <SceneShell>
      <StageGrid opacity={0.24} />
      <Img
        src={staticFile("content-api-launch/gatsby-grace-asset-wall.png")}
        style={{
          borderRadius: 28,
          boxShadow: "0 34px 100px rgba(0,0,0,0.16)",
          height: 370,
          objectFit: "cover",
          opacity: clamp(frame, [0, 18], [0, 0.92]),
          position: "absolute",
          top: 292,
          transform: `scale(${clamp(frame, [0, 54], [0.9, 1.05])})`,
          width: 660,
        }}
      />
      <div
        style={{
          display: "flex",
          gap: 10,
          position: "absolute",
          top: 74,
          transform: `translateX(${clamp(frame, [0, 54], [-170, 110])}px)`,
        }}
      >
        {lockups.map((lockup, index) => (
          <SystemPill key={lockup} active={index === Math.floor(clamp(frame, [0, 50], [0, 3]))}>
            Recoup in {lockup}
          </SystemPill>
        ))}
      </div>
      <div
        style={{
          opacity: clamp(frame, [0, 10], [0, 1]),
          textAlign: "center",
          transform: cameraTransform({ frame, scale: [0.88, 1.04], y: [-30, -78], duration: 46 }),
        }}
      >
        <TinyLabel>Content API for artist teams</TinyLabel>
        <div
          style={{
            fontSize: 86,
            fontWeight: 900,
            letterSpacing: "-0.07em",
            lineHeight: 0.84,
            marginTop: 24,
            maxWidth: 800,
            whiteSpace: "pre-line",
          }}
        >
          {headline}
        </div>
      </div>
      <div
        style={{
          border: `1px solid ${colors.border}`,
          borderRadius: 999,
          bottom: 78,
          color: colors.muted,
          fontSize: 14,
          fontWeight: 700,
          padding: "10px 18px",
          position: "absolute",
          transform: `translateY(${clamp(frame, [18, 54], [18, -4])}px)`,
        }}
      >
        labels / managers / artists
      </div>
    </SceneShell>
  );
};

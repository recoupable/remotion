import { Img, staticFile, useCurrentFrame } from "remotion";
import type { ContentApiLaunchData } from "../../data/contentApiLaunchData";
import { colors, kineticScale, SceneShell } from "./shared";

export const BrandSeedScene = ({ data }: { data: ContentApiLaunchData }) => {
  const frame = useCurrentFrame();
  const opacity = Math.min(1, frame / 18);
  const scale = kineticScale(frame);

  return (
    <SceneShell dark>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          gap: 10,
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        <Img src={staticFile("recoup-logo.svg")} style={{ height: 22, width: 82 }} />
        <span style={{ color: colors.white, fontSize: 18, fontWeight: 800 }}>{data.productName}</span>
      </div>
      <div
        style={{
          background: colors.brand,
          borderRadius: 999,
          filter: "blur(34px)",
          height: 110,
          opacity: 0.26,
          position: "absolute",
          width: 110,
        }}
      />
    </SceneShell>
  );
};

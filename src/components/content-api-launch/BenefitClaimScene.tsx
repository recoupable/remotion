import { useCurrentFrame } from "remotion";
import type { ContentApiLaunchData } from "../../data/contentApiLaunchData";
import { clamp, colors, SceneShell, StageGrid } from "./shared";

export const BenefitClaimScene = ({ data }: { data: ContentApiLaunchData }) => {
  const frame = useCurrentFrame();
  const scale = clamp(frame, [0, 40], [1.34, 0.98]);
  const opacity = clamp(frame, [0, 12], [0, 1]);
  const x = clamp(frame, [0, 76], [-120, 10]);
  const claim = data.benefitClaim.replace(". ", ".\n");

  return (
    <SceneShell dark>
      <StageGrid dark opacity={0.12} />
      <div
        style={{
          color: "rgba(255,255,255,0.08)",
          fontSize: 150,
          fontWeight: 950,
          letterSpacing: "-0.1em",
          position: "absolute",
          transform: `translateX(${clamp(frame, [0, 76], [320, -240])}px)`,
          whiteSpace: "nowrap",
        }}
      >
        24 24 24 24
      </div>
      <div
        style={{
          color: colors.white,
          fontSize: 118,
          fontWeight: 950,
          letterSpacing: "-0.095em",
          lineHeight: 0.82,
          maxWidth: 890,
          opacity,
          textAlign: "center",
          transform: `translateX(${x}px) scale(${scale})`,
          whiteSpace: "pre-line",
        }}
      >
        {claim}
      </div>
      <div
        style={{
          bottom: 88,
          color: "rgba(255,255,255,0.55)",
          fontFamily: "monospace",
          fontSize: 15,
          fontWeight: 800,
          position: "absolute",
        }}
      >
        image / video / text / audio / render / upscale
      </div>
    </SceneShell>
  );
};

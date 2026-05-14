import { Img, staticFile, useCurrentFrame } from "remotion";
import type { ContentApiLaunchData } from "../../data/contentApiLaunchData";
import { assetGradient, clamp, colors, SceneShell, StageGrid, TinyLabel } from "./shared";

const ArtifactPreview = ({ label, index }: { label: string; index: number }) => {
  if (label.includes("teaser")) {
    return (
      <div style={{ alignItems: "center", display: "flex", height: "100%", justifyContent: "center" }}>
        <div
          style={{
            background: assetGradient(index),
            border: "2px solid rgba(255,255,255,0.55)",
            borderRadius: 12,
            height: 92,
            position: "relative",
            width: 52,
          }}
        >
          <div style={{ background: "rgba(255,255,255,0.8)", borderRadius: 999, bottom: 8, height: 4, left: 12, position: "absolute", right: 12 }} />
          <div style={{ color: "white", fontSize: 10, fontWeight: 900, left: 8, position: "absolute", top: 10 }}>GG</div>
        </div>
      </div>
    );
  }

  if (label.includes("caption")) {
    return (
      <div style={{ display: "grid", gap: 5, padding: 18 }}>
        {["deadpan hook", "new single friday", "pre-save now"].map((line) => (
          <div key={line} style={{ color: "white", fontSize: 11, fontWeight: 800, lineHeight: 1.1 }}>
            {line}
          </div>
        ))}
      </div>
    );
  }

  if (label.includes("waveform")) {
    return (
      <div style={{ alignItems: "center", display: "flex", gap: 4, height: "100%", justifyContent: "center" }}>
        {Array.from({ length: 15 }).map((_, barIndex) => (
          <div
            key={barIndex}
            style={{
              background: "rgba(255,255,255,0.82)",
              borderRadius: 999,
              height: 18 + ((barIndex * 17) % 48),
              width: 4,
            }}
          />
        ))}
      </div>
    );
  }

  if (label.includes("MP4")) {
    return (
      <div style={{ padding: 16 }}>
        <div style={{ background: "rgba(0,0,0,0.42)", borderRadius: 10, height: 72, position: "relative" }}>
          <div
            style={{
              borderBottom: "11px solid transparent",
              borderLeft: "18px solid rgba(255,255,255,0.86)",
              borderTop: "11px solid transparent",
              height: 0,
              left: "50%",
              position: "absolute",
              top: "50%",
              transform: "translate(-35%, -50%)",
              width: 0,
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: assetGradient(index), height: "100%", position: "relative" }}>
      {label.includes("before") ? (
        <div style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 1fr", height: "100%", padding: 14 }}>
          <div style={{ background: "rgba(255,255,255,0.35)", borderRadius: 12 }} />
          <div style={{ background: "rgba(255,255,255,0.92)", borderRadius: 12 }} />
        </div>
      ) : null}
      <div style={{ color: "rgba(255,255,255,0.92)", fontSize: 20, fontWeight: 950, left: 15, letterSpacing: "-0.06em", lineHeight: 0.85, position: "absolute", top: 16 }}>
        Gatsby
        <br />
        Grace
      </div>
      {!label.includes("before") ? (
        <>
          <div style={{ background: "rgba(255,255,255,0.78)", borderRadius: 999, bottom: 18, height: 8, left: 18, position: "absolute", width: 54 }} />
          <div style={{ background: "rgba(255,255,255,0.56)", borderRadius: 999, bottom: 34, height: 8, left: 18, position: "absolute", width: 82 }} />
        </>
      ) : null}
    </div>
  );
};

export const OutputGridScene = ({ data }: { data: ContentApiLaunchData }) => {
  const frame = useCurrentFrame();
  const labels = [...data.assetLabels, ...data.assetLabels];
  const gridScale = clamp(frame, [0, 130], [0.78, 1.12]);
  const gridY = clamp(frame, [0, 130], [72, -46]);
  const smear = clamp(frame, [104, 130], [0, 18]);

  return (
    <SceneShell>
      <StageGrid opacity={0.1} />
      <div style={{ position: "absolute", top: 76 }}>
        <TinyLabel>Generated for {data.artistName}</TinyLabel>
      </div>
      <Img
        src={staticFile("content-api-launch/gatsby-grace-text-hooks.png")}
        style={{
          borderRadius: 28,
          boxShadow: "0 28px 80px rgba(0,0,0,0.16)",
          height: 278,
          objectFit: "cover",
          opacity: clamp(frame, [0, 28], [0, 1]) * (1 - clamp(frame, [58, 78], [0, 0.72])),
          position: "absolute",
          top: clamp(frame, [0, 74], [410, 132]),
          transform: `scale(${clamp(frame, [0, 74], [0.9, 1.08])})`,
          width: 700,
        }}
      />
      <Img
        src={staticFile("content-api-launch/gatsby-grace-asset-wall.png")}
        style={{
          borderRadius: 30,
          boxShadow: "0 34px 110px rgba(0,0,0,0.18)",
          height: 440,
          objectFit: "cover",
          opacity: clamp(frame, [76, 102], [0, 1]),
          position: "absolute",
          top: 154,
          transform: `scale(${clamp(frame, [76, 130], [0.92, 1.08])})`,
          width: 782,
        }}
      />
      <div
        style={{
          display: "grid",
          filter: `blur(${smear}px)`,
          gap: 10,
          gridTemplateColumns: "repeat(4, 156px)",
          opacity: 1 - clamp(frame, [74, 106], [0, 0.84]),
          transform: `translateY(${gridY}px) scale(${gridScale})`,
        }}
      >
        {labels.map((label, index) => {
          const progress = clamp(frame - index * 2.2, [0, 18], [0, 1]);
          const blur = clamp(frame - index, [78, 116], [0, 6]);

          return (
            <div
              key={`${label}-${index}`}
              style={{
                background: colors.black,
                borderRadius: 15,
                boxShadow: "0 14px 34px rgba(0,0,0,0.08)",
                height: 156,
                opacity: progress,
                overflow: "hidden",
                position: "relative",
                transform: `translateY(${(1 - progress) * 18}px) scale(${0.82 + progress * 0.18})`,
              }}
            >
              <ArtifactPreview label={label} index={index} />
              <div
                style={{
                  backdropFilter: `blur(${blur}px)`,
                  background: "rgba(255,255,255,0.18)",
                  bottom: 0,
                  color: index % 2 === 0 ? colors.white : colors.black,
                  fontFamily: "monospace",
                  fontSize: 11,
                  fontWeight: 800,
                  left: 0,
                  padding: "9px 10px",
                  position: "absolute",
                  right: 0,
                  textTransform: "uppercase",
                }}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          bottom: 74,
          color: colors.muted,
          fontSize: 14,
          fontWeight: 800,
          opacity: clamp(frame, [38, 60], [0, 1]),
          position: "absolute",
        }}
      >
        24 launch assets generated
      </div>
    </SceneShell>
  );
};

import { useCurrentFrame } from "remotion";
import type { ContentApiLaunchData } from "../../data/contentApiLaunchData";
import { ApiCard, clamp, colors, CursorDot, SceneShell, StageGrid, TinyLabel, typedText } from "./shared";

export const AgentPromptScene = ({ data }: { data: ContentApiLaunchData }) => {
  const frame = useCurrentFrame();
  const statusWidth = clamp(frame, [42, 70], [0, 100]);
  const steps = ["image done", "video rendering", "caption writing", "audio clipped"];
  const kitImpact = frame >= 62 && frame <= 70;

  return (
    <SceneShell>
      <StageGrid opacity={0.12} />
      {kitImpact ? (
        <div
          style={{
            background: colors.black,
            color: colors.white,
            inset: 0,
            padding: 92,
            position: "absolute",
            zIndex: 20,
          }}
        >
          <div style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 900 }}>LAUNCH KIT</div>
          <div style={{ display: "grid", gap: 18, gridTemplateColumns: "1.2fr 0.8fr", marginTop: 34 }}>
            <div style={{ background: colors.white, borderRadius: 28, color: colors.black, minHeight: 330, padding: 28 }}>
              <div style={{ fontSize: 56, fontWeight: 950, letterSpacing: "-0.08em", lineHeight: 0.85 }}>vertical teaser</div>
              <div style={{ background: colors.black, borderRadius: 18, height: 120, marginTop: 34 }} />
            </div>
            <div style={{ display: "grid", gap: 18 }}>
              {["cover", "caption", "audio"].map((label) => (
                <div key={label} style={{ border: "1px solid rgba(255,255,255,0.35)", borderRadius: 22, fontSize: 28, fontWeight: 900, padding: 22 }}>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      <div
        style={{
          color: "rgba(0,0,0,0.045)",
          fontSize: 164,
          fontWeight: 950,
          left: clamp(frame, [0, 86], [-260, 140]),
          letterSpacing: "-0.1em",
          position: "absolute",
          top: 110,
          whiteSpace: "nowrap",
        }}
      >
        AGENT AGENT
      </div>
      <ApiCard
        style={{
          transform: `translateX(${clamp(frame, [0, 64], [130, -52])}px) scale(${clamp(frame, [0, 28], [0.94, 1])})`,
        }}
      >
        <TinyLabel>Agent prompt</TinyLabel>
        <div
          style={{
            border: `1px solid ${colors.border}`,
            borderRadius: 999,
            fontSize: 20,
            fontWeight: 700,
            marginTop: 24,
            minHeight: 68,
            padding: "20px 24px",
          }}
        >
          {typedText(data.prompt, frame - 10, 1.1)}
        </div>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            gap: 14,
            marginTop: 24,
          }}
        >
          <div style={{ background: colors.brand, borderRadius: 999, height: 34, width: 34 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 800 }}>Recoup agent is building launch assets</div>
            <div
              style={{
                background: colors.soft,
                borderRadius: 999,
                height: 8,
                marginTop: 10,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: colors.black,
                  borderRadius: 999,
                  height: "100%",
                  width: `${statusWidth}%`,
                }}
              />
            </div>
          </div>
        </div>
      </ApiCard>
      <div
        style={{
          display: "grid",
          gap: 10,
          left: 122,
          position: "absolute",
          top: 172,
          width: 230,
        }}
      >
        {steps.map((step, index) => {
          const active = frame > 20 + index * 14;
          const visible = clamp(frame - index * 10, [8, 20], [0, 1]);

          return (
            <div
              key={step}
              style={{
                alignItems: "center",
                background: active ? colors.black : colors.white,
                border: `1px solid ${active ? colors.black : colors.border}`,
                borderRadius: 999,
                color: active ? colors.white : colors.black,
                display: "flex",
                fontFamily: "monospace",
                fontSize: 12,
                fontWeight: 800,
                justifyContent: "space-between",
                opacity: visible,
                padding: "10px 12px",
                transform: `translateX(${(1 - visible) * -34}px)`,
              }}
            >
              <span>{step}</span>
              <span>{active ? "✓" : "…"}</span>
            </div>
          );
        })}
      </div>
      <ApiCard
        style={{
          opacity: clamp(frame, [42, 60], [0, 1]),
          padding: 20,
          position: "absolute",
          right: 118,
          top: 168,
          transform: `translateY(${clamp(frame, [42, 86], [34, -8])}px)`,
          width: 260,
        }}
      >
        <div style={{ color: colors.muted, fontFamily: "monospace", fontSize: 11, fontWeight: 800 }}>
          task.run
        </div>
        <div style={{ fontSize: 18, fontWeight: 900, marginTop: 8 }}>6 primitives queued</div>
      </ApiCard>
      <div
        style={{
          background: colors.black,
          borderRadius: 26,
          bottom: 124,
          color: colors.white,
          fontSize: 34,
          fontWeight: 950,
          letterSpacing: "-0.06em",
          opacity: clamp(frame, [58, 72], [0, 1]),
          padding: "22px 28px",
          position: "absolute",
          right: clamp(frame, [58, 86], [-360, 84]),
          transform: `rotate(${clamp(frame, [58, 86], [5, 0])}deg)`,
          width: 320,
        }}
      >
        launch kit assembling
      </div>
      <CursorDot
        style={{
          left: clamp(frame, [0, 54], [246, 414]),
          opacity: clamp(frame, [0, 8], [0, 1]),
          top: clamp(frame, [0, 54], [622, 526]),
        }}
      />
    </SceneShell>
  );
};

import { useCurrentFrame } from "remotion";
import type { ContentApiLaunchData } from "../../data/contentApiLaunchData";
import { ApiCard, clamp, colors, CursorDot, SceneShell, StageGrid, TinyLabel, typedText } from "./shared";

export const RequestScene = ({ data }: { data: ContentApiLaunchData }) => {
  const frame = useCurrentFrame();
  const cardScale = clamp(frame, [0, 18], [0.94, 1]);
  const flash = frame > 86 && frame < 96 ? 1 : 0;
  const releaseInputs = [
    { start: 18, label: "LYRICS", detail: "deadpan hook lines" },
    { start: 48, label: "AUDIO", detail: "00:14 chorus clip" },
    { start: 78, label: "VISUAL", detail: "cover direction" },
  ];
  const activeCloseup = releaseInputs.find((input) => frame >= input.start + 6 && frame <= input.start + 14);
  const payload = `{
  "artist": "${data.artistName}",
  "song": "${data.songName}",
  "brief": "single release campaign",
  "inputs": ["lyrics", "cover direction", "audio clip"],
  "outputs": ${JSON.stringify(data.outputTypes)}
}`;

  return (
    <SceneShell dark>
      <StageGrid dark opacity={0.18} />
      {activeCloseup ? (
        <div
          style={{
            background: activeCloseup.label === "AUDIO" ? colors.brand : colors.white,
            color: activeCloseup.label === "AUDIO" ? colors.white : colors.black,
            inset: 0,
            padding: 104,
            position: "absolute",
            zIndex: 20,
          }}
        >
          <div style={{ fontFamily: "monospace", fontSize: 18, fontWeight: 900 }}>{activeCloseup.label}</div>
          <div style={{ fontSize: 88, fontWeight: 950, letterSpacing: "-0.08em", lineHeight: 0.82, marginTop: 22 }}>
            {activeCloseup.detail}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 52 }}>
            {Array.from({ length: activeCloseup.label === "AUDIO" ? 18 : 6 }).map((_, index) => (
              <div
                key={index}
                style={{
                  background: activeCloseup.label === "AUDIO" ? "rgba(255,255,255,0.82)" : colors.black,
                  borderRadius: activeCloseup.label === "AUDIO" ? 999 : 12,
                  height: activeCloseup.label === "AUDIO" ? 28 + ((index * 19) % 84) : 88,
                  opacity: 0.16 + index * 0.04,
                  width: activeCloseup.label === "AUDIO" ? 8 : 88,
                }}
              />
            ))}
          </div>
        </div>
      ) : null}
      {releaseInputs.map((input, index) => {
        const progress = clamp(frame - input.start, [0, 14], [0, 1]);
        const exit = clamp(frame - input.start, [18, 30], [0, 1]);

        return (
          <div
            key={input.label}
            style={{
              background: index === 1 ? colors.brand : colors.white,
              borderRadius: 28,
              color: index === 1 ? colors.white : colors.black,
              left: `${12 + index * 7}%`,
              opacity: progress * (1 - exit * 0.35),
              padding: "24px 28px",
              position: "absolute",
              top: 118 + index * 110,
              transform: `translateX(${(1 - progress) * -360 + exit * 520}px) rotate(${(1 - progress) * -5}deg)`,
              width: 360,
              zIndex: 2,
            }}
          >
            <div style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 900 }}>{input.label}</div>
            <div style={{ fontSize: 32, fontWeight: 950, letterSpacing: "-0.06em", marginTop: 10 }}>{input.detail}</div>
          </div>
        );
      })}
      <div
        style={{
          color: "rgba(255,255,255,0.08)",
          fontFamily: "monospace",
          fontSize: 74,
          fontWeight: 900,
          left: clamp(frame, [0, 118], [920, -460]),
          letterSpacing: "-0.08em",
          position: "absolute",
          top: 200,
          whiteSpace: "nowrap",
        }}
      >
        POST /api/content/create POST /api/content/create
      </div>
      <div
        style={{
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 999,
          color: "rgba(255,255,255,0.72)",
          fontFamily: "monospace",
          fontSize: 12,
          fontWeight: 800,
          padding: "8px 14px",
          position: "absolute",
          right: clamp(frame, [0, 54], [210, 84]),
          top: 72,
        }}
      >
        content.create
      </div>
      <ApiCard
        style={{
          boxShadow: "0 34px 120px rgba(0,0,0,0.32)",
          transform: `translate(${clamp(frame, [0, 84], [-76, 72])}px, ${clamp(
            frame,
            [0, 84],
            [20, -18],
          )}px) scale(${cardScale + clamp(frame, [50, 118], [0, 0.12])})`,
        }}
      >
        <TinyLabel>Request</TinyLabel>
        <div style={{ fontFamily: "monospace", fontSize: 19, fontWeight: 800, marginTop: 20 }}>
          {typedText(data.endpoint, frame - 8, 1.2)}
        </div>
        <pre
          style={{
            background: colors.soft,
            border: `1px solid ${colors.border}`,
            borderRadius: 18,
            color: colors.black,
            fontFamily: "monospace",
            fontSize: 17,
            lineHeight: 1.55,
            margin: "28px 0 0",
            minHeight: 190,
            padding: 22,
            whiteSpace: "pre-wrap",
          }}
        >
          {typedText(payload, frame - 24, 0.85)}
        </pre>
      </ApiCard>
      <CursorDot
        style={{
          boxShadow: "0 0 0 6px rgba(255,255,255,0.09)",
          left: clamp(frame, [8, 72], [318, 792]),
          opacity: clamp(frame, [4, 14], [0, 1]),
          top: clamp(frame, [8, 72], [668, 642]),
        }}
      />
      <div
        style={{
          background: flash ? colors.brand : colors.white,
          borderRadius: 999,
          bottom: flash ? 360 : 94,
          color: flash ? colors.white : colors.black,
          fontSize: flash ? 62 : 13,
          fontWeight: 900,
          opacity: clamp(frame, [76, 84], [0, 1]),
          padding: flash ? "22px 44px" : "10px 18px",
          position: "absolute",
          right: flash ? 330 : 242,
          transform: `scale(${clamp(frame, [76, 92], [0.86, 1])})`,
        }}
      >
        run
      </div>
      {["artist", "song", "outputs"].map((token, index) => {
        const active = frame > 32 + index * 18;

        return (
          <div
            key={token}
            style={{
              background: active ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.16)",
              borderRadius: 14,
              color: colors.white,
              fontFamily: "monospace",
              fontSize: 12,
              fontWeight: 800,
              left: 106 + index * 132,
              opacity: clamp(frame - index * 12, [22, 36], [0, 1]),
              padding: "10px 12px",
              position: "absolute",
              top: 834 + (index % 2) * 42,
              transform: `translateY(${active ? -10 : 0}px)`,
            }}
          >
            {active ? "✓" : "•"} {token}
          </div>
        );
      })}
      {["lyrics.json", "cover moodboard", "hook audio"].map((item, index) => (
        <div
          key={item}
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 18,
            color: colors.white,
            fontFamily: "monospace",
            fontSize: 13,
            fontWeight: 800,
            opacity: clamp(frame - index * 9, [48, 62], [0, 1]),
            padding: "14px 16px",
            position: "absolute",
            right: 96,
            top: 204 + index * 64,
            transform: `translateX(${clamp(frame - index * 9, [48, 64], [44, 0])}px)`,
            width: 190,
          }}
        >
          {item}
        </div>
      ))}
    </SceneShell>
  );
};

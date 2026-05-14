import { useCurrentFrame } from "remotion";
import type { ContentApiLaunchData } from "../../data/contentApiLaunchData";
import { clamp, colors, ConnectorLine, SceneShell, StageGrid, TinyLabel } from "./shared";

export const PrimitiveFanOutScene = ({ data }: { data: ContentApiLaunchData }) => {
  const frame = useCurrentFrame();
  const activeIndex = Math.min(data.outputTypes.length - 1, Math.floor(frame / 13));
  const endpointMapVisible = frame >= 58 && frame <= 66;

  return (
    <SceneShell dark>
      <StageGrid dark opacity={0.18} />
      {endpointMapVisible ? (
        <div
          style={{
            background: colors.white,
            color: colors.black,
            display: "grid",
            gap: 18,
            gridTemplateColumns: "repeat(3, 1fr)",
            inset: 0,
            padding: 112,
            position: "absolute",
            zIndex: 20,
          }}
        >
          {data.outputTypes.map((type) => (
            <div
              key={type}
              style={{
                border: `2px solid ${colors.black}`,
                borderRadius: 24,
                fontFamily: "monospace",
                fontSize: 24,
                fontWeight: 900,
                padding: 22,
              }}
            >
              /{type}
            </div>
          ))}
        </div>
      ) : null}
      <div style={{ position: "absolute", top: 92 }}>
        <TinyLabel>Composable primitives / {data.outputTypes[activeIndex]}</TinyLabel>
      </div>
      {data.outputTypes.map((type, index) => {
        const angle = [-130, -90, -50, 50, 90, 130][index] ?? 0;
        const progress = clamp(frame - index * 5, [6, 28], [0, 1]);

        return (
          <ConnectorLine
            key={`${type}-line`}
            style={{
              left: 540,
              opacity: progress * 0.7,
              top: 540,
              transform: `rotate(${angle}deg) scaleX(${progress})`,
            }}
          />
        );
      })}
      <div
        style={{
          alignItems: "center",
          background: colors.white,
          borderRadius: 999,
          color: colors.black,
          display: "flex",
          fontFamily: "monospace",
          fontSize: 13,
          fontWeight: 900,
          height: 72,
          justifyContent: "center",
          position: "absolute",
          transform: `scale(${clamp(frame, [0, 22], [0.82, 1])})`,
          width: 72,
          zIndex: 2,
        }}
      >
        API
      </div>
      <div
        style={{
          alignItems: "center",
          display: "grid",
          gap: 18,
          gridTemplateColumns: "repeat(3, 190px)",
          justifyContent: "center",
          transform: `scale(${clamp(frame, [0, 84], [0.94, 1.04])})`,
        }}
      >
        {data.outputTypes.map((type, index) => {
          const progress = clamp(frame - index * 5, [12, 34], [0, 1]);
          const x = [0, -28, 28, -28, 28, 0][index] ?? 0;
          const y = [-34, -8, -8, 8, 8, 34][index] ?? 0;
          const active = index === activeIndex;

          return (
            <div
              key={type}
              style={{
                alignItems: "center",
                background: active ? colors.white : colors.black,
                border: `1px solid ${active ? colors.white : "rgba(255,255,255,0.22)"}`,
                borderRadius: 24,
                color: active ? colors.black : colors.white,
                display: "flex",
                flexDirection: "column",
                height: 154,
                justifyContent: "center",
                opacity: progress,
                transform: `translate(${(1 - progress) * -x}px, ${(1 - progress) * -y}px) scale(${
                  0.78 + progress * 0.22 + (active ? 0.11 : 0)
                })`,
                zIndex: 3,
              }}
            >
              <div style={{ fontSize: 34, fontWeight: 950, letterSpacing: "-0.06em" }}>{type}</div>
              <div
                style={{
                  color: active ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.55)",
                  fontFamily: "monospace",
                  fontSize: 12,
                  fontWeight: 700,
                  marginTop: 12,
                }}
              >
                /{type}
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          bottom: 88,
          color: "rgba(255,255,255,0.55)",
          fontSize: 17,
          fontWeight: 700,
          position: "absolute",
          transform: `translateY(${clamp(frame, [42, 84], [20, -6])}px)`,
        }}
      >
        retry only the part you need
      </div>
      <div
        style={{
          bottom: 156,
          color: "rgba(255,255,255,0.82)",
          fontSize: 72,
          fontWeight: 950,
          letterSpacing: "-0.08em",
          opacity: clamp(frame, [4, 18], [0, 1]),
          position: "absolute",
          transform: `translateX(${clamp(frame, [0, 84], [260, -210])}px)`,
          whiteSpace: "nowrap",
        }}
      >
        {data.outputTypes[activeIndex]}
      </div>
      <div
        style={{
          background: `linear-gradient(90deg, transparent, ${colors.brand}, transparent)`,
          height: 4,
          left: clamp(frame, [0, 84], [120, 760]),
          opacity: 0.9,
          position: "absolute",
          top: clamp(frame, [0, 84], [420, 650]),
          transform: `rotate(${clamp(frame, [0, 84], [-18, 18])}deg)`,
          width: 280,
        }}
      />
    </SceneShell>
  );
};

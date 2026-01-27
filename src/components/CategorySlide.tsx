import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

const BRAND_COLOR = "#345A5D";

type CategorySlideProps = {
  name: string;
  commitCount: number;
};

const categoryColors: Record<string, string> = {
  "Recoup-Chat": "#2563eb",
  "Recoup-API": "#7c3aed",
  "Recoup-Docs": "#059669",
};

export const CategorySlide = ({ name, commitCount }: CategorySlideProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  const badgeY = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 200 },
  });

  const color = categoryColors[name] || BRAND_COLOR;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0f172a",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Category Name */}
      <h1
        style={{
          fontSize: 80,
          fontWeight: 800,
          color: "white",
          margin: 0,
          transform: `scale(${titleScale})`,
          textAlign: "center",
        }}
      >
        <span style={{ color }}>{name.replace("Recoup-", "")}</span>
      </h1>

      {/* Commit Count Badge */}
      <div
        style={{
          marginTop: 40,
          padding: "16px 48px",
          backgroundColor: color,
          borderRadius: 50,
          transform: `translateY(${interpolate(badgeY, [0, 1], [20, 0])}px)`,
          opacity: badgeY,
        }}
      >
        <span
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: "white",
          }}
        >
          {commitCount} update{commitCount !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
};

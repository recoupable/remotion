import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

const BRAND_COLOR = "#345A5D";

type CommitSlideProps = {
  message: string;
  type: string;
  index: number;
  total: number;
  category: string;
};

const typeColors: Record<string, { bg: string; text: string }> = {
  fix: { bg: "#fef3c7", text: "#92400e" },
  cleanup: { bg: "#dbeafe", text: "#1e40af" },
  chore: { bg: "#e5e7eb", text: "#374151" },
  ci: { bg: "#f3e8ff", text: "#6b21a8" },
  feat: { bg: "#d1fae5", text: "#065f46" },
  docs: { bg: "#fce7f3", text: "#9d174d" },
};

const categoryColors: Record<string, string> = {
  "Recoup-Chat": "#2563eb",
  "Recoup-API": "#7c3aed",
  "Recoup-Docs": "#059669",
};

export const CommitSlide = ({
  message,
  type,
  index,
  total,
  category,
}: CommitSlideProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  const badgeX = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });

  const textOpacity = interpolate(frame, [10, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const typeStyle = typeColors[type] || { bg: "#e5e7eb", text: "#374151" };
  const accentColor = categoryColors[category] || BRAND_COLOR;

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
        padding: 60,
      }}
    >
      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          backgroundColor: "#1e293b",
          borderRadius: 24,
          padding: 48,
          transform: `scale(${cardScale})`,
          borderLeft: `6px solid ${accentColor}`,
        }}
      >
        {/* Type Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
            transform: `translateX(${interpolate(badgeX, [0, 1], [-20, 0])}px)`,
            opacity: badgeX,
          }}
        >
          <span
            style={{
              padding: "8px 20px",
              backgroundColor: typeStyle.bg,
              color: typeStyle.text,
              borderRadius: 20,
              fontSize: 22,
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            {type}
          </span>
          <span
            style={{
              fontSize: 22,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {index} / {total}
          </span>
        </div>

        {/* Message */}
        <p
          style={{
            fontSize: 42,
            fontWeight: 600,
            color: "white",
            margin: 0,
            lineHeight: 1.4,
            opacity: textOpacity,
          }}
        >
          {message}
        </p>
      </div>

      {/* Progress Dots */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginTop: 40,
        }}
      >
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: i < index ? accentColor : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

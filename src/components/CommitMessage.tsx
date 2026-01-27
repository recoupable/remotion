import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

const BRAND_COLOR = "#345A5D";

interface CommitMessageProps {
  hash: string;
  message: string;
  repo: string;
  type: string;
  startFrame: number;
}

const typeColors: Record<string, string> = {
  feat: "#10B981",
  fix: "#EF4444",
  chore: "#8B5CF6",
  docs: "#3B82F6",
  ci: "#F59E0B",
  cleanup: "#6B7280",
};

const repoColors: Record<string, string> = {
  "Recoup-Chat": "#2563EB",
  "Recoup-API": "#7C3AED",
};

export const CommitMessage: React.FC<CommitMessageProps> = ({
  hash,
  message,
  repo,
  type,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0) return null;

  const slideIn = spring({
    frame: relativeFrame,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const opacity = interpolate(relativeFrame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Typing animation for the message
  const charsToShow = Math.floor(
    interpolate(relativeFrame, [5, 35], [0, message.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const displayMessage = message.slice(0, charsToShow);
  const showCursor = relativeFrame < 40 && relativeFrame > 5;

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: "12px 0",
        opacity,
        transform: `translateY(${interpolate(slideIn, [0, 1], [20, 0])}px)`,
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          backgroundColor: repoColors[repo] || BRAND_COLOR,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span style={{ color: "white", fontSize: 14, fontWeight: 600 }}>
          {repo === "Recoup-Chat" ? "C" : "A"}
        </span>
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 4,
          }}
        >
          <span style={{ fontWeight: 600, fontSize: 14, color: "#1A1A1A" }}>
            {repo}
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: "white",
              backgroundColor: typeColors[type] || "#6B7280",
              padding: "2px 8px",
              borderRadius: 12,
              textTransform: "uppercase",
            }}
          >
            {type}
          </span>
          <span style={{ fontSize: 12, color: "#9A9A9A", fontFamily: "monospace" }}>
            {hash.slice(0, 7)}
          </span>
        </div>

        {/* Message */}
        <div
          style={{
            fontSize: 14,
            color: "#4A4A4A",
            lineHeight: 1.5,
          }}
        >
          {displayMessage}
          {showCursor && (
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 16,
                backgroundColor: BRAND_COLOR,
                marginLeft: 1,
                animation: "blink 0.5s infinite",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

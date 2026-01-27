import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

const BRAND_COLOR = "#345A5D";

type OutroSlideProps = {
  totalCommits: number;
};

export const OutroSlide = ({ totalCommits }: OutroSlideProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const statsY = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });

  const ctaOpacity = interpolate(frame, [25, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulseScale = interpolate(
    frame % 30,
    [0, 15, 30],
    [1, 1.05, 1],
    { extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: BRAND_COLOR,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Checkmark */}
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${titleScale})`,
          marginBottom: 40,
        }}
      >
        <span style={{ fontSize: 60 }}>
          &#10003;
        </span>
      </div>

      {/* Title */}
      <h1
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: "white",
          margin: 0,
          transform: `scale(${titleScale})`,
        }}
      >
        That's a wrap!
      </h1>

      {/* Stats */}
      <div
        style={{
          marginTop: 30,
          transform: `translateY(${interpolate(statsY, [0, 1], [20, 0])}px)`,
          opacity: statsY,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: "white",
            margin: 0,
          }}
        >
          {totalCommits} updates
        </p>
        <p
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.8)",
            margin: 0,
            marginTop: 8,
          }}
        >
          shipped today
        </p>
      </div>

      {/* CTA */}
      <div
        style={{
          marginTop: 50,
          padding: "20px 48px",
          backgroundColor: "white",
          borderRadius: 50,
          opacity: ctaOpacity,
          transform: `scale(${pulseScale})`,
        }}
      >
        <span
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: BRAND_COLOR,
          }}
        >
          chat.recoupable.com
        </span>
      </div>
    </div>
  );
};

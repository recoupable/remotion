import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

const BRAND_COLOR = "#345A5D";

export const IntroSlide = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const titleY = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });

  const subtitleOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
      {/* Logo Circle */}
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: "50%",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${logoScale})`,
          marginBottom: 40,
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        <span
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: BRAND_COLOR,
          }}
        >
          R
        </span>
      </div>

      {/* Title */}
      <h1
        style={{
          fontSize: 72,
          fontWeight: 700,
          color: "white",
          margin: 0,
          transform: `translateY(${interpolate(titleY, [0, 1], [30, 0])}px)`,
          opacity: titleY,
        }}
      >
        Recoup Updates
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 32,
          color: "rgba(255,255,255,0.8)",
          margin: 0,
          marginTop: 20,
          opacity: subtitleOpacity,
        }}
      >
        What we shipped today
      </p>
    </div>
  );
};

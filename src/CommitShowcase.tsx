import { useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from "remotion";
import { CommitMessage } from "./components/CommitMessage";

const BRAND_COLOR = "#345A5D";

interface Commit {
  hash: string;
  message: string;
  type: string;
  repo: string;
}

export interface CommitShowcaseProps {
  commits?: Commit[];
  artistName?: string;
  userName?: string;
}

interface ChatItem {
  title: string;
}

export const CommitShowcase: React.FC<CommitShowcaseProps> = ({
  commits = [],
  artistName = "Black Veil Brides",
  userName = "Black Sabbath",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // No rotation - keep content front and center for CTA focus
  const rotateY = 0;

  const sidebarSlide = spring({
    frame,
    fps,
    config: { damping: 20 },
  });

  const contentScale = spring({
    frame: frame - 5,
    fps,
    config: { damping: 15 },
  });

  // Commits are now passed as a flat array with repo labels
  const allCommits = commits;

  const recentChats: ChatItem[] = [
    { title: "Google Docs Integration" },
    { title: "Google Docs Integration" },
    { title: "Connecting to Google Drive" },
    { title: "New Artist Development" },
    { title: "New Artist Development" },
    { title: "Goosebytheway Overview" },
  ];

  // Calculate timing - each commit starts 50 frames after the previous
  const COMMIT_INTERVAL = 50;
  const INTRO_DELAY = 60; // Wait for page to load
  const COMMIT_HEIGHT = 90; // Approximate height of each commit message in pixels
  const VISIBLE_COMMITS = 5; // Number of commits visible before scrolling starts

  // Calculate scroll offset to keep latest commits in view
  const currentCommitIndex = Math.floor((frame - INTRO_DELAY) / COMMIT_INTERVAL);
  const scrollStartIndex = VISIBLE_COMMITS - 1; // Start scrolling after this many commits
  const scrollOffset = currentCommitIndex > scrollStartIndex
    ? interpolate(
        frame,
        [
          INTRO_DELAY + scrollStartIndex * COMMIT_INTERVAL,
          INTRO_DELAY + (allCommits.length - 1) * COMMIT_INTERVAL + 30
        ],
        [0, (allCommits.length - VISIBLE_COMMITS) * COMMIT_HEIGHT],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 0;

  // CTA timing - appears after all commits have shown
  const lastCommitEnd = INTRO_DELAY + (allCommits.length - 1) * COMMIT_INTERVAL + 45;
  const ctaStartFrame = lastCommitEnd + 30;

  const ctaOpacity = interpolate(frame, [ctaStartFrame, ctaStartFrame + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaScale = spring({
    frame: frame - ctaStartFrame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E8E8E8",
        perspective: 1500,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#FAFAFA",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          opacity: fadeIn,
          transform: `rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          boxShadow: "0 25px 80px rgba(0,0,0,0.15)",
        }}
      >
      {/* Left Sidebar */}
      <div
        style={{
          width: 260,
          height: "100%",
          backgroundColor: "#FFFFFF",
          borderRight: "1px solid #E5E5E5",
          display: "flex",
          flexDirection: "column",
          padding: "16px 12px",
          transform: `translateX(${interpolate(sidebarSlide, [0, 1], [-260, 0])}px)`,
        }}
      >
        {/* Logo */}
        <div style={{ width: 32, height: 32, marginBottom: 16 }}>
          <Img
            src={staticFile("recoup-logo.png")}
            style={{ width: 32, height: 32, objectFit: "contain" }}
          />
        </div>

        {/* New Chat Button */}
        <button
          style={{
            width: "100%",
            padding: "12px 16px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E5E5",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
            color: "#1A1A1A",
            marginBottom: 24,
          }}
        >
          New Chat
        </button>

        {/* Navigation */}
        <nav style={{ marginBottom: 24 }}>
          {[
            { icon: "👥", label: "Agents" },
            { icon: "⏱", label: "Tasks" },
            { icon: "📁", label: "Files" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
                borderRadius: 6,
                fontSize: 14,
                color: "#4A4A4A",
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>

        {/* Recent Chats */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "#8A8A8A",
              marginBottom: 8,
              paddingLeft: 12,
            }}
          >
            Recent Chats
          </div>
          {recentChats.map((chat, i) => (
            <div
              key={i}
              style={{
                padding: "8px 12px",
                fontSize: 13,
                color: "#4A4A4A",
                borderRadius: 6,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {chat.title}
            </div>
          ))}
        </div>

        {/* Pro Badge */}
        <div
          style={{
            padding: "10px 16px",
            backgroundColor: "#F5F5F5",
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 500,
            color: "#1A1A1A",
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          Recoupable Pro: Active
        </div>

        {/* User */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 0",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#E5E5E5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 600,
              color: "#666",
            }}
          >
            {userName.charAt(0)}
          </div>
          <span style={{ fontSize: 13, color: "#666" }}>{userName}</span>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "32px 40px",
          transform: `scale(${interpolate(contentScale, [0, 1], [0.95, 1])})`,
          opacity: interpolate(contentScale, [0, 1], [0, 1]),
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
            paddingBottom: 16,
            borderBottom: "1px solid #E5E5E5",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <Img
                src={staticFile("recoup-logo.png")}
                style={{ width: 40, height: 40, objectFit: "contain" }}
              />
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 600, color: "#1A1A1A" }}>
                Recoup Updates
              </div>
              <div style={{ fontSize: 13, color: "#8A8A8A" }}>
                What we shipped in the last 24 hours
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#8A8A8A",
              backgroundColor: "#F5F5F5",
              padding: "6px 12px",
              borderRadius: 16,
            }}
          >
            {allCommits.length} commits
          </div>
        </div>

        {/* Commits Feed */}
        <div
          style={{
            flex: 1,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              transform: `translateY(-${scrollOffset}px)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            {allCommits.map((commit, index) => (
              <CommitMessage
                key={`${commit.repo}-${commit.hash}`}
                hash={commit.hash}
                message={commit.message}
                repo={commit.repo}
                type={commit.type}
                startFrame={INTRO_DELAY + index * COMMIT_INTERVAL}
              />
            ))}
          </div>
        </div>

        {/* Footer Input */}
        <div
          style={{
            marginTop: 16,
            padding: "12px 16px",
            backgroundColor: "#FFFFFF",
            borderRadius: 12,
            border: "1px solid #E5E5E5",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 14, color: "#9A9A9A" }}>
            Ask about these updates...
          </span>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#1A1A1A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Avatar Strip */}
      <div
        style={{
          width: 56,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px 0",
          gap: 6,
          backgroundColor: "#FAFAFA",
        }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: i % 3 === 0 ? "#E5E5E5" : "#333",
              border: "2px solid #FFF",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          />
        ))}
        <div
          style={{
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            color: "#9A9A9A",
          }}
        >
          +
        </div>
      </div>

      {/* CTA Overlay */}
      {frame >= ctaStartFrame && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(52, 90, 93, 0.95)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: ctaOpacity,
            gap: 24,
          }}
        >
          <div
            style={{
              transform: `scale(${interpolate(ctaScale, [0, 1], [0.8, 1])})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
            }}
          >
            <Img
              src={staticFile("recoup-logo.png")}
              style={{ width: 80, height: 80, objectFit: "contain" }}
            />
            <div
              style={{
                fontSize: 42,
                fontWeight: 700,
                color: "white",
                textAlign: "center",
              }}
            >
              Build your own record label
            </div>
            <div
              style={{
                fontSize: 24,
                color: "rgba(255,255,255,0.9)",
                backgroundColor: "rgba(255,255,255,0.15)",
                padding: "12px 32px",
                borderRadius: 12,
                fontWeight: 500,
              }}
            >
              recoupable.com
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

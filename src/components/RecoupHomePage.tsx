import { useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from "remotion";

const BRAND_COLOR = "#345A5D";

interface ChatItem {
  title: string;
}

interface RecoupHomePageProps {
  artistName?: string;
  artistImage?: string;
  recentChats?: ChatItem[];
  userName?: string;
}

export const RecoupHomePage: React.FC<RecoupHomePageProps> = ({
  artistName = "Black Veil Brides",
  artistImage,
  recentChats = [
    { title: "Google Docs Integration" },
    { title: "Google Docs Integration" },
    { title: "Google Docs Integration" },
    { title: "Google Docs Integration" },
    { title: "Google Docs Integration" },
    { title: "Connecting to Google Drive" },
    { title: "New Artist Development" },
    { title: "New Artist Development" },
    { title: "New Artist Development" },
    { title: "Goosebytheway Overview" },
  ],
  userName = "Black Sabbath",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

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

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: "#FAFAFA",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        opacity: fadeIn,
      }}
    >
      {/* Left Sidebar */}
      <div
        style={{
          width: 280,
          height: "100%",
          backgroundColor: "#FFFFFF",
          borderRight: "1px solid #E5E5E5",
          display: "flex",
          flexDirection: "column",
          padding: "16px 12px",
          transform: `translateX(${interpolate(sidebarSlide, [0, 1], [-280, 0])}px)`,
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: 32,
            height: 32,
            marginBottom: 16,
          }}
        >
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
            cursor: "pointer",
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
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
          transform: `scale(${interpolate(contentScale, [0, 1], [0.95, 1])})`,
          opacity: interpolate(contentScale, [0, 1], [0, 1]),
        }}
      >
        {/* Ask me about */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontSize: 36,
              fontWeight: 500,
              color: "#1A1A1A",
            }}
          >
            Ask me about
          </span>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: "#333",
              overflow: "hidden",
            }}
          >
            {artistImage && (
              <Img
                src={artistImage}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </div>
          <span
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: "#1A1A1A",
            }}
          >
            {artistName}
          </span>
        </div>

        {/* Chat Input */}
        <div
          style={{
            width: "100%",
            maxWidth: 720,
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            border: "1px solid #E5E5E5",
            padding: "16px 20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <div
            style={{
              fontSize: 15,
              color: "#9A9A9A",
              marginBottom: 16,
            }}
          >
            What would you like to know? Type @ to attach files
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* Attachment Icon */}
              <div
                style={{
                  width: 24,
                  height: 24,
                  color: "#9A9A9A",
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                </svg>
              </div>
              {/* Model Selector */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 14,
                  color: "#4A4A4A",
                }}
              >
                Claude Opus 4.5
                <span style={{ fontSize: 10, color: "#9A9A9A" }}>▼</span>
              </div>
            </div>
            {/* Send Button */}
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "#1A1A1A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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
      </div>

      {/* Right Sidebar - Avatar Strip */}
      <div
        style={{
          width: 64,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px 0",
          gap: 8,
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: i % 3 === 0 ? "#E5E5E5" : "#333",
              border: "2px solid #FFF",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          />
        ))}
        {/* Plus Button */}
        <div
          style={{
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            color: "#9A9A9A",
          }}
        >
          +
        </div>
      </div>
    </div>
  );
};

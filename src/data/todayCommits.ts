import { CommitShowcaseProps } from "../CommitShowcase";

// Commits from the past 24 hours (Jan 26, 2026)
// Flat array ordered for maximum marketing impact
export const todayCommits: CommitShowcaseProps["commits"] = [
  // 1. HOOK - Lead with user empowerment (control over their tools)
  { hash: "387aa120", message: "Add toggle to activate/deactivate pulse", type: "feat", repo: "Recoup-Chat" },

  // 2. SHOW THE FULL STACK - Pulse feature spans Chat → API → Database (impressive!)
  { hash: "61977b7", message: "Add GET and PATCH /api/pulse endpoints", type: "feat", repo: "Recoup-API" },
  { hash: "f901232", message: "Create pulse_accounts table", type: "feat", repo: "Recoup-Supabase" },

  // 3. AI-POWERED TOOLS - The magic that makes Recoup special
  { hash: "6bd8a7a5", message: "Add UI components for GetPulse and UpdatePulse MCP tools", type: "feat", repo: "Recoup-Chat" },
  { hash: "0d886fb", message: "Add MCP tools for GetPulse and UpdatePulse", type: "feat", repo: "Recoup-API" },

  // 4. POLISH & UX - We care about the details
  { hash: "8b4a8506", message: "Add clickable title to PulseToolResult with prefetch", type: "feat", repo: "Recoup-Chat" },
  { hash: "8f4be34", message: "Support Bearer token authentication for pulse", type: "fix", repo: "Recoup-API" },

  // 5. DEVELOPER EXPERIENCE - We're serious about being a platform
  { hash: "b63e71c", message: "Add GET and PATCH /api/pulse endpoint documentation", type: "docs", repo: "Recoup-Docs" },

  // 6. BURY THE CHORES - Necessary but not exciting
  { hash: "c25615f3", message: "Remove cursor code review GitHub action", type: "chore", repo: "Recoup-Chat" },
  { hash: "282fd4a", message: "Add remotion-best-practices source files", type: "chore", repo: "Recoup-Monorepo" },
  { hash: "aff77cb", message: "Add remotion-best-practices agent skills", type: "chore", repo: "Recoup-Monorepo" },

  // 7. CLIMAX - End with exciting new capability: VIDEO CREATION!
  { hash: "36ea2be", message: "Add Recoup-Remotion submodule", type: "feat", repo: "Recoup-Monorepo" },
  { hash: "dcfe68d", message: "Initial commit: Remotion video project setup", type: "feat", repo: "Recoup-Remotion" },
];

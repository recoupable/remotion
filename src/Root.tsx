import { Composition } from "remotion";
import { UpdatesAnnouncement, UpdatesAnnouncementProps } from "./UpdatesAnnouncement";
import { RecoupHomePage } from "./components/RecoupHomePage";
import { CommitShowcase, CommitShowcaseProps } from "./CommitShowcase";

const FPS = 30;
const INTRO_DURATION = 2 * FPS;
const CATEGORY_DURATION = 1.5 * FPS;
const COMMIT_DURATION = 2.5 * FPS;
const OUTRO_DURATION = 3 * FPS;
const TRANSITION_DURATION = 15;

const commits: UpdatesAnnouncementProps["commits"] = {
  "Recoup-Chat": [
    { hash: "03491480", message: "Display correct platform names in artist socials UI", type: "fix" },
    { hash: "24890502", message: "Remove setupChatRequest.ts and orphan files", type: "cleanup" },
    { hash: "050199ce", message: "Remove legacy toolChains directory", type: "cleanup" },
    { hash: "168d9bab", message: "Remove evals from Recoup-Chat", type: "chore" },
    { hash: "54caed74", message: "Use stable test URL for NEW_API_BASE_URL", type: "fix" },
    { hash: "7b45f442", message: "Remove SMS handler", type: "chore" },
    { hash: "6112d595", message: "Prevent recent chats flashing during background refetches", type: "fix" },
  ],
  "Recoup-API": [
    { hash: "302a62b", message: "Add Braintrust evals GitHub Action workflow", type: "ci" },
    { hash: "b6fb0bd", message: "Require passing tests before merging PRs", type: "ci" },
    { hash: "08fc2f5", message: "Do not delete artist socials when no replacement URL provided", type: "fix" },
    { hash: "262994a", message: "Simplify knowledge base creation", type: "fix" },
  ],
};

// Commits from the past 24 hours (Jan 26, 2026)
// Flat array ordered for maximum marketing impact
const todayCommits: CommitShowcaseProps["commits"] = [
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

const todayTotalCommits = todayCommits.length;
const COMMIT_SHOWCASE_INTERVAL = 50;
const COMMIT_SHOWCASE_INTRO = 60;
const COMMIT_SHOWCASE_OUTRO = 90;
const commitShowcaseDuration = COMMIT_SHOWCASE_INTRO + todayTotalCommits * COMMIT_SHOWCASE_INTERVAL + COMMIT_SHOWCASE_OUTRO;

const categories = Object.keys(commits);
const totalCommits = Object.values(commits).flat().length;
const categoryCount = categories.length;

const totalDuration =
  INTRO_DURATION +
  categoryCount * CATEGORY_DURATION +
  totalCommits * COMMIT_DURATION +
  OUTRO_DURATION -
  (categoryCount + totalCommits) * TRANSITION_DURATION;

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="UpdatesAnnouncement"
        component={UpdatesAnnouncement}
        durationInFrames={Math.ceil(totalDuration)}
        fps={FPS}
        width={1080}
        height={1080}
        defaultProps={{
          commits,
          introDuration: INTRO_DURATION,
          categoryDuration: CATEGORY_DURATION,
          commitDuration: COMMIT_DURATION,
          outroDuration: OUTRO_DURATION,
          transitionDuration: TRANSITION_DURATION,
        } satisfies UpdatesAnnouncementProps}
      />
      <Composition
        id="RecoupHomePage"
        component={RecoupHomePage}
        durationInFrames={3 * FPS}
        fps={FPS}
        width={1280}
        height={1000}
        defaultProps={{
          artistName: "Black Veil Brides",
          recentChats: [
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
          userName: "Black Sabbath",
        }}
      />
      <Composition
        id="CommitShowcase"
        component={CommitShowcase}
        durationInFrames={commitShowcaseDuration}
        fps={FPS}
        width={1280}
        height={1000}
        defaultProps={{
          commits: todayCommits,
          artistName: "Black Veil Brides",
          userName: "Black Sabbath",
        } satisfies CommitShowcaseProps}
      />
    </>
  );
};

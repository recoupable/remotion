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

// Commits from the past 24 hours (Jan 23, 2026)
const todayCommits: CommitShowcaseProps["commits"] = {
  "Recoup-Chat": [
    { hash: "68849b21", message: "Add query param api override for transport URL", type: "feat" },
    { hash: "11c2beb9", message: "Pulse Article onClick Design", type: "feat" },
    { hash: "3fb4f95a", message: "Require login to view Pulse content", type: "feat" },
    { hash: "6337f8f3", message: "Pulse landing page design", type: "feat" },
    { hash: "de24ba85", message: "Add /pulse page route", type: "feat" },
  ],
  "Recoup-API": [
    { hash: "7b3af1d", message: "Add POST /api/sandbox endpoint", type: "feat" },
    { hash: "3d56415", message: "Add Google Drive and Google Docs to enabled toolkits", type: "feat" },
  ],
};

const todayTotalCommits = Object.values(todayCommits).flat().length;
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

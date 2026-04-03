# Agent Instructions

This file provides guidance to coding agents like Claude Code (claude.ai/code) and OpenCode when working with code in this repository.

## Agent Skill

Use `/remotion-best-practices` when working on Remotion video code. This skill provides best practices for video creation in React.

## Code Principles

Follow the shared code principles from the monorepo:
- **SRP**: One exported function per file
- **DRY**: Extract shared logic into utilities
- **KISS**: Simple solutions over clever ones
- **YAGNI**: Don't build for hypothetical future needs

## Build Commands

```bash
npm install              # Install dependencies
npm run dev              # Start Remotion Studio (preview videos in browser)
npm run build            # Render UpdatesAnnouncement to out/update-video.mp4
npm run build:gif        # Render UpdatesAnnouncement to out/update-video.gif
npm run build:homepage   # Render RecoupHomePage to out/recoup-homepage.mp4
npm run build:showcase   # Render CommitShowcase to out/commit-showcase.mp4
```

## Architecture

This is a Remotion 4.x project that serves as the **central composition library** for all Recoup video rendering — both local development previews and hosted API rendering via `POST /api/video/render`.

## How Compositions Are Used

Compositions defined here are used in two ways:

### 1. Local Usage (Development & Preview)

Run `npm run dev` to open Remotion Studio in the browser. You can preview any registered composition, tweak `inputProps`, and render locally. This is the standard Remotion development workflow — useful for building and testing new compositions before deploying them.

### 2. Hosted Usage (API Rendering via Trigger.dev)

The `POST /api/video/render` endpoint (in the `api` repo) triggers a background task on Trigger.dev (in the `tasks` repo) that renders any registered composition server-side. The flow:

1. Caller sends `POST /api/video/render` with `compositionId`, `inputProps`, dimensions, fps, etc.
2. API authenticates the request and triggers the `render-video` Trigger.dev task
3. The task bundles the Remotion project, selects the composition by ID, and renders it with `renderMedia()`
4. The rendered `.mp4` is uploaded to Supabase Storage and a signed URL (7-day expiry) is returned

**Important:** The `tasks` repo has its own copy of the compositions in `tasks/src/remotion/`. When you add or change a composition here, you must also update the copy in `tasks/src/remotion/` and redeploy the task worker (`cd tasks && pnpm run deploy:trigger-prod`).

### Deployment Checklist (Adding a New Composition)

1. Create the component in `src/components/YourComposition.tsx`
2. Register it as a `<Composition>` in `src/Root.tsx` with default props
3. Test locally with `npm run dev`
4. Copy the component to `tasks/src/remotion/components/YourComposition.tsx`
5. Register it in `tasks/src/remotion/Root.tsx` (mirrors this repo's Root.tsx)
6. Deploy the task worker: `cd tasks && pnpm run deploy:trigger-prod`
7. Now `POST /api/video/render` with `compositionId: "YourComposition"` will work

## Video Compositions

Five compositions are defined in `src/Root.tsx`:

### Internal / Marketing Compositions

1. **UpdatesAnnouncement** (1080x1080) — Weekly changelog video showing commits across repos
   - Uses `@remotion/transitions` for slide/fade effects between slides
   - Sequence: Intro → Category headers → Individual commits → Outro

2. **CommitShowcase** (1280x1000) — Daily commit feed in a chat UI mockup
   - Simulates the Recoup chat interface with commits appearing as messages
   - 3D perspective rotation effect throughout the video
   - Ends with branded CTA overlay

3. **RecoupHomePage** (1280x1000) — Static mockup of the Recoup chat homepage

### Content Creation Compositions (API-renderable)

These are used by the content creation pipeline and are available via `POST /api/video/render`:

4. **SocialPost** (720x1280, 9:16 portrait) — Full social media post composition
   - Center-crops 16:9 source video to 9:16 portrait
   - Overlays song audio (skipped in lip-sync mode when `hasAudio: true`)
   - TikTok-style caption text (white with black stroke, bottom center)
   - Uses TikTok Sans font from `public/TikTokSans-Regular.ttf`
   - `inputProps`: `videoUrl`, `audioSrc`, `captionText`, `hasAudio`, `audioStartSeconds`

5. **CropPreview** (720x1280, 9:16 portrait) — Simple center-crop preview
   - Center-crops 16:9 landscape video to 9:16 portrait
   - No audio, no captions — just the visual crop
   - Useful for previewing how a video will look in portrait before full rendering
   - `inputProps`: `videoUrl`

## Component Structure

- `src/Root.tsx` — Registers all compositions
- `src/UpdatesAnnouncement.tsx` — Main marketing composition using TransitionSeries
- `src/CommitShowcase.tsx` — Chat-style commit feed with typing animations
- `src/components/` — Reusable components:
  - `SocialPost.tsx` — Full social post with crop + audio + captions
  - `CroppedVideo.tsx` — Simple 16:9 → 9:16 center crop
  - `IntroSlide.tsx`, `OutroSlide.tsx` — Bookend slides for marketing videos
  - `CategorySlide.tsx` — Repository header (e.g., "Recoup-Chat")
  - `CommitSlide.tsx` — Individual commit display (used in UpdatesAnnouncement)
  - `CommitMessage.tsx` — Chat-style commit message (used in CommitShowcase)
  - `RecoupHomePage.tsx` — Static homepage mockup

## Key Patterns

- Commit data lives in `src/data/todayCommits.ts` as typed objects with `hash`, `message`, `type`, and `repo` fields
- Type badges use color maps defined per component (`typeColors`, `categoryColors`)
- Brand color: `#345A5D`
- All animations use Remotion's `spring()` and `interpolate()` utilities
- Static assets (logos, fonts) are in `public/` and loaded via `staticFile()`
- Browser-only APIs like `FontFace` must be guarded with `typeof globalThis.FontFace !== "undefined"` for Node.js compatibility (server-side rendering in Trigger.dev)

## Timing Configuration

Frame-based timing is defined in `src/Root.tsx`:
- FPS: 30
- Durations are calculated in frames (e.g., `2 * FPS` for 2 seconds)
- Transition duration: 15 frames

## Composition Design Guidelines

When building new compositions, follow these rules so they work with both local preview AND the hosted render API:

1. **All customization through `inputProps`** — compositions must accept everything they need (media URLs, text, colors, toggles) as props. No hardcoded artist-specific data.
2. **Export the props interface** — every composition needs an exported `YourCompositionProps` type so `Root.tsx` can use `satisfies` for type-safe default props.
3. **Guard browser-only APIs** — wrap `FontFace`, `document`, `window` calls with `typeof globalThis.X !== "undefined"` checks. The composition runs in Node.js (headless Chrome) during API renders.
4. **Use `OffthreadVideo` not `Video`** — `OffthreadVideo` is required for server-side rendering.
5. **Keep media external** — pass media URLs as props. Don't bundle large assets into the composition. Fonts in `public/` are fine.

## Roadmap: Expanding the Composition Library

### Current: Option A — Pre-built Composition Library

We build and maintain a library of compositions. Users select from available compositions (by `compositionId`) and customize via `inputProps`. Examples of future compositions:

- **LyricVideo** — Full-screen video with word-by-word synced lyrics
- **PhotoSlideshow** — Ken Burns effect across multiple images with music
- **SplitScreen** — Side-by-side or top-bottom video comparison
- **TextOverlay** — Animated text on solid/gradient backgrounds
- **BeforeAfter** — Transition wipe between two clips

Each composition is a React component with typed `inputProps` for customization (colors, fonts, text, media URLs, timing). The trade-off: users depend on us to build new styles.

### Future: Option B — Template-Driven Compositions

Build ONE flexible composition that reads a JSON template config defining the layout, effects, text positions, and transitions. Users create **templates** (JSON), not code. Like how Canva works — the rendering engine is fixed, but templates are user-created.

This is similar to how the content-creation-app's `template.json` already works — it defines image prompts, video moods, caption guides, etc. The composition would interpret that JSON to produce different visual styles from a single codebase.

This approach eliminates the need for code deployments when adding new styles, but requires upfront investment in a flexible composition engine.

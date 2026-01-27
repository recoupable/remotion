# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Agent Skill

Use `/remotion-best-practices` when working on Remotion video code. This skill provides best practices for video creation in React.

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

This is a Remotion 4.x project for creating marketing videos for the Recoup platform.

### Video Compositions

Three compositions are defined in `src/Root.tsx`:

1. **UpdatesAnnouncement** (1080x1080) - Weekly changelog video showing commits across repos
   - Uses `@remotion/transitions` for slide/fade effects between slides
   - Sequence: Intro → Category headers → Individual commits → Outro

2. **CommitShowcase** (1280x1000) - Daily commit feed in a chat UI mockup
   - Simulates the Recoup chat interface with commits appearing as messages
   - 3D perspective rotation effect throughout the video
   - Ends with branded CTA overlay

3. **RecoupHomePage** (1280x1000) - Static mockup of the Recoup chat homepage

### Component Structure

- `src/UpdatesAnnouncement.tsx` - Main composition using TransitionSeries
- `src/CommitShowcase.tsx` - Chat-style commit feed with typing animations
- `src/components/` - Reusable slide components:
  - `IntroSlide.tsx`, `OutroSlide.tsx` - Bookend slides
  - `CategorySlide.tsx` - Repository header (e.g., "Recoup-Chat")
  - `CommitSlide.tsx` - Individual commit display (used in UpdatesAnnouncement)
  - `CommitMessage.tsx` - Chat-style commit message (used in CommitShowcase)
  - `RecoupHomePage.tsx` - Static homepage mockup

### Key Patterns

- Commit data lives in `src/data/todayCommits.ts` as typed objects with `hash`, `message`, `type`, and `repo` fields
- Type badges use color maps defined per component (`typeColors`, `categoryColors`)
- Brand color: `#345A5D`
- All animations use Remotion's `spring()` and `interpolate()` utilities
- Static assets (logos) are in `public/` and loaded via `staticFile()`

### Timing Configuration

Frame-based timing is defined in `src/Root.tsx`:
- FPS: 30
- Durations are calculated in frames (e.g., `2 * FPS` for 2 seconds)
- Transition duration: 15 frames

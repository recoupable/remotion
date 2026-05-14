import { Series } from "remotion";
import type { ContentApiLaunchData } from "./data/contentApiLaunchData";
import { AgentPromptScene } from "./components/content-api-launch/AgentPromptScene";
import { ApiPromiseScene } from "./components/content-api-launch/ApiPromiseScene";
import { ArtistContextScene } from "./components/content-api-launch/ArtistContextScene";
import { BenefitClaimScene } from "./components/content-api-launch/BenefitClaimScene";
import { BrandSeedScene } from "./components/content-api-launch/BrandSeedScene";
import { CtaScene } from "./components/content-api-launch/CtaScene";
import { OutputGridScene } from "./components/content-api-launch/OutputGridScene";
import { PrimitiveFanOutScene } from "./components/content-api-launch/PrimitiveFanOutScene";
import { RequestScene } from "./components/content-api-launch/RequestScene";

export const CONTENT_API_LAUNCH_FPS = 30;

export const CONTENT_API_LAUNCH_SCENE_FRAMES = {
  brandSeed: 42,
  artistContext: 54,
  apiPromise: 66,
  request: 118,
  primitiveFanOut: 84,
  agentPrompt: 86,
  outputGrid: 130,
  benefitClaim: 76,
  cta: 60,
} as const;

export const CONTENT_API_LAUNCH_TOTAL_FRAMES = Object.values(CONTENT_API_LAUNCH_SCENE_FRAMES).reduce(
  (total, frames) => total + frames,
  0,
);

export type ContentApiArtistLaunchProps = {
  data: ContentApiLaunchData;
};

export const ContentApiArtistLaunch = ({ data }: ContentApiArtistLaunchProps) => {
  return (
    <Series>
      <Series.Sequence durationInFrames={CONTENT_API_LAUNCH_SCENE_FRAMES.brandSeed}>
        <BrandSeedScene data={data} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={CONTENT_API_LAUNCH_SCENE_FRAMES.artistContext}>
        <ArtistContextScene data={data} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={CONTENT_API_LAUNCH_SCENE_FRAMES.apiPromise}>
        <ApiPromiseScene data={data} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={CONTENT_API_LAUNCH_SCENE_FRAMES.request}>
        <RequestScene data={data} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={CONTENT_API_LAUNCH_SCENE_FRAMES.primitiveFanOut}>
        <PrimitiveFanOutScene data={data} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={CONTENT_API_LAUNCH_SCENE_FRAMES.agentPrompt}>
        <AgentPromptScene data={data} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={CONTENT_API_LAUNCH_SCENE_FRAMES.outputGrid}>
        <OutputGridScene data={data} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={CONTENT_API_LAUNCH_SCENE_FRAMES.benefitClaim}>
        <BenefitClaimScene data={data} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={CONTENT_API_LAUNCH_SCENE_FRAMES.cta}>
        <CtaScene data={data} />
      </Series.Sequence>
    </Series>
  );
};

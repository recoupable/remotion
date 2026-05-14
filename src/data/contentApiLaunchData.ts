export type ContentApiLaunchData = {
  productName: string;
  endpoint: string;
  audienceLine: string;
  promise: string;
  artistName: string;
  songName: string;
  prompt: string;
  outputTypes: string[];
  assetLabels: string[];
  benefitClaim: string;
  cta: string;
};

export const contentApiLaunchData: ContentApiLaunchData = {
  productName: "Recoup",
  endpoint: "POST /api/content/create",
  audienceLine: "For music artists shipping every week.",
  promise: "One API call generates the content stack.",
  artistName: "Gatsby Grace",
  songName: "next single",
  prompt: "Generate launch content for Gatsby Grace's next single.",
  outputTypes: ["image", "video", "text", "audio", "render", "upscale"],
  assetLabels: ["cover art", "9:16 teaser", "lyric caption", "hook waveform", "rendered MP4", "upscale before/after"],
  benefitClaim: "24 artist assets. one API call.",
  cta: "developers.recoupable.com",
};

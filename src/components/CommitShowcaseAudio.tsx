import { useCallback, useEffect, useState } from "react";
import { Sequence, useVideoConfig, delayRender, continueRender, interpolate } from "remotion";
import { Audio } from "@remotion/media";
import { generatePopTone } from "../lib/audio/generatePopTone";
import { generateWhooshTone } from "../lib/audio/generateWhooshTone";
import { generateAmbientTone } from "../lib/audio/generateAmbientTone";

interface CommitShowcaseAudioProps {
  commits: { hash: string }[];
  ctaStartFrame: number;
  introDelay: number;
  commitInterval: number;
  enableBackgroundMusic?: boolean;
}

export const CommitShowcaseAudio: React.FC<CommitShowcaseAudioProps> = ({
  commits,
  ctaStartFrame,
  introDelay,
  commitInterval,
  enableBackgroundMusic = false,
}) => {
  const { fps, durationInFrames } = useVideoConfig();
  const [popTone, setPopTone] = useState<string | null>(null);
  const [whooshTone, setWhooshTone] = useState<string | null>(null);
  const [ambientTone, setAmbientTone] = useState<string | null>(null);
  const [handle] = useState(() => delayRender("Generating audio"));

  const generateAudio = useCallback(async () => {
    try {
      const [pop, whoosh, ambient] = await Promise.all([
        generatePopTone(),
        generateWhooshTone(),
        enableBackgroundMusic
          ? generateAmbientTone(durationInFrames / fps)
          : Promise.resolve(null),
      ]);

      setPopTone(pop);
      setWhooshTone(whoosh);
      setAmbientTone(ambient);
      continueRender(handle);
    } catch (err) {
      console.error("Failed to generate audio:", err);
      continueRender(handle);
    }
  }, [durationInFrames, fps, enableBackgroundMusic, handle]);

  useEffect(() => {
    generateAudio();
  }, [generateAudio]);

  if (!popTone || !whooshTone) {
    return null;
  }

  return (
    <>
      {/* Background Ambient Tone (optional) */}
      {enableBackgroundMusic && ambientTone && (
        <Audio
          src={ambientTone}
          volume={(f) =>
            f < ctaStartFrame - introDelay
              ? 1
              : interpolate(f, [ctaStartFrame - introDelay, ctaStartFrame - introDelay + 30], [1, 0.3], {
                  extrapolateRight: "clamp",
                })
          }
        />
      )}

      {/* Commit Pop Sound Effects */}
      {commits.map((commit, index) => (
        <Sequence key={`sfx-${commit.hash}`} from={introDelay + index * commitInterval}>
          <Audio src={popTone} volume={0.6} />
        </Sequence>
      ))}

      {/* CTA Whoosh Sound */}
      <Sequence from={ctaStartFrame}>
        <Audio src={whooshTone} volume={0.8} />
      </Sequence>
    </>
  );
};

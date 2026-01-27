import { Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { interpolate } from "remotion";

interface CommitShowcaseAudioProps {
  commits: { hash: string }[];
  ctaStartFrame: number;
  introDelay: number;
  commitInterval: number;
}

export const CommitShowcaseAudio: React.FC<CommitShowcaseAudioProps> = ({
  commits,
  ctaStartFrame,
  introDelay,
  commitInterval,
}) => {
  return (
    <>
      {/* Background Music */}
      <Audio
        src={staticFile("audio/background-music.mp3")}
        volume={(f) =>
          f < ctaStartFrame - introDelay
            ? 0.3
            : interpolate(f, [ctaStartFrame - introDelay, ctaStartFrame - introDelay + 30], [0.3, 0.1], {
                extrapolateRight: "clamp",
              })
        }
        loop
      />

      {/* Commit Pop Sound Effects */}
      {commits.map((commit, index) => (
        <Sequence key={`sfx-${commit.hash}`} from={introDelay + index * commitInterval}>
          <Audio src={staticFile("audio/commit-pop.mp3")} volume={0.5} />
        </Sequence>
      ))}

      {/* CTA Whoosh Sound */}
      <Sequence from={ctaStartFrame}>
        <Audio src={staticFile("audio/cta-whoosh.mp3")} volume={0.7} />
      </Sequence>
    </>
  );
};

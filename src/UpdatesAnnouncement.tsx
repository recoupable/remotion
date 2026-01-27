import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { IntroSlide } from "./components/IntroSlide";
import { CategorySlide } from "./components/CategorySlide";
import { CommitSlide } from "./components/CommitSlide";
import { OutroSlide } from "./components/OutroSlide";

type Commit = {
  hash: string;
  message: string;
  type: string;
};

export type UpdatesAnnouncementProps = {
  commits: Record<string, Commit[]>;
  introDuration: number;
  categoryDuration: number;
  commitDuration: number;
  outroDuration: number;
  transitionDuration: number;
};

export const UpdatesAnnouncement = ({
  commits,
  introDuration,
  categoryDuration,
  commitDuration,
  outroDuration,
  transitionDuration,
}: UpdatesAnnouncementProps) => {
  const categories = Object.keys(commits);
  const timing = linearTiming({ durationInFrames: transitionDuration });

  return (
    <TransitionSeries>
      {/* Intro */}
      <TransitionSeries.Sequence durationInFrames={introDuration}>
        <IntroSlide />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={timing}
      />

      {/* Categories and Commits */}
      {categories.map((category, catIndex) => (
        <>
          {/* Category Header */}
          <TransitionSeries.Sequence
            key={`cat-${category}`}
            durationInFrames={categoryDuration}
          >
            <CategorySlide name={category} commitCount={commits[category].length} />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition
            presentation={fade()}
            timing={timing}
          />

          {/* Commits in Category */}
          {commits[category].map((commit, commitIndex) => (
            <>
              <TransitionSeries.Sequence
                key={`commit-${commit.hash}`}
                durationInFrames={commitDuration}
              >
                <CommitSlide
                  message={commit.message}
                  type={commit.type}
                  index={commitIndex + 1}
                  total={commits[category].length}
                  category={category}
                />
              </TransitionSeries.Sequence>
              <TransitionSeries.Transition
                presentation={
                  commitIndex === commits[category].length - 1 &&
                  catIndex < categories.length - 1
                    ? slide({ direction: "from-right" })
                    : fade()
                }
                timing={timing}
              />
            </>
          ))}
        </>
      ))}

      {/* Outro */}
      <TransitionSeries.Sequence durationInFrames={outroDuration}>
        <OutroSlide totalCommits={Object.values(commits).flat().length} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

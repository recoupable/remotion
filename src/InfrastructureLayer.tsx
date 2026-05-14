import React from "react";
import { Series } from "remotion";
import { LogoFormation } from "./components/pixel/scenes/LogoFormation";
import { LogoSplit } from "./components/pixel/scenes/LogoSplit";
import { LogoSettle } from "./components/pixel/scenes/LogoSettle";
import { LogoInversion } from "./components/pixel/scenes/LogoInversion";
import { ParticleScatter } from "./components/pixel/scenes/ParticleScatter";
import { MusicHero } from "./components/pixel/scenes/MusicHero";
import { HeroVariation } from "./components/pixel/scenes/HeroVariation";
import { LetterHero } from "./components/pixel/scenes/LetterHero";
import { LetterPair } from "./components/pixel/scenes/LetterPair";
import { AtomShowcase } from "./components/pixel/scenes/AtomShowcase";
import { InfrastructureHero } from "./components/pixel/scenes/InfrastructureHero";
import { TripleSpecimen } from "./components/pixel/scenes/TripleSpecimen";
import { BigWordHero } from "./components/pixel/scenes/BigWordHero";
import { WorkloadStack } from "./components/pixel/scenes/WorkloadStack";
import { TerminalLog } from "./components/pixel/scenes/TerminalLog";
import { CommandLine } from "./components/pixel/scenes/CommandLine";
import { InversionCard } from "./components/pixel/scenes/InversionCard";
import { WordmarkHero } from "./components/pixel/scenes/WordmarkHero";
import { RecoupableOutro } from "./components/pixel/scenes/RecoupableOutro";
import { TransitionLineDraw } from "./components/pixel/scenes/TransitionLineDraw";
import { TransitionAtomBurst } from "./components/pixel/scenes/TransitionAtomBurst";
import { TransitionFlash } from "./components/pixel/scenes/TransitionFlash";
import { AutonomousLoop } from "./components/pixel/scenes/AutonomousLoop";
import { AgentRing } from "./components/pixel/scenes/AgentRing";
import { TextCycle } from "./components/pixel/scenes/TextCycle";
import { QuadrantSplit } from "./components/pixel/scenes/QuadrantSplit";
import { SliceWipe } from "./components/pixel/scenes/SliceWipe";
import { WaveBars } from "./components/pixel/scenes/WaveBars";
import { PunchCard } from "./components/pixel/scenes/PunchCard";
import { FlashFacts } from "./components/pixel/scenes/FlashFacts";
import { LogoGrid } from "./components/pixel/scenes/LogoGrid";
import { ScaleZoom } from "./components/pixel/scenes/ScaleZoom";
// === v9 new — agent-system densification + cleaner throughline ===
import { AgentTask } from "./components/pixel/scenes/AgentTask";
import { ScrollingMetrics } from "./components/pixel/scenes/ScrollingMetrics";
import { AgentMessage } from "./components/pixel/scenes/AgentMessage";
import { ArchitectureStack } from "./components/pixel/scenes/ArchitectureStack";
// === v10 new — opening drama, infra-specific moment, timeline visual, final brand stamp ===
import { ParticleAssemble } from "./components/pixel/scenes/ParticleAssemble";
import { TechCallout } from "./components/pixel/scenes/TechCallout";
import { TimelineTick } from "./components/pixel/scenes/TimelineTick";
import { BrandStamp } from "./components/pixel/scenes/BrandStamp";
import type { HudProps } from "./components/pixel/Hud";
import type { AtomKind } from "./components/pixel/font";

/**
 * "INFRASTRUCTURE LAYER FOR MUSIC" v9 — tighter throughline, no claims, no private data.
 *
 * Cuts vs v8:
 *   - ACT 0 PROBLEM removed (corny "music = $30B → we fixed it")
 *   - ACT VII NUMBERS removed (private financials)
 *   - "ZERO MEETINGS." / "WE RUN OUR OWN LABEL." removed (corny flex)
 *   - "no humans needed." / "real artists." / "real labels." / "co-creation." removed (corny)
 *
 * The story now reads as ONE continuous statement:
 *   1. BRAND       — logo formation → split → settle → inversion (the brand mark in motion)
 *   2. THESIS      — MUSIC + INFRASTRUCTURE (the two words it answers)
 *   3. SYSTEM      — atoms, workloads, wave (what runs on it, concrete)
 *   4. AGENTS      — the centerpiece: agents → roles → message → task → loop → stack
 *   5. LIVE        — terminal logs + scrolling metrics + commands (production proof)
 *   6. WHO'S ON IT — artists + labels (specific names, no claims)
 *   7. CLOSE       — for music. → wordmark → grid → split callback → outro
 */

const BASE_HUD: HudProps = {
  topLine: "OPEN SOURCE RECOUPABLE",
  bottomLine: "DEVELOPED BY RECOUPABLE · 2026",
  license: "Licensed under MIT",
};

const HUD_BRAND        = { ...BASE_HUD, sceneTag: "[scene : 01 brand]" };
const HUD_DOMAIN       = { ...BASE_HUD, sceneTag: "[scene : 02 thesis]" };
const HUD_SYSTEM       = { ...BASE_HUD, sceneTag: "[scene : 03 system]" };
const HUD_PROOF        = { ...BASE_HUD, sceneTag: "[scene : 04 workloads]" };
const HUD_AGENTS       = { ...BASE_HUD, sceneTag: "[scene : 05 agents]" };
const HUD_LIVE         = { ...BASE_HUD, sceneTag: "[scene : 06 live]" };
const HUD_PEOPLE       = { ...BASE_HUD, sceneTag: "[scene : 07 on it]" };
const HUD_THESIS       = { ...BASE_HUD, sceneTag: "[scene : 08 close]" };

const TERMINAL_LINES = [
  { tag: "[agent.cmo]", message: "task=campaign_brief  status=run" },
  { tag: "[stream]",    message: "spotify  count=1.2M  delta=+12k" },
  { tag: "[agent.cfo]", message: "task=royalty_recon  status=ok" },
  { tag: "[release]",   message: "track=neon  chart=14  trend=up" },
  { tag: "[agent.cto]", message: "task=infra_check  health=100" },
  { tag: "[loop]",      message: "cycle=124  uptime=99.8%" },
];

const TERMINAL_LINES_2 = [
  { tag: "[agent.cdo]", message: "task=catalog_sync  delta=+12 items" },
  { tag: "[agent.cmo]", message: "task=ig_post  status=published" },
  { tag: "[agent.cco]", message: "task=brand_audit  passed=18/18" },
  { tag: "[agent.coo]", message: "task=ops_check  systems=green" },
  { tag: "[loop]",      message: "agents=6  parallel=4  uptime=99.8%" },
];

const ARTIST_NAMES  = ["GATSBY GRACE", "BLACK VEIL BRIDES", "JAMAR", "LS MO", "+ MANY"];
const LABEL_PARTNERS = ["ROSTRUM", "ATLANTIC", "300 ENT.", "SEEKER", "+ MORE"];

const MUSIC_ATOM_MAP: Record<string, AtomKind> = {
  M: "square", U: "circle", S: "square", I: "circle", C: "square",
};
const AGENTS_ATOM_MAP: Record<string, AtomKind> = {
  A: "triangle", G: "circle", E: "circle", N: "square", T: "square", S: "square", ".": "square",
};
const AUTONOMOUS_ATOM_MAP: Record<string, AtomKind> = {
  A: "triangle", U: "circle", T: "square", O: "circle", N: "square", M: "square", S: "square", ".": "square",
};

// Frame budgets at 30fps. Average ~0.85s per scene for tight pacing.
const F = {
  // === ACT I — BRAND (with NEW particle assembly opening) === (~4.5s)
  particleAssemble: 32,    // NEW — particles fall and assemble into the brand silhouette
  logoFormation:    20,    // tightened — slot in after assemble; less time needed
  logoSplit:        30,
  logoSettle:       18,
  logoInversion:    24,
  trans_brandToDomain: 12,

  // === ACT II — THESIS: MUSIC === (~4.0s)
  particleScatter:  12,
  musicHero:        36,
  musicTriangle:    12,
  musicLine:        12,
  letterM:          21,
  letterPair:       24,
  trans_musicToInfra: 12,

  // === ACT III — SYSTEM: INFRASTRUCTURE (with NEW TechCallout) === (~5.0s)
  atomShowcase:     30,
  infrastructureHero: 36,
  infraCircle:      12,
  techCallout:      36,    // NEW — single letter "I" with technical readout (replaces redundant TripleSpec MUSIC)
  quadrantSplit:    24,
  trans_infraToWork: 12,

  // === ACT IV — WORKLOADS (compressed, with wave) === (~3.0s)
  workloadFlash:    25,
  workloadStack:    30,
  waveBars:         30,
  trans_workToAgent: 12,

  // === ACT V — AGENTS (CENTERPIECE — pacing tightened) === (~8.7s)
  punch_who:        18,
  agentsHero:       30,
  agentRing:        38,    // tightened from 45 (-7)
  agentTask_1:      66,
  agentMessage:     60,
  autonomousHero:   21,
  loopDiagram:      30,    // tightened from 36 (-6)
  archStack:        36,    // tightened from 42 (-6)
  trans_agentToLive: 12,

  // === ACT VI — LIVE (production proof, with TimelineTick) === (~6.5s)
  terminalLog_1:    54,
  scrollingMetrics: 45,    // tightened from 50 (-5)
  timelineTick:     54,    // NEW — replaces second terminal with horizontal day-timeline
  npmInstall:       30,
  agentRunCmd:      27,
  trans_liveToPeople: 12,

  // === ACT VII — WHO'S ON IT === (~2.0s)
  artistCycle:      28,
  labelCycle:       28,
  trans_peopleToClose: 12,

  // === ACT VIII — CLOSE (with NEW final brand stamp) === (~5.0s)
  scale_zoom_close: 24,
  forMusic:         24,
  wordmark:         24,
  logoGrid:         28,
  logoSplitClose:   18,
  outro:            36,    // tightened from 45 (-9), brand stamp picks up the resolution
  brandStamp:       18,    // NEW — final clean logo on white, no HUD, the closing breath
} as const;

export const TOTAL_FRAMES = Object.values(F).reduce((s, n) => s + n, 0);

export const InfrastructureLayer: React.FC = () => (
  <Series>
    {/* ===================== ACT I — BRAND REVEAL (with particle assembly opening) ===================== */}
    {/* NEW: particles fall from above and assemble into the silhouette of the rounded square */}
    {/* Hard-cuts into LogoFormation which picks up with the assembled square */}
    <Series.Sequence durationInFrames={F.particleAssemble}>
      <ParticleAssemble squareSize={280} fallFrames={6} assembleWindow={20} />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.logoFormation}>
      <LogoFormation />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.logoSplit}>
      <LogoSplit />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.logoSettle}>
      <LogoSettle />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.logoInversion}>
      <LogoInversion hud={HUD_BRAND} />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.trans_brandToDomain}>
      <TransitionLineDraw hud={HUD_DOMAIN} label="thesis" />
    </Series.Sequence>

    {/* ===================== ACT II — THESIS: MUSIC ===================== */}
    <Series.Sequence durationInFrames={F.particleScatter}>
      <ParticleScatter hud={HUD_DOMAIN} count={170} size={20} seed={11} />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.musicHero}>
      <MusicHero hud={HUD_DOMAIN} />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.musicTriangle}>
      <HeroVariation hud={HUD_DOMAIN} text="MUSIC" atom="triangle" fontSize={260} enter="fade" />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.musicLine}>
      <HeroVariation hud={HUD_DOMAIN} text="MUSIC" atom="line" fontSize={260} enter="fade" />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.letterM}>
      <LetterHero hud={HUD_DOMAIN} letter="M" atom="circle" fontSize={680} />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.letterPair}>
      <LetterPair hud={HUD_DOMAIN} letters={["M", "M"]} atom="circle" labels={["DEFAULT", "ALT-01"]} />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.trans_musicToInfra}>
      <TransitionAtomBurst hud={HUD_SYSTEM} kind="square" count={18} />
    </Series.Sequence>

    {/* ===================== ACT III — SYSTEM: INFRASTRUCTURE ===================== */}
    <Series.Sequence durationInFrames={F.atomShowcase}>
      <AtomShowcase hud={HUD_SYSTEM} />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.infrastructureHero}>
      <InfrastructureHero hud={HUD_SYSTEM} />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.infraCircle}>
      <HeroVariation hud={HUD_SYSTEM} text="INFRASTRUCTURE" atom="circle" fontSize={88} enter="fade" />
    </Series.Sequence>
    {/* NEW: TechCallout — single letter "I" from INFRASTRUCTURE with technical readout */}
    {/* Replaces the redundant MUSIC TripleSpecimen (MUSIC was already shown in act II) */}
    <Series.Sequence durationInFrames={F.techCallout}>
      <TechCallout
        hud={HUD_SYSTEM}
        letter="I"
        atom="circle"
        metadata={[
          "// type: layer",
          "// agents: 6",
          "// uptime: 99.8%",
          "// region: global",
        ]}
        fontSize={560}
      />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.quadrantSplit}>
      <QuadrantSplit
        hud={HUD_SYSTEM}
        text="MUSIC"
        atoms={["square", "circle", "triangle", "line"]}
        labels={["square", "circle", "triangle", "line"]}
        fontSize={130}
      />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.trans_infraToWork}>
      <TransitionLineDraw hud={HUD_PROOF} label="workloads" />
    </Series.Sequence>

    {/* ===================== ACT IV — WORKLOADS ===================== */}
    <Series.Sequence durationInFrames={F.workloadFlash}>
      <FlashFacts
        hud={HUD_PROOF}
        framesPerFact={5}
        fontSize={130}
        facts={[
          { text: "RELEASES.", tag: "01" },
          { text: "STREAMS.",  tag: "02" },
          { text: "ROYALTIES.", tag: "03" },
          { text: "CATALOG.",  tag: "04" },
          { text: "ALL OF IT.", tag: "—", inverted: true },
        ]}
      />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.workloadStack}>
      <WorkloadStack hud={HUD_PROOF} />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.waveBars}>
      <WaveBars hud={HUD_PROOF} label="[ live :: signal ]" />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.trans_workToAgent}>
      <TransitionFlash hud={HUD_AGENTS} tag="[ act v :: agents ]" />
    </Series.Sequence>

    {/* ===================== ACT V — AGENTS (CENTERPIECE — 9s, expanded) ===================== */}
    <Series.Sequence durationInFrames={F.punch_who}>
      <PunchCard hud={HUD_AGENTS} text="who runs it?" fontSize={120} />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.agentsHero}>
      <BigWordHero
        hud={HUD_AGENTS}
        text="AGENTS."
        atom={AGENTS_ATOM_MAP}
        fontSize={260}
        enter="scaleOut"
      />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.agentRing}>
      <AgentRing hud={HUD_AGENTS} centerLabel="agents" framesPerRotation={45} />
    </Series.Sequence>
    {/* NEW: zoom in to see ONE agent doing actual work */}
    <Series.Sequence durationInFrames={F.agentTask_1}>
      <AgentTask
        hud={HUD_AGENTS}
        agent="[agent.cmo]"
        task="generating campaign brief..."
        finalPercent={100}
        fillFrames={36}
      />
    </Series.Sequence>
    {/* NEW: agents communicating */}
    <Series.Sequence durationInFrames={F.agentMessage}>
      <AgentMessage
        hud={HUD_AGENTS}
        from="[agent.cmo]"
        to="[agent.cfo]"
        message="reviewing royalty split."
      />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.autonomousHero}>
      <BigWordHero hud={HUD_AGENTS} text="AUTONOMOUS." atom={AUTONOMOUS_ATOM_MAP} fontSize={140} />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.loopDiagram}>
      <AutonomousLoop hud={HUD_AGENTS} framesPerNode={7} />
    </Series.Sequence>
    {/* NEW: the architecture stack — pulls everything together visually */}
    <Series.Sequence durationInFrames={F.archStack}>
      <ArchitectureStack
        hud={HUD_AGENTS}
        title="the recoupable stack"
        layers={[
          { label: "data",         brightness: 0.4 },
          { label: "workloads",    brightness: 0.6 },
          { label: "agents",       brightness: 0.85 },
          { label: "interfaces",   brightness: 1.0 },
        ]}
      />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.trans_agentToLive}>
      <SliceWipe label="live" />
    </Series.Sequence>

    {/* ===================== ACT VI — LIVE (production proof — expanded) ===================== */}
    <Series.Sequence durationInFrames={F.terminalLog_1}>
      <TerminalLog hud={HUD_LIVE} lines={TERMINAL_LINES} framesPerLine={8} />
    </Series.Sequence>
    {/* NEW: scrolling metrics ticker — adds dynamic horizontal motion */}
    <Series.Sequence durationInFrames={F.scrollingMetrics}>
      <ScrollingMetrics hud={HUD_LIVE} scrollSpeed={4} />
    </Series.Sequence>
    {/* NEW: TimelineTick — visualizes a 24-hour agent schedule (replaces second TerminalLog) */}
    {/* Visually distinct from terminal-log-style: a horizontal timeline with task blocks + sweeping "now" cursor */}
    <Series.Sequence durationInFrames={F.timelineTick}>
      <TimelineTick hud={HUD_LIVE} />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.npmInstall}>
      <CommandLine hud={HUD_LIVE} command="$ npm i recoupable" fontSize={68} />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.agentRunCmd}>
      <CommandLine hud={HUD_LIVE} command="$ recoupable run --cmo" fontSize={56} />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.trans_liveToPeople}>
      <TransitionLineDraw hud={HUD_PEOPLE} label="on it" />
    </Series.Sequence>

    {/* ===================== ACT VII — WHO'S ON IT (clean cycles, no punch claims) ===================== */}
    <Series.Sequence durationInFrames={F.artistCycle}>
      <TextCycle
        hud={HUD_PEOPLE}
        items={ARTIST_NAMES}
        framesPerItem={6}
        smooth
        fontSize={88}
        contextLabel="artists"
      />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.labelCycle}>
      <TextCycle
        hud={HUD_PEOPLE}
        items={LABEL_PARTNERS}
        framesPerItem={6}
        smooth
        fontSize={110}
        contextLabel="label partners"
      />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.trans_peopleToClose}>
      <TransitionFlash hud={HUD_THESIS} tag="[ for music ]" />
    </Series.Sequence>

    {/* ===================== ACT VIII — CLOSE ===================== */}
    <Series.Sequence durationInFrames={F.scale_zoom_close}>
      <ScaleZoom
        hud={HUD_THESIS}
        text="for music."
        mode="in"
        atom="sans"
        fontSize={300}
        inverted
      />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.forMusic}>
      <InversionCard hud={HUD_THESIS} text="for music." />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.wordmark}>
      <WordmarkHero hud={HUD_THESIS} />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.logoGrid}>
      <LogoGrid hud={HUD_THESIS} cols={4} rows={4} framesPerCell={1} label="[ one for every label ]" />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.logoSplitClose}>
      <LogoSplit />
    </Series.Sequence>
    <Series.Sequence durationInFrames={F.outro}>
      <RecoupableOutro hud={HUD_THESIS} />
    </Series.Sequence>
    {/* NEW: BrandStamp — pure white bg + Recoupable logo, NO HUD. The closing breath. */}
    <Series.Sequence durationInFrames={F.brandStamp}>
      <BrandStamp size={320} />
    </Series.Sequence>
  </Series>
);

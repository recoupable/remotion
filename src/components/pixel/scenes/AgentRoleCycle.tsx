import React from "react";
import { useCurrentFrame } from "remotion";
import { Canvas } from "../Canvas";
import { PixelDisplay } from "../PixelDisplay";
import { fontFamily, AtomKind } from "../font";
import { COLORS } from "../constants";
import { HudProps } from "../Hud";

/**
 * Scene type — quickly cycles through agent roles as big single-word heroes.
 * Each role displays for a few frames, then hard-cuts to the next.
 * Reads as: "we have many agents — here are their roles"
 *
 * Default cycle: CMO. → CFO. → CTO. → CCO. → COO. → CDO.
 * Each role uses a different per-letter atom map for variety.
 */
const ROLES = ["CMO.", "CFO.", "CTO.", "CCO.", "COO.", "CDO."];
const ATOM_MAPS: Array<Partial<Record<string, AtomKind>>> = [
  { C: "circle", M: "square", O: "circle" },
  { C: "circle", F: "square", O: "circle" },
  { C: "circle", T: "line", O: "circle" },
  { C: "circle", O: "circle" },
  { C: "circle", O: "circle" },
  { C: "circle", D: "square", O: "circle" },
];

export type AgentRoleCycleProps = {
  hud: HudProps;
  /** Frames per role. Default 9. */
  framesPerRole?: number;
  /** Override the role list */
  roles?: string[];
  fontSize?: number;
};

export const AgentRoleCycle: React.FC<AgentRoleCycleProps> = ({
  hud,
  framesPerRole = 9,
  roles = ROLES,
  fontSize = 320,
}) => {
  const frame = useCurrentFrame();
  const idx = Math.min(roles.length - 1, Math.floor(frame / framesPerRole));
  const role = roles[idx];
  const atomMap = ATOM_MAPS[idx % ATOM_MAPS.length];

  return (
    <Canvas hud={hud}>
      <PixelDisplay
        text={role}
        atom={atomMap}
        fontSize={fontSize}
        color={COLORS.fg}
        flicker={false}
      />
      {/* Tiny hint of the cycle position in lower-left */}
      <div
        style={{
          position: "absolute",
          left: 80,
          bottom: 140,
          fontFamily,
          fontSize: 14,
          color: COLORS.dim,
          letterSpacing: 0.8,
        }}
      >
        [{idx + 1}/{roles.length}] role
      </div>
    </Canvas>
  );
};

import React from "react";

/**
 * The Recoupable brand mark — two interlocking rounded squares.
 * Path extracted from marketing-worktree/public/brand/icon-darkmode.svg.
 *
 * The shape is meaningful: it represents the "recoupable" act of two parties
 * (artist + label, artist + Recoupable) splitting/recouping their share —
 * the logo is the moment-of-separation captured.
 *
 * Original viewBox is 223×223 with the path drawn inside (48,41) → (175,182),
 * so the inner mark is roughly 127×141. We expose `size` to scale the whole thing.
 */
export type RecoupableLogoProps = {
  /** Render size in px (square). Default 200. */
  size?: number;
  /** Fill color. Default white. */
  color?: string;
  /** Optional inline style overrides */
  style?: React.CSSProperties;
};

export const RECOUPABLE_LOGO_PATH =
  "M118.106 41C112.845 41 108.581 45.2558 108.581 50.5056V88.3242C108.581 93.9241 106.846 99.3868 103.613 103.964C98.5169 111.179 90.2239 115.471 81.3785 115.471H57.525C52.2645 115.471 48 119.727 48 124.977V172.304C48 177.554 52.2645 181.81 57.525 181.81H104.894C110.155 181.81 114.419 177.554 114.419 172.304V139.968C114.419 133.432 116.445 127.056 120.218 121.714L120.885 120.77C126.833 112.348 136.512 107.339 146.836 107.339H165.475C170.736 107.339 175 103.083 175 97.833V50.5056C175 45.2558 170.736 41 165.475 41H118.106Z";

export const RecoupableLogo: React.FC<RecoupableLogoProps> = ({
  size = 200,
  color = "#FFFFFF",
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 223 223"
    fill="none"
    style={style}
  >
    <path d={RECOUPABLE_LOGO_PATH} fill={color} />
  </svg>
);

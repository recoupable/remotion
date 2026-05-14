import React from "react";
import type { AtomKind } from "./font";

export type AtomProps = {
  kind: AtomKind;
  x: number;
  y: number;
  size: number;
  color: string;
};

export const Atom: React.FC<AtomProps> = ({ kind, x, y, size, color }) => {
  const base: React.CSSProperties = {
    position: "absolute",
    left: x,
    top: y,
    width: size,
    height: size,
  };

  switch (kind) {
    case "square":
      return <div style={{ ...base, background: color }} />;
    case "grid":
      return (
        <div
          style={{
            ...base,
            background: color,
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.2) 0 1px, transparent 1px 50%, rgba(0,0,0,0.2) 50% 51%, transparent 51% 100%), " +
              "linear-gradient(to bottom, rgba(0,0,0,0.2) 0 1px, transparent 1px 50%, rgba(0,0,0,0.2) 50% 51%, transparent 51% 100%)",
          }}
        />
      );
    case "circle":
      return <div style={{ ...base, background: color, borderRadius: "50%" }} />;
    case "triangle":
      return (
        <div
          style={{
            ...base,
            background: "transparent",
            borderLeft: `${size / 2}px solid transparent`,
            borderRight: `${size / 2}px solid transparent`,
            borderBottom: `${size}px solid ${color}`,
            width: 0,
            height: 0,
          }}
        />
      );
    case "line":
      return (
        <div style={{ ...base, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ height: size * 0.18, background: color }} />
          <div style={{ height: size * 0.18, background: color }} />
          <div style={{ height: size * 0.18, background: color }} />
        </div>
      );
  }
};

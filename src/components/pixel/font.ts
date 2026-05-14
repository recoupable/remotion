import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

loadFont({
  family: "Geist Pixel Square",
  url: staticFile("fonts/geist/GeistPixel-Square.woff2"),
  weight: "400",
}).catch(() => {});

loadFont({
  family: "Geist Pixel Grid",
  url: staticFile("fonts/geist/GeistPixel-Grid.woff2"),
  weight: "400",
}).catch(() => {});

loadFont({
  family: "Geist Pixel Circle",
  url: staticFile("fonts/geist/GeistPixel-Circle.woff2"),
  weight: "400",
}).catch(() => {});

loadFont({
  family: "Geist Pixel Triangle",
  url: staticFile("fonts/geist/GeistPixel-Triangle.woff2"),
  weight: "400",
}).catch(() => {});

loadFont({
  family: "Geist Pixel Line",
  url: staticFile("fonts/geist/GeistPixel-Line.woff2"),
  weight: "400",
}).catch(() => {});

loadFont({
  family: "Geist Sans",
  url: staticFile("fonts/geist/Geist-Variable.woff2"),
  weight: "400 700",
}).catch(() => {});

loadFont({
  family: "Geist Mono",
  url: staticFile("fonts/geist/GeistMono-Variable.woff2"),
  weight: "400 700",
}).catch(() => {});

export const geistPixelSquare = "Geist Pixel Square";
export const geistPixelGrid = "Geist Pixel Grid";
export const geistPixelCircle = "Geist Pixel Circle";
export const geistPixelTriangle = "Geist Pixel Triangle";
export const geistPixelLine = "Geist Pixel Line";
export const geistSans = "Geist Sans";
export const geistMono = "Geist Mono";

export type AtomKind =
  | "square"
  | "grid"
  | "circle"
  | "triangle"
  | "line";

export const ATOM_FONT_FAMILY: Record<AtomKind, string> = {
  square: geistPixelSquare,
  grid: geistPixelGrid,
  circle: geistPixelCircle,
  triangle: geistPixelTriangle,
  line: geistPixelLine,
};

export const fontFamily = geistPixelSquare;

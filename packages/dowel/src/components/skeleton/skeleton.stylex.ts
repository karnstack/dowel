import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

const pulse = stylex.keyframes({
  "0%, 100%": { opacity: 0.45 },
  "50%": { opacity: 0.85 },
});
const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";

export const root = stylex.create({
  base: {
    animationDuration: "1600ms",
    animationIterationCount: "infinite",
    animationName: {
      default: pulse,
      [REDUCED_MOTION]: "none",
    },
    animationTimingFunction: "ease-in-out",
    backgroundColor: tokens["--dowel-bg-surface-3"],
    boxSizing: "border-box",
    display: "block",
    maxWidth: "100%",
  },
});

export const variant = stylex.create({
  text: { borderRadius: tokens["--dowel-radius-sm"], width: "100%" },
  block: { borderRadius: tokens["--dowel-radius-md"], width: "100%" },
  circle: {
    borderRadius: tokens["--dowel-radius-pill"],
    flexShrink: 0,
  },
});

export const textSize = stylex.create({
  sm: { height: "0.5rem" },
  md: { height: "0.75rem" },
  lg: { height: "1rem" },
});

export const blockSize = stylex.create({
  sm: { height: "3rem" },
  md: { height: "5rem" },
  lg: { height: "8rem" },
});

export const circleSize = stylex.create({
  sm: { height: "1.5rem", width: "1.5rem" },
  md: { height: "2rem", width: "2rem" },
  lg: { height: "2.5rem", width: "2.5rem" },
});

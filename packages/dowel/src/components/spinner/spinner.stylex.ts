import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

const spin = stylex.keyframes({
  to: { rotate: "360deg" },
});
const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";

export const root = stylex.create({
  base: {
    alignItems: "center",
    color: tokens["--dowel-text-tertiary"],
    display: "inline-flex",
    flexShrink: 0,
    justifyContent: "center",
  },
});

export const visual = stylex.create({
  base: {
    animationDuration: "700ms",
    animationIterationCount: "infinite",
    animationName: {
      default: spin,
      [REDUCED_MOTION]: "none",
    },
    animationTimingFunction: "linear",
    borderColor: tokens["--dowel-border-strong"],
    borderRadius: tokens["--dowel-radius-pill"],
    borderStyle: "solid",
    borderTopColor: tokens["--dowel-accent"],
    boxSizing: "border-box",
    display: "block",
  },
});

export const size = stylex.create({
  sm: { borderWidth: "1.5px", height: "0.875rem", width: "0.875rem" },
  md: { borderWidth: "1.5px", height: "1rem", width: "1rem" },
  lg: { borderWidth: "2px", height: "1.25rem", width: "1.25rem" },
});

export const part = stylex.create({
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  },
});

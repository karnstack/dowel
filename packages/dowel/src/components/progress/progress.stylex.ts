import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";
const slide = stylex.keyframes({
  from: { transform: "translateX(-120%)" },
  to: { transform: "translateX(260%)" },
});

export const progress = stylex.create({
  root: { display: "grid", gap: "0.375rem", minWidth: 0, width: "100%" },
  metadata: {
    alignItems: "center",
    display: "flex",
    gap: "0.75rem",
    justifyContent: "space-between",
  },
  label: {
    color: tokens["--dowel-text-primary"],
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.8125rem",
    lineHeight: 1.4,
  },
  value: {
    color: tokens["--dowel-text-tertiary"],
    fontFamily: tokens["--dowel-font-mono"],
    fontSize: "0.75rem",
    fontVariantNumeric: "tabular-nums",
    lineHeight: 1.4,
  },
  track: {
    backgroundColor: tokens["--dowel-bg-surface-3"],
    borderRadius: tokens["--dowel-radius-pill"],
    height: "0.375rem",
    overflow: "hidden",
    position: "relative",
    width: "100%",
  },
  small: { height: "0.25rem" },
  large: { height: "0.5rem" },
  indicator: {
    backgroundColor: tokens["--dowel-accent"],
    borderRadius: "inherit",
    height: "100%",
    transitionDuration: {
      default: tokens["--dowel-duration-normal"],
      [REDUCED_MOTION]: "0.01ms",
    },
    transitionProperty: "width",
    transitionTimingFunction: tokens["--dowel-ease-out"],
    "[data-complete]": { backgroundColor: tokens["--dowel-success"] },
    "[data-indeterminate]": {
      animationDuration: "1.2s",
      animationIterationCount: "infinite",
      animationName: slide,
      animationTimingFunction: "ease-in-out",
      width: "40%",
    },
  },
});

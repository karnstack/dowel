import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";

export const popup = stylex.create({
  root: {
    backgroundColor: tokens["--dowel-bg-elevated"],
    borderColor: tokens["--dowel-border-default"],
    borderRadius: "6px",
    borderStyle: "solid",
    borderWidth: tokens["--dowel-hairline"],
    boxShadow: tokens["--dowel-shadow-popover"],
    boxSizing: "border-box",
    color: tokens["--dowel-text-primary"],
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.6875rem",
    fontWeight: 500,
    letterSpacing: "-0.00625rem",
    lineHeight: 1.35,
    opacity: 1,
    padding: "0.25rem 0.5rem",
    transformOrigin: "var(--transform-origin)",
    transitionDuration: {
      default: tokens["--dowel-duration-fast"],
      [REDUCED_MOTION]: "0.01ms",
    },
    transitionProperty: "opacity, translate",
    transitionTimingFunction: tokens["--dowel-ease-out"],
    whiteSpace: "nowrap",
    zIndex: 80,
    "[data-starting-style]": {
      opacity: 0,
      translate: "0 0.125rem",
    },
    "[data-ending-style]": {
      opacity: 0,
      translate: "0 0.125rem",
    },
  },
});

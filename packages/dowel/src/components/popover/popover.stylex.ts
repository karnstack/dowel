import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";

export const popup = stylex.create({
  root: {
    backgroundColor: tokens["--dowel-bg-elevated"],
    borderColor: tokens["--dowel-border-default"],
    borderRadius: "10px",
    borderStyle: "solid",
    borderWidth: tokens["--dowel-hairline"],
    boxShadow: tokens["--dowel-shadow-popover"],
    boxSizing: "border-box",
    color: tokens["--dowel-text-secondary"],
    fontFamily: tokens["--dowel-font-sans"],
    maxWidth: "min(22rem, calc(100vw - 1rem))",
    minWidth: "12rem",
    opacity: 1,
    outline: "none",
    padding: "0.75rem",
    transformOrigin: "var(--transform-origin)",
    transitionDuration: {
      default: tokens["--dowel-duration-fast"],
      [REDUCED_MOTION]: "0.01ms",
    },
    transitionProperty: "opacity",
    transitionTimingFunction: tokens["--dowel-ease-out"],
    zIndex: 70,
    "[data-starting-style]": {
      opacity: 0,
    },
    "[data-ending-style]": {
      opacity: 0,
    },
  },
});

export const part = stylex.create({
  viewport: {
    maxHeight: "min(24rem, var(--available-height))",
    overflowY: "auto",
  },
  title: {
    color: tokens["--dowel-text-primary"],
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.8125rem",
    fontWeight: 550,
    letterSpacing: "-0.0125rem",
    lineHeight: 1.4,
    margin: 0,
  },
  description: {
    color: tokens["--dowel-text-tertiary"],
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.8125rem",
    letterSpacing: "-0.0125rem",
    lineHeight: 1.5,
    marginBlock: "0.25rem 0",
  },
  arrow: {
    alignItems: "center",
    display: "flex",
    height: "0.5rem",
    justifyContent: "center",
    width: "0.75rem",
  },
  arrowShape: {
    backgroundColor: tokens["--dowel-bg-elevated"],
    borderBottomColor: tokens["--dowel-border-default"],
    borderBottomStyle: "solid",
    borderBottomWidth: tokens["--dowel-hairline"],
    borderRightColor: tokens["--dowel-border-default"],
    borderRightStyle: "solid",
    borderRightWidth: tokens["--dowel-hairline"],
    display: "block",
    height: "0.5rem",
    rotate: "45deg",
    width: "0.5rem",
  },
});

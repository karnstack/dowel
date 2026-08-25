import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

const MOBILE = "@media (max-width: 639px)";
const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";

export const backdrop = stylex.create({
  root: {
    backgroundColor: tokens["--dowel-scrim"],
    inset: 0,
    opacity: 1,
    position: "fixed",
    transitionDuration: {
      default: tokens["--dowel-duration-normal"],
      [REDUCED_MOTION]: "0.01ms",
    },
    transitionProperty: "opacity",
    transitionTimingFunction: tokens["--dowel-ease-out"],
    zIndex: 50,
    "[data-starting-style]": {
      opacity: 0,
    },
    "[data-ending-style]": {
      opacity: 0,
    },
  },
});

export const popup = stylex.create({
  root: {
    backgroundColor: tokens["--dowel-bg-elevated"],
    borderColor: tokens["--dowel-border-default"],
    borderRadius: {
      default: tokens["--dowel-radius-lg"],
      [MOBILE]: tokens["--dowel-radius-md"],
    },
    borderStyle: "solid",
    borderWidth: tokens["--dowel-hairline"],
    boxShadow: tokens["--dowel-shadow-modal"],
    boxSizing: "border-box",
    color: tokens["--dowel-text-primary"],
    display: "flex",
    flexDirection: "column",
    insetBlockStart: {
      default: "max(2rem, 13vh)",
      [MOBILE]: "0.5rem",
    },
    insetInlineStart: "50%",
    maxHeight: {
      default: "calc(100dvh - 4rem)",
      [MOBILE]: "calc(100dvh - 1rem)",
    },
    opacity: 1,
    outline: "none",
    overflowY: "auto",
    position: "fixed",
    translate: "-50% 0",
    transitionDuration: {
      default: tokens["--dowel-duration-normal"],
      [REDUCED_MOTION]: "0.01ms",
    },
    transitionProperty: "opacity, translate",
    transitionTimingFunction: tokens["--dowel-ease-out"],
    width: {
      default: "min(30rem, calc(100vw - 2rem))",
      [MOBILE]: "calc(100vw - 1rem)",
    },
    zIndex: 51,
    "[data-starting-style]": {
      opacity: 0,
      translate: "-50% -0.25rem",
    },
    "[data-ending-style]": {
      opacity: 0,
      translate: "-50% -0.25rem",
    },
  },
  bare: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    boxShadow: "none",
    maxHeight: "none",
    overflow: "visible",
    width: {
      default: "min(46.875rem, calc(100vw - 2rem))",
      [MOBILE]: "calc(100vw - 1rem)",
    },
  },
});

export const part = stylex.create({
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "0.375rem",
    padding: "1rem 1rem 0.75rem",
  },
  body: {
    color: tokens["--dowel-text-secondary"],
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    minWidth: 0,
    padding: "0 1rem 1rem",
  },
  footer: {
    alignItems: "center",
    borderTopColor: tokens["--dowel-border-subtle"],
    borderTopStyle: "solid",
    borderTopWidth: tokens["--dowel-hairline"],
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    justifyContent: "flex-end",
    padding: "0.75rem 1rem 1rem",
  },
  title: {
    color: tokens["--dowel-text-primary"],
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.9375rem",
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
    margin: 0,
  },
});

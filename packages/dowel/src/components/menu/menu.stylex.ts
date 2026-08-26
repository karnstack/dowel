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
    minWidth: "13.5rem",
    opacity: 1,
    outline: "none",
    paddingBlock: "0.25rem",
    transformOrigin: "var(--transform-origin)",
    transitionDuration: {
      default: tokens["--dowel-duration-fast"],
      [REDUCED_MOTION]: "0.01ms",
    },
    transitionProperty: "opacity, translate",
    transitionTimingFunction: tokens["--dowel-ease-out"],
    zIndex: 60,
    "[data-starting-style]": {
      opacity: 0,
      translate: "0 -0.125rem",
    },
    "[data-ending-style]": {
      opacity: 0,
      translate: "0 -0.125rem",
    },
  },
});

const sharedItem = {
  alignItems: "center",
  borderRadius: "6px",
  boxSizing: "border-box",
  color: tokens["--dowel-text-secondary"],
  cursor: "default",
  display: "flex",
  fontFamily: tokens["--dowel-font-sans"],
  fontSize: "0.8125rem",
  fontWeight: 450,
  gap: "0.5rem",
  height: "2rem",
  letterSpacing: "-0.0125rem",
  lineHeight: 1,
  marginInline: "0.25rem",
  outline: "none",
  paddingInline: "0.5rem",
  position: "relative",
  textDecoration: "none",
  userSelect: "none",
  "[data-highlighted]": {
    backgroundColor: tokens["--dowel-bg-surface-3"],
    color: tokens["--dowel-text-primary"],
  },
  "[data-disabled]": {
    cursor: "not-allowed",
    opacity: 0.45,
  },
} as const;

export const item = stylex.create({
  root: sharedItem,
  selectable: {
    paddingLeft: "2rem",
  },
  danger: {
    color: tokens["--dowel-danger"],
    "[data-highlighted]": {
      backgroundColor: tokens["--dowel-danger-surface"],
      color: tokens["--dowel-danger-hover"],
    },
  },
});

export const part = stylex.create({
  positioner: {
    zIndex: 60,
  },
  separator: {
    backgroundColor: tokens["--dowel-border-subtle"],
    height: tokens["--dowel-hairline"],
    marginBlock: "0.25rem",
    marginInline: "0.5rem",
  },
  label: {
    color: tokens["--dowel-text-tertiary"],
    display: "block",
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.6875rem",
    fontWeight: 550,
    letterSpacing: "0.025rem",
    lineHeight: 1.4,
    padding: "0.375rem 0.75rem 0.25rem",
    textTransform: "uppercase",
  },
  indicator: {
    alignItems: "center",
    color: tokens["--dowel-accent"],
    display: "inline-flex",
    flexShrink: 0,
    height: "1rem",
    justifyContent: "center",
    left: "0.5rem",
    position: "absolute",
    width: "1rem",
  },
  icon: {
    alignItems: "center",
    color: tokens["--dowel-text-tertiary"],
    display: "inline-flex",
    flexShrink: 0,
    height: "1rem",
    justifyContent: "center",
    width: "1rem",
  },
  shortcut: {
    color: tokens["--dowel-text-tertiary"],
    fontFamily: tokens["--dowel-font-mono"],
    fontSize: "0.6875rem",
    letterSpacing: 0,
    marginLeft: "auto",
    paddingLeft: "1rem",
  },
  viewport: {
    maxHeight: "min(24rem, var(--available-height))",
    overflowY: "auto",
  },
});

import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

const MOBILE = "@media (max-width: 639px)";
const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";

export const trigger = stylex.create({
  root: {
    alignItems: "center",
    appearance: "none",
    backgroundColor: tokens["--dowel-bg-surface-1"],
    borderColor: tokens["--dowel-border-default"],
    borderRadius: tokens["--dowel-radius-md"],
    borderStyle: "solid",
    borderWidth: tokens["--dowel-hairline"],
    boxShadow: tokens["--dowel-shadow-control"],
    boxSizing: "border-box",
    color: tokens["--dowel-text-primary"],
    cursor: "default",
    display: "inline-flex",
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: {
      default: "0.8125rem",
      [MOBILE]: "1rem",
    },
    fontWeight: 450,
    gap: "0.5rem",
    justifyContent: "space-between",
    letterSpacing: "-0.0125rem",
    lineHeight: 1.4,
    minWidth: "8rem",
    outline: "none",
    paddingInline: "0.625rem 0.5rem",
    transitionDuration: tokens["--dowel-duration-normal"],
    transitionProperty: "border-color, background-color, color, opacity",
    transitionTimingFunction: tokens["--dowel-ease-out"],
    width: "100%",
    ":hover:not(:disabled)": {
      borderColor: tokens["--dowel-border-strong"],
    },
    ":focus-visible": {
      borderColor: tokens["--dowel-focus-ring"],
    },
    "[data-disabled]": {
      color: tokens["--dowel-text-disabled"],
      cursor: "not-allowed",
      opacity: 0.72,
    },
  },
  value: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    "[data-placeholder]": {
      color: tokens["--dowel-text-tertiary"],
    },
  },
  icon: {
    color: tokens["--dowel-text-tertiary"],
    display: "inline-flex",
    flexShrink: 0,
  },
});

export const size = stylex.create({
  sm: { height: tokens["--dowel-control-sm"] },
  md: { height: tokens["--dowel-control-md"] },
  lg: { height: tokens["--dowel-control-lg"] },
});

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
    minWidth: "var(--anchor-width)",
    opacity: 1,
    outline: "none",
    overflow: "hidden",
    transitionDuration: {
      default: tokens["--dowel-duration-fast"],
      [REDUCED_MOTION]: "0.01ms",
    },
    transitionProperty: "opacity, translate",
    transitionTimingFunction: tokens["--dowel-ease-out"],
    width: "max-content",
    maxWidth: "min(22rem, calc(100vw - 1rem))",
    zIndex: 70,
    "[data-starting-style]": {
      opacity: 0,
      translate: "0 -0.125rem",
    },
    "[data-ending-style]": {
      opacity: 0,
      translate: "0 -0.125rem",
    },
  },
  list: {
    maxHeight: "min(18rem, var(--available-height))",
    overflowY: "auto",
    paddingBlock: "0.25rem",
  },
});

export const item = stylex.create({
  root: {
    alignItems: "center",
    borderRadius: "6px",
    boxSizing: "border-box",
    color: tokens["--dowel-text-secondary"],
    cursor: "default",
    display: "flex",
    gap: "0.5rem",
    marginInline: "0.25rem",
    minHeight: "2.25rem",
    outline: "none",
    padding: "0.375rem 2rem 0.375rem 0.5rem",
    position: "relative",
    userSelect: "none",
    "[data-highlighted]": {
      backgroundColor: tokens["--dowel-bg-surface-3"],
      color: tokens["--dowel-text-primary"],
    },
    "[data-selected]": {
      color: tokens["--dowel-text-primary"],
    },
    "[data-disabled]": {
      cursor: "not-allowed",
      opacity: 0.45,
    },
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    gap: "0.125rem",
    minWidth: 0,
  },
  label: {
    fontSize: "0.8125rem",
    fontWeight: 500,
    letterSpacing: "-0.0125rem",
    lineHeight: 1.25,
  },
  description: {
    color: tokens["--dowel-text-tertiary"],
    fontSize: "0.75rem",
    letterSpacing: "-0.0125rem",
    lineHeight: 1.25,
  },
  indicator: {
    alignItems: "center",
    color: tokens["--dowel-accent"],
    display: "inline-flex",
    height: "1rem",
    justifyContent: "center",
    position: "absolute",
    right: "0.5rem",
    top: "50%",
    translate: "0 -50%",
    width: "1rem",
  },
  groupLabel: {
    color: tokens["--dowel-text-tertiary"],
    fontSize: "0.6875rem",
    fontWeight: 550,
    letterSpacing: "0.025rem",
    lineHeight: 1.4,
    padding: "0.375rem 0.75rem 0.25rem",
    textTransform: "uppercase",
  },
});

import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

const MOBILE = "@media (max-width: 639px)";
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
    opacity: 1,
    outline: "none",
    overflow: "hidden",
    transitionDuration: {
      default: tokens["--dowel-duration-fast"],
      [REDUCED_MOTION]: "0.01ms",
    },
    transitionProperty: "opacity, translate",
    transitionTimingFunction: tokens["--dowel-ease-out"],
    width: {
      default: "min(20rem, calc(100vw - 1rem))",
      [MOBILE]: "calc(100vw - 1rem)",
    },
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
});

export const search = stylex.create({
  group: {
    alignItems: "center",
    borderBottomColor: tokens["--dowel-border-subtle"],
    borderBottomStyle: "solid",
    borderBottomWidth: tokens["--dowel-hairline"],
    display: "flex",
    minHeight: "2.5rem",
    paddingInline: "0.75rem",
  },
  icon: {
    color: tokens["--dowel-text-tertiary"],
    display: "block",
    flexShrink: 0,
    marginRight: "0.5rem",
  },
  input: {
    appearance: "none",
    backgroundColor: "transparent",
    borderStyle: "none",
    color: tokens["--dowel-text-primary"],
    flexGrow: 1,
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.8125rem",
    fontWeight: 450,
    letterSpacing: "-0.0125rem",
    lineHeight: 1.4,
    minWidth: 0,
    outline: "none",
    padding: 0,
    "::placeholder": {
      color: tokens["--dowel-text-tertiary"],
      opacity: 1,
    },
  },
});

export const list = stylex.create({
  root: {
    maxHeight: "min(18rem, var(--available-height))",
    overflowY: "auto",
    paddingBlock: "0.25rem",
  },
  groupLabel: {
    color: tokens["--dowel-text-tertiary"],
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.6875rem",
    fontWeight: 550,
    letterSpacing: "0.025rem",
    lineHeight: 1.4,
    padding: "0.375rem 0.75rem 0.25rem",
    textTransform: "uppercase",
  },
  item: {
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
  icon: {
    alignItems: "center",
    color: tokens["--dowel-text-tertiary"],
    display: "inline-flex",
    flexShrink: 0,
    height: "1rem",
    justifyContent: "center",
    width: "1rem",
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    gap: "0.125rem",
    minWidth: 0,
  },
  label: {
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.8125rem",
    fontWeight: 500,
    letterSpacing: "-0.0125rem",
    lineHeight: 1.25,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  description: {
    color: tokens["--dowel-text-tertiary"],
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.75rem",
    letterSpacing: "-0.0125rem",
    lineHeight: 1.25,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  indicator: {
    alignItems: "center",
    color: tokens["--dowel-accent"],
    display: "inline-flex",
    fontSize: "0.75rem",
    height: "1rem",
    justifyContent: "center",
    position: "absolute",
    right: "0.5rem",
    top: "50%",
    translate: "0 -50%",
    width: "1rem",
  },
  emptyContent: {
    color: tokens["--dowel-text-tertiary"],
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.8125rem",
    padding: "1rem 0.75rem",
    textAlign: "center",
  },
});

export const footer = stylex.create({
  root: {
    borderTopColor: tokens["--dowel-border-subtle"],
    borderTopStyle: "solid",
    borderTopWidth: tokens["--dowel-hairline"],
    padding: "0.25rem",
  },
  clear: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderStyle: "none",
    borderRadius: "6px",
    color: tokens["--dowel-text-tertiary"],
    cursor: "default",
    display: "flex",
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.8125rem",
    fontWeight: 500,
    height: "2rem",
    justifyContent: "flex-start",
    letterSpacing: "-0.0125rem",
    paddingInline: "0.5rem",
    width: "100%",
    ":hover": {
      backgroundColor: tokens["--dowel-bg-hover"],
      color: tokens["--dowel-text-primary"],
    },
    ":focus-visible": {
      outlineColor: tokens["--dowel-focus-ring"],
      outlineOffset: "-2px",
      outlineStyle: "solid",
      outlineWidth: "2px",
    },
  },
});

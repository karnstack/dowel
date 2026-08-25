import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

const MOBILE = "@media (max-width: 639px)";

export const control = stylex.create({
  root: {
    appearance: "none",
    borderStyle: "solid",
    borderWidth: tokens["--dowel-hairline"],
    boxSizing: "border-box",
    color: tokens["--dowel-text-primary"],
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: {
      default: "0.8125rem",
      [MOBILE]: "1rem",
    },
    fontWeight: 450,
    letterSpacing: "-0.0125rem",
    lineHeight: 1.4,
    margin: 0,
    minWidth: 0,
    outline: "none",
    transitionDuration: tokens["--dowel-duration-normal"],
    transitionProperty: "border-color, background-color, color, opacity",
    transitionTimingFunction: tokens["--dowel-ease-out"],
    width: "100%",
    "::placeholder": {
      color: tokens["--dowel-text-tertiary"],
      opacity: 1,
    },
    ":disabled": {
      color: tokens["--dowel-text-disabled"],
      cursor: "not-allowed",
      opacity: 0.72,
    },
  },
});

export const variant = stylex.create({
  surface: {
    backgroundColor: tokens["--dowel-bg-surface-1"],
    borderColor: tokens["--dowel-border-default"],
    borderRadius: tokens["--dowel-radius-md"],
    boxShadow: tokens["--dowel-shadow-control"],
    paddingInline: "0.625rem",
    ":hover": {
      borderColor: tokens["--dowel-border-strong"],
    },
    ":focus-visible": {
      borderColor: tokens["--dowel-focus-ring"],
      boxShadow: "none",
    },
  },
  bare: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderRadius: tokens["--dowel-radius-sm"],
    boxShadow: "none",
    paddingInline: 0,
    ":hover": { backgroundColor: "transparent" },
    ":focus-visible": {
      backgroundColor: "transparent",
    },
  },
});

export const inputSize = stylex.create({
  sm: {
    height: tokens["--dowel-control-sm"],
  },
  md: {
    height: tokens["--dowel-control-md"],
  },
  lg: {
    height: tokens["--dowel-control-lg"],
  },
  title: {
    fontSize: {
      default: "1.25rem",
      [MOBILE]: "1.25rem",
    },
    fontWeight: 550,
    height: "2.25rem",
    letterSpacing: "-0.025rem",
  },
});

export const textarea = stylex.create({
  root: {
    minHeight: "6rem",
    paddingBlock: "0.5rem",
  },
  surface: {
    resize: "vertical",
  },
  bare: {
    resize: "none",
  },
});

export const invalid = stylex.create({
  root: {
    borderColor: tokens["--dowel-danger"],
    ":focus-visible": {
      borderColor: tokens["--dowel-danger"],
      boxShadow: "none",
    },
  },
});

export const field = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "0.375rem",
    minWidth: 0,
  },
  label: {
    color: tokens["--dowel-text-primary"],
    fontSize: {
      default: "0.8125rem",
      [MOBILE]: "1rem",
    },
    fontWeight: 500,
    lineHeight: 1.4,
  },
  description: {
    color: tokens["--dowel-text-tertiary"],
    fontSize: {
      default: "0.75rem",
      [MOBILE]: "0.875rem",
    },
    lineHeight: 1.5,
    margin: 0,
  },
  error: {
    color: tokens["--dowel-danger"],
    fontSize: {
      default: "0.75rem",
      [MOBILE]: "0.875rem",
    },
    lineHeight: 1.5,
  },
});

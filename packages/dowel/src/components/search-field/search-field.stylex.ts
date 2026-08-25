import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

const MOBILE = "@media (max-width: 639px)";

export const root = stylex.create({
  base: {
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: tokens["--dowel-hairline"],
    boxSizing: "border-box",
    display: "flex",
    gap: "0.375rem",
    minWidth: 0,
    transitionDuration: tokens["--dowel-duration-normal"],
    transitionProperty: "border-color, background-color",
    transitionTimingFunction: tokens["--dowel-ease-out"],
    width: "100%",
    ":focus-within": {
      borderColor: tokens["--dowel-focus-ring"],
    },
    "[data-disabled]": {
      cursor: "not-allowed",
      opacity: 0.72,
    },
  },
  surface: {
    backgroundColor: tokens["--dowel-bg-surface-1"],
    borderColor: tokens["--dowel-border-default"],
    borderRadius: tokens["--dowel-radius-md"],
    boxShadow: tokens["--dowel-shadow-control"],
    paddingInline: "0.5rem",
    ":hover:not([data-disabled])": {
      borderColor: tokens["--dowel-border-strong"],
    },
  },
  bare: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderRadius: tokens["--dowel-radius-sm"],
    paddingInline: 0,
  },
});

export const size = stylex.create({
  sm: { height: tokens["--dowel-control-sm"] },
  md: { height: tokens["--dowel-control-md"] },
  lg: { height: tokens["--dowel-control-lg"] },
});

export const part = stylex.create({
  icon: {
    color: tokens["--dowel-text-tertiary"],
    display: "block",
    flexShrink: 0,
  },
  input: {
    appearance: "none",
    backgroundColor: "transparent",
    borderStyle: "none",
    color: tokens["--dowel-text-primary"],
    flexGrow: 1,
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: {
      default: "0.8125rem",
      [MOBILE]: "1rem",
    },
    fontWeight: 450,
    letterSpacing: "-0.0125rem",
    lineHeight: 1.4,
    minWidth: 0,
    outline: "none",
    padding: 0,
    width: "100%",
    "::placeholder": {
      color: tokens["--dowel-text-tertiary"],
      opacity: 1,
    },
    "::-webkit-search-cancel-button": {
      appearance: "none",
    },
    ":disabled": {
      cursor: "not-allowed",
    },
  },
  action: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderStyle: "none",
    borderRadius: tokens["--dowel-radius-sm"],
    color: tokens["--dowel-text-tertiary"],
    cursor: "default",
    display: "inline-flex",
    flexShrink: 0,
    height: "1.25rem",
    justifyContent: "center",
    margin: 0,
    padding: 0,
    width: "1.25rem",
    ":hover:not(:disabled)": {
      backgroundColor: tokens["--dowel-bg-hover"],
      color: tokens["--dowel-text-primary"],
    },
    ":focus-visible": {
      outlineColor: tokens["--dowel-focus-ring"],
      outlineOffset: "-1px",
      outlineStyle: "solid",
      outlineWidth: "2px",
    },
  },
  shortcut: {
    alignItems: "center",
    color: tokens["--dowel-text-tertiary"],
    display: "inline-flex",
    flexShrink: 0,
    fontFamily: tokens["--dowel-font-mono"],
    fontSize: "0.6875rem",
    lineHeight: 1,
  },
});

import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

const COARSE = "@media (pointer: coarse)";

export const parts = stylex.create({
  root: {
    minWidth: 0,
  },
  list: {
    alignItems: "center",
    display: "flex",
    gap: "0.25rem",
    maxWidth: "100%",
    minWidth: 0,
    overflowX: "auto",
    overflowY: "hidden",
    position: "relative",
    scrollbarWidth: "none",
    width: "fit-content",
    "[data-orientation=vertical]": {
      alignItems: "stretch",
      flexDirection: "column",
      overflowX: "hidden",
      overflowY: "auto",
      width: "100%",
    },
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
  tab: {
    alignItems: "center",
    appearance: "none",
    backgroundColor: tokens["--dowel-bg-surface-2"],
    borderColor: "transparent",
    borderRadius: tokens["--dowel-radius-pill"],
    borderStyle: "solid",
    borderWidth: tokens["--dowel-hairline"],
    boxSizing: "border-box",
    color: tokens["--dowel-text-secondary"],
    cursor: "default",
    display: "inline-flex",
    flexShrink: 0,
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.75rem",
    fontWeight: 500,
    gap: "0.375rem",
    justifyContent: "center",
    letterSpacing: "-0.00625rem",
    lineHeight: 1,
    outline: "none",
    position: "relative",
    userSelect: "none",
    whiteSpace: "nowrap",
    ":hover": {
      backgroundColor: tokens["--dowel-bg-surface-3"],
      color: tokens["--dowel-text-primary"],
    },
    ":focus-visible": {
      outlineColor: tokens["--dowel-focus-ring"],
      outlineOffset: "1px",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
    "[data-active]": {
      backgroundColor: tokens["--dowel-bg-surface-3"],
      borderColor: tokens["--dowel-border-default"],
      color: tokens["--dowel-text-primary"],
    },
    "[data-disabled]": {
      color: tokens["--dowel-text-disabled"],
      cursor: "not-allowed",
      opacity: 0.55,
    },
    "[data-orientation=vertical]": {
      justifyContent: "flex-start",
      width: "100%",
    },
  },
  panel: {
    minWidth: 0,
    outline: "none",
    ":focus-visible": {
      outlineColor: tokens["--dowel-focus-ring"],
      outlineOffset: "2px",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
  },
});

export const size = stylex.create({
  sm: {
    height: {
      default: tokens["--dowel-control-sm"],
      [COARSE]: "2.75rem",
    },
    paddingInline: "0.5rem",
  },
  md: {
    height: {
      default: tokens["--dowel-control-md"],
      [COARSE]: "2.75rem",
    },
    paddingInline: "0.625rem",
  },
});

export const variant = stylex.create({
  pillList: {},
  pillTab: {},
  lineList: {
    gap: "0.125rem",
  },
  lineTab: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderRadius: tokens["--dowel-radius-sm"],
    color: tokens["--dowel-text-tertiary"],
    "::before": {
      backgroundColor: "transparent",
      borderRadius: tokens["--dowel-radius-pill"],
      bottom: 0,
      content: '""',
      height: "2px",
      left: "0.5rem",
      position: "absolute",
      right: "0.5rem",
    },
    ":hover": {
      backgroundColor: tokens["--dowel-bg-hover"],
    },
    "[data-active]": {
      backgroundColor: "transparent",
      borderColor: "transparent",
    },
    "[data-active]::before": {
      backgroundColor: tokens["--dowel-text-primary"],
    },
  },
});

import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

export const root = stylex.create({
  base: {
    alignItems: "center",
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
    fontSize: "0.8125rem",
    fontWeight: 500,
    gap: "0.375rem",
    height: tokens["--dowel-control-md"],
    letterSpacing: "-0.0125rem",
    lineHeight: 1,
    maxWidth: "100%",
    minWidth: 0,
    paddingInline: "0.625rem",
    transitionDuration: tokens["--dowel-duration-normal"],
    transitionProperty: "border-color, background-color, color, opacity",
    transitionTimingFunction: tokens["--dowel-ease-out"],
    ":hover": {
      backgroundColor: tokens["--dowel-bg-surface-3"],
      color: tokens["--dowel-text-primary"],
    },
    ":focus-visible": {
      outlineColor: tokens["--dowel-focus-ring"],
      outlineOffset: "2px",
      outlineStyle: "solid",
      outlineWidth: "2px",
    },
    ":disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },
  withIcon: {
    paddingLeft: "0.375rem",
  },
  active: {
    backgroundColor: tokens["--dowel-bg-surface-3"],
    borderColor: tokens["--dowel-border-default"],
    color: tokens["--dowel-text-primary"],
  },
  icon: {
    alignItems: "center",
    display: "inline-flex",
    flexShrink: 0,
    height: "1rem",
    justifyContent: "center",
    width: "1rem",
  },
  label: {
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

export const tone = stylex.create({
  neutral: {},
  accent: {
    color: tokens["--dowel-accent"],
  },
  danger: {
    backgroundColor: tokens["--dowel-danger-surface"],
    color: tokens["--dowel-danger"],
  },
});

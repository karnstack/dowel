import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

export const badge = stylex.create({
  root: {
    alignItems: "center",
    backgroundColor: tokens["--dowel-bg-badge"],
    borderColor: tokens["--dowel-border-default"],
    borderRadius: tokens["--dowel-radius-pill"],
    borderStyle: "solid",
    borderWidth: tokens["--dowel-hairline"],
    boxSizing: "border-box",
    color: tokens["--dowel-text-secondary"],
    display: "inline-flex",
    flexShrink: 0,
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.75rem",
    fontWeight: 500,
    gap: "0.3125rem",
    height: "1.375rem",
    letterSpacing: "-0.00625rem",
    lineHeight: 1,
    maxWidth: "100%",
    paddingInline: "0.4375rem",
    whiteSpace: "nowrap",
  },
  withVisual: {
    paddingLeft: "0.3125rem",
  },
  visual: {
    alignItems: "center",
    display: "inline-flex",
    flexShrink: 0,
    height: "0.875rem",
    justifyContent: "center",
    lineHeight: 0,
    width: "0.875rem",
  },
  dot: {
    backgroundColor: "currentColor",
    borderRadius: tokens["--dowel-radius-pill"],
    height: "0.375rem",
    width: "0.375rem",
  },
  label: {
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

export const tone = stylex.create({
  neutral: {},
  accent: { color: tokens["--dowel-accent"] },
  success: { color: tokens["--dowel-success"] },
  warning: { color: tokens["--dowel-warning"] },
  danger: { color: tokens["--dowel-danger"] },
});

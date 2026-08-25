import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

export const root = stylex.create({
  base: {
    alignItems: "flex-start",
    backgroundColor: tokens["--dowel-bg-surface-2"],
    borderColor: tokens["--dowel-border-default"],
    borderRadius: tokens["--dowel-radius-md"],
    borderStyle: "solid",
    borderWidth: tokens["--dowel-hairline"],
    boxSizing: "border-box",
    color: tokens["--dowel-text-secondary"],
    display: "flex",
    fontFamily: tokens["--dowel-font-sans"],
    gap: "0.625rem",
    padding: "0.75rem",
    width: "100%",
  },
  danger: {
    backgroundColor: tokens["--dowel-danger-surface"],
  },
});

export const part = stylex.create({
  icon: {
    alignItems: "center",
    color: tokens["--dowel-text-tertiary"],
    display: "inline-flex",
    flexShrink: 0,
    height: "1.125rem",
    justifyContent: "center",
    width: "1.125rem",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    gap: "0.25rem",
    minWidth: 0,
  },
  title: {
    color: tokens["--dowel-text-primary"],
    fontSize: "0.8125rem",
    fontWeight: 550,
    letterSpacing: "-0.0125rem",
    lineHeight: 1.4,
  },
  description: {
    fontSize: "0.8125rem",
    letterSpacing: "-0.0125rem",
    lineHeight: 1.5,
  },
  actions: {
    alignItems: "center",
    display: "flex",
    flexShrink: 0,
    gap: "0.375rem",
  },
});

export const tone = stylex.create({
  neutral: {},
  accent: { color: tokens["--dowel-accent"] },
  success: { color: tokens["--dowel-success"] },
  warning: { color: tokens["--dowel-warning"] },
  danger: { color: tokens["--dowel-danger"] },
});

import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

export const root = stylex.create({
  base: {
    alignItems: "center",
    color: tokens["--dowel-text-secondary"],
    display: "inline-flex",
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.8125rem",
    fontWeight: 450,
    gap: "0.375rem",
    letterSpacing: "-0.0125rem",
    lineHeight: 1.4,
    maxWidth: "100%",
  },
});

export const part = stylex.create({
  visual: {
    alignItems: "center",
    display: "inline-flex",
    flexShrink: 0,
    height: "1rem",
    justifyContent: "center",
    width: "1rem",
  },
  dot: {
    backgroundColor: "currentColor",
    borderRadius: tokens["--dowel-radius-pill"],
    height: "0.4375rem",
    width: "0.4375rem",
  },
  label: {
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

export const tone = stylex.create({
  neutral: { color: tokens["--dowel-text-tertiary"] },
  accent: { color: tokens["--dowel-accent"] },
  success: { color: tokens["--dowel-success"] },
  warning: { color: tokens["--dowel-warning"] },
  danger: { color: tokens["--dowel-danger"] },
});

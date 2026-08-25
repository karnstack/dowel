import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

const MOBILE = "@media (max-width: 639px)";

export const root = stylex.create({
  base: {
    alignItems: "center",
    boxSizing: "border-box",
    color: tokens["--dowel-text-secondary"],
    display: "flex",
    flexDirection: "column",
    fontFamily: tokens["--dowel-font-sans"],
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
  },
});

export const size = stylex.create({
  compact: {
    gap: "0.625rem",
    paddingBlock: "1.25rem",
    paddingInline: "1rem",
  },
  default: {
    gap: "0.875rem",
    minHeight: "12rem",
    paddingBlock: {
      default: "2.5rem",
      [MOBILE]: "2rem",
    },
    paddingInline: {
      default: "2rem",
      [MOBILE]: "1rem",
    },
  },
});

export const part = stylex.create({
  icon: {
    alignItems: "center",
    color: tokens["--dowel-text-tertiary"],
    display: "inline-flex",
    flexShrink: 0,
    height: "1.5rem",
    justifyContent: "center",
    width: "1.5rem",
  },
  copy: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "0.375rem",
    maxWidth: "24rem",
    minWidth: 0,
  },
  title: {
    color: tokens["--dowel-text-primary"],
    fontSize: "0.9375rem",
    fontWeight: 550,
    letterSpacing: "-0.0125rem",
    lineHeight: 1.4,
    margin: 0,
  },
  description: {
    color: tokens["--dowel-text-tertiary"],
    fontSize: "0.8125rem",
    letterSpacing: "-0.0125rem",
    lineHeight: 1.5,
    margin: 0,
  },
  actions: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    justifyContent: "center",
  },
});

import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

const MOBILE = "@media (max-width: 639px)";

export const section = stylex.create({
  root: {
    color: tokens["--dowel-text-primary"],
    fontFamily: tokens["--dowel-font-sans"],
    minWidth: 0,
    width: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    paddingBlockEnd: "0.75rem",
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
    letterSpacing: "-0.00625rem",
    lineHeight: 1.45,
    margin: 0,
    maxWidth: "48rem",
  },
  rows: {
    borderTopColor: tokens["--dowel-border-subtle"],
    borderTopStyle: "solid",
    borderTopWidth: tokens["--dowel-hairline"],
  },
});

export const row = stylex.create({
  root: {
    alignItems: "center",
    borderBottomColor: tokens["--dowel-border-subtle"],
    borderBottomStyle: "solid",
    borderBottomWidth: tokens["--dowel-hairline"],
    boxSizing: "border-box",
    display: "flex",
    gap: {
      default: "1.5rem",
      [MOBILE]: "0.75rem",
    },
    minHeight: "3.25rem",
    minWidth: 0,
    paddingBlock: "0.625rem",
  },
  copy: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: "0.125rem",
    minWidth: 0,
  },
  title: {
    color: tokens["--dowel-text-primary"],
    fontSize: {
      default: "0.8125rem",
      [MOBILE]: "0.875rem",
    },
    fontWeight: 500,
    letterSpacing: "-0.00625rem",
    lineHeight: 1.4,
  },
  description: {
    color: tokens["--dowel-text-tertiary"],
    fontSize: "0.75rem",
    letterSpacing: "-0.00625rem",
    lineHeight: 1.4,
  },
  control: {
    alignItems: "center",
    display: "flex",
    flexShrink: 0,
    gap: "0.5rem",
    justifyContent: "flex-end",
    marginInlineStart: "auto",
  },
});

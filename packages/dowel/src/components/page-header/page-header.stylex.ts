import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

const MOBILE = "@media (max-width: 639px)";

export const part = stylex.create({
  root: {
    borderBottomColor: tokens["--dowel-border-subtle"],
    borderBottomStyle: "solid",
    borderBottomWidth: tokens["--dowel-hairline"],
    boxSizing: "border-box",
    color: tokens["--dowel-text-primary"],
    display: "flex",
    flexDirection: "column",
    fontFamily: tokens["--dowel-font-sans"],
    gap: "0.75rem",
    minWidth: 0,
    paddingBlock: "0.875rem",
    width: "100%",
  },
  breadcrumbs: {
    minWidth: 0,
  },
  main: {
    alignItems: "flex-start",
    display: "flex",
    gap: "1rem",
    minWidth: 0,
    width: "100%",
  },
  copy: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: "0.25rem",
    minWidth: 0,
  },
  title: {
    color: tokens["--dowel-text-primary"],
    fontSize: "1.125rem",
    fontWeight: 600,
    letterSpacing: "-0.025rem",
    lineHeight: 1.3,
    margin: 0,
  },
  description: {
    color: tokens["--dowel-text-tertiary"],
    fontSize: {
      default: "0.8125rem",
      [MOBILE]: "0.875rem",
    },
    letterSpacing: "-0.00625rem",
    lineHeight: 1.45,
    margin: 0,
    maxWidth: "48rem",
  },
  actions: {
    alignItems: "center",
    display: "flex",
    flexShrink: 0,
    flexWrap: "wrap",
    gap: "0.5rem",
    justifyContent: "flex-end",
  },
  secondary: {
    minWidth: 0,
  },
});

import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

const MOBILE = "@media (max-width: 639px)";

export const parts = stylex.create({
  root: {
    backgroundColor: tokens["--dowel-bg-elevated"],
    borderColor: tokens["--dowel-border-default"],
    borderRadius: {
      default: tokens["--dowel-radius-xl"],
      [MOBILE]: tokens["--dowel-radius-lg"],
    },
    borderStyle: "solid",
    borderWidth: tokens["--dowel-hairline"],
    boxShadow: tokens["--dowel-shadow-modal"],
    boxSizing: "border-box",
    color: tokens["--dowel-text-primary"],
    display: "flex",
    flexDirection: "column",
    isolation: "isolate",
    maxHeight: "min(42rem, calc(100dvh - 2rem))",
    maxWidth: "100%",
    overflow: "hidden",
    width: "min(46.875rem, calc(100vw - 2rem))",
  },
  header: {
    alignItems: "center",
    display: "flex",
    flexShrink: 0,
    gap: "0.5rem",
    justifyContent: "space-between",
    minHeight: "3rem",
    padding: "0.75rem 1rem 0.5rem",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    gap: "0.5rem",
    minHeight: "15rem",
    minWidth: 0,
    overflowY: "auto",
    padding: {
      default: "1.25rem 1.5rem 1.5rem",
      [MOBILE]: "1rem",
    },
  },
  divider: {
    backgroundColor: tokens["--dowel-border-default"],
    borderBottomStyle: "none",
    borderLeftStyle: "none",
    borderRightStyle: "none",
    borderTopStyle: "none",
    height: tokens["--dowel-hairline"],
    marginBlock: "1rem",
    padding: 0,
    width: "100%",
  },
  properties: {
    alignItems: "center",
    display: "flex",
    flexShrink: 0,
    flexWrap: "wrap",
    gap: "0.375rem",
    padding: {
      default: "0.625rem 1.5rem 0.75rem",
      [MOBILE]: "0.625rem 1rem 0.75rem",
    },
  },
  footer: {
    alignItems: "center",
    borderTopColor: tokens["--dowel-border-subtle"],
    borderTopStyle: "solid",
    borderTopWidth: tokens["--dowel-hairline"],
    display: "flex",
    flexShrink: 0,
    gap: "0.75rem",
    justifyContent: "space-between",
    minHeight: "3.25rem",
    padding: "0.625rem 1rem 0.75rem",
  },
  actions: {
    alignItems: "center",
    display: "inline-flex",
    flexShrink: 0,
    gap: "0.5rem",
    marginLeft: "auto",
  },
});

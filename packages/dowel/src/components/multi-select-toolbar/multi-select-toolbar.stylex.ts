import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

export const toolbar = stylex.create({
  root: {
    alignItems: "center",
    backgroundColor: tokens["--dowel-bg-elevated"],
    borderColor: tokens["--dowel-border-default"],
    borderRadius: tokens["--dowel-radius-lg"],
    borderStyle: "solid",
    borderWidth: tokens["--dowel-hairline"],
    bottom: "1rem",
    boxShadow: tokens["--dowel-shadow-popover"],
    boxSizing: "border-box",
    color: tokens["--dowel-text-primary"],
    display: "flex",
    gap: "0.375rem",
    marginInline: "auto",
    maxWidth: "calc(100% - 2rem)",
    minHeight: "2.5rem",
    padding: "0.3125rem",
    paddingInlineStart: "0.75rem",
    position: "sticky",
    width: "max-content",
    zIndex: 20,
  },
  count: {
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.75rem",
    fontWeight: 550,
    paddingInlineEnd: "0.375rem",
    whiteSpace: "nowrap",
  },
  actions: {
    alignItems: "center",
    display: "flex",
    gap: "0.25rem",
  },
  clear: {
    alignItems: "center",
    appearance: "none",
    backgroundColor: "transparent",
    borderStyle: "none",
    borderRadius: tokens["--dowel-radius-sm"],
    color: tokens["--dowel-text-tertiary"],
    cursor: "pointer",
    display: "inline-flex",
    height: tokens["--dowel-control-md"],
    justifyContent: "center",
    outline: "none",
    padding: 0,
    width: tokens["--dowel-control-md"],
    ":hover": {
      backgroundColor: tokens["--dowel-bg-hover"],
      color: tokens["--dowel-text-primary"],
    },
    ":focus-visible": {
      boxShadow: `inset 0 0 0 1px ${tokens["--dowel-focus-ring"]}`,
    },
  },
});

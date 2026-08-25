import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

export const list = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    listStyle: "none",
    margin: 0,
    minWidth: 0,
    padding: 0,
  },
  divided: {
    backgroundColor: tokens["--dowel-border-subtle"],
    rowGap: tokens["--dowel-hairline"],
  },
});

export const row = stylex.create({
  root: {
    alignItems: "center",
    boxSizing: "border-box",
    color: tokens["--dowel-text-primary"],
    display: "flex",
    gap: "0.75rem",
    minHeight: tokens["--dowel-row-md"],
    minWidth: 0,
    padding: "0.5rem 0.75rem",
    position: "relative",
    backgroundColor: tokens["--dowel-bg-surface-1"],
  },
  compact: { minHeight: "2.25rem", paddingBlock: "0.375rem" },
  selected: { backgroundColor: tokens["--dowel-bg-active"] },
  disabled: { color: tokens["--dowel-text-disabled"], opacity: 0.72 },
});

export const cell = stylex.create({
  root: {
    alignItems: "center",
    display: "flex",
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.8125rem",
    gap: "0.5rem",
    lineHeight: 1.4,
    minWidth: 0,
  },
  grow: { flex: 1 },
  end: {
    justifyContent: "flex-end",
    marginInlineStart: "auto",
    textAlign: "end",
  },
  secondary: { color: tokens["--dowel-text-secondary"] },
  tertiary: { color: tokens["--dowel-text-tertiary"] },
  truncate: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

export const groupHeader = stylex.create({
  root: {
    alignItems: "center",
    color: tokens["--dowel-text-tertiary"],
    display: "flex",
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.6875rem",
    fontWeight: 550,
    gap: "0.5rem",
    lineHeight: 1.4,
    minHeight: "1.75rem",
    padding: "0.5rem 0.75rem 0.25rem",
    backgroundColor: tokens["--dowel-bg-surface-1"],
  },
  sticky: {
    backgroundColor: tokens["--dowel-bg-surface-1"],
    insetBlockStart: 0,
    position: "sticky",
    zIndex: 1,
  },
});

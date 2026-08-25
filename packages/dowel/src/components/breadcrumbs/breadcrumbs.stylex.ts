import * as stylex from "@stylexjs/stylex";
import { tokens } from "../../theme/tokens.stylex";
export const breadcrumbs = stylex.create({
  root: { minWidth: 0 },
  list: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    gap: "0.25rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  item: {
    alignItems: "center",
    display: "inline-flex",
    gap: "0.25rem",
    minWidth: 0,
  },
  separator: { color: tokens["--dowel-text-disabled"], flexShrink: 0 },
  link: {
    borderRadius: tokens["--dowel-radius-sm"],
    color: tokens["--dowel-text-secondary"],
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.75rem",
    outline: "none",
    padding: "0.125rem 0.25rem",
    textDecoration: "none",
    ":hover": {
      backgroundColor: tokens["--dowel-bg-hover"],
      color: tokens["--dowel-text-primary"],
    },
    ":focus-visible": {
      outlineColor: tokens["--dowel-focus-ring"],
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
  },
  current: {
    color: tokens["--dowel-text-primary"],
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.75rem",
    fontWeight: 500,
    overflow: "hidden",
    padding: "0.125rem 0.25rem",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  ellipsis: {
    alignItems: "center",
    color: tokens["--dowel-text-tertiary"],
    display: "inline-flex",
    padding: "0.125rem",
  },
});

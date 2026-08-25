import * as stylex from "@stylexjs/stylex";
import { tokens } from "../../theme/tokens.stylex";
const REDUCED = "@media (prefers-reduced-motion: reduce)";
export const tree = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "1px",
    listStyle: "none",
    margin: 0,
    padding: 0,
    width: "100%",
  },
  group: { listStyle: "none", margin: 0, padding: 0 },
  node: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: tokens["--dowel-radius-sm"],
    borderWidth: 0,
    color: tokens["--dowel-text-secondary"],
    display: "flex",
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.8125rem",
    gap: "0.375rem",
    minHeight: tokens["--dowel-control-md"],
    outline: "none",
    padding: "0 0.5rem",
    textAlign: "left",
    width: "100%",
    ":hover": {
      backgroundColor: tokens["--dowel-bg-hover"],
      color: tokens["--dowel-text-primary"],
    },
    ":focus-visible": {
      outlineColor: tokens["--dowel-focus-ring"],
      outlineOffset: "-1px",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
    ":disabled": { color: tokens["--dowel-text-disabled"], opacity: 0.55 },
  },
  selected: {
    backgroundColor: tokens["--dowel-bg-surface-3"],
    color: tokens["--dowel-text-primary"],
  },
  indent: { flexShrink: 0 },
  chevron: {
    color: tokens["--dowel-text-tertiary"],
    flexShrink: 0,
    transitionDuration: {
      default: tokens["--dowel-duration-fast"],
      [REDUCED]: "0.01ms",
    },
    transitionProperty: "transform",
  },
  open: { transform: "rotate(90deg)" },
  spacer: { display: "inline-block", width: "0.75rem" },
  icon: {
    alignItems: "center",
    color: tokens["--dowel-text-tertiary"],
    display: "inline-flex",
    flexShrink: 0,
  },
  label: {
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

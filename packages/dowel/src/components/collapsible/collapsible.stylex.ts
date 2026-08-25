import * as stylex from "@stylexjs/stylex";
import { tokens } from "../../theme/tokens.stylex";
const REDUCED = "@media (prefers-reduced-motion: reduce)";
export const collapsible = stylex.create({
  root: { color: tokens["--dowel-text-primary"], width: "100%" },
  trigger: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: tokens["--dowel-radius-sm"],
    borderWidth: 0,
    color: tokens["--dowel-text-secondary"],
    display: "flex",
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.8125rem",
    fontWeight: 500,
    gap: "0.5rem",
    justifyContent: "space-between",
    minHeight: "2rem",
    outline: "none",
    paddingInline: "0.5rem",
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
  },
  icon: {
    color: tokens["--dowel-text-tertiary"],
    flexShrink: 0,
    transitionDuration: {
      default: tokens["--dowel-duration-fast"],
      [REDUCED]: "0.01ms",
    },
    transitionProperty: "transform",
    transitionTimingFunction: tokens["--dowel-ease-out"],
  },
  panel: {
    height: "var(--collapsible-panel-height)",
    overflow: "hidden",
    transitionDuration: {
      default: tokens["--dowel-duration-normal"],
      [REDUCED]: "0.01ms",
    },
    transitionProperty: "height",
    transitionTimingFunction: tokens["--dowel-ease-out"],
    "[data-starting-style]": { height: 0 },
    "[data-ending-style]": { height: 0 },
  },
  content: {
    color: tokens["--dowel-text-secondary"],
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.8125rem",
    lineHeight: 1.5,
    padding: "0.375rem 0.5rem 0.5rem",
  },
});

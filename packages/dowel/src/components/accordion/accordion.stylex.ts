import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";

export const accordion = stylex.create({
  root: {
    borderColor: tokens["--dowel-border-default"],
    borderRadius: tokens["--dowel-radius-md"],
    borderStyle: "solid",
    borderWidth: tokens["--dowel-hairline"],
    overflow: "hidden",
    width: "100%",
  },
  item: {
    borderTopColor: tokens["--dowel-border-default"],
    borderTopStyle: "solid",
    borderTopWidth: tokens["--dowel-hairline"],
    ":first-child": { borderTopWidth: 0 },
  },
  header: { margin: 0 },
  trigger: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 0,
    color: tokens["--dowel-text-primary"],
    display: "flex",
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.8125rem",
    fontWeight: 500,
    gap: "0.75rem",
    justifyContent: "space-between",
    minHeight: "2.5rem",
    outline: "none",
    paddingInline: "0.75rem",
    textAlign: "left",
    width: "100%",
    ":hover": { backgroundColor: tokens["--dowel-bg-hover"] },
    ":focus-visible": {
      boxShadow: `inset 0 0 0 1px ${tokens["--dowel-focus-ring"]}`,
    },
    "[data-disabled]": { color: tokens["--dowel-text-disabled"] },
  },
  triggerText: { minWidth: 0 },
  icon: {
    color: tokens["--dowel-text-tertiary"],
    flexShrink: 0,
    transitionDuration: {
      default: tokens["--dowel-duration-fast"],
      [REDUCED_MOTION]: "0.01ms",
    },
    transitionProperty: "transform",
    transitionTimingFunction: tokens["--dowel-ease-out"],
  },
  panel: {
    color: tokens["--dowel-text-secondary"],
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.8125rem",
    height: "var(--accordion-panel-height)",
    lineHeight: 1.5,
    overflow: "hidden",
    transitionDuration: {
      default: tokens["--dowel-duration-normal"],
      [REDUCED_MOTION]: "0.01ms",
    },
    transitionProperty: "height",
    transitionTimingFunction: tokens["--dowel-ease-out"],
    "[data-starting-style]": { height: 0 },
    "[data-ending-style]": { height: 0 },
  },
  content: { padding: "0 0.75rem 0.75rem" },
});

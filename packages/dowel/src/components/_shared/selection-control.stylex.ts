import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

const COARSE = "@media (pointer: coarse)";

export const control = stylex.create({
  root: {
    "--dowel-selection-hit-size": {
      default: "calc(100% + 0.75rem)",
      [COARSE]: "3rem",
    },
    alignItems: "center",
    appearance: "none",
    backgroundColor: tokens["--dowel-bg-surface-1"],
    borderColor: tokens["--dowel-border-strong"],
    borderStyle: "solid",
    borderWidth: tokens["--dowel-hairline"],
    boxSizing: "border-box",
    color: tokens["--dowel-on-accent"],
    cursor: "default",
    display: "inline-flex",
    flexShrink: 0,
    justifyContent: "center",
    outline: "none",
    position: "relative",
    transitionDuration: tokens["--dowel-duration-fast"],
    transitionProperty: "border-color, background-color, color, opacity",
    transitionTimingFunction: tokens["--dowel-ease-out"],
    verticalAlign: "middle",
    "::before": {
      content: '""',
      height: "var(--dowel-selection-hit-size)",
      left: "50%",
      position: "absolute",
      top: "50%",
      transform: "translate(-50%, -50%)",
      width: "var(--dowel-selection-hit-size)",
    },
    ":hover:not([data-disabled])": {
      backgroundColor: tokens["--dowel-bg-hover"],
      borderColor: tokens["--dowel-text-tertiary"],
    },
    ":focus-visible": {
      outlineColor: tokens["--dowel-focus-ring"],
      outlineOffset: "2px",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
    "[data-checked]": {
      backgroundColor: tokens["--dowel-accent"],
      borderColor: tokens["--dowel-accent"],
    },
    "[data-checked]:hover:not([data-disabled])": {
      backgroundColor: tokens["--dowel-accent-hover"],
      borderColor: tokens["--dowel-accent-hover"],
    },
    "[data-disabled]": {
      color: tokens["--dowel-text-disabled"],
      cursor: "not-allowed",
      opacity: 0.55,
    },
  },
});

export const group = stylex.create({
  root: {
    display: "flex",
    gap: "0.625rem",
    minWidth: 0,
  },
  vertical: {
    alignItems: "flex-start",
    flexDirection: "column",
  },
  horizontal: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

const COARSE = "@media (pointer: coarse)";

export const control = stylex.create({
  root: {
    "--dowel-switch-hit-size": {
      default: "calc(100% + 0.75rem)",
      [COARSE]: "3rem",
    },
    alignItems: "center",
    appearance: "none",
    backgroundColor: tokens["--dowel-bg-surface-3"],
    borderColor: tokens["--dowel-border-default"],
    borderRadius: tokens["--dowel-radius-pill"],
    borderStyle: "solid",
    borderWidth: tokens["--dowel-hairline"],
    boxSizing: "border-box",
    cursor: "default",
    display: "inline-flex",
    flexShrink: 0,
    height: { default: "1rem", [COARSE]: "1.25rem" },
    justifyContent: "flex-start",
    outline: "none",
    padding: { default: "1.5px", [COARSE]: "2px" },
    position: "relative",
    transitionDuration: tokens["--dowel-duration-fast"],
    transitionProperty: "border-color, background-color, color, opacity",
    transitionTimingFunction: tokens["--dowel-ease-out"],
    verticalAlign: "middle",
    width: { default: "1.75rem", [COARSE]: "2.75rem" },
    "::before": {
      content: '""',
      height: "var(--dowel-switch-hit-size)",
      left: "50%",
      position: "absolute",
      top: "50%",
      transform: "translate(-50%, -50%)",
      width: "var(--dowel-switch-hit-size)",
    },
    ":hover:not([data-disabled])": {
      backgroundColor: tokens["--dowel-border-strong"],
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
      justifyContent: "flex-end",
    },
    "[data-checked]:hover:not([data-disabled])": {
      backgroundColor: tokens["--dowel-accent-hover"],
      borderColor: tokens["--dowel-accent-hover"],
    },
    "[data-disabled]": {
      cursor: "not-allowed",
      opacity: 0.55,
    },
  },
  thumb: {
    backgroundColor: tokens["--dowel-bg-elevated"],
    borderColor: tokens["--dowel-border-default"],
    borderRadius: tokens["--dowel-radius-pill"],
    borderStyle: "solid",
    borderWidth: tokens["--dowel-hairline"],
    boxShadow: tokens["--dowel-shadow-control"],
    boxSizing: "border-box",
    display: "block",
    height: { default: "0.6875rem", [COARSE]: "0.9375rem" },
    width: { default: "0.6875rem", [COARSE]: "0.9375rem" },
  },
});

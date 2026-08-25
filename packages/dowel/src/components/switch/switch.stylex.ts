import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

export const control = stylex.create({
  root: {
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
    height: "1rem",
    justifyContent: "flex-start",
    outline: "none",
    padding: "1.5px",
    position: "relative",
    transitionDuration: tokens["--dowel-duration-fast"],
    transitionProperty: "border-color, background-color, color, opacity",
    transitionTimingFunction: tokens["--dowel-ease-out"],
    verticalAlign: "middle",
    width: "1.75rem",
    "::before": {
      content: '""',
      inset: "-0.375rem",
      position: "absolute",
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
    height: "0.6875rem",
    width: "0.6875rem",
  },
});

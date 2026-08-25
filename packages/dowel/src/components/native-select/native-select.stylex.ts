import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

const MOBILE = "@media (max-width: 639px)";

export const root = stylex.create({
  base: {
    display: "grid",
    minWidth: 0,
    position: "relative",
    width: "100%",
  },
});

export const control = stylex.create({
  base: {
    appearance: "none",
    backgroundColor: tokens["--dowel-bg-surface-1"],
    borderColor: tokens["--dowel-border-default"],
    borderRadius: tokens["--dowel-radius-md"],
    borderStyle: "solid",
    borderWidth: tokens["--dowel-hairline"],
    boxShadow: tokens["--dowel-shadow-control"],
    boxSizing: "border-box",
    color: tokens["--dowel-text-primary"],
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: {
      default: "0.8125rem",
      [MOBILE]: "1rem",
    },
    fontWeight: 450,
    gridArea: "1 / 1",
    letterSpacing: "-0.0125rem",
    lineHeight: 1.4,
    margin: 0,
    minWidth: 0,
    outline: "none",
    paddingInline: "0.625rem 1.75rem",
    transitionDuration: tokens["--dowel-duration-normal"],
    transitionProperty: "border-color, background-color, color, opacity",
    transitionTimingFunction: tokens["--dowel-ease-out"],
    width: "100%",
    ":hover:not(:disabled)": {
      borderColor: tokens["--dowel-border-strong"],
    },
    ":focus-visible": {
      borderColor: tokens["--dowel-focus-ring"],
    },
    ":disabled": {
      color: tokens["--dowel-text-disabled"],
      cursor: "not-allowed",
      opacity: 0.72,
    },
  },
  invalid: {
    borderColor: tokens["--dowel-danger"],
    ":focus-visible": {
      borderColor: tokens["--dowel-danger"],
    },
  },
});

export const size = stylex.create({
  sm: { height: tokens["--dowel-control-sm"] },
  md: { height: tokens["--dowel-control-md"] },
  lg: { height: tokens["--dowel-control-lg"] },
});

export const icon = stylex.create({
  root: {
    alignSelf: "center",
    color: tokens["--dowel-text-tertiary"],
    gridArea: "1 / 1",
    justifySelf: "end",
    marginRight: "0.5rem",
    pointerEvents: "none",
  },
});

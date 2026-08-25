import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

const COARSE = "@media (pointer: coarse)";
const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";

const shared = {
  alignItems: "center",
  borderStyle: "solid",
  borderWidth: tokens["--dowel-hairline"],
  boxSizing: "border-box",
  cursor: "default",
  display: "inline-flex",
  flexShrink: 0,
  fontFamily: tokens["--dowel-font-sans"],
  fontSize: "0.8125rem",
  fontWeight: 500,
  justifyContent: "center",
  letterSpacing: "-0.0125rem",
  lineHeight: 1,
  position: "relative",
  textDecoration: "none",
  transitionDuration: {
    default: tokens["--dowel-duration-normal"],
    [REDUCED_MOTION]: "0.01ms",
  },
  transitionProperty: "border-color, background-color, color, opacity",
  transitionTimingFunction: tokens["--dowel-ease-out"],
  userSelect: "none",
  whiteSpace: "nowrap",
  "::after": {
    content: '""',
    height: {
      default: 0,
      [COARSE]: "3rem",
    },
    left: "50%",
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      default: 0,
      [COARSE]: "max(100%, 3rem)",
    },
  },
  ":disabled": {
    cursor: "not-allowed",
    opacity: 0.5,
  },
  '[aria-disabled="true"]': {
    cursor: "not-allowed",
    opacity: 0.5,
  },
  ":focus-visible": {
    outlineColor: tokens["--dowel-focus-ring"],
    outlineOffset: "2px",
    outlineStyle: "solid",
    outlineWidth: "2px",
  },
} as const;

export const button = stylex.create({
  root: {
    ...shared,
    borderRadius: tokens["--dowel-radius-md"],
    gap: "0.375rem",
    paddingInline: "0.625rem",
  },
});

export const iconButton = stylex.create({
  root: {
    ...shared,
    borderRadius: tokens["--dowel-radius-pill"],
    padding: 0,
  },
});

export const buttonVariant = stylex.create({
  primary: {
    backgroundColor: tokens["--dowel-accent"],
    borderColor: tokens["--dowel-accent"],
    color: tokens["--dowel-on-accent"],
    ":hover": {
      backgroundColor: tokens["--dowel-accent-hover"],
      borderColor: tokens["--dowel-accent-hover"],
    },
    ":active": {
      backgroundColor: tokens["--dowel-accent-active"],
      borderColor: tokens["--dowel-accent-active"],
    },
  },
  secondary: {
    backgroundColor: tokens["--dowel-bg-surface-1"],
    borderColor: tokens["--dowel-border-default"],
    boxShadow: tokens["--dowel-shadow-control"],
    color: tokens["--dowel-text-primary"],
    ":hover": {
      backgroundColor: tokens["--dowel-bg-surface-2"],
      borderColor: tokens["--dowel-border-strong"],
    },
  },
  muted: {
    backgroundColor: tokens["--dowel-bg-surface-2"],
    borderColor: "transparent",
    color: tokens["--dowel-text-secondary"],
    ":hover": {
      backgroundColor: tokens["--dowel-bg-surface-3"],
      color: tokens["--dowel-text-primary"],
    },
  },
  ghost: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    color: tokens["--dowel-text-secondary"],
    ":hover": {
      backgroundColor: tokens["--dowel-bg-hover"],
      color: tokens["--dowel-text-primary"],
    },
  },
  danger: {
    backgroundColor: tokens["--dowel-danger-surface"],
    borderColor: "transparent",
    color: tokens["--dowel-danger"],
    ":hover": {
      color: tokens["--dowel-danger-hover"],
    },
  },
});

export const iconButtonVariant = stylex.create({
  secondary: {
    backgroundColor: tokens["--dowel-bg-surface-1"],
    borderColor: tokens["--dowel-border-default"],
    boxShadow: tokens["--dowel-shadow-control"],
    color: tokens["--dowel-text-secondary"],
    ":hover": {
      backgroundColor: tokens["--dowel-bg-surface-2"],
      color: tokens["--dowel-text-primary"],
    },
  },
  muted: {
    backgroundColor: tokens["--dowel-bg-surface-2"],
    borderColor: "transparent",
    color: tokens["--dowel-text-secondary"],
    ":hover": {
      backgroundColor: tokens["--dowel-bg-surface-3"],
      color: tokens["--dowel-text-primary"],
    },
  },
  ghost: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    color: tokens["--dowel-text-secondary"],
    ":hover": {
      backgroundColor: tokens["--dowel-bg-hover"],
      color: tokens["--dowel-text-primary"],
    },
  },
  danger: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    color: tokens["--dowel-danger"],
    ":hover": {
      backgroundColor: tokens["--dowel-danger-surface"],
    },
  },
});

export const size = stylex.create({
  sm: {
    height: tokens["--dowel-control-sm"],
    minWidth: tokens["--dowel-control-sm"],
  },
  md: {
    height: tokens["--dowel-control-md"],
    minWidth: tokens["--dowel-control-md"],
  },
});

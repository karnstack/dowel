import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

const MOBILE = "@media (max-width: 639px)";
const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";

export const toast = stylex.create({
  viewport: {
    bottom: { default: "1rem", [MOBILE]: "0.5rem" },
    maxWidth: { default: "calc(100vw - 2rem)", [MOBILE]: "calc(100vw - 1rem)" },
    outline: "none",
    pointerEvents: "none",
    position: "fixed",
    right: { default: "1rem", [MOBILE]: "0.5rem" },
    width: "22rem",
    zIndex: 70,
  },
  root: {
    "--toast-gap": "0.5rem",
    "--toast-peek": "0.5rem",
    "--toast-scale": "calc(max(0, 1 - (var(--toast-index) * 0.05)))",
    "--toast-shrink": "calc(1 - var(--toast-scale))",
    "--toast-stack-height":
      "var(--toast-frontmost-height, var(--toast-height))",
    "--toast-z-index": "calc(1000 - var(--toast-index))",
    "--toast-expanded-y":
      "calc((var(--toast-offset-y) * -1) + (var(--toast-index) * var(--toast-gap) * -1) + var(--toast-swipe-movement-y))",
    backgroundColor: tokens["--dowel-bg-elevated"],
    bottom: 0,
    borderColor: tokens["--dowel-border-default"],
    borderRadius: tokens["--dowel-radius-md"],
    borderStyle: "solid",
    borderWidth: tokens["--dowel-hairline"],
    boxShadow: tokens["--dowel-shadow-popover"],
    boxSizing: "border-box",
    color: tokens["--dowel-text-primary"],
    cursor: "default",
    height: "var(--toast-stack-height)",
    left: 0,
    opacity: 1,
    overflow: "hidden",
    pointerEvents: "auto",
    position: "absolute",
    transform:
      "translateX(var(--toast-swipe-movement-x)) translateY(calc(var(--toast-swipe-movement-y) - (var(--toast-index) * var(--toast-peek)) - (var(--toast-shrink) * var(--toast-stack-height)))) scale(var(--toast-scale))",
    transformOrigin: "bottom center",
    transitionDuration: {
      default: "400ms, 200ms, 200ms, 200ms",
      [REDUCED_MOTION]: "0.01ms",
    },
    transitionProperty: "transform, opacity, height, box-shadow",
    transitionTimingFunction:
      "cubic-bezier(0.22, 1, 0.36, 1), ease, cubic-bezier(0.22, 1, 0.36, 1), ease",
    userSelect: "none",
    width: "100%",
    // CSS accepts a computed integer here; csstype only models literal integers.
    zIndex: "var(--toast-z-index)" as unknown as number,
    "::after": {
      content: '""',
      height: "calc(var(--toast-gap) + 1px)",
      left: 0,
      position: "absolute",
      top: "100%",
      width: "100%",
    },
    ":focus-visible": {
      outlineColor: tokens["--dowel-focus-ring"],
      outlineOffset: "-2px",
      outlineStyle: "solid",
      outlineWidth: "2px",
    },
    "[data-expanded]": {
      height: "var(--toast-height)",
      transform:
        "translateX(var(--toast-swipe-movement-x)) translateY(var(--toast-expanded-y))",
    },
    "[data-starting-style]": {
      opacity: 0,
      transform: "translateY(calc(100% + 1rem)) scale(0.96)",
    },
    "[data-ending-style]": {
      opacity: 0,
      transform: "translateY(calc(100% + 1rem)) scale(0.96)",
    },
    "[data-ending-style][data-swipe-direction='up']": {
      transform: "translateY(calc(var(--toast-swipe-movement-y) - 150%))",
    },
    "[data-ending-style][data-swipe-direction='down']": {
      transform: "translateY(calc(var(--toast-swipe-movement-y) + 150%))",
    },
    "[data-ending-style][data-swipe-direction='left']": {
      transform:
        "translateX(calc(var(--toast-swipe-movement-x) - 150%)) translateY(var(--toast-expanded-y))",
    },
    "[data-ending-style][data-swipe-direction='right']": {
      transform:
        "translateX(calc(var(--toast-swipe-movement-x) + 150%)) translateY(var(--toast-expanded-y))",
    },
    "[data-swiping]": { transitionDuration: "0ms" },
    "[data-limited]": { opacity: 0, pointerEvents: "none" },
  },
  content: {
    alignItems: "flex-start",
    display: "flex",
    gap: "0.625rem",
    minHeight: "3.25rem",
    overflow: "hidden",
    padding: "0.75rem",
    transitionDuration: {
      default: "250ms",
      [REDUCED_MOTION]: "0.01ms",
    },
    transitionProperty: "opacity",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    "[data-behind]": { opacity: 0 },
    "[data-expanded]": { opacity: 1 },
  },
  icon: {
    alignItems: "center",
    animationDuration: {
      default: "200ms",
      [REDUCED_MOTION]: "0.01ms",
    },
    animationName: stylex.keyframes({
      from: { opacity: 0, transform: "scale(0.8)" },
      to: { opacity: 1, transform: "scale(1)" },
    }),
    animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    color: tokens["--dowel-text-tertiary"],
    display: "inline-flex",
    flexShrink: 0,
    height: "1.25rem",
  },
  success: { color: tokens["--dowel-success"] },
  warning: { color: tokens["--dowel-warning"] },
  danger: { color: tokens["--dowel-danger"] },
  info: { color: tokens["--dowel-accent"] },
  spinner: {
    animationDuration: "0.8s",
    animationIterationCount: "infinite",
    animationName: stylex.keyframes({ to: { transform: "rotate(360deg)" } }),
    animationTimingFunction: "linear",
    borderColor: tokens["--dowel-border-strong"],
    borderRadius: "50%",
    borderStyle: "solid",
    borderTopColor: tokens["--dowel-accent"],
    borderWidth: "2px",
    height: "0.875rem",
    width: "0.875rem",
  },
  text: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: "0.125rem",
    minWidth: 0,
  },
  title: {
    color: tokens["--dowel-text-primary"],
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.8125rem",
    fontWeight: 550,
    lineHeight: 1.4,
    margin: 0,
  },
  description: {
    color: tokens["--dowel-text-secondary"],
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.75rem",
    lineHeight: 1.45,
    margin: 0,
  },
  controls: {
    alignItems: "center",
    display: "flex",
    flexShrink: 0,
    gap: "0.25rem",
  },
  action: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: tokens["--dowel-radius-sm"],
    color: tokens["--dowel-accent"],
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.75rem",
    fontWeight: 550,
    minHeight: "1.75rem",
    padding: "0 0.375rem",
    ":hover": { backgroundColor: tokens["--dowel-bg-hover"] },
    ":focus-visible": {
      outlineColor: tokens["--dowel-focus-ring"],
      outlineOffset: "-2px",
      outlineStyle: "solid",
      outlineWidth: "2px",
    },
  },
  close: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: tokens["--dowel-radius-sm"],
    color: tokens["--dowel-text-tertiary"],
    display: "inline-flex",
    height: "1.75rem",
    justifyContent: "center",
    padding: 0,
    width: "1.75rem",
    ":hover": {
      backgroundColor: tokens["--dowel-bg-hover"],
      color: tokens["--dowel-text-primary"],
    },
    ":focus-visible": {
      outlineColor: tokens["--dowel-focus-ring"],
      outlineOffset: "-2px",
      outlineStyle: "solid",
      outlineWidth: "2px",
    },
  },
});

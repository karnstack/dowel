import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";
const MOBILE = "@media (max-width: 639px)";

export const backdrop = stylex.create({
  root: {
    backgroundColor: tokens["--dowel-scrim"],
    inset: 0,
    opacity: "calc(1 - var(--drawer-swipe-progress, 0))",
    position: "fixed",
    transitionDuration: {
      default: tokens["--dowel-duration-normal"],
      [REDUCED_MOTION]: "0.01ms",
    },
    transitionProperty: "opacity",
    zIndex: 50,
    "[data-starting-style]": { opacity: 0 },
    "[data-ending-style]": { opacity: 0 },
    "[data-swiping]": { transitionDuration: "0ms" },
  },
});

export const viewport = stylex.create({
  root: { inset: 0, pointerEvents: "none", position: "fixed", zIndex: 51 },
});

export const popup = stylex.create({
  root: {
    backgroundColor: tokens["--dowel-bg-elevated"],
    boxShadow: tokens["--dowel-shadow-modal"],
    boxSizing: "border-box",
    color: tokens["--dowel-text-primary"],
    display: "flex",
    flexDirection: "column",
    outline: "none",
    overflow: "hidden",
    pointerEvents: "auto",
    position: "absolute",
    transitionDuration: {
      default: tokens["--dowel-duration-normal"],
      [REDUCED_MOTION]: "0.01ms",
    },
    transitionProperty: "transform",
    transitionTimingFunction: tokens["--dowel-ease-out"],
    "[data-swiping]": { transitionDuration: "0ms" },
  },
  right: {
    borderInlineStartColor: tokens["--dowel-border-default"],
    borderInlineStartStyle: "solid",
    borderInlineStartWidth: tokens["--dowel-hairline"],
    height: "100dvh",
    insetBlock: 0,
    insetInlineEnd: 0,
    maxWidth: "calc(100vw - 1rem)",
    transform: "translateX(var(--drawer-swipe-movement-x, 0px))",
    width: "min(24rem, 90vw)",
    "[data-starting-style]": { transform: "translateX(100%)" },
    "[data-ending-style]": { transform: "translateX(100%)" },
  },
  left: {
    borderInlineEndColor: tokens["--dowel-border-default"],
    borderInlineEndStyle: "solid",
    borderInlineEndWidth: tokens["--dowel-hairline"],
    height: "100dvh",
    insetBlock: 0,
    insetInlineStart: 0,
    maxWidth: "calc(100vw - 1rem)",
    transform: "translateX(var(--drawer-swipe-movement-x, 0px))",
    width: "min(24rem, 90vw)",
    "[data-starting-style]": { transform: "translateX(-100%)" },
    "[data-ending-style]": { transform: "translateX(-100%)" },
  },
  bottom: {
    borderStartEndRadius: tokens["--dowel-radius-lg"],
    borderStartStartRadius: tokens["--dowel-radius-lg"],
    insetBlockEnd: 0,
    insetInline: 0,
    marginInline: "auto",
    maxHeight: "calc(100dvh - 1rem)",
    transform:
      "translateY(calc(var(--drawer-snap-point-offset, 0px) + var(--drawer-swipe-movement-y, 0px)))",
    width: { default: "min(36rem, calc(100vw - 2rem))", [MOBILE]: "100vw" },
    "[data-starting-style]": { transform: "translateY(100%)" },
    "[data-ending-style]": { transform: "translateY(100%)" },
  },
  top: {
    borderEndEndRadius: tokens["--dowel-radius-lg"],
    borderEndStartRadius: tokens["--dowel-radius-lg"],
    insetBlockStart: 0,
    insetInline: 0,
    marginInline: "auto",
    maxHeight: "calc(100dvh - 1rem)",
    transform: "translateY(var(--drawer-swipe-movement-y, 0px))",
    width: { default: "min(36rem, calc(100vw - 2rem))", [MOBILE]: "100vw" },
    "[data-starting-style]": { transform: "translateY(-100%)" },
    "[data-ending-style]": { transform: "translateY(-100%)" },
  },
});

export const part = stylex.create({
  content: { display: "flex", flex: 1, flexDirection: "column", minHeight: 0 },
  handle: {
    alignSelf: "center",
    backgroundColor: tokens["--dowel-border-strong"],
    borderRadius: tokens["--dowel-radius-pill"],
    height: "0.25rem",
    marginBlockStart: "0.5rem",
    width: "2.25rem",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "0.375rem",
    padding: "1rem",
  },
  body: {
    color: tokens["--dowel-text-secondary"],
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
    padding: "0 1rem 1rem",
  },
  footer: {
    alignItems: "center",
    borderTopColor: tokens["--dowel-border-subtle"],
    borderTopStyle: "solid",
    borderTopWidth: tokens["--dowel-hairline"],
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    justifyContent: "flex-end",
    padding: "0.75rem 1rem 1rem",
  },
  title: {
    color: tokens["--dowel-text-primary"],
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.9375rem",
    fontWeight: 550,
    lineHeight: 1.4,
    margin: 0,
  },
  description: {
    color: tokens["--dowel-text-tertiary"],
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.8125rem",
    lineHeight: 1.5,
    margin: 0,
  },
});

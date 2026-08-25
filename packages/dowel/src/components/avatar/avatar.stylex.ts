import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

export const root = stylex.create({
  base: {
    alignItems: "center",
    backgroundColor: tokens["--dowel-bg-surface-3"],
    borderColor: tokens["--dowel-border-default"],
    borderStyle: "solid",
    borderWidth: tokens["--dowel-hairline"],
    boxSizing: "border-box",
    color: tokens["--dowel-text-primary"],
    display: "inline-flex",
    flexShrink: 0,
    fontFamily: tokens["--dowel-font-sans"],
    fontWeight: 550,
    justifyContent: "center",
    overflow: "visible",
    position: "relative",
    userSelect: "none",
  },
});

export const size = stylex.create({
  xs: { fontSize: "0.5625rem", height: "1.25rem", width: "1.25rem" },
  sm: { fontSize: "0.625rem", height: "1.5rem", width: "1.5rem" },
  md: { fontSize: "0.6875rem", height: "1.75rem", width: "1.75rem" },
  lg: { fontSize: "0.8125rem", height: "2.25rem", width: "2.25rem" },
});

export const shape = stylex.create({
  circle: { borderRadius: tokens["--dowel-radius-pill"] },
  square: { borderRadius: tokens["--dowel-radius-md"] },
});

export const part = stylex.create({
  image: {
    borderRadius: "inherit",
    display: "block",
    height: "100%",
    objectFit: "cover",
    overflow: "hidden",
    width: "100%",
  },
  fallback: {
    alignItems: "center",
    borderRadius: "inherit",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    lineHeight: 1,
    overflow: "hidden",
    width: "100%",
  },
  status: {
    borderColor: tokens["--dowel-bg-surface-1"],
    borderRadius: tokens["--dowel-radius-pill"],
    borderStyle: "solid",
    borderWidth: "2px",
    bottom: "-1px",
    boxSizing: "border-box",
    height: "0.5rem",
    position: "absolute",
    right: "-1px",
    width: "0.5rem",
  },
});

export const statusTone = stylex.create({
  online: { backgroundColor: tokens["--dowel-success"] },
  away: { backgroundColor: tokens["--dowel-warning"] },
  busy: { backgroundColor: tokens["--dowel-danger"] },
  offline: { backgroundColor: tokens["--dowel-text-disabled"] },
});

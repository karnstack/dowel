import * as stylex from "@stylexjs/stylex";
import { tokens } from "../../theme/tokens.stylex";
const COARSE = "@media (pointer: coarse)";
export const toggle = stylex.create({
  group: {
    alignItems: "center",
    backgroundColor: tokens["--dowel-bg-surface-2"],
    borderColor: tokens["--dowel-border-default"],
    borderRadius: tokens["--dowel-radius-md"],
    borderStyle: "solid",
    borderWidth: tokens["--dowel-hairline"],
    display: "inline-flex",
    gap: "0.125rem",
    padding: "0.125rem",
    "[data-orientation=vertical]": {
      alignItems: "stretch",
      flexDirection: "column",
    },
  },
  item: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: tokens["--dowel-radius-sm"],
    borderWidth: 0,
    color: tokens["--dowel-text-secondary"],
    display: "inline-flex",
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.75rem",
    fontWeight: 500,
    gap: "0.375rem",
    height: { default: tokens["--dowel-control-md"], [COARSE]: "2.75rem" },
    justifyContent: "center",
    minWidth: tokens["--dowel-control-md"],
    outline: "none",
    paddingInline: "0.5rem",
    userSelect: "none",
    ":hover": {
      backgroundColor: tokens["--dowel-bg-hover"],
      color: tokens["--dowel-text-primary"],
    },
    ":focus-visible": {
      outlineColor: tokens["--dowel-focus-ring"],
      outlineOffset: "1px",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
    "[data-pressed]": {
      backgroundColor: tokens["--dowel-bg-surface-1"],
      boxShadow: tokens["--dowel-shadow-control"],
      color: tokens["--dowel-text-primary"],
    },
    "[data-disabled]": {
      color: tokens["--dowel-text-disabled"],
      opacity: 0.55,
    },
  },
});

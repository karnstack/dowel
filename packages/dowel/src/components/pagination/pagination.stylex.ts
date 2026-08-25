import * as stylex from "@stylexjs/stylex";
import { tokens } from "../../theme/tokens.stylex";
export const pagination = stylex.create({
  root: { alignItems: "center", display: "flex", gap: "0.125rem" },
  button: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: tokens["--dowel-radius-sm"],
    borderWidth: 0,
    color: tokens["--dowel-text-secondary"],
    display: "inline-flex",
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.75rem",
    height: tokens["--dowel-control-md"],
    justifyContent: "center",
    minWidth: tokens["--dowel-control-md"],
    outline: "none",
    paddingInline: "0.375rem",
    ":hover": {
      backgroundColor: tokens["--dowel-bg-hover"],
      color: tokens["--dowel-text-primary"],
    },
    ":focus-visible": {
      outlineColor: tokens["--dowel-focus-ring"],
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
    ":disabled": { color: tokens["--dowel-text-disabled"], opacity: 0.55 },
  },
  active: {
    backgroundColor: tokens["--dowel-bg-surface-3"],
    color: tokens["--dowel-text-primary"],
    fontWeight: 600,
  },
  ellipsis: {
    alignItems: "center",
    color: tokens["--dowel-text-tertiary"],
    display: "inline-flex",
    height: tokens["--dowel-control-md"],
    justifyContent: "center",
    width: tokens["--dowel-control-md"],
  },
});

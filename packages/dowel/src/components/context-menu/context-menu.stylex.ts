import * as stylex from "@stylexjs/stylex";
import { tokens } from "../../theme/tokens.stylex";
export const context = stylex.create({
  target: {
    alignItems: "center",
    backgroundColor: tokens["--dowel-bg-surface-2"],
    borderColor: tokens["--dowel-border-default"],
    borderRadius: tokens["--dowel-radius-md"],
    borderStyle: "dashed",
    borderWidth: "1px",
    color: tokens["--dowel-text-secondary"],
    display: "flex",
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.8125rem",
    justifyContent: "center",
    minHeight: "8rem",
    outline: "none",
    padding: "1rem",
    userSelect: "none",
    width: "100%",
    ":focus-visible": { borderColor: tokens["--dowel-focus-ring"] },
  },
});

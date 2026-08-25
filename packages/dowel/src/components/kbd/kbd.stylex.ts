import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

export const kbd = stylex.create({
  root: {
    alignItems: "center",
    display: "inline-flex",
    gap: "0.1875rem",
  },
  key: {
    alignItems: "center",
    backgroundColor: tokens["--dowel-bg-surface-2"],
    borderColor: tokens["--dowel-border-default"],
    borderRadius: tokens["--dowel-radius-sm"],
    borderStyle: "solid",
    borderWidth: tokens["--dowel-hairline"],
    boxSizing: "border-box",
    color: tokens["--dowel-text-tertiary"],
    display: "inline-flex",
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.6875rem",
    fontWeight: 450,
    height: "1.125rem",
    justifyContent: "center",
    letterSpacing: "-0.00625rem",
    lineHeight: 1,
    minWidth: "1.125rem",
    paddingInline: "0.25rem",
  },
});

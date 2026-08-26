import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

export const form = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    minWidth: 0,
  },
  actions: {
    alignItems: "center",
    display: "flex",
    gap: "0.5rem",
    justifyContent: "flex-end",
    paddingBlockStart: "0.25rem",
  },
  fieldError: {
    color: tokens["--dowel-danger"],
  },
});

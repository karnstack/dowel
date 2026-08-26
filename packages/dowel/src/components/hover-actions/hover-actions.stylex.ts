import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

export const actions = stylex.create({
  root: {
    alignItems: "center",
    display: "inline-flex",
    flexShrink: 0,
    gap: "0.125rem",
    justifyContent: "flex-end",
    minHeight: tokens["--dowel-control-md"],
  },
  concealed: {
    opacity: 0,
    pointerEvents: "none",
    ":focus-within": {
      opacity: 1,
      pointerEvents: "auto",
    },
  },
});

import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

export const root = stylex.create({
  base: {
    backgroundColor: tokens["--dowel-border-subtle"],
    border: 0,
    boxSizing: "border-box",
    flexShrink: 0,
  },
});

export const orientation = stylex.create({
  horizontal: {
    height: tokens["--dowel-hairline"],
    width: "100%",
  },
  vertical: {
    alignSelf: "stretch",
    minHeight: "1rem",
    width: tokens["--dowel-hairline"],
  },
});

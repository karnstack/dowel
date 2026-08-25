import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

export const radio = stylex.create({
  root: {
    borderRadius: tokens["--dowel-radius-pill"],
    height: "1rem",
    width: "1rem",
  },
  indicator: {
    backgroundColor: "currentColor",
    borderRadius: tokens["--dowel-radius-pill"],
    height: "0.375rem",
    width: "0.375rem",
  },
});

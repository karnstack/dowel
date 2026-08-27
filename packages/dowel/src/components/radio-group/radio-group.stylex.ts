import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

const COARSE = "@media (pointer: coarse)";

export const radio = stylex.create({
  root: {
    borderRadius: tokens["--dowel-radius-pill"],
    height: { default: "1rem", [COARSE]: "1.25rem" },
    width: { default: "1rem", [COARSE]: "1.25rem" },
  },
  indicator: {
    backgroundColor: "currentColor",
    borderRadius: tokens["--dowel-radius-pill"],
    height: { default: "0.375rem", [COARSE]: "0.5rem" },
    width: { default: "0.375rem", [COARSE]: "0.5rem" },
  },
});

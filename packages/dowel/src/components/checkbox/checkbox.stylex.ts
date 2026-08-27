import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

const COARSE = "@media (pointer: coarse)";

export const checkbox = stylex.create({
  root: {
    borderRadius: tokens["--dowel-radius-sm"],
    height: { default: "1rem", [COARSE]: "1.25rem" },
    width: { default: "1rem", [COARSE]: "1.25rem" },
    "[data-indeterminate]": {
      backgroundColor: tokens["--dowel-accent"],
      borderColor: tokens["--dowel-accent"],
    },
  },
  indicator: {
    display: "block",
    height: "100%",
    opacity: 1,
    position: "relative",
    width: "100%",
    "[data-unchecked]": {
      opacity: 0,
    },
    "::after": {
      borderBlockEndColor: "currentColor",
      borderBlockEndStyle: "solid",
      borderBlockEndWidth: "1.5px",
      borderInlineEndColor: "currentColor",
      borderInlineEndStyle: "solid",
      borderInlineEndWidth: "1.5px",
      content: '""',
      height: "0.4375rem",
      insetBlockStart: "0.1875rem",
      insetInlineStart: "0.3125rem",
      position: "absolute",
      rotate: "45deg",
      width: "0.1875rem",
    },
    "[data-indeterminate]::after": {
      borderBlockEndWidth: 0,
      borderInlineEndWidth: 0,
      backgroundColor: "currentColor",
      borderRadius: tokens["--dowel-radius-pill"],
      height: "1.5px",
      insetBlockStart: "0.4375rem",
      insetInlineStart: "0.25rem",
      rotate: "none",
      width: "0.5rem",
    },
  },
});

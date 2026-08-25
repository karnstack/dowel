import * as stylex from "@stylexjs/stylex";
import { tokens } from "../../theme/tokens.stylex";
export const slider = stylex.create({
  root: { display: "grid", gap: "0.25rem", minWidth: 0, width: "100%" },
  label: {
    color: tokens["--dowel-text-primary"],
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.75rem",
    fontWeight: 500,
  },
  value: {
    color: tokens["--dowel-text-secondary"],
    fontFamily: tokens["--dowel-font-mono"],
    fontSize: "0.75rem",
    gridColumn: "2",
    gridRow: "1",
    justifySelf: "end",
  },
  control: {
    alignItems: "center",
    display: "flex",
    gridColumn: "1 / -1",
    minHeight: "1.75rem",
    touchAction: "none",
    userSelect: "none",
    width: "100%",
    "[data-orientation=vertical]": {
      height: "10rem",
      justifyContent: "center",
      minWidth: "1.75rem",
      width: "auto",
    },
  },
  track: {
    backgroundColor: tokens["--dowel-bg-surface-3"],
    borderRadius: tokens["--dowel-radius-pill"],
    height: "0.25rem",
    position: "relative",
    width: "100%",
    "[data-orientation=vertical]": { height: "100%", width: "0.25rem" },
  },
  indicator: {
    backgroundColor: tokens["--dowel-accent"],
    borderRadius: "inherit",
  },
  thumb: {
    backgroundColor: tokens["--dowel-bg-elevated"],
    borderColor: tokens["--dowel-border-strong"],
    borderRadius: "50%",
    borderStyle: "solid",
    borderWidth: "1px",
    boxShadow: tokens["--dowel-shadow-control"],
    height: "1rem",
    outline: "none",
    width: "1rem",
    ":has(:focus-visible)": {
      outlineColor: tokens["--dowel-focus-ring"],
      outlineOffset: "2px",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
    "[data-dragging]": { borderColor: tokens["--dowel-accent"] },
  },
});

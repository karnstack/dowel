import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

const COMPACT = "@media (max-width: 1023px)";

export const parts = stylex.create({
  root: {
    "--dowel-sidebar-offset": "0px",
    "--dowel-sidebar-width": "232px",
    display: "grid",
    gridTemplateColumns: {
      default: `var(--dowel-sidebar-width) ${tokens["--dowel-hairline"]} minmax(0, 1fr)`,
      [COMPACT]: "minmax(0, 1fr)",
    },
    minWidth: 0,
    width: "100%",
  },
  panel: {
    backgroundColor: tokens["--dowel-bg-canvas"],
    display: {
      default: "flex",
      [COMPACT]: "none",
    },
    flexDirection: "column",
    gridColumn: 1,
    minWidth: 0,
    overflow: "hidden",
  },
  stickyPanel: {
    alignSelf: "start",
    height: "calc(100dvh - var(--dowel-sidebar-offset))",
    position: "sticky",
    top: "var(--dowel-sidebar-offset)",
  },
  header: {
    alignItems: "center",
    display: "flex",
    flexShrink: 0,
    gap: "0.5rem",
    minHeight: "2.75rem",
    padding: "0.625rem 0.75rem",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    minHeight: 0,
    minWidth: 0,
    overflowY: "auto",
    padding: "0.75rem",
    scrollbarGutter: "stable",
  },
  footer: {
    alignItems: "center",
    borderTopColor: tokens["--dowel-border-subtle"],
    borderTopStyle: "solid",
    borderTopWidth: tokens["--dowel-hairline"],
    display: "flex",
    flexShrink: 0,
    gap: "0.5rem",
    minHeight: "2.75rem",
    padding: "0.625rem 0.75rem",
  },
  handle: {
    backgroundColor: tokens["--dowel-border-default"],
    cursor: "col-resize",
    display: {
      default: "block",
      [COMPACT]: "none",
    },
    gridColumn: 2,
    outline: "none",
    position: "relative",
    touchAction: "none",
    userSelect: "none",
    zIndex: 1,
    "::after": {
      content: '\"\"',
      insetBlock: 0,
      left: "50%",
      position: "absolute",
      transform: "translateX(-50%)",
      width: "0.75rem",
    },
    ":hover": {
      backgroundColor: tokens["--dowel-border-strong"],
    },
    ":focus-visible": {
      backgroundColor: tokens["--dowel-focus-ring"],
    },
    "[data-resizing]": {
      backgroundColor: tokens["--dowel-focus-ring"],
    },
  },
  content: {
    gridColumn: {
      default: 3,
      [COMPACT]: 1,
    },
    minWidth: 0,
  },
});

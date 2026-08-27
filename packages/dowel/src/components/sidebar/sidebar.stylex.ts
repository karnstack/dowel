import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

const COMPACT = "@media (max-width: 1023px)";
const MOBILE = "@media (max-width: 639px)";
const COARSE = "@media (pointer: coarse)";

export const parts = stylex.create({
  root: {
    "--dowel-sidebar-offset": "0px",
    "--dowel-sidebar-width": "232px",
    display: "grid",
    backgroundColor: tokens["--dowel-bg-canvas"],
    gridTemplateColumns: {
      default: "var(--dowel-sidebar-width) 0 minmax(0, 1fr)",
      [COMPACT]: "minmax(0, 1fr)",
    },
    minWidth: 0,
    width: "100%",
  },
  splitRoot: {
    gridTemplateColumns: {
      default: `var(--dowel-sidebar-width) ${tokens["--dowel-hairline"]} minmax(0, 1fr)`,
      [COMPACT]: "minmax(0, 1fr)",
    },
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
    backgroundColor: "transparent",
    cursor: "col-resize",
    display: {
      default: "block",
      [COMPACT]: "none",
    },
    gridColumn: 2,
    outline: "none",
    position: "relative",
    transform: "translateX(-50%)",
    width: "0.75rem",
    touchAction: "none",
    userSelect: "none",
    zIndex: 1,
    "::after": {
      content: '\"\"',
      backgroundColor: "transparent",
      insetBlock: "0.25rem",
      left: "50%",
      position: "absolute",
      transform: "translateX(-50%)",
      width: tokens["--dowel-hairline"],
    },
    ":hover": {
      backgroundColor: "transparent",
      "::after": {
        backgroundColor: tokens["--dowel-border-strong"],
      },
    },
    ":focus-visible": {
      "::after": {
        backgroundColor: tokens["--dowel-focus-ring"],
      },
    },
    "[data-resizing]": {
      "::after": {
        backgroundColor: tokens["--dowel-focus-ring"],
      },
    },
  },
  splitHandle: {
    backgroundColor: tokens["--dowel-border-default"],
    transform: "none",
    width: "auto",
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
    backgroundColor: tokens["--dowel-bg-surface-1"],
    borderColor: {
      default: tokens["--dowel-border-default"],
      [COMPACT]: "transparent",
    },
    borderRadius: {
      default: "0.625rem",
      [COMPACT]: 0,
    },
    borderStyle: "solid",
    borderWidth: tokens["--dowel-hairline"],
    gridColumn: {
      default: 3,
      [COMPACT]: 1,
    },
    margin: {
      default: "0.25rem 0.25rem 0.25rem 0",
      [COMPACT]: 0,
    },
    minWidth: 0,
    overflow: "hidden",
  },
  splitContent: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderRadius: 0,
    margin: 0,
    overflow: "visible",
  },
});

export const navigation = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "0.125rem",
    minWidth: 0,
    width: "100%",
  },
  section: {
    minWidth: 0,
    width: "100%",
  },
  trigger: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderRadius: tokens["--dowel-radius-sm"],
    borderStyle: "solid",
    borderWidth: tokens["--dowel-hairline"],
    color: tokens["--dowel-text-secondary"],
    cursor: "default",
    display: "flex",
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.75rem",
    fontWeight: 500,
    gap: "0.375rem",
    letterSpacing: "-0.00625rem",
    minHeight: {
      default: tokens["--dowel-control-md"],
      [COARSE]: "2.75rem",
    },
    outline: "none",
    paddingInline: "0.5rem",
    textAlign: "start",
    width: "100%",
    ":hover:not(:disabled)": {
      backgroundColor: tokens["--dowel-bg-hover"],
      color: tokens["--dowel-text-primary"],
    },
    ":focus-visible": {
      outlineColor: tokens["--dowel-focus-ring"],
      outlineOffset: "-1px",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
    "[data-active]": {
      color: tokens["--dowel-text-primary"],
    },
  },
  triggerLabel: {
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  chevron: {
    color: tokens["--dowel-text-tertiary"],
    flexShrink: 0,
    height: "0.75rem",
    marginInlineStart: "auto",
    transform: "rotate(0deg)",
    width: "0.75rem",
  },
  chevronOpen: {
    transform: "rotate(90deg)",
  },
  panel: {
    height: "var(--collapsible-panel-height)",
    overflow: "hidden",
    "[data-starting-style]": { height: 0 },
    "[data-ending-style]": { height: 0 },
  },
  sectionContent: {
    display: "flex",
    flexDirection: "column",
    gap: "0.125rem",
    paddingBlock: "0.125rem 0.5rem",
  },
  item: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: tokens["--dowel-radius-sm"],
    color: tokens["--dowel-text-secondary"],
    cursor: "default",
    display: "flex",
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: {
      default: "0.8125rem",
      [MOBILE]: "1rem",
    },
    fontWeight: 450,
    gap: "0.5rem",
    letterSpacing: "-0.0125rem",
    minHeight: {
      default: tokens["--dowel-control-md"],
      [COARSE]: "2.75rem",
    },
    minWidth: 0,
    outline: "none",
    paddingInline: "0.5rem",
    textDecoration: "none",
    width: "100%",
    ':hover:not(:disabled):not([aria-disabled="true"])': {
      backgroundColor: tokens["--dowel-bg-hover"],
      color: tokens["--dowel-text-primary"],
    },
    ":focus-visible": {
      outlineColor: tokens["--dowel-focus-ring"],
      outlineOffset: "-1px",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
    "[data-active]": {
      backgroundColor: tokens["--dowel-bg-active"],
      color: tokens["--dowel-text-primary"],
    },
    '[aria-disabled="true"]': {
      color: tokens["--dowel-text-disabled"],
      cursor: "not-allowed",
    },
  },
  itemNested: {
    paddingInlineStart: "1.75rem",
  },
  itemIcon: {
    alignItems: "center",
    color: tokens["--dowel-text-tertiary"],
    display: "inline-flex",
    flexShrink: 0,
    height: "1rem",
    justifyContent: "center",
    width: "1rem",
  },
  itemLabel: {
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  itemSuffix: {
    alignItems: "center",
    color: tokens["--dowel-text-tertiary"],
    display: "inline-flex",
    flexShrink: 0,
    marginInlineStart: "auto",
  },
});

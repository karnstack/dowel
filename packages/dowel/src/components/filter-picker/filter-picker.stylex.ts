import * as stylex from "@stylexjs/stylex";

import { tokens } from "../../theme/tokens.stylex";

const MOBILE = "@media (max-width: 639px)";

export const picker = stylex.create({
  root: {
    margin: "-0.75rem",
    minWidth: "18rem",
    position: "relative",
    width: "18rem",
  },
  panel: {
    minWidth: 0,
  },
  valuePanel: {
    backgroundColor: tokens["--dowel-bg-elevated"],
    borderColor: tokens["--dowel-border-default"],
    borderRadius: "10px",
    borderStyle: "solid",
    borderWidth: tokens["--dowel-hairline"],
    boxShadow: tokens["--dowel-shadow-popover"],
    boxSizing: "border-box",
    overflow: "hidden",
    position: "absolute",
    top: {
      default: 0,
      [MOBILE]: "calc(100% + 0.375rem)",
    },
    width: "18rem",
    zIndex: 1,
  },
  submenuRight: {
    insetInlineStart: {
      default: "calc(100% + 0.375rem)",
      [MOBILE]: 0,
    },
  },
  submenuLeft: {
    insetInlineEnd: {
      default: "calc(100% + 0.375rem)",
      [MOBILE]: 0,
    },
  },
  header: {
    alignItems: "center",
    borderBlockEndColor: tokens["--dowel-border-subtle"],
    borderBlockEndStyle: "solid",
    borderBlockEndWidth: tokens["--dowel-hairline"],
    display: "flex",
    minHeight: "2.75rem",
    paddingInline: "0.75rem",
  },
  list: {
    maxHeight: "22rem",
    overflowY: "auto",
    paddingBlock: "0.375rem",
  },
  item: {
    alignItems: "center",
    appearance: "none",
    backgroundColor: "transparent",
    borderStyle: "none",
    borderRadius: tokens["--dowel-radius-md"],
    color: tokens["--dowel-text-secondary"],
    cursor: "pointer",
    display: "flex",
    fontFamily: tokens["--dowel-font-sans"],
    fontSize: "0.8125rem",
    fontWeight: 500,
    gap: "0.5rem",
    minHeight: "2rem",
    marginInline: "0.375rem",
    outline: "none",
    paddingInline: "0.625rem",
    textAlign: "left",
    width: "calc(100% - 0.75rem)",
    ":hover": {
      backgroundColor: tokens["--dowel-bg-surface-3"],
      color: tokens["--dowel-text-primary"],
    },
    ":focus-visible": {
      backgroundColor: tokens["--dowel-bg-surface-3"],
      boxShadow: `inset 0 0 0 1px ${tokens["--dowel-focus-ring"]}`,
      color: tokens["--dowel-text-primary"],
    },
    ":disabled": {
      cursor: "not-allowed",
      opacity: 0.45,
    },
  },
  activeItem: {
    backgroundColor: tokens["--dowel-bg-active"],
    color: tokens["--dowel-text-primary"],
  },
  icon: {
    alignItems: "center",
    color: tokens["--dowel-text-tertiary"],
    display: "inline-flex",
    flexShrink: 0,
    height: "1rem",
    justifyContent: "center",
    width: "1rem",
  },
  label: {
    flexGrow: 1,
    minWidth: 0,
  },
  count: {
    color: tokens["--dowel-text-tertiary"],
    fontSize: "0.75rem",
  },
  chevron: {
    color: tokens["--dowel-text-tertiary"],
    flexShrink: 0,
  },
  empty: {
    color: tokens["--dowel-text-tertiary"],
    fontSize: "0.8125rem",
    margin: 0,
    padding: "1.5rem 0.75rem",
    textAlign: "center",
  },
});

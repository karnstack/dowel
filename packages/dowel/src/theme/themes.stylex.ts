import * as stylex from "@stylexjs/stylex";

import { tokens } from "./tokens.stylex";

const DARK = "@media (prefers-color-scheme: dark)";

const light = {
  "--dowel-bg-canvas": "#f7f7f6",
  "--dowel-bg-surface-1": "#ffffff",
  "--dowel-bg-surface-2": "#f2f1ef",
  "--dowel-bg-surface-3": "#e9e8e5",
  "--dowel-bg-elevated": "#ffffff",
  "--dowel-bg-hover": "#0000000a",
  "--dowel-bg-active": "#00000010",
  "--dowel-border-subtle": "#0000000a",
  "--dowel-border-default": "#00000014",
  "--dowel-border-strong": "#00000024",
  "--dowel-text-primary": "#20201f",
  "--dowel-text-secondary": "#5f5e5a",
  "--dowel-text-tertiary": "#85837d",
  "--dowel-text-disabled": "#aaa8a2",
  "--dowel-accent": "#287d73",
  "--dowel-accent-hover": "#226c64",
  "--dowel-accent-active": "#1d5d56",
  "--dowel-on-accent": "#ffffff",
  "--dowel-focus-ring": "#2d8f84",
  "--dowel-danger": "#c43d45",
  "--dowel-danger-hover": "#ad343c",
  "--dowel-danger-surface": "#c43d4514",
  "--dowel-on-danger": "#ffffff",
  "--dowel-success": "#34835c",
  "--dowel-warning": "#a76816",
  "--dowel-scrim": "#00000066",
  "--dowel-shadow-control": "0 1px 1px #0000000a, 0 1px 2px #0000000a",
  "--dowel-shadow-popover":
    "0 3px 8px #0000001f, 0 2px 5px #0000001f, 0 1px 1px #0000001f",
  "--dowel-shadow-modal":
    "0 20px 64px #00000024, 0 8px 24px #0000001f, 0 2px 8px #0000001a, 0 1px 1px #0000001f",
} as const;

const dark = {
  "--dowel-bg-canvas": "#10100f",
  "--dowel-bg-surface-1": "#141413",
  "--dowel-bg-surface-2": "#1a1a19",
  "--dowel-bg-surface-3": "#222220",
  "--dowel-bg-elevated": "#1d1d1c",
  "--dowel-bg-hover": "#ffffff0a",
  "--dowel-bg-active": "#ffffff12",
  "--dowel-border-subtle": "#ffffff0a",
  "--dowel-border-default": "#ffffff14",
  "--dowel-border-strong": "#ffffff24",
  "--dowel-text-primary": "#f1f0ed",
  "--dowel-text-secondary": "#aaa8a2",
  "--dowel-text-tertiary": "#77756f",
  "--dowel-text-disabled": "#55534e",
  "--dowel-accent": "#5bb8ac",
  "--dowel-accent-hover": "#68c5b9",
  "--dowel-accent-active": "#4ba69b",
  "--dowel-on-accent": "#0b2926",
  "--dowel-focus-ring": "#67c4b8",
  "--dowel-danger": "#e16a70",
  "--dowel-danger-hover": "#ed7a80",
  "--dowel-danger-surface": "#e16a701a",
  "--dowel-on-danger": "#2b0b0e",
  "--dowel-success": "#66b98a",
  "--dowel-warning": "#d39a4a",
  "--dowel-scrim": "#00000099",
  "--dowel-shadow-control": "none",
  "--dowel-shadow-popover": "none",
  "--dowel-shadow-modal": "none",
} as const;

export const lightTheme = stylex.createTheme(tokens, light);
export const darkTheme = stylex.createTheme(tokens, dark);
export const systemTheme = stylex.createTheme(
  tokens,
  Object.fromEntries(
    Object.keys(light).map((key) => [
      key,
      {
        default: light[key as keyof typeof light],
        [DARK]: dark[key as keyof typeof dark],
      },
    ]),
  ),
);

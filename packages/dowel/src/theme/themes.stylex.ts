import * as stylex from "@stylexjs/stylex";

import { tokens } from "./tokens.stylex";

const DARK = "@media (prefers-color-scheme: dark)";

const light = {
  "--dowel-bg-canvas": "oklch(98.5% 0 none)",
  "--dowel-bg-surface-1": "#ffffff",
  "--dowel-bg-surface-2": "oklch(96.7% 0.001 286.375)",
  "--dowel-bg-surface-3": "oklch(92% 0.004 286.32)",
  "--dowel-bg-elevated": "#ffffff",
  "--dowel-bg-hover": "#0000000a",
  "--dowel-bg-active": "#00000010",
  "--dowel-border-subtle": "#0000000a",
  "--dowel-border-default": "#00000014",
  "--dowel-border-strong": "#00000024",
  "--dowel-text-primary": "oklch(21% 0.006 285.885)",
  "--dowel-text-secondary": "oklch(44.2% 0.017 285.786)",
  "--dowel-text-tertiary": "oklch(55.2% 0.016 285.938)",
  "--dowel-text-disabled": "oklch(70.5% 0.015 286.067)",
  "--dowel-accent": "#26786f",
  "--dowel-accent-hover": "#226c64",
  "--dowel-accent-active": "#1d5d56",
  "--dowel-on-accent": "#ffffff",
  "--dowel-focus-ring": "#2d8f84",
  "--dowel-danger": "#c43d45",
  "--dowel-danger-hover": "#ad343c",
  "--dowel-danger-surface": "#c43d4514",
  "--dowel-on-danger": "#ffffff",
  "--dowel-success": "#307b55",
  "--dowel-warning": "#a76816",
  "--dowel-scrim": "#00000066",
  "--dowel-shadow-control": "0 1px 1px #0000000a, 0 1px 2px #0000000a",
  "--dowel-shadow-popover": "0 4px 12px -2px #09090b14, 0 1px 3px #09090b0f",
  "--dowel-shadow-modal":
    "0 12px 32px -12px #09090b2e, 0 4px 12px -4px #09090b1f, 0 1px 2px #09090b14",
} as const;

const dark = {
  "--dowel-bg-canvas": "oklch(14.1% 0.005 285.823)",
  "--dowel-bg-surface-1": "oklch(21% 0.006 285.885)",
  "--dowel-bg-surface-2": "oklch(27.4% 0.006 286.033)",
  "--dowel-bg-surface-3": "oklch(37% 0.013 285.805)",
  "--dowel-bg-elevated": "oklch(21% 0.006 285.885)",
  "--dowel-bg-hover": "#ffffff0a",
  "--dowel-bg-active": "#ffffff12",
  "--dowel-border-subtle": "#ffffff0a",
  "--dowel-border-default": "#ffffff14",
  "--dowel-border-strong": "#ffffff24",
  "--dowel-text-primary": "oklch(98.5% 0 none)",
  "--dowel-text-secondary": "oklch(70.5% 0.015 286.067)",
  "--dowel-text-tertiary": "oklch(55.2% 0.016 285.938)",
  "--dowel-text-disabled": "oklch(44.2% 0.017 285.786)",
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

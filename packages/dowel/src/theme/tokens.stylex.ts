import * as stylex from "@stylexjs/stylex";

export const tokens = stylex.defineVars({
  "--dowel-font-sans":
    '"Inter Variable", Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  "--dowel-font-mono":
    '"JetBrains Mono", "SFMono-Regular", Consolas, "Liberation Mono", monospace',

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
  "--dowel-on-danger": "#ffffff",
  "--dowel-success": "#34835c",
  "--dowel-warning": "#a76816",

  "--dowel-scrim": "#00000066",
  "--dowel-shadow-control": "0 1px 1px #0000000a, 0 1px 2px #0000000a",
  "--dowel-shadow-popover":
    "0 3px 8px #0000001f, 0 2px 5px #0000001f, 0 1px 1px #0000001f",
  "--dowel-shadow-modal":
    "0 20px 64px #00000024, 0 8px 24px #0000001f, 0 2px 8px #0000001a, 0 1px 1px #0000001f",

  "--dowel-radius-sm": "4px",
  "--dowel-radius-md": "8px",
  "--dowel-radius-lg": "12px",
  "--dowel-radius-xl": "20px",
  "--dowel-radius-pill": "9999px",
  "--dowel-hairline": "0.5px",

  "--dowel-control-sm": "24px",
  "--dowel-control-md": "28px",
  "--dowel-control-lg": "36px",
  "--dowel-row-md": "44px",

  "--dowel-duration-fast": "120ms",
  "--dowel-duration-normal": "150ms",
  "--dowel-ease-out": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
});

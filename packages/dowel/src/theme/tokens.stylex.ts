import * as stylex from "@stylexjs/stylex";

export const tokens = stylex.defineVars({
  "--dowel-font-sans":
    '"Host Grotesk Variable", "Host Grotesk", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  "--dowel-font-mono":
    '"JetBrains Mono", "SFMono-Regular", Consolas, "Liberation Mono", monospace',

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
  "--dowel-shadow-popover": "0 4px 12px -2px #09090b14, 0 1px 3px #09090b0f",
  "--dowel-shadow-modal":
    "0 12px 32px -12px #09090b2e, 0 4px 12px -4px #09090b1f, 0 1px 2px #09090b14",

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

  // Transitional aliases for the remaining pre-StyleX components and docs.
  // They resolve through the active StyleX theme, so nested and explicit
  // themes stay coherent while those consumers move to the new names.
  "--dowel-font": "var(--dowel-font-sans)",
  "--dowel-mono": "var(--dowel-font-mono)",
  "--dowel-bg-1": "var(--dowel-bg-canvas)",
  "--dowel-bg-2": "var(--dowel-bg-surface-2)",
  "--dowel-bg-3": "var(--dowel-bg-surface-3)",
  "--dowel-bg-4": "var(--dowel-bg-active)",
  "--dowel-border-1": "var(--dowel-border-default)",
  "--dowel-border-2": "var(--dowel-border-strong)",
  "--dowel-border-3": "var(--dowel-border-strong)",
  "--dowel-text-1": "var(--dowel-text-primary)",
  "--dowel-text-2": "var(--dowel-text-secondary)",
  "--dowel-text-3": "var(--dowel-text-tertiary)",
  "--dowel-text-4": "var(--dowel-text-disabled)",
  "--dowel-accent-fg": "var(--dowel-on-accent)",
  "--dowel-focus": "var(--dowel-focus-ring)",
  "--dowel-danger-fg": "var(--dowel-on-danger)",
  "--dowel-overlay": "var(--dowel-scrim)",
  "--dowel-radius": "var(--dowel-radius-md)",
  "--dowel-h-sm": "var(--dowel-control-sm)",
  "--dowel-h": "var(--dowel-control-md)",
  "--dowel-h-field": "var(--dowel-control-lg)",
  "--dowel-dur": "var(--dowel-duration-normal)",
  "--dowel-dur-fast": "var(--dowel-duration-fast)",
  "--dowel-ease": "var(--dowel-ease-out)",
});

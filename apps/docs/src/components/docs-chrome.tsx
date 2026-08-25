import { IconButton, Kbd, Tooltip } from "dowel";

import type { DocsTheme } from "./docs-context";
import { MoonIcon, SearchIcon, SunIcon } from "./icons";

/** A dowel: the small turned pin that joins two pieces of wood. */
export function Wordmark() {
  return (
    <span className="docs-wordmark">
      <svg
        className="docs-mark"
        aria-hidden="true"
        width="18"
        height="18"
        viewBox="0 0 16 16"
      >
        <rect
          x="6"
          y="1"
          width="4"
          height="14"
          rx="2"
          transform="rotate(-32 8 8)"
          fill="currentColor"
        />
      </svg>
      dowel
    </span>
  );
}

export function SearchTrigger({
  onClick,
  size = "md",
}: {
  onClick: () => void;
  size?: "sm" | "md";
}) {
  return (
    <button
      className="docs-search-trigger"
      data-size={size}
      type="button"
      onClick={onClick}
    >
      <SearchIcon />
      <span>Search</span>
      <Kbd keys={["⌘", "K"]} />
    </button>
  );
}

export function ThemeToggle({
  theme,
  onToggle,
  size = "md",
}: {
  theme: DocsTheme;
  onToggle: () => void;
  size?: "sm" | "md";
}) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        render={
          <IconButton label="Toggle theme" size={size} onClick={onToggle}>
            <span className="docs-theme-icon" data-icon="sun">
              <SunIcon />
            </span>
            <span className="docs-theme-icon" data-icon="moon">
              <MoonIcon />
            </span>
          </IconButton>
        }
      />
      <Tooltip.Portal>
        <Tooltip.Positioner>
          <Tooltip.Popup>
            <span className="docs-tooltip-hint">
              {theme === null ? "Theme: system" : `Theme: ${theme}`}
              <Kbd keys={["D"]} />
            </span>
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

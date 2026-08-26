import { XMarkIcon } from "@heroicons/react/16/solid";
import * as stylex from "@stylexjs/stylex";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

import * as styles from "./multi-select-toolbar.stylex";

type DivProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "className" | "style" | "role"
>;

export interface MultiSelectToolbarProps extends DivProps {
  selectedCount: number;
  itemLabel?: string;
  onClear: () => void;
}

export const MultiSelectToolbar = forwardRef<
  HTMLDivElement,
  MultiSelectToolbarProps
>(function MultiSelectToolbar(
  { selectedCount, itemLabel = "item", onClear, children, ...props },
  ref,
) {
  if (selectedCount <= 0) return null;
  const label = `${selectedCount} ${itemLabel}${selectedCount === 1 ? "" : "s"} selected`;

  return (
    <div
      ref={ref}
      {...props}
      {...stylex.props(styles.toolbar.root)}
      role="toolbar"
      aria-label="Selection actions"
      data-dowel-component="multi-select-toolbar"
    >
      <span {...stylex.props(styles.toolbar.count)} aria-live="polite">
        {label}
      </span>
      <span {...stylex.props(styles.toolbar.actions)}>{children}</span>
      <button
        {...stylex.props(styles.toolbar.clear)}
        type="button"
        aria-label="Clear selection"
        onClick={onClear}
      >
        <XMarkIcon width={16} height={16} aria-hidden="true" />
      </button>
    </div>
  );
});

import { XMarkIcon } from "@heroicons/react/16/solid";
import * as stylex from "@stylexjs/stylex";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import * as styles from "./filter-bar.stylex";

export interface FilterBarFilter {
  id: string;
  label: string;
  value?: ReactNode;
  disabled?: boolean;
}

type DivProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children" | "className" | "style"
>;

export interface FilterBarProps extends DivProps {
  filters: ReadonlyArray<FilterBarFilter>;
  onFilterClick?: (filterId: string) => void;
  onRemove: (filterId: string) => void;
  onClear?: () => void;
  /** Usually an Add filter button or picker trigger. */
  children?: ReactNode;
}

export const FilterBar = forwardRef<HTMLDivElement, FilterBarProps>(
  function FilterBar(
    { filters, onFilterClick, onRemove, onClear, children, ...props },
    ref,
  ) {
    return (
      <div
        ref={ref}
        {...props}
        {...stylex.props(styles.bar.root)}
        role="region"
        aria-label="Active filters"
        data-dowel-component="filter-bar"
      >
        {filters.map((filter) => (
          <span
            key={filter.id}
            {...stylex.props(styles.bar.chip)}
            data-dowel-part="filter-chip"
          >
            {onFilterClick ? (
              <button
                {...stylex.props(styles.bar.filterButton)}
                type="button"
                disabled={filter.disabled}
                onClick={() => onFilterClick(filter.id)}
              >
                <span {...stylex.props(styles.bar.label)}>{filter.label}</span>
                {filter.value === undefined ? null : (
                  <span {...stylex.props(styles.bar.value)}>
                    {filter.value}
                  </span>
                )}
              </button>
            ) : (
              <span {...stylex.props(styles.bar.staticLabel)}>
                <span {...stylex.props(styles.bar.label)}>{filter.label}</span>
                {filter.value === undefined ? null : (
                  <span {...stylex.props(styles.bar.value)}>
                    {filter.value}
                  </span>
                )}
              </span>
            )}
            <button
              {...stylex.props(styles.bar.remove)}
              type="button"
              aria-label={`Remove ${filter.label} filter`}
              disabled={filter.disabled}
              onClick={() => onRemove(filter.id)}
            >
              <XMarkIcon width={14} height={14} aria-hidden="true" />
            </button>
          </span>
        ))}
        {children}
        {onClear && filters.length > 1 ? (
          <button
            {...stylex.props(styles.bar.clear)}
            type="button"
            onClick={onClear}
          >
            Clear all
          </button>
        ) : null}
      </div>
    );
  },
);

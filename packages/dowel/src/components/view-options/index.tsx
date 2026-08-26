import {
  AdjustmentsHorizontalIcon,
  CheckIcon,
  ChevronDownIcon,
} from "@heroicons/react/16/solid";
import * as stylex from "@stylexjs/stylex";
import { useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactElement } from "react";

import { IconButton } from "../icon-button";
import { Popover } from "../popover";
import { PropertyPill } from "../property-pill";
import type { DataTableDensity } from "../data-table";
import * as styles from "./view-options.stylex";

export interface ViewOptionsChoice {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ViewOptionsColumn {
  id: string;
  label: string;
  visible: boolean;
  disabled?: boolean;
}

export interface ViewOptionsProps {
  /** Accessible name for the default icon trigger. */
  label?: string;
  /** Replaces the default icon trigger while preserving popover behavior. */
  trigger?: ReactElement;
  grouping?: {
    value: string;
    options: ReadonlyArray<ViewOptionsChoice>;
    onValueChange: (value: string) => void;
  };
  ordering?: {
    value: string;
    options: ReadonlyArray<ViewOptionsChoice>;
    onValueChange: (value: string) => void;
  };
  density?: DataTableDensity;
  onDensityChange?: (density: DataTableDensity) => void;
  columns?: ReadonlyArray<ViewOptionsColumn>;
  onColumnVisibilityChange?: (columnId: string, visible: boolean) => void;
  onReset?: () => void;
}

function ChoiceRow({
  label,
  value,
  options,
  onValueChange,
}: {
  label: string;
  value: string;
  options: ReadonlyArray<ViewOptionsChoice>;
  onValueChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const listId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const selected = options.find((option) => option.value === value);

  function openAndFocusSelected() {
    setOpen(true);
    requestAnimationFrame(() => {
      document
        .querySelector<HTMLElement>(
          `#${CSS.escape(listId)} [role="option"][aria-selected="true"]`,
        )
        ?.focus();
    });
  }

  function handleListKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const choices = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>(
        '[role="option"]:not(:disabled)',
      ),
    );
    const currentIndex = choices.indexOf(
      document.activeElement as HTMLButtonElement,
    );
    let nextIndex: number | null = null;
    if (event.key === "ArrowDown")
      nextIndex = (currentIndex + 1) % choices.length;
    if (event.key === "ArrowUp")
      nextIndex = (currentIndex - 1 + choices.length) % choices.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = choices.length - 1;
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }
    if (nextIndex !== null) {
      event.preventDefault();
      choices[nextIndex]?.focus();
    }
  }

  return (
    <div {...stylex.props(styles.panel.row)}>
      <span {...stylex.props(styles.panel.rowLabel)}>{label}</span>
      <span
        {...stylex.props(styles.panel.control)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setOpen(false);
        }}
      >
        <button
          ref={triggerRef}
          {...stylex.props(styles.panel.choiceTrigger)}
          type="button"
          aria-label={label}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          onClick={() => setOpen((current) => !current)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              event.preventDefault();
              openAndFocusSelected();
            }
          }}
        >
          <span {...stylex.props(styles.panel.choiceValue)}>
            {selected?.label ?? value}
          </span>
          <ChevronDownIcon
            {...stylex.props(
              styles.panel.choiceChevron,
              open && styles.panel.choiceChevronOpen,
            )}
            width={16}
            height={16}
          />
        </button>
        {open ? (
          <div
            id={listId}
            {...stylex.props(styles.panel.choicePopup)}
            role="listbox"
            aria-label={`${label} options`}
            onKeyDown={handleListKeyDown}
          >
            {options.map((option) => (
              <button
                key={option.value}
                {...stylex.props(styles.panel.choiceOption)}
                type="button"
                role="option"
                aria-selected={option.value === value}
                disabled={option.disabled}
                onClick={() => {
                  onValueChange(option.value);
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
              >
                <span>{option.label}</span>
                {option.value === value ? (
                  <CheckIcon width={14} height={14} aria-hidden="true" />
                ) : null}
              </button>
            ))}
          </div>
        ) : null}
      </span>
    </div>
  );
}

export function ViewOptions({
  label = "Display options",
  trigger,
  grouping,
  ordering,
  density,
  onDensityChange,
  columns = [],
  onColumnVisibilityChange,
  onReset,
}: ViewOptionsProps) {
  const hasDensity = density !== undefined && onDensityChange !== undefined;
  const hasColumns =
    columns.length > 0 && onColumnVisibilityChange !== undefined;

  return (
    <Popover.Root>
      <Popover.Trigger
        render={
          trigger ?? (
            <IconButton label={label}>
              <AdjustmentsHorizontalIcon width={16} height={16} />
            </IconButton>
          )
        }
      />
      <Popover.Portal>
        <Popover.Positioner align="end">
          <Popover.Popup aria-label={label}>
            <div {...stylex.props(styles.panel.root)}>
              <div {...stylex.props(styles.panel.header)}>
                <Popover.Title>View options</Popover.Title>
                {onReset ? (
                  <button
                    {...stylex.props(styles.panel.reset)}
                    type="button"
                    onClick={onReset}
                  >
                    Reset
                  </button>
                ) : null}
              </div>

              <div {...stylex.props(styles.panel.section)}>
                {grouping ? <ChoiceRow label="Grouping" {...grouping} /> : null}
                {ordering ? <ChoiceRow label="Ordering" {...ordering} /> : null}
                {hasDensity ? (
                  <ChoiceRow
                    label="Density"
                    value={density}
                    options={[
                      { value: "compact", label: "Compact" },
                      { value: "comfortable", label: "Comfortable" },
                    ]}
                    onValueChange={(value) =>
                      onDensityChange(value as DataTableDensity)
                    }
                  />
                ) : null}
              </div>

              {hasColumns ? (
                <div {...stylex.props(styles.panel.properties)}>
                  <span {...stylex.props(styles.panel.sectionLabel)}>
                    Display properties
                  </span>
                  <div {...stylex.props(styles.panel.pills)}>
                    {columns.map((column) => (
                      <PropertyPill
                        key={column.id}
                        label={column.label}
                        active={column.visible}
                        disabled={column.disabled}
                        aria-pressed={column.visible}
                        onClick={() =>
                          onColumnVisibilityChange(column.id, !column.visible)
                        }
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

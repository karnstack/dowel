import { ChevronRightIcon, FunnelIcon } from "@heroicons/react/16/solid";
import * as stylex from "@stylexjs/stylex";
import { useMemo, useRef, useState } from "react";
import type { ReactElement, ReactNode } from "react";

import { IconButton } from "../icon-button";
import { Popover } from "../popover";
import { SearchField } from "../search-field";
import * as styles from "./filter-picker.stylex";

export interface FilterPickerValue {
  value: string;
  label: string;
  count?: number;
  disabled?: boolean;
}

export interface FilterPickerProperty {
  id: string;
  label: string;
  icon?: ReactNode;
  values: ReadonlyArray<FilterPickerValue>;
  disabled?: boolean;
}

export interface FilterPickerProps {
  properties: ReadonlyArray<FilterPickerProperty>;
  onAddFilter: (propertyId: string, value: string) => void;
  label?: string;
  trigger?: ReactElement;
}

export function FilterPicker({
  properties,
  onAddFilter,
  label = "Filter",
  trigger,
}: FilterPickerProps) {
  const [open, setOpen] = useState(false);
  const [propertyQuery, setPropertyQuery] = useState("");
  const [valueQuery, setValueQuery] = useState("");
  const [activePropertyId, setActivePropertyId] = useState<string | null>(null);
  const [submenuSide, setSubmenuSide] = useState<"left" | "right">("right");
  const propertyPanelRef = useRef<HTMLDivElement>(null);
  const activeProperty =
    properties.find((property) => property.id === activePropertyId) ?? null;
  const visibleProperties = useMemo(() => {
    const query = propertyQuery.trim().toLocaleLowerCase();
    if (!query) return properties;
    return properties.filter((property) =>
      property.label.toLocaleLowerCase().includes(query),
    );
  }, [properties, propertyQuery]);
  const visibleValues = useMemo(() => {
    if (!activeProperty) return [];
    const query = valueQuery.trim().toLocaleLowerCase();
    if (!query) return activeProperty.values;
    return activeProperty.values.filter((value) =>
      value.label.toLocaleLowerCase().includes(query),
    );
  }, [activeProperty, valueQuery]);

  function changeOpen(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      setPropertyQuery("");
      setValueQuery("");
      setActivePropertyId(null);
    }
  }

  function showProperty(propertyId: string) {
    const panel = propertyPanelRef.current;
    if (panel) {
      const rect = panel.getBoundingClientRect();
      const gap = 6;
      const edgePadding = 8;
      const hasRoomOnRight =
        rect.right + gap + rect.width <= window.innerWidth - edgePadding;
      setSubmenuSide(hasRoomOnRight ? "right" : "left");
    }
    setActivePropertyId(propertyId);
    setValueQuery("");
  }

  return (
    <Popover.Root open={open} onOpenChange={changeOpen}>
      <Popover.Trigger
        render={
          trigger ?? (
            <IconButton label={label}>
              <FunnelIcon width={16} height={16} aria-hidden="true" />
            </IconButton>
          )
        }
      />
      <Popover.Portal>
        <Popover.Positioner align="start">
          <Popover.Popup aria-label={`Add ${label.toLowerCase()}`}>
            <div {...stylex.props(styles.picker.root)}>
              <div
                ref={propertyPanelRef}
                {...stylex.props(styles.picker.panel)}
                data-filter-picker-panel="properties"
              >
                <div {...stylex.props(styles.picker.header)}>
                  <SearchField
                    autoFocus
                    aria-label="Search filter properties"
                    placeholder="Add filter…"
                    value={propertyQuery}
                    onValueChange={setPropertyQuery}
                    variant="bare"
                    size="md"
                  />
                </div>
                <div
                  {...stylex.props(styles.picker.list)}
                  role="list"
                  aria-label="Filter properties"
                >
                  {visibleProperties.map((property) => (
                    <div key={property.id} role="listitem">
                      <button
                        {...stylex.props(
                          styles.picker.item,
                          activeProperty?.id === property.id &&
                            styles.picker.activeItem,
                        )}
                        type="button"
                        disabled={property.disabled}
                        aria-pressed={activeProperty?.id === property.id}
                        onMouseEnter={() => showProperty(property.id)}
                        onFocus={() => showProperty(property.id)}
                        onClick={() => showProperty(property.id)}
                      >
                        {property.icon ? (
                          <span
                            {...stylex.props(styles.picker.icon)}
                            aria-hidden="true"
                          >
                            {property.icon}
                          </span>
                        ) : null}
                        <span {...stylex.props(styles.picker.label)}>
                          {property.label}
                        </span>
                        <ChevronRightIcon
                          {...stylex.props(styles.picker.chevron)}
                          width={14}
                          height={14}
                        />
                      </button>
                    </div>
                  ))}
                  {visibleProperties.length === 0 ? (
                    <p {...stylex.props(styles.picker.empty)}>No matches</p>
                  ) : null}
                </div>
              </div>

              {activeProperty ? (
                <div
                  {...stylex.props(
                    styles.picker.valuePanel,
                    submenuSide === "right"
                      ? styles.picker.submenuRight
                      : styles.picker.submenuLeft,
                  )}
                  data-filter-picker-panel="values"
                  data-side={submenuSide}
                >
                  <div {...stylex.props(styles.picker.header)}>
                    <SearchField
                      aria-label={`Search ${activeProperty.label}`}
                      placeholder={`Filter ${activeProperty.label.toLowerCase()}…`}
                      value={valueQuery}
                      onValueChange={setValueQuery}
                      variant="bare"
                      size="md"
                    />
                  </div>
                  <div
                    {...stylex.props(styles.picker.list)}
                    role="list"
                    aria-label={`${activeProperty.label} values`}
                  >
                    {visibleValues.map((value) => (
                      <div key={value.value} role="listitem">
                        <button
                          {...stylex.props(styles.picker.item)}
                          type="button"
                          disabled={value.disabled}
                          onClick={() => {
                            onAddFilter(activeProperty.id, value.value);
                            changeOpen(false);
                          }}
                        >
                          <span {...stylex.props(styles.picker.label)}>
                            {value.label}
                          </span>
                          {value.count !== undefined ? (
                            <span {...stylex.props(styles.picker.count)}>
                              {value.count}
                            </span>
                          ) : null}
                        </button>
                      </div>
                    ))}
                    {visibleValues.length === 0 ? (
                      <p {...stylex.props(styles.picker.empty)}>No matches</p>
                    ) : null}
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

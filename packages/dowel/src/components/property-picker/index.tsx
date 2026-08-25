import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import * as stylex from "@stylexjs/stylex";
import { useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { DowelThemeContext, themeStyles } from "../../theme/theme-provider";
import { PropertyPill } from "../property-pill";
import * as styles from "./property-picker.stylex";

export interface PropertyPickerOption {
  value: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  group?: string;
  disabled?: boolean;
  tone?: "neutral" | "accent" | "danger";
}

export interface PropertyPickerProps {
  /** Accessible property name, such as Status or Assignee. */
  label: string;
  options: readonly PropertyPickerOption[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  clearable?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  form?: string;
  id?: string;
  onOpenChange?: (open: boolean) => void;
}

interface OptionGroup {
  key: string;
  label?: string;
  items: readonly PropertyPickerOption[];
}

function groupOptions(options: readonly PropertyPickerOption[]): OptionGroup[] {
  const groups = new Map<string, PropertyPickerOption[]>();

  for (const option of options) {
    const key = option.group ?? "";
    const group = groups.get(key);
    if (group) group.push(option);
    else groups.set(key, [option]);
  }

  return Array.from(groups, ([key, items]) => ({
    key: key || "__ungrouped",
    label: key || undefined,
    items,
  }));
}

function sx(style: stylex.StyleXStyles) {
  const resolved = stylex.props(style);
  return { className: resolved.className, style: resolved.style };
}

export function PropertyPicker({
  label,
  options,
  value,
  defaultValue = null,
  onValueChange,
  placeholder = label,
  searchPlaceholder = `Search ${label.toLowerCase()}`,
  emptyText = "No matching options",
  clearable = true,
  disabled = false,
  readOnly = false,
  required = false,
  name,
  form,
  id,
  onOpenChange,
}: PropertyPickerProps) {
  const theme = useContext(DowelThemeContext);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const currentValue = value === undefined ? uncontrolledValue : value;
  const selectedOption =
    options.find((option) => option.value === currentValue) ?? null;
  const groups = useMemo(() => groupOptions(options), [options]);
  const portalTheme = stylex.props(themeStyles[theme]);

  function changeValue(next: PropertyPickerOption | null) {
    const nextValue = next?.value ?? null;
    if (value === undefined) setUncontrolledValue(nextValue);
    onValueChange?.(nextValue);
  }

  return (
    <BaseCombobox.Root<PropertyPickerOption>
      id={id}
      name={name}
      form={form}
      items={groups}
      value={selectedOption}
      onValueChange={changeValue}
      onOpenChange={(open) => onOpenChange?.(open)}
      itemToStringLabel={(option) => option.label}
      itemToStringValue={(option) => option.value}
      isItemEqualToValue={(option, selected) => option.value === selected.value}
      autoHighlight
      disabled={disabled}
      readOnly={readOnly}
      required={required}
    >
      <BaseCombobox.Trigger
        aria-label={
          selectedOption ? `${label}: ${selectedOption.label}` : label
        }
        render={
          <PropertyPill
            label={selectedOption?.label ?? placeholder}
            icon={selectedOption?.icon}
            tone={selectedOption?.tone ?? "neutral"}
            disabled={disabled}
          />
        }
      />
      <BaseCombobox.Portal
        className={portalTheme.className}
        style={portalTheme.style}
        data-dowel-theme={theme}
      >
        <BaseCombobox.Positioner sideOffset={4} align="start">
          <BaseCombobox.Popup
            {...sx(styles.popup.root)}
            aria-label={`${label} options`}
            data-dowel-component="property-picker-popup"
          >
            <BaseCombobox.InputGroup {...sx(styles.search.group)}>
              <MagnifyingGlassIcon
                {...sx(styles.search.icon)}
                width={16}
                height={16}
              />
              <BaseCombobox.Input
                {...sx(styles.search.input)}
                aria-label={`Search ${label}`}
                placeholder={searchPlaceholder}
                autoComplete="off"
                data-dowel-component="property-picker-search"
              />
            </BaseCombobox.InputGroup>
            <BaseCombobox.List
              {...sx(styles.list.root)}
              data-dowel-component="property-picker-list"
            >
              {(group: OptionGroup) => (
                <BaseCombobox.Group key={group.key} items={group.items}>
                  {group.label ? (
                    <BaseCombobox.GroupLabel {...sx(styles.list.groupLabel)}>
                      {group.label}
                    </BaseCombobox.GroupLabel>
                  ) : null}
                  <BaseCombobox.Collection>
                    {(option: PropertyPickerOption) => (
                      <BaseCombobox.Item
                        key={option.value}
                        value={option}
                        disabled={option.disabled}
                        {...sx(styles.list.item)}
                        data-dowel-component="property-picker-option"
                      >
                        {option.icon ? (
                          <span {...sx(styles.list.icon)} aria-hidden="true">
                            {option.icon}
                          </span>
                        ) : null}
                        <span {...sx(styles.list.copy)}>
                          <span {...sx(styles.list.label)}>{option.label}</span>
                          {option.description ? (
                            <span {...sx(styles.list.description)}>
                              {option.description}
                            </span>
                          ) : null}
                        </span>
                        <BaseCombobox.ItemIndicator
                          {...sx(styles.list.indicator)}
                        >
                          <CheckIcon width={16} height={16} />
                        </BaseCombobox.ItemIndicator>
                      </BaseCombobox.Item>
                    )}
                  </BaseCombobox.Collection>
                </BaseCombobox.Group>
              )}
            </BaseCombobox.List>
            <BaseCombobox.Empty>
              <div {...sx(styles.list.emptyContent)}>{emptyText}</div>
            </BaseCombobox.Empty>
            {clearable && selectedOption ? (
              <div {...sx(styles.footer.root)}>
                <BaseCombobox.Clear {...sx(styles.footer.clear)}>
                  Clear {label.toLowerCase()}
                </BaseCombobox.Clear>
              </div>
            ) : null}
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  );
}

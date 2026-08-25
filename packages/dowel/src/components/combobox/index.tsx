import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import {
  CheckIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import * as stylex from "@stylexjs/stylex";
import { useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { DowelThemeContext, themeStyles } from "../../theme/theme-provider";
import * as styles from "./combobox.stylex";

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  group?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface ComboboxProps {
  label: string;
  options: readonly ComboboxOption[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  onInputValueChange?: (inputValue: string) => void;
  placeholder?: string;
  emptyText?: string;
  clearable?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  form?: string;
  id?: string;
  autoComplete?: string;
  onOpenChange?: (open: boolean) => void;
}

type OptionGroup = {
  key: string;
  label?: string;
  items: readonly ComboboxOption[];
};

function groupOptions(options: readonly ComboboxOption[]): OptionGroup[] {
  const groups = new Map<string, ComboboxOption[]>();
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

export function Combobox({
  label,
  options,
  value,
  defaultValue = null,
  onValueChange,
  onInputValueChange,
  placeholder = "Select an option",
  emptyText = "No matching options",
  clearable = true,
  disabled = false,
  readOnly = false,
  required = false,
  name,
  form,
  id,
  autoComplete,
  onOpenChange,
}: ComboboxProps) {
  const theme = useContext(DowelThemeContext);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const currentValue = value === undefined ? uncontrolledValue : value;
  const selectedOption =
    options.find((option) => option.value === currentValue) ?? null;
  const groups = useMemo(() => groupOptions(options), [options]);
  const portalTheme = stylex.props(themeStyles[theme]);

  function changeValue(next: ComboboxOption | null) {
    const nextValue = next?.value ?? null;
    if (value === undefined) setUncontrolledValue(nextValue);
    onValueChange?.(nextValue);
  }

  return (
    <BaseCombobox.Root<ComboboxOption>
      id={id}
      name={name}
      form={form}
      items={groups}
      value={selectedOption}
      onValueChange={changeValue}
      onInputValueChange={(inputValue) => onInputValueChange?.(inputValue)}
      onOpenChange={(open) => onOpenChange?.(open)}
      itemToStringLabel={(option) => option.label}
      itemToStringValue={(option) => option.value}
      isItemEqualToValue={(option, selected) => option.value === selected.value}
      autoHighlight
      autoComplete={autoComplete}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
    >
      <BaseCombobox.InputGroup
        {...sx(styles.control.root)}
        data-dowel-component="combobox-control"
      >
        <BaseCombobox.Input
          {...sx(styles.control.input)}
          aria-label={label}
          placeholder={placeholder}
        />
        <span {...sx(styles.control.actions)}>
          {clearable ? (
            <BaseCombobox.Clear
              {...sx(styles.control.action)}
              aria-label={`Clear ${label.toLowerCase()}`}
            >
              <XMarkIcon width={14} height={14} />
            </BaseCombobox.Clear>
          ) : null}
          <BaseCombobox.Trigger
            {...sx(styles.control.action)}
            aria-label={`Open ${label.toLowerCase()} options`}
          >
            <ChevronDownIcon width={14} height={14} />
          </BaseCombobox.Trigger>
        </span>
      </BaseCombobox.InputGroup>
      <BaseCombobox.Portal
        className={portalTheme.className}
        style={portalTheme.style}
        data-dowel-theme={theme}
      >
        <BaseCombobox.Positioner sideOffset={4} align="start">
          <BaseCombobox.Popup
            {...sx(styles.popup.root)}
            role="region"
            aria-label={`${label} options`}
            data-dowel-component="combobox-popup"
          >
            <BaseCombobox.Empty>
              <div {...sx(styles.popup.empty)}>{emptyText}</div>
            </BaseCombobox.Empty>
            <BaseCombobox.List {...sx(styles.popup.list)}>
              {(group: OptionGroup) => (
                <BaseCombobox.Group key={group.key} items={group.items}>
                  {group.label ? (
                    <BaseCombobox.GroupLabel {...sx(styles.popup.groupLabel)}>
                      {group.label}
                    </BaseCombobox.GroupLabel>
                  ) : null}
                  <BaseCombobox.Collection>
                    {(option: ComboboxOption) => (
                      <BaseCombobox.Item
                        key={option.value}
                        value={option}
                        disabled={option.disabled}
                        {...sx(styles.popup.item)}
                      >
                        {option.icon ? (
                          <span {...sx(styles.popup.icon)} aria-hidden="true">
                            {option.icon}
                          </span>
                        ) : null}
                        <span {...sx(styles.popup.copy)}>
                          <span {...sx(styles.popup.label)}>
                            {option.label}
                          </span>
                          {option.description ? (
                            <span {...sx(styles.popup.description)}>
                              {option.description}
                            </span>
                          ) : null}
                        </span>
                        <BaseCombobox.ItemIndicator
                          {...sx(styles.popup.indicator)}
                        >
                          <CheckIcon width={14} height={14} />
                        </BaseCombobox.ItemIndicator>
                      </BaseCombobox.Item>
                    )}
                  </BaseCombobox.Collection>
                </BaseCombobox.Group>
              )}
            </BaseCombobox.List>
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  );
}

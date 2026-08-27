import { Select as BaseSelect } from "@base-ui/react/select";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import * as stylex from "@stylexjs/stylex";
import { useContext, useMemo } from "react";

import { DowelThemeContext, themeStyles } from "../../theme/theme-provider";
import type { FieldSize } from "../input";
import * as styles from "./select.stylex";

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  group?: string;
  disabled?: boolean;
}

export interface SelectProps {
  label: string;
  options: readonly SelectOption[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  placeholder?: string;
  size?: Exclude<FieldSize, "title">;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  form?: string;
  id?: string;
  onOpenChange?: (open: boolean) => void;
}

interface SelectGroup {
  label?: string;
  options: readonly SelectOption[];
}

function groupOptions(options: readonly SelectOption[]): SelectGroup[] {
  const groups = new Map<string, SelectOption[]>();
  for (const option of options) {
    const key = option.group ?? "";
    const group = groups.get(key);
    if (group) group.push(option);
    else groups.set(key, [option]);
  }
  return Array.from(groups, ([label, groupedOptions]) => ({
    label: label || undefined,
    options: groupedOptions,
  }));
}

export function Select({
  label,
  options,
  value,
  defaultValue = null,
  onValueChange,
  placeholder = "Select an option",
  size = "md",
  disabled,
  readOnly,
  required,
  name,
  form,
  id,
  onOpenChange,
}: SelectProps) {
  const theme = useContext(DowelThemeContext);
  const portalTheme = stylex.props(themeStyles[theme]);
  const groups = useMemo(() => groupOptions(options), [options]);
  const items = useMemo(
    () =>
      options.map((option) => ({ value: option.value, label: option.label })),
    [options],
  );

  return (
    <BaseSelect.Root<string>
      items={items}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(nextValue) => onValueChange?.(nextValue)}
      onOpenChange={(open) => onOpenChange?.(open)}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      name={name}
      form={form}
      id={id}
    >
      <BaseSelect.Trigger
        {...stylex.props(styles.trigger.root, styles.size[size])}
        aria-label={label}
        data-dowel-component="select-trigger"
        data-size={size}
      >
        <BaseSelect.Value
          {...stylex.props(styles.trigger.value)}
          placeholder={placeholder}
        />
        <BaseSelect.Icon {...stylex.props(styles.trigger.icon)}>
          <ChevronDownIcon width={16} height={16} />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal
        className={portalTheme.className}
        style={portalTheme.style}
        data-dowel-theme={theme}
      >
        <BaseSelect.Positioner sideOffset={4} align="start">
          <BaseSelect.Popup
            {...stylex.props(styles.popup.root)}
            role="region"
            aria-label={`${label} popup`}
            data-dowel-component="select-popup"
          >
            <BaseSelect.List
              {...stylex.props(styles.popup.list)}
              aria-label={`${label} options`}
            >
              {groups.map((group, groupIndex) => (
                <BaseSelect.Group key={group.label ?? groupIndex}>
                  {group.label ? (
                    <BaseSelect.GroupLabel
                      {...stylex.props(styles.item.groupLabel)}
                    >
                      {group.label}
                    </BaseSelect.GroupLabel>
                  ) : null}
                  {group.options.map((option) => (
                    <BaseSelect.Item
                      key={option.value}
                      value={option.value}
                      label={option.label}
                      disabled={option.disabled}
                      {...stylex.props(
                        styles.item.root,
                        Boolean(option.description) &&
                          styles.item.withDescription,
                      )}
                    >
                      <span {...stylex.props(styles.item.copy)}>
                        <BaseSelect.ItemText
                          {...stylex.props(styles.item.label)}
                        >
                          {option.label}
                        </BaseSelect.ItemText>
                        {option.description ? (
                          <span {...stylex.props(styles.item.description)}>
                            {option.description}
                          </span>
                        ) : null}
                      </span>
                      <BaseSelect.ItemIndicator
                        {...stylex.props(styles.item.indicator)}
                      >
                        <CheckIcon width={16} height={16} />
                      </BaseSelect.ItemIndicator>
                    </BaseSelect.Item>
                  ))}
                </BaseSelect.Group>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}

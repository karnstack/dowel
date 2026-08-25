import { Input as BaseInput } from "@base-ui/react/input";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/16/solid";
import * as stylex from "@stylexjs/stylex";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import type {
  ChangeEvent,
  ComponentPropsWithoutRef,
  KeyboardEvent,
  ReactNode,
} from "react";

import type { FieldSize, FieldVariant } from "../input";
import { withoutAppearanceProps } from "../_shared/props";
import * as styles from "./search-field.stylex";

export interface SearchFieldProps
  extends Omit<
    ComponentPropsWithoutRef<"input">,
    | "className"
    | "style"
    | "size"
    | "type"
    | "value"
    | "defaultValue"
    | "onChange"
  > {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: Exclude<FieldSize, "title">;
  variant?: FieldVariant;
  /** A compact visual hint, such as ⌘K. */
  shortcut?: ReactNode;
  /** Shows an accessible clear action while the field has a value. */
  clearable?: boolean;
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  function SearchField(
    {
      value,
      defaultValue = "",
      onValueChange,
      onKeyDown,
      size = "md",
      variant = "surface",
      shortcut,
      clearable = true,
      disabled,
      ...props
    },
    forwardedRef,
  ) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const currentValue = value === undefined ? uncontrolledValue : value;
    const safeProps = withoutAppearanceProps(props);
    const rootStyles = stylex.props(
      styles.root.base,
      styles.root[variant],
      styles.size[size],
    );

    useImperativeHandle(forwardedRef, () => inputRef.current!);

    function change(nextValue: string) {
      if (value === undefined) setUncontrolledValue(nextValue);
      onValueChange?.(nextValue);
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      change(event.currentTarget.value);
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
      onKeyDown?.(event);
      if (!event.defaultPrevented && event.key === "Escape" && currentValue) {
        event.preventDefault();
        change("");
      }
    }

    function clear() {
      change("");
      inputRef.current?.focus();
    }

    return (
      <span
        className={rootStyles.className}
        style={rootStyles.style}
        data-disabled={disabled ? "" : undefined}
        data-dowel-component="search-field"
        data-size={size}
        data-variant={variant}
      >
        <MagnifyingGlassIcon
          {...stylex.props(styles.part.icon)}
          width={16}
          height={16}
        />
        <BaseInput
          ref={inputRef}
          {...safeProps}
          {...stylex.props(styles.part.input)}
          type="search"
          value={currentValue}
          disabled={disabled}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {clearable && currentValue ? (
          <button
            {...stylex.props(styles.part.action)}
            type="button"
            aria-label="Clear search"
            disabled={disabled}
            onClick={clear}
          >
            <XMarkIcon width={16} height={16} />
          </button>
        ) : shortcut ? (
          <span {...stylex.props(styles.part.shortcut)} aria-hidden="true">
            {shortcut}
          </span>
        ) : null}
      </span>
    );
  },
);

import { Button as BaseButton } from "@base-ui/react/button";
import * as stylex from "@stylexjs/stylex";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactElement } from "react";

import {
  iconButton,
  iconButtonVariant,
  iconSlot,
  size,
} from "../button/button.stylex";

type NativeButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  // dowel is opinionated: appearance is not a consumer concern. aria-label is
  // omitted too — the accessible name comes from the required `label` prop.
  "className" | "style" | "aria-label"
>;

export interface IconButtonProps extends NativeButtonProps {
  /** Accessible name. Required — an icon alone never names a control. */
  label: string;
  /** Visual weight. Defaults to `ghost`. */
  variant?: "secondary" | "muted" | "ghost" | "danger";
  /** Control size. `sm` is 24px, `md` is 28px. Defaults to `md`. */
  size?: "sm" | "md";
  /** Render as a different element, e.g. `render={<a href="/x" />}`. */
  render?: ReactElement;
  /**
   * Whether the rendered element is a native `<button>`. Rendering a
   * non-button element via `render` (e.g. an anchor) requires
   * `nativeButton={false}` so Base UI applies button semantics instead of
   * native-button attributes. Defaults to `true`.
   */
  nativeButton?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      label,
      variant = "ghost",
      size: controlSize = "md",
      render,
      nativeButton = true,
      type,
      ...props
    },
    ref,
  ) {
    const resolved = stylex.props(
      iconButton.root,
      iconButtonVariant[variant],
      size[controlSize],
    );

    return (
      <BaseButton
        ref={ref}
        render={render}
        nativeButton={nativeButton}
        type={nativeButton ? (type ?? "button") : undefined}
        {...props}
        // Everything below stays AFTER the spread so props spread onto the
        // component can never override appearance or the accessible name. An
        // element passed via `render` still carries its own attributes — that
        // escape hatch is by design.
        className={resolved.className}
        style={resolved.style}
        aria-label={label}
        data-dowel-component="icon-button"
        data-variant={variant}
        data-size={controlSize}
      >
        <span
          {...stylex.props(iconSlot.root)}
          aria-hidden="true"
          data-dowel-part="icon-button-icon"
        >
          {props.children}
        </span>
      </BaseButton>
    );
  },
);

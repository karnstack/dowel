import { Button as BaseButton } from "@base-ui/react/button";
import * as stylex from "@stylexjs/stylex";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactElement } from "react";

import * as styles from "./button.stylex";

type NativeButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  // dowel is opinionated: appearance is not a consumer concern.
  "className" | "style"
>;

export interface ButtonProps extends NativeButtonProps {
  /** Visual hierarchy. Defaults to `secondary`. */
  variant?: "primary" | "secondary" | "muted" | "ghost" | "danger";
  /** Control height. `sm` is 24px, `md` is 28px. Defaults to `md`. */
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

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "secondary",
      size = "md",
      render,
      nativeButton = true,
      type,
      ...props
    },
    ref,
  ) {
    const resolved = stylex.props(
      styles.button.root,
      styles.buttonVariant[variant],
      styles.size[size],
    );

    return (
      <BaseButton
        ref={ref}
        render={render}
        nativeButton={nativeButton}
        type={nativeButton ? (type ?? "button") : undefined}
        {...props}
        // Everything below stays AFTER the spread so props spread onto the
        // component can never override appearance. An element passed via
        // `render` still carries its own attributes — that escape hatch is
        // by design.
        className={resolved.className}
        style={resolved.style}
        data-dowel-component="button"
        data-variant={variant}
        data-size={size}
      />
    );
  },
);

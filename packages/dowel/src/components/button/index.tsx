import { Button as BaseButton } from "@base-ui/react/button";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactElement } from "react";

type NativeButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  // dowel is opinionated: appearance is not a consumer concern.
  "className" | "style"
>;

export interface ButtonProps extends NativeButtonProps {
  /** Visual weight. Defaults to `secondary`. */
  variant?: "primary" | "secondary" | "ghost" | "danger";
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
    { variant = "secondary", size = "md", render, ...props },
    ref,
  ) {
    return (
      <BaseButton
        ref={ref}
        render={render}
        {...props}
        // Everything below stays AFTER the spread so a consumer cannot win
        // via a spread of a wider object: appearance is not configurable.
        className="dowel-btn"
        style={undefined}
        data-variant={variant}
        data-size={size}
      />
    );
  },
);

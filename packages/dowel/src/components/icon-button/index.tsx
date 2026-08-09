import { Button as BaseButton } from "@base-ui/react/button";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactElement } from "react";

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
  variant?: "secondary" | "ghost";
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
    { label, variant = "ghost", size = "md", render, ...props },
    ref,
  ) {
    return (
      <BaseButton
        ref={ref}
        render={render}
        {...props}
        // Everything below stays AFTER the spread so props spread onto the
        // component can never override appearance or the accessible name. An
        // element passed via `render` still carries its own attributes — that
        // escape hatch is by design.
        className="dowel-icon-btn"
        style={undefined}
        aria-label={label}
        data-variant={variant}
        data-size={size}
      />
    );
  },
);

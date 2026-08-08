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
        className="dowel-btn"
        data-variant={variant}
        data-size={size}
        {...props}
      />
    );
  },
);

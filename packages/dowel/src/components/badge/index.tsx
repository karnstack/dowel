import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

export interface BadgeProps
  extends Omit<
    ComponentPropsWithoutRef<"span">,
    // dowel is opinionated: appearance is not a consumer concern.
    "className" | "style"
  > {
  /** Colour treatment. Defaults to `neutral`. */
  tone?: "neutral" | "accent" | "success" | "warning" | "danger";
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { tone = "neutral", ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      {...props}
      // Everything below stays AFTER the spread so props spread onto the
      // component can never override appearance.
      className="dowel-badge"
      style={undefined}
      data-tone={tone}
    />
  );
});

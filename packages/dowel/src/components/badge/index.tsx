import * as stylex from "@stylexjs/stylex";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import * as styles from "./badge.stylex";

export interface BadgeProps
  extends Omit<
    ComponentPropsWithoutRef<"span">,
    // dowel is opinionated: appearance is not a consumer concern.
    "className" | "style"
  > {
  /** Colour treatment. Defaults to `neutral`. */
  tone?: "neutral" | "accent" | "success" | "warning" | "danger";
  /** Optional decorative leading icon. */
  icon?: ReactNode;
  /** Show a compact semantic status dot before the label. */
  dot?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { tone = "neutral", icon, dot = false, children, ...props },
  ref,
) {
  const resolved = stylex.props(
    styles.badge.root,
    styles.tone[tone],
    (Boolean(icon) || dot) && styles.badge.withVisual,
  );

  return (
    <span
      ref={ref}
      {...props}
      className={resolved.className}
      style={resolved.style}
      data-dowel-component="badge"
      data-tone={tone}
    >
      {icon || dot ? (
        <span {...stylex.props(styles.badge.visual)} aria-hidden="true">
          {icon ?? <span {...stylex.props(styles.badge.dot)} />}
        </span>
      ) : null}
      <span {...stylex.props(styles.badge.label)}>{children}</span>
    </span>
  );
});

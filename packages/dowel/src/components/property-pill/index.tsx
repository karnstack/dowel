import { Button as BaseButton } from "@base-ui/react/button";
import * as stylex from "@stylexjs/stylex";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";

import * as styles from "./property-pill.stylex";

type NativeButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "children" | "className" | "style"
>;

export interface PropertyPillProps extends NativeButtonProps {
  /** Visible value and accessible name. */
  label: string;
  /** Decorative leading icon. */
  icon?: ReactNode;
  /** Semantic color treatment. */
  tone?: "neutral" | "accent" | "danger";
  /** Whether the related picker or property state is active. */
  active?: boolean;
  /** Render as a different element. */
  render?: ReactElement;
  nativeButton?: boolean;
}

export const PropertyPill = forwardRef<HTMLButtonElement, PropertyPillProps>(
  function PropertyPill(
    {
      label,
      icon,
      tone = "neutral",
      active = false,
      render,
      nativeButton = true,
      type,
      ...props
    },
    ref,
  ) {
    const resolved = stylex.props(
      styles.root.base,
      styles.tone[tone],
      Boolean(icon) && styles.root.withIcon,
      active && styles.root.active,
    );

    return (
      <BaseButton
        ref={ref}
        render={render}
        nativeButton={nativeButton}
        type={nativeButton ? (type ?? "button") : undefined}
        {...props}
        className={resolved.className}
        style={resolved.style}
        data-dowel-component="property-pill"
        data-tone={tone}
        data-active={active ? "" : undefined}
      >
        {icon ? (
          <span {...stylex.props(styles.root.icon)} aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <span {...stylex.props(styles.root.label)}>{label}</span>
      </BaseButton>
    );
  },
);

import * as stylex from "@stylexjs/stylex";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { withoutAppearanceProps } from "../_shared/props";
import * as styles from "./status.stylex";

export type StatusTone =
  | "neutral"
  | "accent"
  | "success"
  | "warning"
  | "danger";

export interface StatusProps
  extends Omit<ComponentPropsWithoutRef<"span">, "className" | "style"> {
  tone?: StatusTone;
  icon?: ReactNode;
}

export const Status = forwardRef<HTMLSpanElement, StatusProps>(function Status(
  { tone = "neutral", icon, children, ...props },
  ref,
) {
  const safeProps = withoutAppearanceProps(props);
  return (
    <span
      ref={ref}
      {...safeProps}
      {...stylex.props(styles.root.base)}
      data-dowel-component="status"
      data-tone={tone}
    >
      <span
        {...stylex.props(styles.part.visual, styles.tone[tone])}
        aria-hidden="true"
      >
        {icon ?? <span {...stylex.props(styles.part.dot)} />}
      </span>
      <span {...stylex.props(styles.part.label)}>{children}</span>
    </span>
  );
});

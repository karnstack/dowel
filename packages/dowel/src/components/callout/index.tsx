import * as stylex from "@stylexjs/stylex";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { withoutAppearanceProps } from "../_shared/props";
import * as styles from "./callout.stylex";

export type CalloutTone =
  | "neutral"
  | "accent"
  | "success"
  | "warning"
  | "danger";

export interface CalloutProps
  extends Omit<
    ComponentPropsWithoutRef<"div">,
    "className" | "style" | "title"
  > {
  tone?: CalloutTone;
  title?: ReactNode;
  icon?: ReactNode;
  actions?: ReactNode;
}

export const Callout = forwardRef<HTMLDivElement, CalloutProps>(
  function Callout(
    { tone = "neutral", title, icon, actions, children, ...props },
    ref,
  ) {
    const safeProps = withoutAppearanceProps(props);
    return (
      <div
        ref={ref}
        {...safeProps}
        {...stylex.props(
          styles.root.base,
          tone === "danger" && styles.root.danger,
        )}
        data-dowel-component="callout"
        data-tone={tone}
      >
        {icon ? (
          <span
            {...stylex.props(styles.part.icon, styles.tone[tone])}
            aria-hidden="true"
          >
            {icon}
          </span>
        ) : null}
        <span {...stylex.props(styles.part.content)}>
          {title ? (
            <strong {...stylex.props(styles.part.title)}>{title}</strong>
          ) : null}
          <span {...stylex.props(styles.part.description)}>{children}</span>
        </span>
        {actions ? (
          <span {...stylex.props(styles.part.actions)}>{actions}</span>
        ) : null}
      </div>
    );
  },
);

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/16/solid";
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
  /** Decorative leading icon. Defaults to the tone icon. Pass null to hide it. */
  icon?: ReactNode;
  actions?: ReactNode;
}

const defaultIcons = {
  neutral: InformationCircleIcon,
  accent: InformationCircleIcon,
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  danger: ExclamationCircleIcon,
} as const;

export const Callout = forwardRef<HTMLDivElement, CalloutProps>(
  function Callout(
    { tone = "neutral", title, icon, actions, children, ...props },
    ref,
  ) {
    const safeProps = withoutAppearanceProps(props);
    const DefaultIcon = defaultIcons[tone];
    const resolvedIcon =
      icon === undefined ? <DefaultIcon width={16} height={16} /> : icon;

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
        {resolvedIcon ? (
          <span
            {...stylex.props(styles.part.icon, styles.tone[tone])}
            aria-hidden="true"
          >
            {resolvedIcon}
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

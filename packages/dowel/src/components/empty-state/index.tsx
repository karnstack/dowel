import * as stylex from "@stylexjs/stylex";
import { createElement, forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { withoutAppearanceProps } from "../_shared/props";
import * as styles from "./empty-state.stylex";

export interface EmptyStateProps
  extends Omit<
    ComponentPropsWithoutRef<"div">,
    "children" | "className" | "style" | "title"
  > {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  actions?: ReactNode;
  headingLevel?: 2 | 3 | 4;
  size?: "compact" | "default";
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState(
    {
      title,
      description,
      icon,
      actions,
      headingLevel = 3,
      size = "default",
      ...props
    },
    ref,
  ) {
    const safeProps = withoutAppearanceProps(props);
    return (
      <div
        ref={ref}
        {...safeProps}
        {...stylex.props(styles.root.base, styles.size[size])}
        data-dowel-component="empty-state"
        data-size={size}
      >
        {icon ? (
          <span {...stylex.props(styles.part.icon)} aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <div {...stylex.props(styles.part.copy)}>
          {createElement(
            `h${headingLevel}`,
            stylex.props(styles.part.title),
            title,
          )}
          {description ? (
            <p {...stylex.props(styles.part.description)}>{description}</p>
          ) : null}
        </div>
        {actions ? (
          <div {...stylex.props(styles.part.actions)}>{actions}</div>
        ) : null}
      </div>
    );
  },
);

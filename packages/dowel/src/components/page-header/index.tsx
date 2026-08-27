import * as stylex from "@stylexjs/stylex";
import { createElement, forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { withoutAppearanceProps } from "../_shared/props";
import * as styles from "./page-header.stylex";

export interface PageHeaderProps
  extends Omit<
    ComponentPropsWithoutRef<"header">,
    "children" | "className" | "style" | "title"
  > {
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: ReactNode;
  actions?: ReactNode;
  /** Optional navigation or filters placed below the title row. */
  children?: ReactNode;
  headingLevel?: 1 | 2 | 3;
}

export const PageHeader = forwardRef<HTMLElement, PageHeaderProps>(
  function PageHeader(
    {
      title,
      description,
      breadcrumbs,
      actions,
      children,
      headingLevel = 1,
      ...props
    },
    ref,
  ) {
    const safeProps = withoutAppearanceProps(props);

    return (
      <header
        ref={ref}
        {...safeProps}
        {...stylex.props(styles.part.root)}
        data-dowel-component="page-header"
      >
        {breadcrumbs ? (
          <div
            {...stylex.props(styles.part.breadcrumbs)}
            data-dowel-part="page-header-breadcrumbs"
          >
            {breadcrumbs}
          </div>
        ) : null}
        <div
          {...stylex.props(styles.part.main)}
          data-dowel-part="page-header-main"
        >
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
            <div
              {...stylex.props(styles.part.actions)}
              data-dowel-part="page-header-actions"
            >
              {actions}
            </div>
          ) : null}
        </div>
        {children ? (
          <div
            {...stylex.props(styles.part.secondary)}
            data-dowel-part="page-header-secondary"
          >
            {children}
          </div>
        ) : null}
      </header>
    );
  },
);

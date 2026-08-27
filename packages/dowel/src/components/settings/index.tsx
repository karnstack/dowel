import * as stylex from "@stylexjs/stylex";
import { createElement, forwardRef, useId } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { withoutAppearanceProps } from "../_shared/props";
import * as styles from "./settings.stylex";

export interface SettingsSectionProps
  extends Omit<
    ComponentPropsWithoutRef<"section">,
    "children" | "className" | "style" | "title"
  > {
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  headingLevel?: 2 | 3;
}

export const SettingsSection = forwardRef<HTMLElement, SettingsSectionProps>(
  function SettingsSection(
    { title, description, children, headingLevel = 2, ...props },
    ref,
  ) {
    const titleId = useId();
    const safeProps = withoutAppearanceProps(props);

    return (
      <section
        ref={ref}
        {...safeProps}
        {...stylex.props(styles.section.root)}
        aria-labelledby={titleId}
        data-dowel-component="settings-section"
      >
        <div {...stylex.props(styles.section.header)}>
          {createElement(
            `h${headingLevel}`,
            { ...stylex.props(styles.section.title), id: titleId },
            title,
          )}
          {description ? (
            <p {...stylex.props(styles.section.description)}>{description}</p>
          ) : null}
        </div>
        <div
          {...stylex.props(styles.section.rows)}
          data-dowel-part="settings-rows"
        >
          {children}
        </div>
      </section>
    );
  },
);

export interface SettingsRowProps
  extends Omit<
    ComponentPropsWithoutRef<"div">,
    "children" | "className" | "style" | "title"
  > {
  title: ReactNode;
  description?: ReactNode;
  /** A labelled control or action placed at the end of the row. */
  children: ReactNode;
}

export const SettingsRow = forwardRef<HTMLDivElement, SettingsRowProps>(
  function SettingsRow({ title, description, children, ...props }, ref) {
    const safeProps = withoutAppearanceProps(props);

    return (
      <div
        ref={ref}
        {...safeProps}
        {...stylex.props(styles.row.root)}
        data-dowel-component="settings-row"
      >
        <div {...stylex.props(styles.row.copy)}>
          <div {...stylex.props(styles.row.title)}>{title}</div>
          {description ? (
            <div {...stylex.props(styles.row.description)}>{description}</div>
          ) : null}
        </div>
        <div
          {...stylex.props(styles.row.control)}
          data-dowel-part="settings-row-control"
        >
          {children}
        </div>
      </div>
    );
  },
);

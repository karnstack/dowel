import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group";
import * as stylex from "@stylexjs/stylex";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ElementType } from "react";

import * as shared from "../_shared/selection-control.stylex";
import * as styles from "./checkbox.stylex";

type PartProps<T extends ElementType> = Omit<
  ComponentPropsWithoutRef<T>,
  "className" | "style" | "render"
>;

function partProps(...style: stylex.StyleXStyles[]) {
  const resolved = stylex.props(...style);
  return { className: resolved.className, style: resolved.style };
}

export interface CheckboxProps
  extends Omit<PartProps<typeof BaseCheckbox.Root>, "children"> {}

export const Checkbox = forwardRef<HTMLElement, CheckboxProps>(
  function Checkbox(props, ref) {
    return (
      <BaseCheckbox.Root
        ref={ref}
        {...props}
        {...partProps(shared.control.root, styles.checkbox.root)}
        data-dowel-component="checkbox"
      >
        <BaseCheckbox.Indicator
          keepMounted
          {...partProps(styles.checkbox.indicator)}
          data-dowel-component="checkbox-indicator"
        />
      </BaseCheckbox.Root>
    );
  },
);

export type SelectionOrientation = "horizontal" | "vertical";

export interface CheckboxGroupProps
  extends PartProps<typeof BaseCheckboxGroup> {
  /** Layout direction for the group. Defaults to `vertical`. */
  orientation?: SelectionOrientation;
}

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  function CheckboxGroup({ orientation = "vertical", ...props }, ref) {
    return (
      <BaseCheckboxGroup
        ref={ref}
        {...props}
        {...partProps(
          shared.group.root,
          orientation === "vertical"
            ? shared.group.vertical
            : shared.group.horizontal,
        )}
        data-dowel-component="checkbox-group"
        data-orientation={orientation}
      />
    );
  },
);

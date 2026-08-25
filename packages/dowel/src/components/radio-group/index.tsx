import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import * as stylex from "@stylexjs/stylex";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ElementType } from "react";

import * as shared from "../_shared/selection-control.stylex";
import type { SelectionOrientation } from "../checkbox";
import * as styles from "./radio-group.stylex";

type PartProps<T extends ElementType> = Omit<
  ComponentPropsWithoutRef<T>,
  "className" | "style" | "render"
>;

function partProps(...style: stylex.StyleXStyles[]) {
  const resolved = stylex.props(...style);
  return { className: resolved.className, style: resolved.style };
}

export interface RadioGroupRootProps extends PartProps<typeof BaseRadioGroup> {
  /** Layout direction for the options. Defaults to `vertical`. */
  orientation?: SelectionOrientation;
}

const Root = forwardRef<HTMLDivElement, RadioGroupRootProps>(
  function RadioGroupRoot({ orientation = "vertical", ...props }, ref) {
    return (
      <BaseRadioGroup
        ref={ref}
        {...props}
        {...partProps(
          shared.group.root,
          orientation === "vertical"
            ? shared.group.vertical
            : shared.group.horizontal,
        )}
        data-dowel-component="radio-group"
        data-orientation={orientation}
      />
    );
  },
);

export interface RadioProps
  extends Omit<PartProps<typeof BaseRadio.Root>, "children"> {}

const Item = forwardRef<HTMLElement, RadioProps>(function Radio(props, ref) {
  return (
    <BaseRadio.Root
      ref={ref}
      {...props}
      {...partProps(shared.control.root, styles.radio.root)}
      data-dowel-component="radio"
    >
      <BaseRadio.Indicator
        {...partProps(styles.radio.indicator)}
        data-dowel-component="radio-indicator"
      />
    </BaseRadio.Root>
  );
});

export const Radio = Item;
export const RadioGroup = { Root, Item };

import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import * as stylex from "@stylexjs/stylex";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

import * as styles from "./toggle-group.stylex";

type RootProps = Omit<
  ComponentPropsWithoutRef<typeof BaseToggleGroup>,
  "className" | "style"
>;
type ItemProps = Omit<
  ComponentPropsWithoutRef<typeof BaseToggle>,
  "className" | "style"
>;
function sx(...v: stylex.StyleXStyles[]) {
  const r = stylex.props(...v);
  return { className: r.className, style: r.style };
}

const Root = forwardRef<HTMLDivElement, RootProps>(
  function ToggleGroupRoot(props, ref) {
    return (
      <BaseToggleGroup
        ref={ref}
        {...props}
        {...sx(styles.toggle.group)}
        data-dowel-component="toggle-group"
      />
    );
  },
);
const Item = forwardRef<HTMLButtonElement, ItemProps>(
  function ToggleGroupItem(props, ref) {
    return (
      <BaseToggle
        ref={ref}
        {...props}
        {...sx(styles.toggle.item)}
        data-dowel-component="toggle-group-item"
      />
    );
  },
);
export const ToggleGroup = { Root, Item };
export type {
  RootProps as ToggleGroupRootProps,
  ItemProps as ToggleGroupItemProps,
};

import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import * as stylex from "@stylexjs/stylex";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { Menu } from "../menu";
import * as styles from "./context-menu.stylex";

type TriggerProps = Omit<
  ComponentPropsWithoutRef<typeof BaseContextMenu.Trigger>,
  "className" | "style"
>;
function sx(...v: stylex.StyleXStyles[]) {
  const r = stylex.props(...v);
  return { className: r.className, style: r.style };
}
const Trigger = forwardRef<HTMLDivElement, TriggerProps>(
  function ContextMenuTrigger(props, ref) {
    return (
      <BaseContextMenu.Trigger
        ref={ref}
        {...props}
        {...sx(styles.context.target)}
        data-dowel-component="context-menu-trigger"
      />
    );
  },
);

export const ContextMenu = {
  Root: BaseContextMenu.Root,
  Trigger,
  Portal: Menu.Portal,
  Positioner: Menu.Positioner,
  Popup: Menu.Popup,
  Item: Menu.Item,
  LinkItem: Menu.LinkItem,
  CheckboxItem: Menu.CheckboxItem,
  CheckboxItemIndicator: Menu.CheckboxItemIndicator,
  RadioGroup: Menu.RadioGroup,
  RadioItem: Menu.RadioItem,
  RadioItemIndicator: Menu.RadioItemIndicator,
  Group: Menu.Group,
  GroupLabel: Menu.GroupLabel,
  Separator: Menu.Separator,
  SubmenuRoot: Menu.SubmenuRoot,
  SubmenuTrigger: Menu.SubmenuTrigger,
  Icon: Menu.Icon,
  Shortcut: Menu.Shortcut,
};

export type { TriggerProps as ContextMenuTriggerProps };

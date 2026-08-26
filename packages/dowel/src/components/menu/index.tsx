import { Menu as BaseMenu } from "@base-ui/react/menu";
import * as stylex from "@stylexjs/stylex";
import { forwardRef, useContext } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { DowelThemeContext, themeStyles } from "../../theme/theme-provider";
import * as styles from "./menu.stylex";

type Props<T extends (...args: never) => unknown> = T extends (
  props: infer P,
) => unknown
  ? Omit<P, "className" | "style">
  : never;

type SpanProps = Omit<ComponentPropsWithoutRef<"span">, "className" | "style">;

export type MenuItemTone = "neutral" | "danger";
export type MenuItemProps = Props<typeof BaseMenu.Item> & {
  tone?: MenuItemTone;
};

function partProps(style: stylex.StyleXStyles) {
  const resolved = stylex.props(style);
  return { className: resolved.className, style: resolved.style };
}

function resolveItem(tone: MenuItemTone, selectable = false) {
  const resolved = stylex.props(
    styles.item.root,
    selectable && styles.item.selectable,
    tone === "danger" && styles.item.danger,
  );
  return { className: resolved.className, style: resolved.style };
}

export const Menu = {
  Root: BaseMenu.Root,
  SubmenuRoot: BaseMenu.SubmenuRoot,

  RadioGroup: function MenuRadioGroup(
    props: Props<typeof BaseMenu.RadioGroup>,
  ) {
    return (
      <BaseMenu.RadioGroup {...props} className={undefined} style={undefined} />
    );
  },

  Trigger: function MenuTrigger(props: Props<typeof BaseMenu.Trigger>) {
    return (
      <BaseMenu.Trigger {...props} className={undefined} style={undefined} />
    );
  },

  Portal: function MenuPortal(props: Props<typeof BaseMenu.Portal>) {
    const theme = useContext(DowelThemeContext);
    const resolved = stylex.props(themeStyles[theme]);

    return (
      <BaseMenu.Portal
        {...props}
        className={resolved.className}
        style={resolved.style}
        data-dowel-theme={theme}
      />
    );
  },

  Positioner: function MenuPositioner(
    props: Props<typeof BaseMenu.Positioner>,
  ) {
    return (
      <BaseMenu.Positioner
        sideOffset={4}
        {...props}
        {...partProps(styles.part.positioner)}
      />
    );
  },

  Popup: function MenuPopup(props: Props<typeof BaseMenu.Popup>) {
    return (
      <BaseMenu.Popup
        {...props}
        {...partProps(styles.popup.root)}
        data-dowel-component="menu-popup"
      />
    );
  },

  Viewport: function MenuViewport(props: Props<typeof BaseMenu.Viewport>) {
    return (
      <BaseMenu.Viewport
        {...props}
        {...partProps(styles.part.viewport)}
        data-dowel-component="menu-viewport"
      />
    );
  },

  Item: function MenuItem({ tone = "neutral", ...props }: MenuItemProps) {
    return (
      <BaseMenu.Item
        {...props}
        {...resolveItem(tone)}
        data-dowel-component="menu-item"
        data-tone={tone}
      />
    );
  },

  LinkItem: function MenuLinkItem({
    tone = "neutral",
    ...props
  }: Props<typeof BaseMenu.LinkItem> & { tone?: MenuItemTone }) {
    return (
      <BaseMenu.LinkItem
        {...props}
        {...resolveItem(tone)}
        data-dowel-component="menu-link-item"
        data-tone={tone}
      />
    );
  },

  CheckboxItem: function MenuCheckboxItem({
    tone = "neutral",
    ...props
  }: Props<typeof BaseMenu.CheckboxItem> & { tone?: MenuItemTone }) {
    return (
      <BaseMenu.CheckboxItem
        {...props}
        {...resolveItem(tone, true)}
        data-dowel-component="menu-checkbox-item"
        data-tone={tone}
      />
    );
  },

  RadioItem: function MenuRadioItem({
    tone = "neutral",
    ...props
  }: Props<typeof BaseMenu.RadioItem> & { tone?: MenuItemTone }) {
    return (
      <BaseMenu.RadioItem
        {...props}
        {...resolveItem(tone, true)}
        data-dowel-component="menu-radio-item"
        data-tone={tone}
      />
    );
  },

  SubmenuTrigger: function MenuSubmenuTrigger({
    tone = "neutral",
    ...props
  }: Props<typeof BaseMenu.SubmenuTrigger> & { tone?: MenuItemTone }) {
    return (
      <BaseMenu.SubmenuTrigger
        {...props}
        {...resolveItem(tone)}
        data-dowel-component="menu-submenu-trigger"
        data-tone={tone}
      />
    );
  },

  CheckboxItemIndicator: function MenuCheckboxItemIndicator(
    props: Props<typeof BaseMenu.CheckboxItemIndicator>,
  ) {
    return (
      <BaseMenu.CheckboxItemIndicator
        {...props}
        {...partProps(styles.part.indicator)}
        data-dowel-component="menu-checkbox-indicator"
      />
    );
  },

  RadioItemIndicator: function MenuRadioItemIndicator(
    props: Props<typeof BaseMenu.RadioItemIndicator>,
  ) {
    return (
      <BaseMenu.RadioItemIndicator
        {...props}
        {...partProps(styles.part.indicator)}
        data-dowel-component="menu-radio-indicator"
      />
    );
  },

  Separator: function MenuSeparator(props: Props<typeof BaseMenu.Separator>) {
    return (
      <BaseMenu.Separator
        {...props}
        {...partProps(styles.part.separator)}
        data-dowel-component="menu-separator"
      />
    );
  },

  Group: function MenuGroup(props: Props<typeof BaseMenu.Group>) {
    return (
      <BaseMenu.Group {...props} className={undefined} style={undefined} />
    );
  },

  GroupLabel: function MenuGroupLabel(
    props: Props<typeof BaseMenu.GroupLabel>,
  ) {
    return (
      <BaseMenu.GroupLabel
        {...props}
        {...partProps(styles.part.label)}
        data-dowel-component="menu-group-label"
      />
    );
  },

  Icon: forwardRef<HTMLSpanElement, SpanProps>(function MenuIcon(props, ref) {
    return (
      <span
        ref={ref}
        {...props}
        {...partProps(styles.part.icon)}
        aria-hidden="true"
        data-dowel-component="menu-icon"
      />
    );
  }),

  Shortcut: forwardRef<HTMLSpanElement, SpanProps>(
    function MenuShortcut(props, ref) {
      return (
        <span
          ref={ref}
          {...props}
          {...partProps(styles.part.shortcut)}
          aria-hidden="true"
          data-dowel-component="menu-shortcut"
        />
      );
    },
  ),
};

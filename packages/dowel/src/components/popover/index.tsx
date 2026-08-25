import { Popover as BasePopover } from "@base-ui/react/popover";
import * as stylex from "@stylexjs/stylex";
import { useContext } from "react";

import { DowelThemeContext, themeStyles } from "../../theme/theme-provider";
import * as styles from "./popover.stylex";

type Props<T extends (...args: never) => unknown> = T extends (
  props: infer P,
) => unknown
  ? Omit<P, "className" | "style">
  : never;

function partProps(style: stylex.StyleXStyles) {
  const resolved = stylex.props(style);
  return { className: resolved.className, style: resolved.style };
}

/** Anchored, nonmodal content for controls and compact supporting details. */
export const Popover = {
  Root: BasePopover.Root,

  Trigger: function PopoverTrigger(props: Props<typeof BasePopover.Trigger>) {
    return (
      <BasePopover.Trigger {...props} className={undefined} style={undefined} />
    );
  },

  Portal: function PopoverPortal(props: Props<typeof BasePopover.Portal>) {
    const theme = useContext(DowelThemeContext);
    const resolved = stylex.props(themeStyles[theme]);

    return (
      <BasePopover.Portal
        {...props}
        className={resolved.className}
        style={resolved.style}
        data-dowel-theme={theme}
      />
    );
  },

  Positioner: function PopoverPositioner(
    props: Props<typeof BasePopover.Positioner>,
  ) {
    return (
      <BasePopover.Positioner
        sideOffset={6}
        collisionPadding={8}
        {...props}
        className={undefined}
        style={undefined}
      />
    );
  },

  Popup: function PopoverPopup(props: Props<typeof BasePopover.Popup>) {
    return (
      <BasePopover.Popup
        {...props}
        {...partProps(styles.popup.root)}
        data-dowel-component="popover-popup"
      />
    );
  },

  Viewport: function PopoverViewport(
    props: Props<typeof BasePopover.Viewport>,
  ) {
    return (
      <BasePopover.Viewport
        {...props}
        {...partProps(styles.part.viewport)}
        data-dowel-component="popover-viewport"
      />
    );
  },

  Arrow: function PopoverArrow(props: Props<typeof BasePopover.Arrow>) {
    return (
      <BasePopover.Arrow
        {...props}
        {...partProps(styles.part.arrow)}
        data-dowel-component="popover-arrow"
      >
        <span {...stylex.props(styles.part.arrowShape)} />
      </BasePopover.Arrow>
    );
  },

  Title: function PopoverTitle(props: Props<typeof BasePopover.Title>) {
    return (
      <BasePopover.Title
        {...props}
        {...partProps(styles.part.title)}
        data-dowel-component="popover-title"
      />
    );
  },

  Description: function PopoverDescription(
    props: Props<typeof BasePopover.Description>,
  ) {
    return (
      <BasePopover.Description
        {...props}
        {...partProps(styles.part.description)}
        data-dowel-component="popover-description"
      />
    );
  },

  Close: function PopoverClose(props: Props<typeof BasePopover.Close>) {
    return (
      <BasePopover.Close {...props} className={undefined} style={undefined} />
    );
  },
};

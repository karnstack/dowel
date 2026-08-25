import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import * as stylex from "@stylexjs/stylex";
import { createContext, forwardRef, useContext } from "react";
import type { ComponentPropsWithoutRef } from "react";
import type { DrawerRootProps as BaseDrawerRootProps } from "@base-ui/react/drawer";

import { DowelThemeContext, themeStyles } from "../../theme/theme-provider";
import * as styles from "./drawer.stylex";

type Props<T extends (...args: never) => unknown> = T extends (
  props: infer P,
) => unknown
  ? Omit<P, "className" | "style">
  : never;
type DivProps = Omit<ComponentPropsWithoutRef<"div">, "className" | "style">;
export type DrawerSide = "top" | "right" | "bottom" | "left";
export interface DrawerRootProps
  extends Omit<BaseDrawerRootProps, "swipeDirection"> {
  side?: DrawerSide;
}
export interface DrawerPopupProps extends Props<typeof BaseDrawer.Popup> {
  side?: DrawerSide;
}

function partProps(...values: stylex.StyleXStyles[]) {
  const resolved = stylex.props(...values);
  return { className: resolved.className, style: resolved.style };
}

const swipeDirection = {
  top: "up",
  right: "right",
  bottom: "down",
  left: "left",
} as const;

const DrawerSideContext = createContext<DrawerSide>("right");

export const Drawer = {
  Provider: BaseDrawer.Provider,
  Root: function DrawerRoot({ side = "right", ...props }: DrawerRootProps) {
    return (
      <DrawerSideContext.Provider value={side}>
        <BaseDrawer.Root {...props} swipeDirection={swipeDirection[side]} />
      </DrawerSideContext.Provider>
    );
  },
  Trigger: function DrawerTrigger(props: Props<typeof BaseDrawer.Trigger>) {
    return (
      <BaseDrawer.Trigger {...props} className={undefined} style={undefined} />
    );
  },
  Portal: function DrawerPortal(props: Props<typeof BaseDrawer.Portal>) {
    const theme = useContext(DowelThemeContext);
    const resolved = stylex.props(themeStyles[theme]);
    return (
      <BaseDrawer.Portal
        {...props}
        className={resolved.className}
        style={resolved.style}
        data-dowel-theme={theme}
      />
    );
  },
  Backdrop: function DrawerBackdrop(props: Props<typeof BaseDrawer.Backdrop>) {
    return (
      <BaseDrawer.Backdrop
        {...props}
        {...partProps(styles.backdrop.root)}
        data-dowel-component="drawer-backdrop"
      />
    );
  },
  Viewport: function DrawerViewport(props: Props<typeof BaseDrawer.Viewport>) {
    return (
      <BaseDrawer.Viewport
        {...props}
        {...partProps(styles.viewport.root)}
        data-dowel-component="drawer-viewport"
      />
    );
  },
  Popup: function DrawerPopup({
    side: sideOverride,
    ...props
  }: DrawerPopupProps) {
    const inheritedSide = useContext(DrawerSideContext);
    const side = sideOverride ?? inheritedSide;
    return (
      <BaseDrawer.Popup
        {...props}
        {...partProps(styles.popup.root, styles.popup[side])}
        data-dowel-component="drawer-popup"
        data-side={side}
      />
    );
  },
  Content: function DrawerContent(props: Props<typeof BaseDrawer.Content>) {
    return (
      <BaseDrawer.Content
        {...props}
        {...partProps(styles.part.content)}
        data-dowel-component="drawer-content"
      />
    );
  },
  Handle: forwardRef<HTMLDivElement, DivProps>(
    function DrawerHandle(props, ref) {
      return (
        <div
          ref={ref}
          aria-hidden="true"
          {...props}
          {...partProps(styles.part.handle)}
          data-dowel-component="drawer-handle"
        />
      );
    },
  ),
  Header: forwardRef<HTMLDivElement, DivProps>(
    function DrawerHeader(props, ref) {
      return (
        <div
          ref={ref}
          {...props}
          {...partProps(styles.part.header)}
          data-dowel-component="drawer-header"
        />
      );
    },
  ),
  Body: forwardRef<HTMLDivElement, DivProps>(function DrawerBody(props, ref) {
    return (
      <div
        ref={ref}
        {...props}
        {...partProps(styles.part.body)}
        data-dowel-component="drawer-body"
      />
    );
  }),
  Footer: forwardRef<HTMLDivElement, DivProps>(
    function DrawerFooter(props, ref) {
      return (
        <div
          ref={ref}
          {...props}
          {...partProps(styles.part.footer)}
          data-dowel-component="drawer-footer"
        />
      );
    },
  ),
  Title: function DrawerTitle(props: Props<typeof BaseDrawer.Title>) {
    return (
      <BaseDrawer.Title
        {...props}
        {...partProps(styles.part.title)}
        data-dowel-component="drawer-title"
      />
    );
  },
  Description: function DrawerDescription(
    props: Props<typeof BaseDrawer.Description>,
  ) {
    return (
      <BaseDrawer.Description
        {...props}
        {...partProps(styles.part.description)}
        data-dowel-component="drawer-description"
      />
    );
  },
  Close: function DrawerClose(props: Props<typeof BaseDrawer.Close>) {
    return (
      <BaseDrawer.Close {...props} className={undefined} style={undefined} />
    );
  },
};

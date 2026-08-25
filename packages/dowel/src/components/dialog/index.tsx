import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import * as stylex from "@stylexjs/stylex";
import { forwardRef, useContext } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { DowelThemeContext, themeStyles } from "../../theme/theme-provider";
import * as styles from "./dialog.stylex";

type Props<T extends (...args: never) => unknown> = T extends (
  props: infer P,
) => unknown
  ? Omit<P, "className" | "style">
  : never;

type DivProps = Omit<ComponentPropsWithoutRef<"div">, "className" | "style">;

export type DialogPopupProps = Props<typeof BaseDialog.Popup> & {
  /** Keep modal behavior and positioning while a composite owns the surface. */
  variant?: "default" | "bare";
};

function partProps(style: stylex.StyleXStyles) {
  const resolved = stylex.props(style);
  return { className: resolved.className, style: resolved.style };
}

export const Dialog = {
  Root: BaseDialog.Root,

  Trigger: function DialogTrigger(props: Props<typeof BaseDialog.Trigger>) {
    return (
      <BaseDialog.Trigger {...props} className={undefined} style={undefined} />
    );
  },

  Portal: function DialogPortal(props: Props<typeof BaseDialog.Portal>) {
    const theme = useContext(DowelThemeContext);
    const resolved = stylex.props(themeStyles[theme]);

    return (
      <BaseDialog.Portal
        {...props}
        className={resolved.className}
        style={resolved.style}
        data-dowel-theme={theme}
      />
    );
  },

  Backdrop: function DialogBackdrop(props: Props<typeof BaseDialog.Backdrop>) {
    return (
      <BaseDialog.Backdrop
        {...props}
        {...partProps(styles.backdrop.root)}
        data-dowel-component="dialog-backdrop"
      />
    );
  },

  Popup: function DialogPopup({
    variant = "default",
    ...props
  }: DialogPopupProps) {
    const resolved = stylex.props(
      styles.popup.root,
      variant === "bare" && styles.popup.bare,
    );

    return (
      <BaseDialog.Popup
        {...props}
        className={resolved.className}
        style={resolved.style}
        data-dowel-component="dialog-popup"
        data-variant={variant}
      />
    );
  },

  Header: forwardRef<HTMLDivElement, DivProps>(
    function DialogHeader(props, ref) {
      return (
        <div
          ref={ref}
          {...props}
          {...partProps(styles.part.header)}
          data-dowel-component="dialog-header"
        />
      );
    },
  ),

  Body: forwardRef<HTMLDivElement, DivProps>(function DialogBody(props, ref) {
    return (
      <div
        ref={ref}
        {...props}
        {...partProps(styles.part.body)}
        data-dowel-component="dialog-body"
      />
    );
  }),

  Footer: forwardRef<HTMLDivElement, DivProps>(
    function DialogFooter(props, ref) {
      return (
        <div
          ref={ref}
          {...props}
          {...partProps(styles.part.footer)}
          data-dowel-component="dialog-footer"
        />
      );
    },
  ),

  Title: function DialogTitle(props: Props<typeof BaseDialog.Title>) {
    return (
      <BaseDialog.Title
        {...props}
        {...partProps(styles.part.title)}
        data-dowel-component="dialog-title"
      />
    );
  },

  Description: function DialogDescription(
    props: Props<typeof BaseDialog.Description>,
  ) {
    return (
      <BaseDialog.Description
        {...props}
        {...partProps(styles.part.description)}
        data-dowel-component="dialog-description"
      />
    );
  },

  Close: function DialogClose(props: Props<typeof BaseDialog.Close>) {
    return (
      <BaseDialog.Close {...props} className={undefined} style={undefined} />
    );
  },
};

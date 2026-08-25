import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import * as stylex from "@stylexjs/stylex";
import { forwardRef, useContext } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { DowelThemeContext, themeStyles } from "../../theme/theme-provider";
import * as styles from "../dialog/dialog.stylex";

type Props<T extends (...args: never) => unknown> = T extends (
  props: infer P,
) => unknown
  ? Omit<P, "className" | "style">
  : never;

type DivProps = Omit<ComponentPropsWithoutRef<"div">, "className" | "style">;

function partProps(style: stylex.StyleXStyles) {
  const resolved = stylex.props(style);
  return { className: resolved.className, style: resolved.style };
}

export const AlertDialog = {
  Root: BaseAlertDialog.Root,

  Trigger: function AlertDialogTrigger(
    props: Props<typeof BaseAlertDialog.Trigger>,
  ) {
    return (
      <BaseAlertDialog.Trigger
        {...props}
        className={undefined}
        style={undefined}
      />
    );
  },

  Portal: function AlertDialogPortal(
    props: Props<typeof BaseAlertDialog.Portal>,
  ) {
    const theme = useContext(DowelThemeContext);
    const resolved = stylex.props(themeStyles[theme]);
    return (
      <BaseAlertDialog.Portal
        {...props}
        className={resolved.className}
        style={resolved.style}
        data-dowel-theme={theme}
      />
    );
  },

  Backdrop: function AlertDialogBackdrop(
    props: Props<typeof BaseAlertDialog.Backdrop>,
  ) {
    return (
      <BaseAlertDialog.Backdrop
        {...props}
        {...partProps(styles.backdrop.root)}
        data-dowel-component="alert-dialog-backdrop"
      />
    );
  },

  Popup: function AlertDialogPopup(props: Props<typeof BaseAlertDialog.Popup>) {
    return (
      <BaseAlertDialog.Popup
        {...props}
        {...partProps(styles.popup.root)}
        data-dowel-component="alert-dialog-popup"
      />
    );
  },

  Header: forwardRef<HTMLDivElement, DivProps>(
    function AlertDialogHeader(props, ref) {
      return <div ref={ref} {...props} {...partProps(styles.part.header)} />;
    },
  ),

  Body: forwardRef<HTMLDivElement, DivProps>(
    function AlertDialogBody(props, ref) {
      return <div ref={ref} {...props} {...partProps(styles.part.body)} />;
    },
  ),

  Footer: forwardRef<HTMLDivElement, DivProps>(
    function AlertDialogFooter(props, ref) {
      return <div ref={ref} {...props} {...partProps(styles.part.footer)} />;
    },
  ),

  Title: function AlertDialogTitle(props: Props<typeof BaseAlertDialog.Title>) {
    return (
      <BaseAlertDialog.Title {...props} {...partProps(styles.part.title)} />
    );
  },

  Description: function AlertDialogDescription(
    props: Props<typeof BaseAlertDialog.Description>,
  ) {
    return (
      <BaseAlertDialog.Description
        {...props}
        {...partProps(styles.part.description)}
      />
    );
  },

  Close: function AlertDialogClose(props: Props<typeof BaseAlertDialog.Close>) {
    return (
      <BaseAlertDialog.Close
        {...props}
        className={undefined}
        style={undefined}
      />
    );
  },
};

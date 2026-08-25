import * as stylex from "@stylexjs/stylex";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { Input, Textarea } from "../input";
import type { InputProps, TextareaProps } from "../input";
import * as styles from "./composer.stylex";

type FormProps = Omit<ComponentPropsWithoutRef<"form">, "className" | "style">;
type DivProps = Omit<ComponentPropsWithoutRef<"div">, "className" | "style">;
type DividerProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "className" | "style" | "role"
>;

export interface ComposerTitleProps
  extends Omit<InputProps, "size" | "variant"> {
  name: string;
}

export interface ComposerDescriptionProps
  extends Omit<TextareaProps, "variant"> {
  name: string;
}

function partProps(style: stylex.StyleXStyles) {
  const resolved = stylex.props(style);
  return { className: resolved.className, style: resolved.style };
}

export const Composer = {
  Root: forwardRef<HTMLFormElement, FormProps>(
    function ComposerRoot(props, ref) {
      return (
        <form
          ref={ref}
          {...props}
          {...partProps(styles.parts.root)}
          data-dowel-component="composer"
        />
      );
    },
  ),

  Header: forwardRef<HTMLDivElement, DivProps>(
    function ComposerHeader(props, ref) {
      return (
        <div
          ref={ref}
          {...props}
          {...partProps(styles.parts.header)}
          data-dowel-component="composer-header"
        />
      );
    },
  ),

  Body: forwardRef<HTMLDivElement, DivProps>(function ComposerBody(props, ref) {
    return (
      <div
        ref={ref}
        {...props}
        {...partProps(styles.parts.body)}
        data-dowel-component="composer-body"
      />
    );
  }),

  Title: forwardRef<HTMLInputElement, ComposerTitleProps>(
    function ComposerTitle(
      { "aria-label": ariaLabel = "Title", ...props },
      ref,
    ) {
      return (
        <Input
          ref={ref}
          {...props}
          aria-label={ariaLabel}
          variant="bare"
          size="title"
          data-dowel-part="composer-title"
        />
      );
    },
  ),

  Description: forwardRef<HTMLTextAreaElement, ComposerDescriptionProps>(
    function ComposerDescription(
      { "aria-label": ariaLabel = "Description", ...props },
      ref,
    ) {
      return (
        <Textarea
          ref={ref}
          {...props}
          aria-label={ariaLabel}
          variant="bare"
          data-dowel-part="composer-description"
        />
      );
    },
  ),

  Divider: forwardRef<HTMLDivElement, DividerProps>(
    function ComposerDivider(props, ref) {
      return (
        <div
          ref={ref}
          {...props}
          {...partProps(styles.parts.divider)}
          data-dowel-component="composer-divider"
          role="separator"
        />
      );
    },
  ),

  Properties: forwardRef<HTMLDivElement, DivProps>(
    function ComposerProperties(props, ref) {
      return (
        <div
          ref={ref}
          {...props}
          {...partProps(styles.parts.properties)}
          data-dowel-component="composer-properties"
        />
      );
    },
  ),

  Footer: forwardRef<HTMLDivElement, DivProps>(
    function ComposerFooter(props, ref) {
      return (
        <div
          ref={ref}
          {...props}
          {...partProps(styles.parts.footer)}
          data-dowel-component="composer-footer"
        />
      );
    },
  ),

  Actions: forwardRef<HTMLDivElement, DivProps>(
    function ComposerActions(props, ref) {
      return (
        <div
          ref={ref}
          {...props}
          {...partProps(styles.parts.actions)}
          data-dowel-component="composer-actions"
        />
      );
    },
  ),
};

import { Field as BaseField } from "@base-ui/react/field";
import { Input as BaseInput } from "@base-ui/react/input";
import * as stylex from "@stylexjs/stylex";
import { forwardRef } from "react";
import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ForwardRefExoticComponent,
  AriaAttributes,
  ReactElement,
  RefAttributes,
} from "react";

import * as styles from "./input.stylex";

export type FieldVariant = "surface" | "bare";
export type FieldSize = "sm" | "md" | "lg" | "title";

export interface InputProps
  extends Omit<
    ComponentPropsWithoutRef<"input">,
    "className" | "style" | "size"
  > {
  /** `surface` is a quiet boxed control. `bare` is transparent and borderless. */
  variant?: FieldVariant;
  /** Visual height and type role. `title` is for prominent inline editing. */
  size?: FieldSize;
  /** Marks the control invalid and exposes `aria-invalid` to assistive tech. */
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { variant = "surface", size = "md", invalid, ...props },
  ref,
) {
  const resolved = stylex.props(
    styles.control.root,
    styles.inputSize[size],
    styles.variant[variant],
    invalid && styles.invalid.root,
  );

  return (
    <BaseInput
      ref={ref}
      {...props}
      {...(invalid ? { "aria-invalid": true } : null)}
      className={resolved.className}
      style={resolved.style}
      data-dowel-component="input"
      data-variant={variant}
      data-size={size}
    />
  );
});

export interface TextareaProps
  extends Omit<ComponentPropsWithoutRef<"textarea">, "className" | "style"> {
  /** `surface` is a quiet boxed control. `bare` is transparent and borderless. */
  variant?: FieldVariant;
  /** Marks the control invalid and exposes `aria-invalid` to assistive tech. */
  invalid?: boolean;
}

type BaseTextareaProps = Omit<TextareaProps, "variant" | "invalid"> & {
  className?: string;
  render: ReactElement;
  style?: CSSProperties;
  "aria-invalid"?: AriaAttributes["aria-invalid"];
  "data-dowel-component"?: string;
  "data-variant"?: FieldVariant;
};

const BaseTextarea = BaseInput as unknown as ForwardRefExoticComponent<
  BaseTextareaProps & RefAttributes<HTMLTextAreaElement>
>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ variant = "surface", invalid, ...props }, ref) {
    const resolved = stylex.props(
      styles.control.root,
      styles.textarea.root,
      styles.textarea[variant],
      styles.variant[variant],
      invalid && styles.invalid.root,
    );

    return (
      <BaseTextarea
        ref={ref}
        render={<textarea />}
        {...props}
        {...(invalid ? { "aria-invalid": true } : null)}
        className={resolved.className}
        style={resolved.style}
        data-dowel-component="textarea"
        data-variant={variant}
      />
    );
  },
);

type Props<T extends (...args: never) => unknown> = T extends (
  props: infer P,
) => unknown
  ? Omit<P, "className" | "style">
  : never;

export const Field = {
  Root: forwardRef<HTMLDivElement, Props<typeof BaseField.Root>>(
    function FieldRoot(props, ref) {
      const resolved = stylex.props(styles.field.root);
      return (
        <BaseField.Root
          ref={ref}
          {...props}
          className={resolved.className}
          style={resolved.style}
          data-dowel-component="field"
        />
      );
    },
  ),

  Label: forwardRef<
    HTMLLabelElement,
    Omit<Props<typeof BaseField.Label>, "htmlFor">
  >(function FieldLabel(props, ref) {
    const resolved = stylex.props(styles.field.label);
    return (
      <BaseField.Label
        ref={ref}
        {...props}
        className={resolved.className}
        style={resolved.style}
        data-dowel-component="field-label"
      />
    );
  }),

  Description: forwardRef<
    HTMLParagraphElement,
    Props<typeof BaseField.Description>
  >(function FieldDescription(props, ref) {
    const resolved = stylex.props(styles.field.description);
    return (
      <BaseField.Description
        ref={ref}
        {...props}
        className={resolved.className}
        style={resolved.style}
        data-dowel-component="field-description"
      />
    );
  }),

  Error: forwardRef<HTMLDivElement, Props<typeof BaseField.Error>>(
    function FieldError(props, ref) {
      const resolved = stylex.props(styles.field.error);
      return (
        <BaseField.Error
          ref={ref}
          {...props}
          className={resolved.className}
          style={resolved.style}
          data-dowel-component="field-error"
        />
      );
    },
  ),
};

import { Field as BaseField } from "@base-ui/react/field";
import { Input as BaseInput } from "@base-ui/react/input";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

export interface InputProps
  extends Omit<
    ComponentPropsWithoutRef<"input">,
    // dowel is opinionated: appearance is not a consumer concern. The native
    // `size` attribute (a character count) is omitted so dowel's `size`
    // (a visual scale) can take the name.
    "className" | "style" | "size"
  > {
  /** `md` is the 28px control height, `lg` is the 36px field height. */
  size?: "md" | "lg";
  /** Marks the input invalid for assistive tech via `aria-invalid`. */
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = "md", invalid, ...props },
  ref,
) {
  return (
    <BaseInput
      ref={ref}
      {...props}
      // Everything below stays AFTER the spread so props spread onto the
      // component can never override appearance. `aria-invalid` is spread
      // conditionally: when `invalid` is unset it must not clobber an
      // `aria-invalid` passed directly or computed by Field validation.
      {...(invalid ? { "aria-invalid": true } : null)}
      className="dowel-input"
      style={undefined}
      data-size={size}
    />
  );
});

/**
 * Field wires a label, description and error message to a control, so the
 * association is never hand-rolled with matching id strings. A dowel `Input`
 * placed inside `Field.Root` is associated automatically — Base UI's Input
 * is the control Field owns.
 */
export const Field = {
  Root: forwardRef<
    HTMLDivElement,
    Omit<ComponentPropsWithoutRef<"div">, "className" | "style">
  >(function FieldRoot(props, ref) {
    return (
      <BaseField.Root
        ref={ref}
        {...props}
        // Everything below stays AFTER the spread so props spread onto the
        // component can never override appearance.
        className="dowel-field"
        style={undefined}
      />
    );
  }),

  Label: forwardRef<
    HTMLLabelElement,
    Omit<ComponentPropsWithoutRef<"label">, "className" | "style">
  >(function FieldLabel(props, ref) {
    return (
      <BaseField.Label
        ref={ref}
        {...props}
        className="dowel-field-label"
        style={undefined}
      />
    );
  }),

  Description: forwardRef<
    HTMLParagraphElement,
    Omit<ComponentPropsWithoutRef<"p">, "className" | "style">
  >(function FieldDescription(props, ref) {
    return (
      <BaseField.Description
        ref={ref}
        {...props}
        className="dowel-field-description"
        style={undefined}
      />
    );
  }),

  Error: forwardRef<
    HTMLParagraphElement,
    Omit<ComponentPropsWithoutRef<"p">, "className" | "style">
  >(function FieldError(props, ref) {
    return (
      <BaseField.Error
        ref={ref}
        {...props}
        className="dowel-field-error"
        style={undefined}
      />
    );
  }),
};

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
      // component cannot override appearance. An element smuggled through the
      // spread as `render` still carries its own attributes — that Base UI
      // escape hatch is by design. `aria-invalid` is spread conditionally:
      // when `invalid` is unset it must not clobber an `aria-invalid` passed
      // directly or computed by Field validation.
      {...(invalid ? { "aria-invalid": true } : null)}
      className="dowel-input"
      style={undefined}
      data-size={size}
    />
  );
});

/**
 * Public props for a Field part: the corresponding Base UI component's own
 * props (so `invalid`, `validate`, `validationMode`, `match`, … stay
 * reachable) minus appearance, which is not a consumer concern. Props are
 * inferred from the component's call signature — `ComponentProps<T>` rejects
 * this loose constraint (its own requires a `ReactNode` return), and the
 * result is identical.
 */
type Props<T extends (...args: never) => unknown> = T extends (
  props: infer P,
) => unknown
  ? Omit<P, "className" | "style">
  : never;

/**
 * Field wires a label, description and error message to a control, so the
 * association is never hand-rolled with matching id strings. A dowel `Input`
 * placed inside `Field.Root` is associated automatically — Base UI's Input
 * is the control Field owns.
 */
export const Field = {
  Root: forwardRef<HTMLDivElement, Props<typeof BaseField.Root>>(
    function FieldRoot(props, ref) {
      return (
        <BaseField.Root
          ref={ref}
          {...props}
          // Everything below stays AFTER the spread so props spread onto the
          // component cannot override appearance. An element passed via
          // `render` still carries its own attributes — that escape hatch is
          // by design.
          className="dowel-field"
          style={undefined}
        />
      );
    },
  ),

  Label: forwardRef<
    HTMLLabelElement,
    // htmlFor is omitted on top: Field generates the association, and a
    // hand-written htmlFor would win over it — the exact bug Field removes.
    Omit<Props<typeof BaseField.Label>, "htmlFor">
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
    Props<typeof BaseField.Description>
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

  // Base UI's Field.Error renders a <div>, not a <p> — the ref type says so.
  Error: forwardRef<HTMLDivElement, Props<typeof BaseField.Error>>(
    function FieldError(props, ref) {
      return (
        <BaseField.Error
          ref={ref}
          {...props}
          className="dowel-field-error"
          style={undefined}
        />
      );
    },
  ),
};

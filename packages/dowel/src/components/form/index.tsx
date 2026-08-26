import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import * as stylex from "@stylexjs/stylex";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Button } from "../button";
import type { ButtonProps } from "../button";
import { Field, Input, Textarea } from "../input";
import type { InputProps, TextareaProps } from "../input";
import * as styles from "./form.stylex";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

function firstError(errors: unknown[]): string | null {
  const error = errors.find((value) => value !== undefined && value !== null);
  if (error === undefined) return null;
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  return String(error);
}

export interface FormTextFieldProps
  extends Omit<
    InputProps,
    "aria-label" | "defaultValue" | "name" | "onBlur" | "onChange" | "value"
  > {
  label: ReactNode;
  description?: ReactNode;
}

function TextField({ label, description, ...inputProps }: FormTextFieldProps) {
  const field = useFieldContext<string>();
  const error = firstError(field.state.meta.errors);
  const invalid = field.state.meta.isTouched && error !== null;

  return (
    <Field.Root invalid={invalid}>
      <Field.Label>{label}</Field.Label>
      <Input
        {...inputProps}
        name={field.name}
        value={field.state.value}
        invalid={invalid}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.currentTarget.value)}
      />
      {description ? (
        <Field.Description>{description}</Field.Description>
      ) : null}
      {invalid ? <Field.Error match>{error}</Field.Error> : null}
    </Field.Root>
  );
}

export interface FormTextareaFieldProps
  extends Omit<
    TextareaProps,
    "aria-label" | "defaultValue" | "name" | "onBlur" | "onChange" | "value"
  > {
  label: ReactNode;
  description?: ReactNode;
}

function TextareaField({
  label,
  description,
  ...textareaProps
}: FormTextareaFieldProps) {
  const field = useFieldContext<string>();
  const error = firstError(field.state.meta.errors);
  const invalid = field.state.meta.isTouched && error !== null;

  return (
    <Field.Root invalid={invalid}>
      <Field.Label>{label}</Field.Label>
      <Textarea
        {...textareaProps}
        name={field.name}
        value={field.state.value}
        invalid={invalid}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.currentTarget.value)}
      />
      {description ? (
        <Field.Description>{description}</Field.Description>
      ) : null}
      {invalid ? <Field.Error match>{error}</Field.Error> : null}
    </Field.Root>
  );
}

type NativeFormProps = Omit<
  ComponentPropsWithoutRef<"form">,
  "className" | "style"
>;

export interface FormRootProps extends NativeFormProps {}

function Root({ onSubmit, ...props }: FormRootProps) {
  const form = useFormContext();
  return (
    <form
      {...props}
      {...stylex.props(styles.form.root)}
      noValidate
      onSubmit={(event) => {
        onSubmit?.(event);
        if (event.defaultPrevented) return;
        event.preventDefault();
        void form.handleSubmit();
      }}
      data-dowel-component="form"
    />
  );
}

type DivProps = Omit<ComponentPropsWithoutRef<"div">, "className" | "style">;

function Actions(props: DivProps) {
  return (
    <div
      {...props}
      {...stylex.props(styles.form.actions)}
      data-dowel-component="form-actions"
    />
  );
}

export interface FormSubmitButtonProps
  extends Omit<ButtonProps, "type" | "variant"> {
  pendingLabel?: ReactNode;
}

function SubmitButton({
  children = "Save",
  pendingLabel = "Saving…",
  disabled,
  ...props
}: FormSubmitButtonProps) {
  const form = useFormContext();
  return (
    <form.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting] as const}
    >
      {([canSubmit, isSubmitting]) => (
        <Button
          {...props}
          type="submit"
          variant="primary"
          disabled={disabled || !canSubmit || isSubmitting}
        >
          {isSubmitting ? pendingLabel : children}
        </Button>
      )}
    </form.Subscribe>
  );
}

const dowelForm = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField, TextareaField },
  formComponents: { Root, Actions, SubmitButton },
});

/** TanStack Form with Dowel fields and form controls pre-bound. */
export const useDowelForm = dowelForm.useAppForm;
export const withDowelForm = dowelForm.withForm;
export const withDowelFieldGroup = dowelForm.withFieldGroup;

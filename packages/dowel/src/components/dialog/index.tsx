import { Dialog as BaseDialog } from "@base-ui/react/dialog";

/**
 * Public props for a Dialog part: the corresponding Base UI component's own
 * props (so `initialFocus`, `finalFocus`, `keepMounted`, … stay reachable)
 * minus appearance, which is not a consumer concern. Props are inferred from
 * the component's call signature — `ComponentProps<T>` rejects this loose
 * constraint (its own requires a `ReactNode` return), and the result is
 * identical.
 */
type Props<T extends (...args: never) => unknown> = T extends (
  props: infer P,
) => unknown
  ? Omit<P, "className" | "style">
  : never;

/**
 * A modal dialog on the modal elevation tier. Compound component: compose
 * `Root`, `Trigger`, `Portal`, `Backdrop`, `Popup`, `Title`, `Description`
 * and `Close`. `Title` labels the dialog for assistive tech automatically —
 * no hand-rolled `aria-labelledby`.
 */
export const Dialog = {
  Root: BaseDialog.Root,

  // Trigger, Portal and Close are structural — dowel gives them no class of
  // their own — but they still render real elements (Portal a <div>, Trigger
  // and Close a native <button> when no `render` is given), so their
  // className/style channels must be neutralised like the styled parts'.
  // Portal is the sharp edge: an inline `transform`/`filter` on its <div>
  // creates a containing block that silently breaks the popup's
  // `position: fixed`. An element passed via `render` still carries its own
  // attributes — that escape hatch is by design.
  Trigger: function DialogTrigger(props: Props<typeof BaseDialog.Trigger>) {
    return (
      <BaseDialog.Trigger {...props} className={undefined} style={undefined} />
    );
  },

  Portal: function DialogPortal(props: Props<typeof BaseDialog.Portal>) {
    return (
      <BaseDialog.Portal {...props} className={undefined} style={undefined} />
    );
  },

  Backdrop: function DialogBackdrop(props: Props<typeof BaseDialog.Backdrop>) {
    return (
      <BaseDialog.Backdrop
        {...props}
        // Everything below stays AFTER the spread so props spread onto the
        // component cannot override appearance. An element passed via
        // `render` still carries its own attributes — that escape hatch is
        // by design.
        className="dowel-backdrop"
        style={undefined}
      />
    );
  },

  Popup: function DialogPopup(props: Props<typeof BaseDialog.Popup>) {
    return (
      <BaseDialog.Popup {...props} className="dowel-dialog" style={undefined} />
    );
  },

  Title: function DialogTitle(props: Props<typeof BaseDialog.Title>) {
    return (
      <BaseDialog.Title
        {...props}
        className="dowel-dialog-title"
        style={undefined}
      />
    );
  },

  Description: function DialogDescription(
    props: Props<typeof BaseDialog.Description>,
  ) {
    return (
      <BaseDialog.Description
        {...props}
        className="dowel-dialog-description"
        style={undefined}
      />
    );
  },

  Close: function DialogClose(props: Props<typeof BaseDialog.Close>) {
    return (
      <BaseDialog.Close {...props} className={undefined} style={undefined} />
    );
  },
};

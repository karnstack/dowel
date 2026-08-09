import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";

/**
 * Public props for a Tooltip part: the corresponding Base UI component's own
 * props (so `delay`, `closeDelay`, `keepMounted`, … stay reachable) minus
 * appearance, which is not a consumer concern. Props are inferred from the
 * component's call signature — `ComponentProps<T>` rejects this loose
 * constraint (its own requires a `ReactNode` return), and the result is
 * identical.
 */
type Props<T extends (...args: never) => unknown> = T extends (
  props: infer P,
) => unknown
  ? Omit<P, "className" | "style">
  : never;

/**
 * A hover/focus label on the popover elevation tier. Compound component:
 * compose `Root`, `Trigger`, `Portal`, `Positioner` and `Popup`, with a
 * single `Provider` wrapping the app so adjacent tooltips share one delay
 * and open instantly once the first is shown. Open/close timing, hover
 * intent and focus-visible handling come from Base UI.
 */
export const Tooltip = {
  // Provider and Root render no HTML element of their own — Provider is pure
  // context (children/delay/closeDelay/timeout only) and Root's props carry
  // no className/style — so there are no appearance channels to neutralise.
  Provider: BaseTooltip.Provider,
  Root: BaseTooltip.Root,

  // Trigger, Portal and Positioner are structural — dowel gives them no
  // class of their own — but they still render real elements (a native
  // <button> for Trigger when no `render` is given, a <div> for the rest),
  // so their className/style channels must be neutralised like the styled
  // parts'. Portal is the sharp edge: an inline `transform`/`filter` on its
  // <div> creates a containing block that silently breaks the popup's
  // positioning. An element passed via `render` still carries its own
  // attributes — that escape hatch is by design.
  Trigger: function TooltipTrigger(props: Props<typeof BaseTooltip.Trigger>) {
    return (
      <BaseTooltip.Trigger {...props} className={undefined} style={undefined} />
    );
  },

  Portal: function TooltipPortal(props: Props<typeof BaseTooltip.Portal>) {
    return (
      <BaseTooltip.Portal {...props} className={undefined} style={undefined} />
    );
  },

  Positioner: function TooltipPositioner(
    props: Props<typeof BaseTooltip.Positioner>,
  ) {
    return (
      <BaseTooltip.Positioner
        // Before the spread deliberately: a default, not a mandate.
        sideOffset={6}
        {...props}
        className={undefined}
        style={undefined}
      />
    );
  },

  Popup: function TooltipPopup(props: Props<typeof BaseTooltip.Popup>) {
    return (
      // Everything after the spread stays AFTER it so props spread onto the
      // component cannot override appearance.
      <BaseTooltip.Popup
        // Base UI 1.7 leaves the popup role-less. A dowel tooltip is a plain
        // text label, so `role="tooltip"` is accurate; before the spread
        // deliberately — a default, not a mandate.
        role="tooltip"
        {...props}
        className="dowel-tooltip"
        style={undefined}
      />
    );
  },
};

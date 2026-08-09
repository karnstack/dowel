import { Menu as BaseMenu } from "@base-ui/react/menu";

/**
 * Public props for a Menu part: the corresponding Base UI component's own
 * props (so `sideOffset`, `keepMounted`, `closeOnClick`, … stay reachable)
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
 * A dropdown menu on the popover elevation tier. Compound component: compose
 * `Root`, `Trigger`, `Portal`, `Positioner`, `Popup`, `Item`, `Separator`,
 * `Group` and `GroupLabel`. Keyboard navigation, typeahead and highlight
 * management come from Base UI; the highlighted item is styled via
 * `data-highlighted` so mouse and keyboard states are identical.
 */
export const Menu = {
  // Root renders no HTML element of its own — it is pure context, so there
  // are no className/style channels to neutralise.
  Root: BaseMenu.Root,

  // Trigger, Portal, Positioner and Group are structural — dowel gives them
  // no class of their own — but they still render real elements (a native
  // <button> for Trigger when no `render` is given, a <div> for the rest),
  // so their className/style channels must be neutralised like the styled
  // parts'. Portal is the sharp edge: an inline `transform`/`filter` on its
  // <div> creates a containing block that silently breaks the popup's
  // positioning. An element passed via `render` still carries its own
  // attributes — that escape hatch is by design.
  Trigger: function MenuTrigger(props: Props<typeof BaseMenu.Trigger>) {
    return (
      <BaseMenu.Trigger {...props} className={undefined} style={undefined} />
    );
  },

  Portal: function MenuPortal(props: Props<typeof BaseMenu.Portal>) {
    return (
      <BaseMenu.Portal {...props} className={undefined} style={undefined} />
    );
  },

  Positioner: function MenuPositioner(
    props: Props<typeof BaseMenu.Positioner>,
  ) {
    return (
      <BaseMenu.Positioner
        // Before the spread deliberately: a default, not a mandate.
        sideOffset={4}
        {...props}
        className={undefined}
        style={undefined}
      />
    );
  },

  Popup: function MenuPopup(props: Props<typeof BaseMenu.Popup>) {
    return (
      // Everything after the spread stays AFTER it so props spread onto the
      // component cannot override appearance.
      <BaseMenu.Popup {...props} className="dowel-menu" style={undefined} />
    );
  },

  Item: function MenuItem(props: Props<typeof BaseMenu.Item>) {
    return (
      <BaseMenu.Item {...props} className="dowel-menu-item" style={undefined} />
    );
  },

  Separator: function MenuSeparator(props: Props<typeof BaseMenu.Separator>) {
    return (
      <BaseMenu.Separator
        {...props}
        className="dowel-menu-separator"
        style={undefined}
      />
    );
  },

  Group: function MenuGroup(props: Props<typeof BaseMenu.Group>) {
    return (
      <BaseMenu.Group {...props} className={undefined} style={undefined} />
    );
  },

  GroupLabel: function MenuGroupLabel(
    props: Props<typeof BaseMenu.GroupLabel>,
  ) {
    return (
      <BaseMenu.GroupLabel
        {...props}
        className="dowel-menu-label"
        style={undefined}
      />
    );
  },
};

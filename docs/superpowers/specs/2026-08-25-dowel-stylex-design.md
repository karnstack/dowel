# Dowel StyleX design specification

**Date:** 2026-08-25

**Status:** approved direction
**Supersedes:** `2026-08-09-dowel-design.md`

## Product

Dowel is an opinionated React component system for dense, keyboard-first
product interfaces. It learns from Linear's craft without copying Linear's
brand, assets, private code, or domain model.

It ships as a versioned npm package, not a copy-in generator and not a Tailwind
preset. Behavior and appearance ship together. The target user should be able
to build settings, issue trackers, admin tools, editors, dashboards, and
collaboration products without rebuilding the application patterns that sit
above generic primitives.

## Reset decision

Nothing has been released. Backward compatibility is not a requirement.

The current plain CSS architecture, existing component props, token names,
generated markup, test snapshots, and eight-component catalog may all change.
Do not build adapters, deprecated aliases, dual styling paths, compatibility
stylesheets, or migration shims. Delete replaced code once its StyleX successor
passes the new contract.

## Positioning

Dowel has three layers:

1. **Foundation:** theme, layout, type, icon, spacing, surfaces, motion.
2. **Accessible primitives:** buttons, fields, selection, overlays, navigation,
   data display, disclosure, and workspace panels.
3. **Product-grade composites:** settings, filters, view options, properties,
   activity, comments, editors, attachments, boards, quick views, and batch
   actions.

The third layer is the product differentiator. Base UI remains a useful
behavior dependency where its contract fits. Its exported catalog does not
define Dowel's public catalog.

## Design principles

### Quiet structure, strong content

Application chrome should recede. Use subtle surface changes, low-contrast
hairlines, and restrained shadows to establish structure. Titles, selected
content, primary actions, and focus indicators carry the strongest contrast.

### Compact by design

The base density is optimized for pointer and keyboard work on desktop without
making touch impossible. The default height rhythm is:

| Role | Height |
| --- | ---: |
| compact action | 24px |
| standard control | 28px |
| option or compact row | 32px |
| search or filter field | 36px |
| command search | 40px |
| application list row | 44px |

Touch contexts may switch to a roomier density token. Components must not
scatter literal heights that make density changes impossible.

### Keyboard first, pointer complete

Every interactive pattern defines focus entry, arrow navigation, typeahead,
activation, dismissal, focus restoration, disabled behavior, and shortcut
display before its visual polish is considered complete. Pointer and touch
behavior must reach the same actions.

### Composition without style leakage

Components compose through named parts, slots, context, and semantic variants.
They do not accept `className`, `style`, or `sx` overrides. Generated StyleX
classes are implementation details.

### Honest evidence

Measured Linear geometry can inform Dowel. Workspace colors, minified module
names, and isolated numeric coincidences do not become universal design laws.
Every Linear-derived claim must be labelled rendered, loaded module, or
inferred pattern.

## Visual foundation

### Color

The default palette uses warm, low-chroma neutrals rather than the old fixed
hue-272 model. Semantic token families are:

```text
canvas
surface-1, surface-2, surface-3, elevated
border-subtle, border, border-strong
text, text-muted, text-subtle, text-disabled
accent, accent-hover, accent-active, on-accent
danger, warning, success, info and their surfaces
focus-ring
scrim
```

Light and dark themes are designed separately. Dark is not an inversion of
light. Each theme must meet contrast requirements for text, controls, focus,
selected states, and semantic feedback.

The accent is Dowel-owned and must not reuse Linear's brand purple. Public
theme variables use stable `--dowel-*` names.

### Type

Host Grotesk Variable is the default UI face and may be self-hosted under its
OFL license. Its uniwidth metrics keep compact navigation, tabs, and controls
stable across weight changes. The system stack remains a supported fallback.
Dowel does not ship licensed Linear fonts.

```text
11px: micro metadata
12px: compact tabs and group labels
13px: navigation, menu, row, and control workhorse
15px: body and editor content
18px to 24px: dialog and page titles
```

The base workhorse weight is chosen by rendered testing across browsers, not by
copying one computed value. Use tabular numbers for timestamps and dense data
where it improves alignment.

### Spacing

Use a 2px base grid with named semantic roles. Common component gaps are 4, 6,
8, 12, 16, 20, and 24px. Product shells may use larger spacing, but their
internal controls stay on the same rhythm.

### Radius

```text
4px: key hints, compact chips
6px: editor and nested content blocks
8px: controls and navigation rows
10px: settings and data surfaces
12px: popovers and standard dialogs
full: pills, segmented choices, switches
```

Large composer shells may use a larger contextual radius. This is a shell
variant, not a new global default.

### Border and elevation

Use 0.5px hairlines where browsers render them cleanly, with a 1px fallback for
forced colors and environments that cannot preserve the line. Define three
elevation roles:

- raised control
- popover or picker
- modal or command surface

Each role combines a border with several low-opacity shadow layers. Do not let
individual components invent shadows.

### Motion

Ordinary control feedback uses approximately 120 to 160ms and transitions only
border, background color, color, and opacity. Spatial motion is reserved for
state changes that benefit from continuity, such as Drawer, Collapsible,
QuickView, and resizable workspace panels.

All motion has a reduced-motion path. No component uses `transition: all`.

## Styling architecture

StyleX 0.19 is the only component styling system. Component source uses
`stylex.create()`, themes use `stylex.defineVars()` and
`stylex.createTheme()`, and builds extract one static `dowel.css`.

Consumers do not need StyleX. They import compiled Dowel JavaScript and the
single CSS asset. Runtime injection is disabled. Public APIs do not expose the
StyleX `sx` prop.

The detailed compiler and distribution contract lives in
`docs/stylex-architecture.md`.

## Theme contract

`ThemeProvider` supports:

```ts
type DowelTheme = "light" | "dark" | "system";
```

It applies theme variables to its subtree, declares `color-scheme`, supports
nested themes, and avoids hydration flashes. The provider also accepts a
documented density setting when the component system has browser coverage for
both compact and comfortable modes.

Public theme customization is token-level, not per-component. It includes
semantic colors, fonts, density, and radius families. Layout and component
anatomy remain opinionated.

## Component API rules

- React 19 and TypeScript are the public platform.
- Prefer semantic props such as `variant`, `size`, `tone`, `loading`, and
  `disabled` over visual fragments.
- Use compound component APIs when consumers need to place meaningful content
  or control state.
- Controlled and uncontrolled forms follow the same naming across the catalog.
- Forward refs to the useful interaction element.
- Preserve native attributes except styling escape hatches.
- An icon-only control requires an accessible name.
- Destructive tone and disabled state are independent.
- Loading preserves control geometry and announces relevant state.
- Overlays expose open state and trigger composition without leaking their
  positioning engine.
- Product composites expose data and event contracts, not Linear domain types.

## Component scope

The target catalog is the 114 components in
`docs/component-inventory.md`: 94 foundation or primitive components and 20
product-grade composites.

Delivery is dependency ordered. A high count does not permit shallow
implementations. Each shipped component includes its complete state and
accessibility contract.

## Accessibility and internationalization

- WCAG 2.2 AA is the baseline.
- Keyboard behavior is tested in a real browser, not inferred from jsdom.
- Focus is always visible and survives high-contrast mode.
- Form errors are associated and announced.
- Overlays restore focus and handle escape consistently.
- Components use logical properties and support right-to-left layout.
- Dates, numbers, and relative time accept locale and time-zone inputs.
- Reduced motion and increased contrast preferences are respected.
- Touch targets can expand beyond visual bounds in comfortable density.

## Documentation contract

Every component page contains:

- purpose and when not to use it
- anatomy and named parts
- API reference
- default, variant, disabled, loading, empty, error, and overflow states as
  applicable
- keyboard interaction table
- accessibility notes
- dark, light, right-to-left, reduced-motion, and narrow-layout examples
- product composition examples for primitives

The docs app imports the built package and stylesheet. It must not rely on
source-only aliases that could hide a broken published package.

## Quality gates

A component is ready only when:

1. TypeScript and package builds pass.
2. Unit tests cover state and event contracts.
3. Browser tests cover keyboard and focus behavior.
4. Automated accessibility checks pass and manual interaction is reviewed.
5. Visual snapshots cover light, dark, interactive states, and overflow.
6. The package fixture consumes the built tarball without StyleX tooling.
7. The docs page satisfies the documentation contract.

## Brand boundary

Dowel may study proportions, hierarchy, interaction grammar, and density. It
must not ship Linear's logo, wordmark, icons, illustrations, proprietary fonts,
product copy, exact brand colors, source code, or an affiliation claim.

The README credits Linear as inspiration and states that Dowel is independent
and unendorsed.

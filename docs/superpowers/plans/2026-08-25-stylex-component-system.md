# StyleX component system implementation plan

**Date:** 2026-08-25

**Status:** ready for implementation
**Compatibility:** none required

## Goal

Replace the current plain CSS package with a precompiled StyleX component
system, then build the complete 114-component target catalog in dependency
order. Preserve no unreleased APIs unless they independently pass the new
design and accessibility contracts.

## Working rules

- Delete replaced code. Do not run plain CSS and StyleX component systems in
  parallel.
- Keep each pull request vertically complete and reviewable.
- Build package fixtures early so local workspace resolution cannot hide a
  broken npm artifact.
- Build product composites only after their primitive dependencies are stable.
- A phase completes through tests and docs, not through exports alone.
- Add no release changeset until an intentional first release candidate exists.

## Phase 0: compiler proof

Deliver a throwaway StyleX spike before migrating components.

1. Add `@stylexjs/stylex`, `@stylexjs/unplugin`, and the official ESLint plugin
   at one pinned compatible version.
2. Integrate the unplugin Rollup adapter into tsdown.
3. Compile one internal spike component using local variants, pseudo-classes,
   media queries, and a theme variable.
4. Disable runtime injection and normalize the extracted asset to
   `dist/dowel.css`.
5. Add Vite client, Vite SSR, and published-tarball fixture applications with
   no consumer-side StyleX plugin.
6. Assert that the output JavaScript contains neither source style objects nor
   `.stylex.ts` imports.
7. Measure production JavaScript and CSS output to create a size baseline.

Decision gate: if tsdown cannot reliably expose and name the StyleX CSS asset,
replace it with a direct Rollup or Vite library build. Do not create a custom
CSS extraction script around an unstable integration.

## Phase 1: teardown and foundation

1. Remove Lightning CSS, `build-css.mjs`, component CSS files, CSS import
   ordering tests, and old token stylesheets.
2. Remove the current eight public exports while the foundation is rebuilt.
3. Create named token variables in `tokens.stylex.ts`.
4. Create separately designed light and dark themes.
5. Implement `ThemeProvider` with light, dark, system, nested theme, SSR, and
   hydration coverage.
6. Implement Box, Flex, Grid, Stack, Text, Heading, Icon, VisuallyHidden, and
   ScrollArea.
7. Establish focus-ring, typography, surface, elevation, density, high
   contrast, reduced motion, and right-to-left shared contracts.
8. Update the docs shell to consume only built package output.

Exit gate: a static fixture renders the same foundation from the installed
tarball in client and SSR builds without a StyleX transform.

## Phase 2: actions and fields

Implement in this order:

1. Button and IconButton
2. ButtonGroup, SplitButton, Toggle, ToggleGroup, Toolbar
3. Label, Description, ErrorMessage, Field, Fieldset, Form
4. Input, SearchField, Textarea
5. Checkbox, CheckboxGroup, Radio, RadioGroup, Switch
6. NativeSelect
7. FileUpload
8. NumberField and Slider
9. DateField

Create one shared field anatomy and validation context. Do not repeat label,
description, error, disabled, required, and invalid logic in each control.

Exit gate: every field works controlled and uncontrolled where applicable,
submits native form values, associates messages correctly, and has touch plus
keyboard browser coverage.

## Phase 3: floating interaction foundation

1. Establish one floating surface, arrow, border, elevation, collision, and
   transition grammar.
2. Implement Tooltip, Popover, PreviewCard, Dialog, AlertDialog, and Drawer.
3. Implement Listbox with groups, disabled options, typeahead, multiselect, and
   a virtualization integration point.
4. Build Select, MultiSelect, Combobox, and Autocomplete on that foundation.
5. Implement Menu, ContextMenu, CascadingMenu, and ActionMenu.
6. Implement Toast with queue, pause, action, dismissal, and live-region rules.
7. Implement DatePicker and FuzzyDatePicker.
8. Assemble CommandMenu from Dialog, Combobox, Listbox, Kbd, and EmptyState.

Exit gate: escape, outside interaction, nested overlay, focus restoration,
scroll locking, collision, portal, and screen-reader behavior pass in Chromium,
Firefox, and WebKit.

## Phase 4: navigation and data display

1. Link, Breadcrumb, Tabs, SegmentedControl, Pagination
2. Sidebar, SidebarSection, NavItem
3. PageHeader and NavigationControls
4. Avatar, AvatarGroup, Badge, Tag, Status, PropertyPill, Kbd
5. Separator, Card, Callout, EmptyState, Skeleton, Spinner, Progress
6. DataList
7. List, ListRow, ListCell, GroupHeader
8. Table and ChartTooltip

List and Table must define selection, keyboard entry, truncation, sticky
regions, loading, empty, overflow, and responsive behavior. Do not treat them
as styled wrappers.

## Phase 5: workspace patterns

1. Accordion and Collapsible
2. Carousel
3. ResizablePanel and SplitPane
4. DetailsPane
5. FloatingPanel
6. QuickView

Use these to build a reference workspace that matches the audited hierarchy:
sidebar, page header, grouped list or board, details pane, and quick view. The
reference is a composition test, not a Linear clone.

## Phase 6: settings and view composites

1. SettingsShell
2. SettingsSection
3. SettingsRow
4. ThemeSelector
5. PropertyPicker
6. PropertyList
7. FilterBuilder
8. ViewOptions
9. MultiSelectToolbar
10. HoverActions

Build a complete settings reference and a complete searchable list reference.
Verify that all composites can consume application data without importing
Linear-shaped domain types.

## Phase 7: collaboration and content composites

1. Composer
2. RichTextEditor
3. EditorToolbar
4. AttachmentList
5. LinkPreview
6. ReactionPicker
7. Comment
8. CommentComposer
9. ActivityFeed
10. Board

Select an editor engine through a dedicated architecture decision. The public
RichTextEditor contract must not expose engine-specific node types unless Dowel
intentionally adopts that engine as public API.

Board drag and drop must have a keyboard path and application-controlled data
updates. Dowel supplies interaction and layout, not issue-specific state.

## Phase 8: hardening and first release candidate

1. Run automated accessibility checks over every docs route.
2. Manually audit the keyboard table for every interactive component.
3. Complete light, dark, system, high contrast, reduced motion, right-to-left,
   mobile, tablet, and desktop visual matrices.
4. Test React strict mode, SSR, streaming, hydration, and nested portals.
5. Test package installation in Vite, Next.js, and one non-Vite bundler without
   StyleX configuration.
6. Record component and full-catalog bundle sizes.
7. Review public exports for naming consistency and accidental internals.
8. Review licensing, attribution, font packaging, icons, and brand boundary.
9. Create the first release changeset only after the release candidate is
   intentionally approved.

## Pull request sequence

Keep the early architecture work isolated from the catalog build:

1. `maint: replace the styling and Linear research with StyleX`
2. `maint: prove the precompiled StyleX package pipeline`
3. `feat: rebuild the Dowel foundation with StyleX`
4. `feat: add actions and field components`
5. `feat: add overlays selection and command components`
6. `feat: add navigation and data display components`
7. `feat: add workspace and settings components`
8. `feat: add collaboration and content components`
9. `maint: harden the complete catalog for the first release`

Each title follows the repository convention and should be narrowed further if
a phase needs multiple reviewable pull requests.

## Required test layers

| Layer | Purpose |
| --- | --- |
| Type tests | public props, controlled state, polymorphism limits, ref targets |
| Unit tests | state transitions, events, form values, composition contracts |
| Browser interaction | focus, keyboard, pointer, touch, portals, selection |
| Accessibility | roles, names, relationships, live regions, high contrast |
| Visual regression | themes, variants, states, density, overflow, RTL |
| Package fixtures | installed artifact, CSS import, SSR, bundler compatibility |
| Output contract | extracted CSS, no runtime injection, no source style objects |

## Definition of complete

The program is complete when all 114 documented components meet their API,
interaction, accessibility, theme, responsive, package, and documentation
contracts. An export with one demo does not count as a completed component.

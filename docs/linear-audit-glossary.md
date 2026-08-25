# Linear UI audit

**Captured:** 2026-08-25

**Target:** authenticated `linear.app/customerio` workspace

**Viewport:** 1440 by 1000, dark workspace theme
**Method:** reins browser control, accessibility snapshots, computed styles,
network capture, and loaded JavaScript module inspection

## What this audit can prove

This is an audit of reusable UI visible in the authenticated Customer.io
workspace and the modules loaded while those surfaces were exercised. It is
not a claim to know Linear's private design-system catalog.

Evidence has three levels:

- **Rendered:** seen in the browser and inspected through accessibility or
  computed styles.
- **Loaded module:** a descriptive component chunk was present in the signed-in
  app bundle loaded for the audited routes.
- **Inferred pattern:** a recurring product composition whose public API is
  Dowel's design decision, not Linear's internal API.

The older 2026-08-09 audit treated one workspace's color theme as a universal
Linear rule and inferred mathematical intent from individual values. Those
claims are removed. Geometry and interaction patterns generalize better than
workspace colors.

## Executive findings

1. Linear's current web app is compiled with StyleX. Rendered nodes use
   generated `sx-*` classes, and loaded chunks include `Icon.stylex` and
   `mixins.stylex`.
2. The UI is a dense family of small primitives plus recurring application
   composites. A catalog of generic Base UI parts alone misses the valuable
   pieces such as property pickers, view options, command lists, settings rows,
   activity feeds, quick views, and multi-select actions.
3. The dominant compact control is still 28px. Menus use 32px options, issue
   rows use 44px, filter inputs use 36px, and the command search uses 40px.
4. Borders are visually quiet: mostly 0.5px hairlines paired with layered
   shadows on floating surfaces.
5. Current Linear has softened its global default palette and chrome, but the
   audited Customer.io workspace still resolves many neutral colors around LCH
   hue 272. This is theme-instance evidence, not a Dowel palette prescription.

## Surfaces audited

| Surface | Route or trigger | Reusable UI found |
| --- | --- | --- |
| My issues | `/customerio/my-issues/assigned` | sidebar, tabs, issue list, row actions, grouped content |
| Command menu | `Command+K` | modal, combobox, grouped listbox, options, shortcut hints |
| Create issue | sidebar create button | dialog, editor fields, property pills, file action, switch, submit actions |
| Status picker | create issue status trigger | popover, search field, listbox, status options |
| Display options | issue list display trigger | segmented tabs, select rows, display toggles, scroll area |
| Filter builder | issue list filter trigger | searchable cascading menu, grouped options, separators |
| Issue detail | issue route | editable title, rich document, comments, activity, reactions, details pane |
| Profile settings | `/settings/account/profile` | settings shell, input, upload, buttons, destructive action |
| Preferences | `/settings/account/preferences` | settings sections, rows, search, selects, switches, theme selector |

No data was created, edited, submitted, or deleted during the audit.

## Style system evidence

The loaded application exposed descriptive modules including:

```text
ActionMenu
Avatar
Button
DivButton
ElevatedPanel
Flex
Form
FuzzyDatePicker
Icon.stylex
IconButton
Input
ModalComponents
Popover
Select
SimpleActionMenu
Tabs
Text
Toast
Tooltip
```

Compiled button code showed these variants:

```text
primary
secondary
ghost
borderless
muted
dangerous-borderless
link
dangerous
circle
tab
```

It also exposed `small`, `medium`, `normal`, and `large` sizes plus icon,
right-aligned icon, caret, active, and stretched states. These names are useful
evidence about the range of the control, not an API to copy verbatim.

The loaded input module grouped Input, Textarea, native Select, Checkbox, and
Radio. Dowel may package those separately while sharing a field foundation.

## Typography

The audited workspace uses Inter Variable. The recurring text roles were:

| Role | Typical size | Weight | Use |
| --- | ---: | ---: | --- |
| micro | 11px | 500 | tertiary metadata and compact hints |
| compact | 12px | 500 | tabs and section labels |
| workhorse | 13px | 400 to 500 | navigation, menus, rows, controls |
| body | 15px | 400 to 450 | editor and description content |
| title | 18px to 24px | 500 to 600 | dialog and page headings |

The useful design lesson is the narrow role assignment. It is not necessary to
copy every measured weight. Dowel should preserve clear workhorse, body, and
title roles and test how Inter renders on each supported platform.

## Geometry

### Height rhythm

| Element | Measured height |
| --- | ---: |
| compact icon action | 24px |
| standard icon button | 28px |
| segmented tab | 28px |
| standard settings select | 30px |
| listbox or menu option | 32px |
| filter input | 36px |
| command combobox | 40px |
| issue list row | 44px |

### Shape rhythm

| Element | Measured shape |
| --- | --- |
| standard control | 8px radius |
| segmented tab and property pill | full pill |
| popover and command menu | 12px radius |
| create issue dialog | 22px radius |
| key hint and small chip | 4px radius |
| switch | full pill, 30 by 20px in settings |
| floating border | 0.5px hairline |

The 22px issue composer is a product shell, not a global modal radius. Dowel
should support shell-level radius composition instead of forcing it onto every
Dialog.

## Floating surfaces

### Popover and picker

The status picker measured roughly 207px wide and 370px tall. It used a 12px
radius, 0.5px border, three-layer shadow, 36px search area, and 32px options.
Each option used 13px text and asymmetric horizontal padding for icons and
selection marks.

The filter picker used the same floating grammar at about 207px wide and 706px
tall. It added grouped sections, separators, and nested navigation indicators.
This supports one shared picker shell with Listbox and CascadingMenu behaviors,
not independent visual implementations.

### Command menu

The command shell measured 720 by 450px with a 12px radius, 0.5px border, and a
deeper five-layer modal shadow. Its combobox was 708 by 40px. Results were
grouped and exposed listbox and option semantics with keyboard hints.

This is a composite made from Dialog, Combobox, grouped Listbox, Option, Kbd,
and EmptyState. Dowel should ship the composite because its keyboard and layout
contract are easy to get wrong when assembled repeatedly.

### Create issue shell

The create issue dialog measured about 749px wide with a 22px radius. It
contained:

- 24px team and property pills
- editable title and description surfaces
- status, priority, assignee, project, estimate, and label combobox triggers
- attachment and overflow actions
- a primary submit action
- a `Create more` switch

This validates PropertyPill, PropertyPicker, RichTextEditor, FileUpload, and
Dialog footer composition as catalog items.

## Navigation and workspace chrome

The workspace uses a compact Sidebar with 28px navigation rows, a page header,
segmented view tabs, icon actions, and grouped lists. Loaded product chunks also
included:

```text
ApplicationHeader
ArrowNavigation
ContentViewHeaderBreadcrumb
ContentViewHeaderInlineSearch
FavoriteStarWithAction
NavigationControls
PageHeaderViewOptions
```

These support Breadcrumb, InlineSearch, Favorite control, NavigationControls,
PageHeader, Sidebar, and ViewOptions as reusable patterns.

## Data and content patterns

Issue list and issue detail routes exposed or loaded the following recurring
modules:

```text
ActivityHistoryComponents
ActivitySidebarSection
Board
ChartTooltip
ColumnHeaders
Comment
CommentBody
CommentPopover
CommentThreadContainer
DetailsCollapsibleSection
DetailsPaneContainer
EmptyState
HoverActionRow
IssueList
ListCell
ListColumns
ListGroupDividerCell
LoadingPlaceholder
MultiSelectActions
QuickView
SplitView
SplitViewPanel
ViewEmptyState
```

Domain names such as IssueList should not become generic Dowel exports.
Reusable contracts extracted from them should: List, ListRow, ListCell,
ColumnHeader, GroupDivider, HoverActions, EmptyState, Skeleton, Board,
ChartTooltip, DetailsPane, SplitPane, QuickView, and MultiSelectToolbar.

The issue detail page also rendered editable textboxes, a rich comment
document, comment composer actions, activity entries, reactions, attachments,
subissue actions, subscribers, linked pull requests, and a property sidebar.
This supports ActivityFeed, CommentComposer, ReactionPicker, AttachmentList,
LinkPreview, PropertyList, and DetailsPane composites.

## Settings patterns

Profile and Preferences showed a stable settings grammar:

- persistent settings navigation with search
- page sections with title and description
- aligned label, explanation, and control rows
- 28px search input with 8px radius
- 30px select triggers with 8px radius and subtle inner hairline
- visually rendered switches at 30 by 20px
- file upload and destructive action rows
- theme selection controls

Dowel should ship SettingsShell, SettingsSection, and SettingsRow as layout and
accessibility contracts. They are not merely documentation examples.

## Color findings

The authenticated Customer.io workspace resolves many surfaces, borders, and
text colors in LCH around hue 272. The inspected accent includes Linear's own
brand colors. These values explain that one rendered theme only.

Linear's official March 2026 design refresh says its default interface moved
from cooler bluish tones toward warmer, less saturated gray, with a dimmer
sidebar, more compact rounded tabs, smaller icons, and fewer or softer borders.
The live workspace and official refresh are compatible because workspaces can
use different themes.

Dowel's design rules are therefore:

- copy no Linear brand color
- do not hard-code hue 272 as the neutral system
- build semantic surface, border, text, accent, danger, warning, and success
  tokens
- provide warm neutral light and dark defaults
- preserve low contrast chrome and clear content contrast
- validate colors for accessibility, not visual similarity alone

## Motion and interaction

Common controls transitioned border, background color, color, and opacity over
about 150ms. No evidence justifies a universal prohibition on spatial motion,
but ordinary hover states should remain restrained. Product transitions such
as drawers, collapsibles, and quick views may animate position when it explains
state change and respects reduced motion.

Keyboard behavior is central. The audited command menu, listboxes, comboboxes,
editable surfaces, and switches exposed semantic roles. Dowel should continue
to use accessible behavior primitives, then verify real browser focus,
selection, escape, arrow navigation, typeahead, and focus restoration.

## What Dowel should emulate

- dense but regular height and spacing rhythm
- quiet chrome with layered content hierarchy
- one shared floating-surface grammar
- compact icon and property controls
- keyboard-first command and picker patterns
- clear separation of primitive behavior and product-grade composites
- coherent settings, list, board, details, and quick-view layouts

## What Dowel should not copy

- Linear logos, wordmarks, icons, illustrations, or product copy
- exact accent or brand colors
- licensed fonts or proprietary assets
- private module names as public APIs
- Customer.io workspace-specific theme values
- speculative numerical theories based on individual computed values

## Sources

- [Linear: A calmer interface for a product in motion](https://linear.app/now/behind-the-latest-design-refresh)
- [Linear display options](https://linear.app/docs/display-options)
- [Linear board layout](https://linear.app/docs/board-layout)
- [Linear issue selection](https://linear.app/docs/select-issues)
- [Linear search](https://linear.app/docs/search)
- [Linear peek](https://linear.app/docs/peek)

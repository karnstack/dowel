# Dowel component inventory

**Date:** 2026-08-25

**Status:** target catalog
**Total:** 127 public components

## Build order

The catalog is a coverage target, not a queue. Components ship in product
slices so each new primitive immediately supports a recognizable SaaS surface.

1. **Core controls:** Tabs, SearchField, Checkbox, RadioGroup, Switch, Select,
   Popover, Separator, Avatar, Status, Spinner, Skeleton, and EmptyState.
2. **Dense collections:** List, ListRow, ListCell, GroupHeader, HoverActions,
   SegmentedControl, PageHeader, Breadcrumb, and MultiSelectToolbar.
3. **Command and filtering:** Combobox, Listbox, CommandMenu, FilterBuilder,
   ViewOptions, Toast, and AlertDialog.
4. **Workspace structure:** ResizablePanel, SplitPane, DetailsPane, QuickView,
   SettingsShell, SettingsSection, and SettingsRow.
5. **Collaboration:** RichTextEditor, EditorToolbar, Comment, CommentComposer,
   ActivityFeed, ReactionPicker, FileUpload, AttachmentList, and LinkPreview.
6. **Advanced data:** Board, DataTable, TreeView, Timeline, InsightPanel,
   DashboardGrid, charts, DatePicker, MultiSelect, Progress, and pagination.

Tabs is the first component in this sequence because it unlocks page headers,
settings navigation, detail panes, and view switching without depending on any
later composite.

## Sourcetown first-consumer priority

Sourcetown is the first external consumer. Its product plans narrow the broad
catalog into the following delivery order.

1. **Settings and onboarding:** Checkbox, CheckboxGroup, Radio, RadioGroup,
   Switch, SearchField, NativeSelect, Select, Callout, and AlertDialog. These
   cover identity setup, organization roles, repository defaults, protected
   branches, providers, workflow settings, and secrets metadata.
2. **Repository shell:** Combobox, Listbox, CommandMenu, Popover, Breadcrumb,
   PageHeader, Status, Avatar, Separator, and Drawer. These cover organization,
   repository, branch, and merge-request switching across desktop and narrow
   layouts.
3. **Repository data:** Skeleton, Spinner, Progress, EmptyState, List,
   ListRow, ListCell, GroupHeader, Table, SegmentedControl, and Pagination.
   Pierre owns code and tree rendering. Dowel owns the surrounding loading,
   navigation, metadata, branch, commit, search, and check surfaces.
4. **Review and CI:** Collapsible, ResizablePanel, SplitPane, DetailsPane,
   Toast, ActivityFeed, Comment, CommentComposer, RichTextEditor,
   EditorToolbar, and FileUpload. These support review threads, merge gates,
   run steps, live logs, artifacts, and manual dispatch.
5. **Reusable settings composites:** SettingsShell, SettingsSection,
   SettingsRow, DataList, and Form. Build these only after Sourcetown has used
   the underlying controls in at least two settings routes.

Git-specific pieces stay in Sourcetown: repository and ref pickers backed by
Git data, clone controls, continuity badges, merge-request state, review
threads, merge gates, checks, workflow runs, logs, and Pierre wrappers. Dowel
provides the generic interaction and layout contracts beneath them.

## How to read this catalog

The old 49-component list was mainly a Base UI checklist. This catalog combines
the authenticated Linear audit with the pieces required to make those patterns
usable as a coherent React system.

Evidence codes:

- `R`: rendered in the authenticated Linear audit
- `M`: descriptive module loaded by the audited Linear routes
- `P`: recurring product pattern inferred from rendered composition
- `D`: current official Linear documentation confirms the product pattern
- `C`: system-completeness component, not presented as Linear evidence

`R` and `M` say something about what was observed, not what Linear calls the
component internally. Public names and APIs belong to Dowel.

## Foundation and layout, 10

| Component | Evidence | Contract |
| --- | --- | --- |
| ThemeProvider | P | light, dark, system, nested theme, color scheme |
| Box | C | semantic element and constrained layout props |
| Flex | M | flex layout with gap, alignment, and wrapping |
| Grid | C | grid layout with constrained tracks and gap |
| Stack | P | vertical or horizontal rhythm composition |
| Text | M | semantic text roles and truncation |
| Heading | R | semantic heading levels with visual roles |
| Icon | M | accessible icon wrapper and sizing |
| VisuallyHidden | C | accessible hidden content |
| ScrollArea | R | styled viewport with native scrolling semantics |

## Actions, 7

| Component | Evidence | Contract |
| --- | --- | --- |
| Button | R, M | visual variants, sizes, loading, icons, destructive state |
| IconButton | R, M | compact icon action with required accessible name |
| ButtonGroup | R, P | attached actions and shared disabled state |
| SplitButton | P | primary action plus related action menu |
| Toggle | R | pressed and unpressed action |
| ToggleGroup | R | single or multiple compact choices |
| Toolbar | R, P | roving-focus action collection |

Copy and favorite actions are Button or IconButton compositions, not separate
primitives.

## Forms and selection, 26

| Component | Evidence | Contract |
| --- | --- | --- |
| Form | R, M | submission state and server or client validation wiring |
| Field | R, P | label, control, description, and error association |
| Fieldset | R | grouped controls with legend and disabled state |
| Label | R | explicit accessible control label |
| Description | R | field help text |
| ErrorMessage | P | field or form validation feedback |
| Input | R, M | text input sizes, adornments, invalid and disabled states |
| SearchField | R | clear action, search role, optional shortcut hint |
| Textarea | R, M | multiline input and optional auto growth |
| Checkbox | R, M | checked, unchecked, and indeterminate states |
| CheckboxGroup | P | labelled multi-choice group |
| Radio | M | selected and unselected choice |
| RadioGroup | P | labelled single-choice group with keyboard navigation |
| Switch | R | compact on and off setting |
| NativeSelect | M | native select with Dowel field styling |
| Select | R, M | trigger, popover, options, groups, and typeahead |
| MultiSelect | R, P | searchable selection with tags and count summary |
| Combobox | R | editable search plus listbox selection |
| Autocomplete | P | free-form value with suggestions |
| NumberField | C | stepper, locale-aware parsing, bounds |
| Slider | C | single or range value with keyboard support |
| DateField | C | segmented date entry |
| DatePicker | R, P | calendar selection in a popover |
| FuzzyDatePicker | M | natural-language or approximate date selection |
| FileUpload | R | file picker, drag target, progress, and errors |
| ColorPicker | R, P | swatches, custom value, preview, contrast, and clear action |

OTP fields remain excluded until a real product need appears. Component count
is not a feature by itself.

## Overlays and pickers, 13

| Component | Evidence | Contract |
| --- | --- | --- |
| Tooltip | M | delayed description with keyboard and pointer parity |
| Popover | R, M | anchored nonmodal floating content |
| PreviewCard | P | delayed rich preview for a link or entity |
| Menu | R | action menu with groups, checks, radio items, and submenus |
| ContextMenu | P | pointer and keyboard context actions |
| CascadingMenu | R, P | searchable nested choice navigation |
| ActionMenu | M | standard trigger plus Menu composition |
| CommandMenu | R | modal search, grouped commands, shortcuts, empty state |
| Listbox | R | selectable options, groups, active item, virtualization hook |
| Dialog | R | modal shell, focus trap, labelled content, footer composition |
| AlertDialog | P | destructive or consequential confirmation |
| Drawer | P | edge-attached modal or nonmodal panel |
| Toast | M | transient status queue with action and dismissal |

`Sheet` aliases Drawer and `HoverCard` aliases PreviewCard. Dowel ships one
name for each contract.

## Navigation, 11

| Component | Evidence | Contract |
| --- | --- | --- |
| Link | R | internal or external link states and icons |
| Breadcrumb | R, M | hierarchical location with collapsing |
| Tabs | R, M | content tabs with keyboard navigation |
| SegmentedControl | R | compact single-choice view switch |
| Pagination | C | page and cursor navigation |
| Sidebar | R | workspace navigation shell and collapsed state |
| SidebarSection | R | labelled, collapsible navigation group |
| NavItem | R | active, icon, badge, shortcut, and nested states |
| PageHeader | R, M | breadcrumb, title, views, and actions composition |
| NavigationControls | M | back, forward, history, and keyboard behavior |
| TreeView | R | nested rows, disclosure, guide lines, selection, and keyboard navigation |

Inline search is a SearchField composed into PageHeader, not another field
primitive.

## Data and display, 26

| Component | Evidence | Contract |
| --- | --- | --- |
| Avatar | R, M | image, initials fallback, shape, status |
| AvatarGroup | R, P | overlapping people with overflow summary |
| Badge | R | compact semantic count or category |
| Tag | R | removable or static labelled value |
| Status | R | icon, color, and accessible status name |
| PropertyPill | R | compact icon and value trigger |
| Kbd | R | keyboard shortcut token and sequence |
| Separator | R | semantic or decorative divider |
| Card | P | bounded content surface with interactive option |
| Callout | P | informational, warning, success, and danger notice |
| EmptyState | M | title, explanation, art slot, and action |
| Skeleton | M | reduced-motion-aware loading placeholder |
| Spinner | R | indeterminate progress |
| Progress | R | determinate task progress |
| Table | R, P | semantic table with density and sticky regions |
| DataList | R, P | label and value details list |
| List | R, M | grouped or flat application list |
| ListRow | R, M | selectable row with slots and interaction states |
| ListCell | M | constrained text, icon, avatar, and metadata cells |
| GroupHeader | R | sticky or static list section heading |
| ChartTooltip | M | data visualization hover or focus summary |
| MetricCard | D | metric, comparison, trend, loading, and drill-down action |
| BarChart | R, D | grouped or stacked bars, axes, legend, selection, and keyboard data access |
| ScatterPlot | D | points, percentile guides, zoom, selection, and accessible data fallback |
| BurnupChart | D | cumulative series, time interval, legend, and accessible data fallback |
| Timeline | R, D | time scale, grouped rows, ranges, milestones, dependencies, and zoom |

Meter is excluded because no audited use required a measurement distinct from
task progress.

## Disclosure and workspace, 8

| Component | Evidence | Contract |
| --- | --- | --- |
| Accordion | P | single or multiple disclosure group |
| Collapsible | R, M | one disclosure region |
| Carousel | M | scrollable paged content and controls |
| ResizablePanel | R, P | pointer and keyboard resize boundary |
| SplitPane | R, M | master and detail workspace layout |
| DetailsPane | R, M | property sidebar with responsive collapse |
| FloatingPanel | M | movable or anchored nonmodal utility panel |
| QuickView | M | temporary detail view without navigation loss |

## Product-grade composites, 26

These are first-class components, not copy-paste examples. They compose the
primitives above and own higher-level keyboard, responsive, and accessibility
contracts.

| Component | Evidence | Contract |
| --- | --- | --- |
| SettingsShell | R, P | searchable settings navigation and content layout |
| SettingsSection | R, P | heading, description, grouped rows |
| SettingsRow | R, P | label, help, control, action, destructive state |
| ThemeSelector | R, P | light, dark, system, and visual theme choice |
| Composer | R, P | creation shell, borderless editing, properties, and actions |
| FilterBuilder | R, P | searchable nested filters, values, and active summary |
| ViewOptions | R, M | layout, grouping, ordering, visibility, and filters |
| PropertyPicker | R, P | property search, options, create or clear actions |
| PropertyList | R, P | editable entity properties in a details pane |
| ActivityFeed | R, M | chronological events, grouping, actor, timestamp |
| Comment | R, M | author, body, reactions, edit, resolve, and actions |
| CommentComposer | R, P | rich input, attachments, mention, submit state |
| RichTextEditor | R, M | editable document, commands, placeholder, read-only mode |
| EditorToolbar | R, P | formatting actions, overflow, shortcut help |
| ReactionPicker | R, P | emoji selection and existing reaction state |
| AttachmentList | R, P | upload, preview, progress, open, and remove |
| LinkPreview | R, P | external or product entity summary |
| MultiSelectToolbar | R, M | selection count and batch actions |
| Board | R, M | grouped columns, cards, drag affordance, empty columns |
| HoverActions | R, M | actions revealed by row focus or hover |
| DataTable | R, D | TanStack-powered sorting, resizing, selection, pinning, virtualization, and density |
| FilterBar | R, D | active filter chips, saved filters, visibility, reset, and overflow |
| InsightPanel | R, D | measure, slice, segment, chart, table, filters, and full-screen mode |
| DashboardGrid | R, D | responsive metric, chart, and table panels with independent filters |
| NotificationFeed | R, D | keyboard-navigable notifications, read state, actions, search, and detail pane |
| UpdateCard | R, D | health, author, timestamp, rich update, reactions, comments, and actions |

## Components that stay internal

Focus guards, positioning arrows, portals, collection registries, transition
presence, slot cloning, and visually generated selection indicators are
implementation details. They can have modules and tests without becoming
public exports.

## Catalog rules

1. Every public component gets a docs route, keyboard table, anatomy diagram,
   states matrix, and browser visual coverage.
2. A component is not complete when only its happy-path demo exists. Disabled,
   loading, empty, error, overflow, high contrast, reduced motion, right-to-left,
   touch, and narrow viewport cases are part of the contract where relevant.
3. Product composites may depend on primitives but primitives never depend on
   product composites.
4. Similar names do not justify duplicate APIs. Aliases listed in this document
   are documentation terms only.
5. Domain objects such as Issue, Project, Initiative, or Cycle are not Dowel
   components. Dowel provides the reusable layout and interaction patterns
   beneath them.

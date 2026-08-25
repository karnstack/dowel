import type { LinkProps } from "@tanstack/react-router";

/**
 * `to` is the router's own union of known paths, not `string`, so a typo in
 * this table is a typecheck failure rather than a dead link discovered in a
 * screenshot. It is also what the prerender crawler follows: every page the
 * build must emit is reachable from the sidebar, so adding an entry here is
 * the only step needed to get a route prerendered.
 */
export type NavItem = {
  title: string;
  to: LinkProps["to"];
  /** One line, shown on the components index and in component search. */
  summary: string;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const componentNav: NavItem[] = [
  {
    title: "Accordion",
    to: "/components/accordion",
    summary: "A keyboard-accessible group of animated disclosure panels.",
  },
  {
    title: "Alert Dialog",
    to: "/components/alert-dialog",
    summary: "A focused confirmation modal for consequential actions.",
  },
  {
    title: "Avatar",
    to: "/components/avatar",
    summary: "An image or initials fallback with shape, size, and presence.",
  },
  {
    title: "Badge",
    to: "/components/badge",
    summary: "A compact status or metadata pill in five tones.",
  },
  {
    title: "Breadcrumbs",
    to: "/components/breadcrumbs",
    summary: "A compact location trail with automatic middle-item elision.",
  },
  {
    title: "Button",
    to: "/components/button",
    summary: "The default action control. Five hierarchy levels, two sizes.",
  },
  {
    title: "Calendar & Date Picker",
    to: "/components/calendar",
    summary: "An internationalized month grid and segmented date field.",
  },
  {
    title: "Callout",
    to: "/components/callout",
    summary: "Persistent contextual guidance with optional actions and tone.",
  },
  {
    title: "Checkbox",
    to: "/components/checkbox",
    summary: "Checked, unchecked, and mixed selection with native form values.",
  },
  {
    title: "Collapsible",
    to: "/components/collapsible",
    summary: "An animated disclosure for one optional content region.",
  },
  {
    title: "Combobox",
    to: "/components/combobox",
    summary: "A filterable single-choice field for larger collections.",
  },
  {
    title: "Command Menu",
    to: "/components/command-menu",
    summary: "A modal search surface for grouped application commands.",
  },
  {
    title: "Composer",
    to: "/components/composer",
    summary: "A borderless creation shell with metadata and action regions.",
  },
  {
    title: "Context Menu",
    to: "/components/context-menu",
    summary: "A pointer-positioned menu for actions on a target surface.",
  },
  {
    title: "Data Table",
    to: "/components/data-table",
    summary: "A borderless, sortable, selectable, and resizable data table.",
  },
  {
    title: "Dialog",
    to: "/components/dialog",
    summary: "A modal on the modal elevation tier, labelled by its title.",
  },
  {
    title: "Drawer",
    to: "/components/drawer",
    summary: "A swipe-dismissable edge panel for navigation and detail.",
  },
  {
    title: "Empty State",
    to: "/components/empty-state",
    summary: "Structured guidance and actions for a surface without content.",
  },
  {
    title: "File Upload",
    to: "/components/file-upload",
    summary: "A native file picker and dropzone with built-in validation.",
  },
  {
    title: "Icon Button",
    to: "/components/icon-button",
    summary: "A square control for a single icon, with a required label.",
  },
  {
    title: "Input",
    to: "/components/input",
    summary: "Surface and borderless fields for settings and rich composers.",
  },
  {
    title: "Kbd",
    to: "/components/kbd",
    summary: "A keyboard shortcut rendered one key per cap.",
  },
  {
    title: "List",
    to: "/components/list",
    summary: "Semantic grouped rows with cells, density, and selection.",
  },
  {
    title: "Menu",
    to: "/components/menu",
    summary: "A dropdown with keyboard navigation and typeahead.",
  },
  {
    title: "Native Select",
    to: "/components/native-select",
    summary: "A resilient native choice control with Dowel field styling.",
  },
  {
    title: "Pagination",
    to: "/components/pagination",
    summary: "Controlled page navigation with compact number elision.",
  },
  {
    title: "Popover",
    to: "/components/popover",
    summary: "An anchored surface for interactive controls and rich details.",
  },
  {
    title: "Property Picker",
    to: "/components/property-picker",
    summary:
      "Searchable grouped metadata selection with a compact pill trigger.",
  },
  {
    title: "Progress",
    to: "/components/progress",
    summary: "Determinate and indeterminate progress for long tasks.",
  },
  {
    title: "Radio Group",
    to: "/components/radio-group",
    summary: "A single-choice group with native forms and arrow-key selection.",
  },
  {
    title: "Search Field",
    to: "/components/search-field",
    summary: "A search input with icon, clear action, and shortcut hint.",
  },
  {
    title: "Separator",
    to: "/components/separator",
    summary: "A quiet horizontal or vertical content divider.",
  },
  {
    title: "Select",
    to: "/components/select",
    summary: "A grouped single-choice popup with native form submission.",
  },
  {
    title: "Sidebar",
    to: "/components/sidebar",
    summary: "A responsive application rail with pointer and keyboard resize.",
  },
  {
    title: "Slider",
    to: "/components/slider",
    summary: "A pointer and keyboard control for a numeric range.",
  },
  {
    title: "Skeleton",
    to: "/components/skeleton",
    summary: "Reduced-motion-aware placeholders for pending content.",
  },
  {
    title: "Spinner",
    to: "/components/spinner",
    summary: "Accessible indeterminate progress in three compact sizes.",
  },
  {
    title: "Status",
    to: "/components/status",
    summary: "A lightweight state icon and label in semantic tones.",
  },
  {
    title: "Switch",
    to: "/components/switch",
    summary: "A compact immediate setting for binary on and off state.",
  },
  {
    title: "Tabs",
    to: "/components/tabs",
    summary: "Compact pill and line view switching with arrow-key activation.",
  },
  {
    title: "Toast",
    to: "/components/toast",
    summary: "A global notification queue with actions and promises.",
  },
  {
    title: "Toggle Group",
    to: "/components/toggle-group",
    summary: "A connected set of independently pressed view controls.",
  },
  {
    title: "Tooltip",
    to: "/components/tooltip",
    summary: "A hover and focus label on the popover elevation tier.",
  },
  {
    title: "Tree View",
    to: "/components/tree-view",
    summary: "A nested hierarchy with selection and keyboard navigation.",
  },
];

function components(...paths: NavItem["to"][]): NavItem[] {
  return paths.map((path) => {
    const item = componentNav.find((candidate) => candidate.to === path);
    if (!item) throw new Error(`Missing component navigation item: ${path}`);
    return item;
  });
}

export const componentSections: NavSection[] = [
  {
    title: "Actions",
    items: components(
      "/components/button",
      "/components/icon-button",
      "/components/toggle-group",
    ),
  },
  {
    title: "Forms and selection",
    items: components(
      "/components/checkbox",
      "/components/calendar",
      "/components/combobox",
      "/components/file-upload",
      "/components/input",
      "/components/native-select",
      "/components/property-picker",
      "/components/radio-group",
      "/components/search-field",
      "/components/select",
      "/components/slider",
      "/components/switch",
    ),
  },
  {
    title: "Navigation",
    items: components(
      "/components/breadcrumbs",
      "/components/command-menu",
      "/components/pagination",
      "/components/sidebar",
      "/components/tabs",
      "/components/tree-view",
    ),
  },
  {
    title: "Overlays",
    items: components(
      "/components/alert-dialog",
      "/components/context-menu",
      "/components/dialog",
      "/components/drawer",
      "/components/menu",
      "/components/popover",
      "/components/tooltip",
    ),
  },
  {
    title: "Data and display",
    items: components(
      "/components/accordion",
      "/components/avatar",
      "/components/badge",
      "/components/collapsible",
      "/components/data-table",
      "/components/kbd",
      "/components/list",
      "/components/separator",
      "/components/status",
    ),
  },
  {
    title: "Feedback",
    items: components(
      "/components/callout",
      "/components/empty-state",
      "/components/progress",
      "/components/skeleton",
      "/components/spinner",
      "/components/toast",
    ),
  },
  {
    title: "Composites",
    items: components("/components/composer"),
  },
];

export const nav: NavSection[] = [
  {
    title: "Library",
    items: [
      {
        title: "All components",
        to: "/components",
        summary: "Everything the package exports, in one list.",
      },
      {
        title: "Dependencies",
        to: "/dependencies",
        summary: "What Dowel installs, expects, and leaves to the application.",
      },
    ],
  },
  ...componentSections,
];

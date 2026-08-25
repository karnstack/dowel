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
    title: "Button",
    to: "/components/button",
    summary: "The default action control. Five hierarchy levels, two sizes.",
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
    title: "Composer",
    to: "/components/composer",
    summary: "A borderless creation shell with metadata and action regions.",
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
    title: "Empty State",
    to: "/components/empty-state",
    summary: "Structured guidance and actions for a surface without content.",
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
    title: "Tooltip",
    to: "/components/tooltip",
    summary: "A hover and focus label on the popover elevation tier.",
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
  { title: "Components", items: componentNav },
];

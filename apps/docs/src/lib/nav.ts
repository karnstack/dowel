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
  /** One line, shown on the components index and the landing grid. */
  summary: string;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const componentNav: NavItem[] = [
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
    title: "Composer",
    to: "/components/composer",
    summary: "A borderless creation shell with metadata and action regions.",
  },
  {
    title: "Dialog",
    to: "/components/dialog",
    summary: "A modal on the modal elevation tier, labelled by its title.",
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
    title: "Property Picker",
    to: "/components/property-picker",
    summary:
      "Searchable grouped metadata selection with a compact pill trigger.",
  },
  {
    title: "Tooltip",
    to: "/components/tooltip",
    summary: "A hover and focus label on the popover elevation tier.",
  },
];

export const nav: NavSection[] = [
  {
    title: "Getting started",
    items: [
      {
        title: "Introduction",
        to: "/",
        summary: "What dowel is, and what it refuses to be.",
      },
      {
        title: "All components",
        to: "/components",
        summary: "Everything the package exports, in one list.",
      },
    ],
  },
  { title: "Components", items: componentNav },
];

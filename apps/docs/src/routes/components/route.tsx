import { Outlet, createFileRoute } from "@tanstack/react-router";

import { SidebarNav } from "../../components/sidebar-nav";

/**
 * A layout route, so the sidebar is mounted once for the whole `/components`
 * subtree instead of re-rendering per page. That is what lets the sidebar
 * keep its scroll position when you move between components.
 */
export const Route = createFileRoute("/components")({
  component: ComponentsLayout,
});

function ComponentsLayout() {
  return (
    <div className="docs-shell">
      <aside className="docs-sidebar">
        <div className="docs-sidebar-inner">
          <SidebarNav />
        </div>
      </aside>
      {/* The page supplies two grid cells: the content column and the table
          of contents. See DocsPage. */}
      <Outlet />
    </div>
  );
}

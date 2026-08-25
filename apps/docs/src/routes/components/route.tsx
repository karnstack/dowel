import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "dowel";

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
      <Sidebar.Root
        defaultWidth={224}
        minWidth={192}
        maxWidth={304}
        stickyOffset="var(--docs-header-h)"
      >
        <Sidebar.Panel aria-label="Component navigation">
          <Sidebar.Body>
            <div className="docs-sidebar-inner">
              <SidebarNav />
            </div>
          </Sidebar.Body>
        </Sidebar.Panel>
        <Sidebar.ResizeHandle aria-label="Resize component navigation" />
        <Sidebar.Content>
          <div className="docs-shell-content">
            {/* The page supplies two grid cells: the content column and the
                table of contents. See DocsPage. */}
            <Outlet />
          </div>
        </Sidebar.Content>
      </Sidebar.Root>
    </div>
  );
}

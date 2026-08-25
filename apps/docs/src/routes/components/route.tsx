import {
  Link,
  Outlet,
  createFileRoute,
  useRouterState,
} from "@tanstack/react-router";
import { IconButton, Sidebar, Tooltip } from "dowel";

import {
  SearchTrigger,
  ThemeToggle,
  Wordmark,
} from "../../components/docs-chrome";
import { useDocs } from "../../components/docs-context";
import {
  CloseIcon,
  GitHubIcon,
  MenuIcon,
  SearchIcon,
} from "../../components/icons";
import { SidebarNav } from "../../components/sidebar-nav";
import { componentNav } from "../../lib/nav";
import { versionLabel } from "../../lib/version";

const REPO = "https://github.com/karnstack/dowel";

export const Route = createFileRoute("/components")({
  component: ComponentsLayout,
});

function RepositoryLink() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        render={
          <IconButton
            label="dowel on GitHub"
            nativeButton={false}
            size="sm"
            render={<a href={REPO} target="_blank" rel="noreferrer noopener" />}
          >
            <GitHubIcon />
          </IconButton>
        }
      />
      <Tooltip.Portal>
        <Tooltip.Positioner>
          <Tooltip.Popup>GitHub</Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

function WorkspaceTitle() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const current = componentNav.find((item) => item.to === pathname);
  return (
    <span className="docs-workspace-title">
      {current?.title ?? "Components"}
    </span>
  );
}

function ComponentsLayout() {
  const { navOpen, openSearch, setNavOpen, theme, toggleTheme } = useDocs();

  return (
    <div className="docs-shell">
      <Sidebar.Root defaultWidth={232} minWidth={208} maxWidth={304}>
        <Sidebar.Panel aria-label="Component navigation">
          <Sidebar.Header>
            <Link to="/" aria-label="Homepage" className="docs-brand">
              <Wordmark />
            </Link>
          </Sidebar.Header>

          <Sidebar.Body>
            <SidebarNav />
          </Sidebar.Body>
        </Sidebar.Panel>

        <Sidebar.ResizeHandle aria-label="Resize component navigation" />

        <Sidebar.Content
          style={{
            margin: 0,
            borderColor: "transparent",
            borderRadius: 0,
            background: "var(--dowel-bg-1)",
          }}
        >
          <div className="docs-mobile-bar">
            <IconButton
              label={navOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={navOpen}
              aria-controls="docs-mobile-nav"
              onClick={() => setNavOpen(!navOpen)}
            >
              {navOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>

            <Link to="/" aria-label="Homepage" className="docs-brand">
              <Wordmark />
            </Link>

            <div className="docs-mobile-actions">
              <IconButton label="Search components" onClick={openSearch}>
                <SearchIcon />
              </IconButton>
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
            </div>
          </div>

          <div className="docs-mobile-nav" id="docs-mobile-nav">
            <SidebarNav onNavigate={() => setNavOpen(false)} />
          </div>

          <div className="docs-workspace-bar">
            <WorkspaceTitle />
            <div className="docs-workspace-search">
              <SearchTrigger size="sm" onClick={openSearch} />
            </div>
          </div>

          <div className="docs-shell-scroll">
            <div className="docs-shell-content">
              <Outlet />
            </div>
          </div>

          <footer className="docs-workspace-footer">
            <span className="docs-workspace-credit">
              Made by{" "}
              <a
                href="https://x.com/gyankarn"
                target="_blank"
                rel="noreferrer noopener"
              >
                karn
              </a>{" "}
              and a few AI agents
            </span>
            <div className="docs-workspace-actions">
              <RepositoryLink />
              <ThemeToggle theme={theme} size="sm" onToggle={toggleTheme} />
              <abbr
                className="docs-workspace-a11y"
                title="WCAG 2.2 Level AA color contrast"
              >
                WCAG 2.2 AA
              </abbr>
              <span className="docs-workspace-version">{versionLabel}</span>
            </div>
          </footer>
        </Sidebar.Content>
      </Sidebar.Root>
    </div>
  );
}

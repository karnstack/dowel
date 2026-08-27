import { Link, useRouterState } from "@tanstack/react-router";
import { Drawer, IconButton, Sidebar, Tooltip } from "@karnstack/dowel";
import type { ReactNode } from "react";

import { SearchTrigger, ThemeToggle, Wordmark } from "./docs-chrome";
import { useDocs } from "./docs-context";
import { CloseIcon, GitHubIcon, MenuIcon, SearchIcon } from "./icons";
import { SidebarNav } from "./sidebar-nav";
import { nav } from "../lib/nav";
import { versionLabel } from "../lib/version";

const REPO = "https://github.com/karnstack/dowel";

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
  const current = nav
    .flatMap((section) => section.items)
    .find((item) => item.to === pathname);

  return (
    <span className="docs-workspace-title">{current?.title ?? "Dowel"}</span>
  );
}

export function DocsShell({ children }: { children: ReactNode }) {
  const { navOpen, openSearch, setNavOpen, theme, toggleTheme } = useDocs();

  return (
    <div className="docs-shell">
      <Sidebar.Root defaultWidth={232} minWidth={208} maxWidth={304}>
        <Sidebar.Panel aria-label="Documentation navigation">
          <Sidebar.Header>
            <Link to="/" aria-label="Homepage" className="docs-brand">
              <Wordmark />
            </Link>
          </Sidebar.Header>

          <Sidebar.Body>
            <SidebarNav />
          </Sidebar.Body>
        </Sidebar.Panel>

        <Sidebar.ResizeHandle aria-label="Resize documentation navigation" />

        <Sidebar.Content
          style={{
            margin: 0,
            borderColor: "transparent",
            borderRadius: 0,
            background: "var(--dowel-bg-1)",
          }}
        >
          <Drawer.Root open={navOpen} onOpenChange={setNavOpen} side="left">
            <div className="docs-mobile-bar">
              <Drawer.Trigger
                render={
                  <IconButton label="Open navigation">
                    <MenuIcon />
                  </IconButton>
                }
              />

              <Link to="/" aria-label="Homepage" className="docs-brand">
                <Wordmark />
              </Link>

              <div className="docs-mobile-actions">
                <IconButton label="Search documentation" onClick={openSearch}>
                  <SearchIcon />
                </IconButton>
                <ThemeToggle theme={theme} onToggle={toggleTheme} />
              </div>
            </div>

            <Drawer.Portal>
              <Drawer.Backdrop />
              <Drawer.Viewport>
                <Drawer.Popup>
                  <Drawer.Content>
                    <Drawer.Header>
                      <div className="docs-mobile-drawer-heading">
                        <Drawer.Title>Documentation</Drawer.Title>
                        <Drawer.Close
                          render={
                            <IconButton label="Close navigation">
                              <CloseIcon />
                            </IconButton>
                          }
                        />
                      </div>
                      <SearchTrigger
                        onClick={() => {
                          setNavOpen(false);
                          openSearch();
                        }}
                      />
                    </Drawer.Header>
                    <Drawer.Body>
                      <SidebarNav
                        collapseInactive
                        onNavigate={() => setNavOpen(false)}
                      />
                    </Drawer.Body>
                  </Drawer.Content>
                </Drawer.Popup>
              </Drawer.Viewport>
            </Drawer.Portal>
          </Drawer.Root>

          <div className="docs-workspace-bar">
            <WorkspaceTitle />
            <div className="docs-workspace-search">
              <SearchTrigger size="sm" onClick={openSearch} />
            </div>
          </div>

          <div className="docs-shell-scroll">
            <div className="docs-shell-content">{children}</div>
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

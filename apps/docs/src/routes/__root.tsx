import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { Badge, IconButton, Kbd, Tooltip } from "dowel";
import { useCallback, useEffect, useState } from "react";

import {
  CloseIcon,
  GitHubIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
} from "../components/icons";
import { SidebarNav } from "../components/sidebar-nav";

// The docs self-host Inter; dowel itself ships no typeface, it only names
// "Inter Variable" first in --dowel-font.
import "@fontsource-variable/inter";
import "dowel/dowel.css";
import "../docs.css";

const REPO = "https://github.com/karnstack/dowel";

/** The bare key that flips the theme. Matched case-insensitively. */
const THEME_KEY = "d";

/**
 * True when the keystroke belongs to something the user is typing into. The
 * docs are full of live Input and Field demos, so a bare-letter shortcut has
 * to yield to them or it eats characters. `isContentEditable` is computed
 * rather than read off the attribute, so it is also true for a node nested
 * inside an editing host.
 */
function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}

/**
 * True while a Dialog or Menu is open. An open overlay is its own keyboard
 * context: Menu spends bare letters on typeahead, and a shortcut firing
 * under a modal would restyle a page the user cannot see. Base UI carries
 * `data-open` on the popup for exactly as long as it is open — it is gone
 * again during the closing animation — so the attribute is the honest
 * signal where the popup merely being in the DOM is not.
 */
function isOverlayOpen() {
  return (
    document.querySelector(
      '[role="dialog"][data-open], [role="alertdialog"][data-open], [role="menu"][data-open]',
    ) !== null
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "dowel — an opinionated React component library" },
      {
        name: "description",
        content:
          "dowel is an opinionated React component library. One look, well made.",
      },
    ],
    // Declared on the root route so every prerendered page carries them.
    // The order is the one browsers resolve best from: the ICO first for the
    // ones that only read ICO, then the SVG, which anything modern prefers
    // and which is the only file that follows the OS colour scheme. The
    // assets themselves are static, so they live in public/ and are served
    // from the site root. See public/icon.svg for the mark.
    links: [
      { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
      { rel: "icon", href: "/icon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  component: RootDocument,
});

/** A dowel: the small turned pin that joins two pieces of wood. */
function Wordmark() {
  return (
    <span className="docs-wordmark">
      <svg
        className="docs-mark"
        aria-hidden="true"
        width="18"
        height="18"
        viewBox="0 0 16 16"
      >
        <rect
          x="6"
          y="1"
          width="4"
          height="14"
          rx="2"
          transform="rotate(-32 8 8)"
          fill="currentColor"
        />
      </svg>
      dowel
    </span>
  );
}

function ThemeToggle({
  theme,
  onToggle,
}: {
  theme: "light" | "dark" | null;
  onToggle: () => void;
}) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        render={
          // The label does not name the target mode: until the toggle has
          // been pressed the theme is whatever the OS says, and the server
          // cannot know which that is. "Toggle theme" is true in every state.
          <IconButton label="Toggle theme" onClick={onToggle}>
            {/* Both icons ship; CSS shows the one matching the resolved
                theme. That keeps the prerendered markup correct under either
                OS setting, which a JS-chosen icon could not be. */}
            <span className="docs-theme-icon" data-icon="sun">
              <SunIcon />
            </span>
            <span className="docs-theme-icon" data-icon="moon">
              <MoonIcon />
            </span>
          </IconButton>
        }
      />
      <Tooltip.Portal>
        <Tooltip.Positioner>
          <Tooltip.Popup>
            {/* The shortcut is advertised where the control already
                explains itself, rather than as a second thing in the
                header. Kbd carries no className, so the row is a span
                the docs own. */}
            <span className="docs-tooltip-hint">
              {theme === null ? "Theme: system" : `Theme: ${theme}`}
              <Kbd keys={["D"]} />
            </span>
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

function RootDocument() {
  // `null` means "no explicit choice": the attribute is left off <html> and
  // dowel's prefers-color-scheme rule decides. That is both the better
  // default and the hydration-safe one — the server cannot read the OS
  // setting, so the only initial value that always matches the client is the
  // one that asserts nothing.
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  const [navOpen, setNavOpen] = useState(false);

  // The media query is read outside the updater so the updater stays pure,
  // which leaves the toggle depending on nothing: the keydown listener below
  // is attached once instead of being torn down and rebound on every flip.
  const toggleTheme = useCallback(() => {
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setTheme((current) => {
      const resolved = current ?? (systemDark ? "dark" : "light");
      return resolved === "dark" ? "light" : "dark";
    });
  }, []);

  // `D` toggles the theme. The listener lives in an effect so it only ever
  // exists in the browser — the site is prerendered, and there is no
  // document to listen on while the HTML is being generated.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      // Bare `D` only. A held Meta/Ctrl/Alt means the user is reaching for a
      // browser or OS shortcut and this must never shadow one. Shift is not
      // in the list: it is how a capital D gets typed.
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key.toLowerCase() !== THEME_KEY) return;
      // Someone closer to the keystroke already claimed it.
      if (event.defaultPrevented) return;
      if (isTypingTarget(event.target) || isOverlayOpen()) return;
      toggleTheme();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [toggleTheme]);

  return (
    // The theme hooks onto <html> rather than a wrapper div so the page
    // background reaches the viewport edges instead of stopping at the
    // content box. On :root the attribute also wins over the
    // prefers-color-scheme rule, which is guarded with
    // :not([data-dowel-theme="light"]).
    <html
      lang="en"
      className="dowel-root"
      data-dowel-theme={theme ?? undefined}
      data-nav-open={navOpen ? "" : undefined}
    >
      <head>
        <HeadContent />
      </head>
      <body>
        {/*
          Tooltip.Provider belongs once at the app root: it is what lets
          adjacent tooltips share a single delay, so the second one a pointer
          reaches opens instantly instead of waiting again.
        */}
        <Tooltip.Provider>
          <header className="docs-header">
            <div className="docs-header-inner">
              <div className="docs-header-mobile">
                <IconButton
                  label={navOpen ? "Close navigation" : "Open navigation"}
                  aria-expanded={navOpen}
                  aria-controls="docs-mobile-nav"
                  onClick={() => setNavOpen((open) => !open)}
                >
                  {navOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
              </div>

              <Link to="/" aria-label="Homepage" className="docs-brand">
                <Wordmark />
              </Link>
              <Badge tone="accent">v0.1.0</Badge>

              <nav className="docs-header-nav" aria-label="Main">
                <Link to="/">Introduction</Link>
                <Link to="/components">Components</Link>
              </nav>

              <div className="docs-header-end">
                <Tooltip.Root>
                  <Tooltip.Trigger
                    render={
                      <IconButton
                        label="dowel on GitHub"
                        nativeButton={false}
                        render={
                          <a
                            href={REPO}
                            target="_blank"
                            rel="noreferrer noopener"
                          />
                        }
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

                <ThemeToggle theme={theme} onToggle={toggleTheme} />
              </div>
            </div>

            {/* The mobile disclosure. It is always in the DOM so the
                aria-controls reference always resolves; CSS hides it when
                the header's toggle is not expanded. */}
            <div className="docs-mobile-nav" id="docs-mobile-nav">
              <SidebarNav onNavigate={() => setNavOpen(false)} />
            </div>
          </header>

          <Outlet />
        </Tooltip.Provider>
        <Scripts />
      </body>
    </html>
  );
}

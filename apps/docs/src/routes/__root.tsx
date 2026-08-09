import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { IconButton, Tooltip } from "dowel";
import { useState } from "react";

// The docs self-host Inter; dowel itself ships no typeface, it only names
// "Inter Variable" first in --dowel-font.
import "@fontsource-variable/inter";
import "dowel/dowel.css";
import "../docs.css";

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
  }),
  component: RootDocument,
});

// Icons are the docs' own, not dowel's — dowel ships components, not an icon
// set. Each shows the mode the button switches TO.
const SunIcon = () => (
  <svg
    aria-hidden="true"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
  >
    <circle cx="7" cy="7" r="2.75" />
    <path d="M7 .75v1.5M7 11.75v1.5M13.25 7h-1.5M2.25 7H.75M11.42 2.58l-1.06 1.06M3.64 10.36l-1.06 1.06M11.42 11.42l-1.06-1.06M3.64 3.64 2.58 2.58" />
  </svg>
);

const MoonIcon = () => (
  <svg
    aria-hidden="true"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinejoin="round"
  >
    <path d="M12.1 8.62A5.4 5.4 0 0 1 5.38 1.9a5.5 5.5 0 1 0 6.72 6.72Z" />
  </svg>
);

function RootDocument() {
  // Purely declarative: React owns the attribute on <html>, so the toggle
  // touches no DOM API and the prerender never reads `document`. The initial
  // value is a constant, so the prerendered markup and the first client render
  // agree and hydration is clean.
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const next = theme === "dark" ? "light" : "dark";

  return (
    // The theme hooks onto <html> rather than a wrapper div so the page
    // background reaches the viewport edges instead of stopping at the
    // content box. On :root the attribute also wins over the
    // prefers-color-scheme rule, which is guarded with
    // :not([data-dowel-theme="light"]).
    <html lang="en" className="dowel-root" data-dowel-theme={theme}>
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
          <nav className="docs-nav">
            <Link to="/">dowel</Link>
            <Link to="/components/button">Button</Link>
            <Link to="/components/tooltip">Tooltip</Link>
            {/* dowel components take no className, so the layout hook is a
                wrapper the docs own. */}
            <div className="docs-nav-end">
              <IconButton
                label={`Switch to ${next} mode`}
                onClick={() => setTheme(next)}
              >
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </IconButton>
            </div>
          </nav>
          <Outlet />
        </Tooltip.Provider>
        <Scripts />
      </body>
    </html>
  );
}

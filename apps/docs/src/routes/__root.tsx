import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { Tooltip } from "dowel";

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

function RootDocument() {
  return (
    // The theme hooks onto <html> rather than a wrapper div so the page
    // background reaches the viewport edges instead of stopping at the
    // content box.
    <html lang="en" className="dowel-root" data-dowel-theme="dark">
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
          </nav>
          <Outlet />
        </Tooltip.Provider>
        <Scripts />
      </body>
    </html>
  );
}

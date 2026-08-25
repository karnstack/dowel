import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { useHotkeys } from "@tanstack/react-hotkeys";
import { ThemeProvider, Tooltip } from "dowel";
import { useCallback, useMemo, useState } from "react";

import { CommandSearch } from "../components/command-search";
import { DocsContext } from "../components/docs-context";

import "@fontsource-variable/inter";
import "dowel/dowel.css";
import "../docs.css";

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
      { title: "dowel · React components for product interfaces" },
      {
        name: "description",
        content: "Compact, accessible React components for product interfaces.",
      },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
      { rel: "icon", href: "/icon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleTheme = useCallback(() => {
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setTheme((current) => {
      const resolved = current ?? (systemDark ? "dark" : "light");
      return resolved === "dark" ? "light" : "dark";
    });
  }, []);

  const openSearch = useCallback(() => setSearchOpen(true), []);

  useHotkeys(
    [
      {
        hotkey: "Mod+K",
        callback: () => {
          if (!isOverlayOpen()) setSearchOpen(true);
        },
        options: { enabled: !searchOpen },
      },
      {
        hotkey: "D",
        callback: () => {
          if (!isOverlayOpen()) toggleTheme();
        },
        options: { enabled: !searchOpen, ignoreInputs: true },
      },
    ],
    { requireReset: true },
  );

  const context = useMemo(
    () => ({ navOpen, openSearch, setNavOpen, theme, toggleTheme }),
    [navOpen, openSearch, theme, toggleTheme],
  );

  return (
    <html lang="en" data-nav-open={navOpen ? "" : undefined}>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider theme={theme ?? "system"}>
          <Tooltip.Provider>
            <DocsContext.Provider value={context}>
              <Outlet />
              <CommandSearch open={searchOpen} onOpenChange={setSearchOpen} />
            </DocsContext.Provider>
          </Tooltip.Provider>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}

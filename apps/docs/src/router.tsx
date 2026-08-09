import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

/**
 * TanStack Start's entry points import `getRouter` from this module by
 * convention (`src/router` inside the app's `srcDirectory`). It runs once per
 * request on the server and once on the client, so it must build a fresh
 * router each time rather than share one instance.
 */
export function getRouter() {
  return createRouter({
    routeTree,
    // The docs are prerendered to static HTML and hydrate on load; scrolling
    // to the top on navigation matches how a docs site is read.
    scrollRestoration: true,
    defaultPreload: "intent",
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}

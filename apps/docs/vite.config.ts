import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  // TanStack Start builds two Vite environments. The defaults would put them
  // at dist/client and dist/server; the docs flatten the client one to dist/
  // so the deploy target is exactly "upload dist/" with no server bundle
  // sitting next to the HTML. The SSR build is a prerender intermediate, not
  // an artifact, so it goes to a scratch directory outside dist/.
  environments: {
    client: { build: { outDir: "dist" } },
    ssr: { build: { outDir: ".tanstack/ssr" } },
  },
  plugins: [
    tanstackStart({
      // Prerender to static HTML: docs discovery is search-driven, and a
      // static build means the deploy target is an assets-only Worker with
      // no runtime. `pages` seeds the crawler; `crawlLinks` follows the nav
      // from there, so a new route linked from the shell is picked up
      // without editing this file.
      pages: [{ path: "/" }],
      prerender: {
        enabled: true,
        crawlLinks: true,
        // A page that throws during prerender must fail the build rather
        // than silently ship a missing route.
        failOnError: true,
      },
    }),
    viteReact(),
  ],
});

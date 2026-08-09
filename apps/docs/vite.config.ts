import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// The version the docs advertise comes from the library's own manifest, so a
// release can never leave the badge behind. The path is relative on purpose:
// dowel's exports map does not expose ./package.json, so the bare specifier
// "dowel/package.json" would not resolve.
import dowelPackage from "../../packages/dowel/package.json" with { type: "json" };

export default defineConfig({
  // Baked in as a literal by both the client and the SSR build, which is what
  // keeps it available to a prerendered page: there is no server at runtime to
  // read a file, and the HTML is generated before one could. See
  // src/lib/version.ts for the reader and src/vite-env.d.ts for the type.
  define: {
    __DOWEL_VERSION__: JSON.stringify(dowelPackage.version),
  },
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

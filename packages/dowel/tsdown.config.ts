import stylex from "@stylexjs/unplugin/rolldown";
import { defineConfig } from "tsdown";

const packageRoot = import.meta.dirname;

export default defineConfig({
  entry: ["src/index.ts"],
  format: "esm",
  platform: "browser",
  dts: true,
  clean: true,
  css: {
    fileName: "dowel.css",
    minify: true,
  },
  treeshake: true,
  plugins: [
    stylex({
      dev: false,
      runtimeInjection: false,
      sxPropName: false,
      treeshakeCompensation: true,
      useCSSLayers: { prefix: "dowel" },
      unstable_moduleResolution: {
        type: "commonJS",
        rootDir: packageRoot,
      },
    }),
  ],
  // No `external` here on purpose: tsdown never bundles `dependencies` or
  // `peerDependencies`, so react, react-dom and @base-ui/react are already
  // external. (tsdown's `external` option is deprecated in favour of
  // `deps.neverBundle`, and neither is needed for this package.)
});

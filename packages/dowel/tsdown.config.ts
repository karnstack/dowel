import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: "esm",
  platform: "browser",
  dts: true,
  clean: true,
  treeshake: true,
  // No `external` here on purpose: tsdown never bundles `dependencies` or
  // `peerDependencies`, so react, react-dom and @base-ui/react are already
  // external. (tsdown's `external` option is deprecated in favour of
  // `deps.neverBundle`, and neither is needed for this package.)
});

import stylex from "@stylexjs/unplugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    stylex.vite({
      dev: false,
      runtimeInjection: false,
      sxPropName: false,
      useCSSLayers: { prefix: "dowel" },
      unstable_moduleResolution: {
        type: "commonJS",
        rootDir: import.meta.dirname,
      },
    }),
    react(),
  ],
  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: ["./test/setup.ts"],
  },
});

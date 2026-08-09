/**
 * dowel's version, replaced with a string literal at build time by the
 * `define` in vite.config.ts. Declared rather than imported because the
 * substitution happens in the bundler, so there is no module to import from.
 */
declare const __DOWEL_VERSION__: string;

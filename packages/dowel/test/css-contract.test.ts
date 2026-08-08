import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const DIST = resolve(import.meta.dirname, "..", "dist", "dowel.css");

describe("dowel.css build contract", () => {
  it("has been built", () => {
    // Run `pnpm --filter dowel build` before this suite.
    expect(existsSync(DIST)).toBe(true);
  });

  it("resolves every var() it references", () => {
    const css = readFileSync(DIST, "utf8");
    const defined = new Set(
      [...css.matchAll(/(--dowel-[\w-]+)\s*:/g)].map((m) => m[1]),
    );
    const used = new Set(
      [...css.matchAll(/var\(\s*(--dowel-[\w-]+)/g)].map((m) => m[1]),
    );
    // A typo'd token silently renders as nothing. This is the guard.
    const missing = [...used].filter((t) => !defined.has(t));
    expect(missing).toEqual([]);
  });

  it("inlines every @import", () => {
    expect(readFileSync(DIST, "utf8")).not.toContain("@import");
  });

  it("keeps the cascade layer names", () => {
    expect(readFileSync(DIST, "utf8")).toContain("@layer");
  });
});

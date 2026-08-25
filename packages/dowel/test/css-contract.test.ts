import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const DIST = resolve(import.meta.dirname, "..", "dist", "dowel.css");

// This suite asserts against build output, not source. `pretest` builds first,
// so a fresh clone cannot land here with dist/ missing; the message is the
// backstop for anyone invoking vitest directly and bypassing the hook.
const NOT_BUILT =
  `${DIST} is missing. This suite asserts against build output.\n` +
  `Run \`pnpm --filter @karnstack/dowel build\` first (\`pnpm --filter @karnstack/dowel test\` does it for you).`;

function readDist(): string {
  if (!existsSync(DIST)) throw new Error(NOT_BUILT);
  return readFileSync(DIST, "utf8");
}

describe("dowel.css build contract", () => {
  it("has been built", () => {
    expect(existsSync(DIST), NOT_BUILT).toBe(true);
  });

  it("resolves every var() it references", () => {
    const css = readDist();
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
    expect(readDist()).not.toContain("@import");
  });

  it("keeps the cascade layer names", () => {
    expect(readDist()).toContain("@layer");
  });
});

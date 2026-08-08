import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = (p: string) =>
  readFileSync(resolve(import.meta.dirname, "..", "src", p), "utf8");

describe("token layer", () => {
  it("declares the layer order before anything else", () => {
    const index = read("index.css");
    const decl = index.match(/@layer\s+([^;]+);/);
    expect(decl?.[1]?.split(",").map((s) => s.trim())).toEqual([
      "dowel.tokens",
      "dowel.base",
      "dowel.components",
    ]);
  });

  it("defines every colour token in BOTH light and dark", () => {
    const names = (css: string) => [
      ...new Set([...css.matchAll(/(--dowel-[\w-]+)\s*:/g)].map((m) => m[1])),
    ];
    const light = names(read("tokens/light.css"));
    const dark = names(read("tokens/dark.css"));
    expect(light.length).toBeGreaterThan(0);
    // A token defined in light but not dark renders unstyled in dark mode.
    expect([...light].sort()).toEqual([...dark].sort());
  });

  it("uses 450 as the normal font weight, not 400", () => {
    expect(read("tokens/scale.css")).toContain("--dowel-fw-normal: 450");
  });

  it("keeps every scale token free of colour", () => {
    // Colour belongs in light.css/dark.css so dark mode overrides one file.
    expect(read("tokens/scale.css")).not.toMatch(/lch\(|#[0-9a-f]{3,8}\b/i);
  });
});

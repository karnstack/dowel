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

  it("keeps the two dark copies identical, value for value", () => {
    // dark.css intentionally repeats its declarations: once under the class /
    // attribute selectors, once inside the prefers-color-scheme media query.
    // CSS cannot share one block across that boundary without a preprocessor,
    // so this test is what keeps the two copies from drifting apart — a value
    // edited in one copy but not the other must fail here, not ship.
    const decls = (css: string) => {
      const map: Record<string, string> = {};
      for (const [, name, value] of css.matchAll(
        /(--dowel-[\w-]+)\s*:\s*([^;]+);/g,
      )) {
        // Collapse whitespace only — never the values themselves, so real
        // drift like 0.15s vs .15s still fails.
        if (name && value) map[name] = value.replace(/\s+/g, " ").trim();
      }
      return map;
    };
    const parts = read("tokens/dark.css").split(
      /@media\s*\(prefers-color-scheme:\s*dark\)\s*\{/,
    );
    expect(parts).toHaveLength(2);
    const classCopy = decls(parts[0] ?? "");
    const mediaCopy = decls(parts[1] ?? "");
    expect(Object.keys(classCopy).length).toBeGreaterThan(0);
    expect(mediaCopy).toEqual(classCopy);
  });

  it("uses 450 as the normal font weight, not 400", () => {
    expect(read("tokens/scale.css")).toContain("--dowel-fw-normal: 450");
  });

  it("keeps every scale token free of colour", () => {
    // Colour belongs in light.css/dark.css so dark mode overrides one file.
    expect(read("tokens/scale.css")).not.toMatch(/lch\(|#[0-9a-f]{3,8}\b/i);
  });
});

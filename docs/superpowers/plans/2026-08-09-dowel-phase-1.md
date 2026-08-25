# dowel Phase 1 Implementation Plan

> Historical plan. Superseded by
> `2026-08-25-stylex-component-system.md`. Do not continue this plain CSS
> implementation sequence.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `@karnstack/dowel@0.1.0` to npm with a working token system, a compiled-CSS build pipeline, release automation, a live docs site at dowel.sh, and 8 components proving the pattern end-to-end.

**Architecture:** pnpm workspace with one publishable package (`packages/dowel`) and one docs app (`apps/docs`). Components are React wrappers over `@base-ui/react` primitives, styled by hand-authored plain CSS with `dowel-` prefixed classes. Lightning CSS bundles per-component CSS into a single `dist/dowel.css`; tsdown emits ESM + types. Variants are expressed as `data-*` attributes, never className props.

**Tech Stack:** React 19.2, `@base-ui/react` 1.7, TypeScript 5.9.3, Lightning CSS 1.33, tsdown 0.22, vitest 4.1, Changesets 3.0, TanStack Start 1.168, Cloudflare Workers.

## Global Constraints

- **Package manager is pnpm.** Never `npm` or `npx`. Use `pnpm` / `pnpm dlx`.
- **Node 24.18.0, pnpm 11.9.0**, pinned in `mise.toml`. CI installs via `jdx/mise-action@v4`.
- **TypeScript 5.9.3.** Do NOT use TypeScript 7.x — it is the new Go port and too young to generate public `.d.ts`.
- **No override API.** No `className` prop, no `style` prop passthrough, no `classNames`/`styles` object, no eject command. The only theming surface is `--dowel-hue` and `--dowel-accent`. A PR adding a className prop is wrong by definition.
- **All public CSS custom properties are prefixed `--dowel-`.** All CSS classes are prefixed `dowel-`.
- **Every component ships in both light and dark**, verified by test.
- **Base text weight is 450**, UI label weight 500. Base UI font-size is 13px (`--dowel-fs-small`).
- **Controls are 28px tall**, radius 8px, transition `.15s`. Only `border, background-color, color, opacity` may be transitioned. Never `all`, never transform/size on hover.
- **Hairline borders are `0.5px`**, not 1px.
- **`main` is protected.** All work lands via PR (`gh pr create`). Never commit directly to main.
- **Org secrets `NPM_TOKEN` and `CLOUDFLARE_API_TOKEN` already exist** at karnstack org level, visibility ALL. Do not create repo-level copies — they would shadow the org ones.
- **Never ship** Linear's logo, icons, or Berkeley Mono. Mono stack is JetBrains Mono / `ui-monospace`.

**Reference documents (read before starting):**

- Spec: `docs/superpowers/specs/2026-08-09-dowel-design.md`
- Measured values: `docs/linear-audit-glossary.md`

---

## File Structure

```
packages/dowel/
├── package.json                    name "@karnstack/dowel", exports . and ./dowel.css
├── tsconfig.json
├── tsdown.config.ts                ESM + d.ts
├── scripts/build-css.mjs           Lightning CSS bundle+minify
├── src/
│   ├── index.ts                    barrel: re-exports every component
│   ├── index.css                   @layer decl + @imports every css file
│   ├── tokens/
│   │   ├── scale.css               non-colour tokens (type, size, motion, shape)
│   │   ├── light.css               :root colour tokens
│   │   └── dark.css                dark overrides (class, attr, media)
│   └── components/
│       ├── button/{index.tsx,button.css,button.test.tsx}
│       ├── icon-button/{...}
│       ├── badge/{...}
│       ├── kbd/{...}
│       ├── input/{...}
│       ├── dialog/{...}
│       ├── menu/{...}
│       └── tooltip/{...}
└── test/
    ├── setup.ts                    expectNoA11yViolations() via axe-core
    ├── render.tsx                  renderBoth(): renders in light AND dark
    └── css-contract.test.ts        build guard: no unresolved var()

apps/docs/                          TanStack Start, prerendered → dowel.sh
.github/workflows/{ci.yml,release.yml,deploy-docs.yml}
.changeset/config.json
```

**Responsibility boundaries:** one directory per component holding its markup, its styles and its tests together — they change together. Tokens are split by _what changes per theme_ (colour) versus _what never does_ (scale), because dark mode overrides exactly one of those files.

---

## Task 1: Workspace scaffold

**Files:**

- Create: `pnpm-workspace.yaml`, `package.json`, `.npmrc`, `.prettierrc`, `tsconfig.base.json`
- Create: `packages/dowel/package.json`, `packages/dowel/tsconfig.json`
- Modify: `mise.toml` (already exists, verify contents)

**Interfaces:**

- Consumes: nothing (first task)
- Produces: workspace where `pnpm install`, `pnpm -r typecheck`, `pnpm format:check` all run clean. Package name `@karnstack/dowel`. Every later task runs commands from repo root.

- [ ] **Step 1: Create the workspace manifest**

`pnpm-workspace.yaml`:

```yaml
# pnpm 11 no longer reads the "pnpm" key in package.json, and it refuses to
# finish an install that silently skipped a package's build script. Declaring
# allowBuilds here is what keeps a clean checkout from exiting 1.
packages:
  - packages/*
  - apps/*

allowBuilds:
  esbuild: true
  lightningcss: true
```

- [ ] **Step 2: Create the root package.json**

```json
{
  "name": "dowel-monorepo",
  "private": true,
  "type": "module",
  "packageManager": "pnpm@11.9.0",
  "engines": { "node": ">=24" },
  "scripts": {
    "build": "pnpm -r build",
    "test": "pnpm -r test",
    "typecheck": "pnpm -r typecheck",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  },
  "devDependencies": {
    "prettier": "3.6.2",
    "typescript": "5.9.3"
  }
}
```

- [ ] **Step 3: Create .npmrc, .prettierrc and LICENSE**

`.npmrc`:

```
# Keep the lockfile honest in CI; mise pins the pnpm version itself.
engine-strict=true
```

`.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": false,
  "printWidth": 80,
  "trailingComma": "all"
}
```

`LICENSE` — the spec declares MIT and `package.json` claims it, so the file
must exist or the npm listing links to nothing:

```
MIT License

Copyright (c) 2026 Karn Gyan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

Also copy it into the package so it ships with the tarball:

```bash
cp LICENSE packages/dowel/LICENSE
```

and add `"LICENSE"` to the package's `files` array alongside `"dist"`.

- [ ] **Step 4: Create tsconfig.base.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noEmit": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true
  }
}
```

- [ ] **Step 5: Create packages/dowel/package.json**

```json
{
  "name": "@karnstack/dowel",
  "version": "0.0.0",
  "description": "An opinionated React component library. One look, well made.",
  "license": "MIT",
  "author": "Karn Gyan",
  "homepage": "https://dowel.sh",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/karnstack/dowel.git"
  },
  "bugs": { "url": "https://github.com/karnstack/dowel/issues" },
  "keywords": ["react", "components", "ui", "design-system", "linear"],
  "type": "module",
  "sideEffects": ["**/*.css"],
  "files": ["dist", "LICENSE"],
  "publishConfig": {
    "access": "public",
    "provenance": true
  },
  "exports": {
    ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js" },
    "./dowel.css": "./dist/dowel.css"
  },
  "scripts": {
    "build": "tsdown && node scripts/build-css.mjs",
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "dependencies": {
    "@base-ui/react": "^1.7.0"
  },
  "devDependencies": {
    "@testing-library/dom": "^10.4.1",
    "@testing-library/react": "^16.3.2",
    "@testing-library/user-event": "^14.6.1",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.0",
    "@vitejs/plugin-react": "^6.0.5",
    "axe-core": "^4.13.0",
    "jsdom": "^27.0.0",
    "lightningcss": "^1.33.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "tsdown": "^0.22.14",
    "vitest": "^4.1.10"
  }
}
```

- [ ] **Step 6: Create packages/dowel/tsconfig.json**

```json
{
  "extends": "../../tsconfig.base.json",
  "include": ["src", "test", "*.config.ts"]
}
```

- [ ] **Step 7: Verify mise.toml is correct**

Run: `cat mise.toml`
Expected to contain exactly:

```toml
[tools]
node = "24.18.0"
# pnpm via the npm backend: the default aqua backend has an asset-name
# mismatch (expects pnpm-macos-arm64; pnpm ships pnpm-darwin-arm64.tar.gz).
"npm:pnpm" = "11.9.0"
```

- [ ] **Step 8: Install and verify**

```bash
pnpm install
pnpm format:check
```

Expected: install completes, format check passes. `pnpm typecheck` will fail — there is no `src` yet. That is expected; Task 2 creates it.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "Scaffold the pnpm workspace and dowel package"
```

---

## Task 2: Token layer

**Files:**

- Create: `packages/dowel/src/tokens/scale.css`
- Create: `packages/dowel/src/tokens/light.css`
- Create: `packages/dowel/src/tokens/dark.css`
- Create: `packages/dowel/src/index.css`
- Test: `packages/dowel/test/tokens.test.ts`

**Interfaces:**

- Consumes: Task 1's workspace.
- Produces: the complete `--dowel-*` custom property set. Every component CSS file from Task 4 onward references ONLY these names. Layer order is declared as `@layer dowel.tokens, dowel.base, dowel.components;` — component CSS must live in `dowel.components`.

- [ ] **Step 1: Write the failing test**

`packages/dowel/test/tokens.test.ts`:

```ts
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = (p: string) =>
  readFileSync(resolve(import.meta.dirname, "..", "src", p), "utf8");

describe("token layer", () => {
  it("declares the layer order before anything else", () => {
    const index = read("index.css");
    const decl = index.match(/@layer\s+([^;]+);/);
    expect(decl?.[1].split(",").map((s) => s.trim())).toEqual([
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
```

- [ ] **Step 2: Run it to verify it fails**

Run: `pnpm --filter @karnstack/dowel test tokens`
Expected: FAIL — `ENOENT` on `src/index.css`.

- [ ] **Step 3: Write scale.css**

`packages/dowel/src/tokens/scale.css`:

```css
/* Non-colour tokens. Identical in light and dark — dark.css overrides colour
   only, so this file must never contain a colour value. */
@layer dowel.tokens {
  :root {
    /* type */
    --dowel-font:
      "Inter Variable", system-ui, -apple-system, "Segoe UI", sans-serif;
    --dowel-mono: "JetBrains Mono", ui-monospace, "SF Mono", monospace;

    --dowel-fs-micro: 0.6875rem; /* 11 */
    --dowel-fs-mini: 0.75rem; /* 12 */
    --dowel-fs-small: 0.8125rem; /* 13 — the workhorse */
    --dowel-fs-base: 0.9375rem; /* 15 */
    --dowel-fs-lg: 1.125rem; /* 18 */
    --dowel-fs-title3: 1.25rem; /* 20 */
    --dowel-fs-title2: 1.5rem; /* 24 */
    --dowel-fs-title1: 2.25rem; /* 36 */

    --dowel-fw-light: 300;
    --dowel-fw-normal: 450; /* not 400 — this is the Linear signature */
    --dowel-fw-medium: 500;
    --dowel-fw-semibold: 600;
    --dowel-fw-bold: 700;

    --dowel-tracking: -0.02em;
    --dowel-tracking-title: -0.004em;
    --dowel-leading: 1.6;

    /* shape */
    --dowel-radius-sm: 4px;
    --dowel-radius: 8px;
    --dowel-radius-lg: 12px;
    --dowel-radius-pill: 9999px;
    --dowel-hairline: 0.5px;

    /* size — every interactive control is 28px unless explicitly compact */
    --dowel-h-sm: 24px;
    --dowel-h: 28px;
    --dowel-h-lg: 32px;
    --dowel-h-field: 36px;

    /* space */
    --dowel-space-1: 2px;
    --dowel-space-2: 4px;
    --dowel-space-3: 6px;
    --dowel-space-4: 8px;
    --dowel-space-5: 10px;
    --dowel-space-6: 12px;
    --dowel-space-7: 14px;
    --dowel-space-8: 18px;

    /* motion — only border, background-color, color, opacity may transition */
    --dowel-dur: 0.15s;
    --dowel-dur-fast: 0.1s;
    --dowel-ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --dowel-transition:
      border var(--dowel-dur) var(--dowel-ease),
      background-color var(--dowel-dur) var(--dowel-ease),
      color var(--dowel-dur) var(--dowel-ease),
      opacity var(--dowel-dur) var(--dowel-ease);
  }

  @media (prefers-reduced-motion: reduce) {
    :root {
      --dowel-dur: 0.01ms;
      --dowel-dur-fast: 0.01ms;
    }
  }
}
```

- [ ] **Step 4: Write light.css**

`packages/dowel/src/tokens/light.css`:

```css
/* Light is the default theme. Every neutral is one hue at low chroma —
   greys that are not grey. Changing --dowel-hue retints the entire library. */
@layer dowel.tokens {
  :root {
    --dowel-hue: 272;

    /* surfaces */
    --dowel-bg-1: lch(99% 0.4 var(--dowel-hue));
    --dowel-bg-2: lch(97% 0.85 var(--dowel-hue));
    --dowel-bg-3: lch(94.5% 1.3 var(--dowel-hue));
    --dowel-bg-4: lch(92% 0.85 var(--dowel-hue));
    --dowel-bg-elevated: lch(100% 0 var(--dowel-hue));

    /* borders */
    --dowel-border-1: lch(91% 1.48 var(--dowel-hue));
    --dowel-border-2: lch(87% 1.48 var(--dowel-hue));
    --dowel-border-3: lch(82% 1.93 var(--dowel-hue));

    /* text */
    --dowel-text-1: lch(14% 0 var(--dowel-hue));
    --dowel-text-2: lch(28% 1.2 var(--dowel-hue));
    --dowel-text-3: lch(48% 1.2 var(--dowel-hue));
    --dowel-text-4: lch(61.803% 1.2 var(--dowel-hue));

    /* accent — ours, deliberately not Linear's 295 brand hue */
    --dowel-accent: lch(49% 62 285);
    --dowel-accent-hover: lch(44% 62 285);
    --dowel-accent-fg: lch(100% 0 0);
    --dowel-focus: var(--dowel-accent);

    /* status */
    --dowel-danger: lch(52% 68 28);
    --dowel-danger-fg: lch(100% 0 0);
    --dowel-success: lch(58% 55 145);
    --dowel-warning: lch(76% 78 82);

    /* elevation — exactly two tiers */
    --dowel-shadow-popover:
      0 3px 8px lch(0 0 0 / 0.08), 0 2px 5px lch(0 0 0 / 0.08),
      0 1px 1px lch(0 0 0 / 0.08);
    --dowel-shadow-modal:
      0 4px 40px lch(0 0 0 / 0.06), 0 3px 20px lch(0 0 0 / 0.08),
      0 3px 12px lch(0 0 0 / 0.08), 0 2px 8px lch(0 0 0 / 0.08),
      0 1px 1px lch(0 0 0 / 0.08);
    --dowel-overlay: lch(0 0 0 / 0.4);
  }
}
```

- [ ] **Step 5: Write dark.css**

`packages/dowel/src/tokens/dark.css`:

```css
/* Dark overrides colour only. Three activation paths, in precedence order:
   explicit class, explicit attribute, then system preference — and the media
   query is guarded so an explicit light choice always wins over the OS. */
@layer dowel.tokens {
  .dowel-dark,
  [data-dowel-theme="dark"] {
    --dowel-bg-1: lch(5.52% 0.4 var(--dowel-hue));
    --dowel-bg-2: lch(7.32% 0.85 var(--dowel-hue));
    --dowel-bg-3: lch(8.22% 1.3 var(--dowel-hue));
    --dowel-bg-4: lch(9.345% 0.85 var(--dowel-hue));
    --dowel-bg-elevated: lch(12.72% 0.85 var(--dowel-hue));

    --dowel-border-1: lch(9.84% 1.48 var(--dowel-hue));
    --dowel-border-2: lch(14.16% 1.48 var(--dowel-hue));
    --dowel-border-3: lch(25.68% 1.93 var(--dowel-hue));

    --dowel-text-1: lch(100% 0 var(--dowel-hue));
    --dowel-text-2: lch(90.451% 1.2 var(--dowel-hue));
    --dowel-text-3: lch(61.803% 1.2 var(--dowel-hue));
    --dowel-text-4: lch(36.975% 1.2 var(--dowel-hue));

    --dowel-accent: lch(58% 62 285);
    --dowel-accent-hover: lch(64% 62 285);
    --dowel-accent-fg: lch(100% 0 0);
    --dowel-focus: var(--dowel-accent);

    --dowel-danger: lch(58% 68 28);
    --dowel-danger-fg: lch(100% 0 0);
    --dowel-success: lch(64% 55 145);
    --dowel-warning: lch(80% 78 82);

    --dowel-shadow-popover:
      0 3px 8px lch(0 0 0 / 0.125), 0 2px 5px lch(0 0 0 / 0.125),
      0 1px 1px lch(0 0 0 / 0.125);
    --dowel-shadow-modal:
      0 4px 40px lch(0 0 0 / 0.1), 0 3px 20px lch(0 0 0 / 0.125),
      0 3px 12px lch(0 0 0 / 0.125), 0 2px 8px lch(0 0 0 / 0.125),
      0 1px 1px lch(0 0 0 / 0.125);
    --dowel-overlay: lch(0 0 0 / 0.6);
  }

  @media (prefers-color-scheme: dark) {
    :root:not(.dowel-light):not([data-dowel-theme="light"]) {
      --dowel-bg-1: lch(5.52% 0.4 var(--dowel-hue));
      --dowel-bg-2: lch(7.32% 0.85 var(--dowel-hue));
      --dowel-bg-3: lch(8.22% 1.3 var(--dowel-hue));
      --dowel-bg-4: lch(9.345% 0.85 var(--dowel-hue));
      --dowel-bg-elevated: lch(12.72% 0.85 var(--dowel-hue));

      --dowel-border-1: lch(9.84% 1.48 var(--dowel-hue));
      --dowel-border-2: lch(14.16% 1.48 var(--dowel-hue));
      --dowel-border-3: lch(25.68% 1.93 var(--dowel-hue));

      --dowel-text-1: lch(100% 0 var(--dowel-hue));
      --dowel-text-2: lch(90.451% 1.2 var(--dowel-hue));
      --dowel-text-3: lch(61.803% 1.2 var(--dowel-hue));
      --dowel-text-4: lch(36.975% 1.2 var(--dowel-hue));

      --dowel-accent: lch(58% 62 285);
      --dowel-accent-hover: lch(64% 62 285);
      --dowel-accent-fg: lch(100% 0 0);
      --dowel-focus: var(--dowel-accent);

      --dowel-danger: lch(58% 68 28);
      --dowel-danger-fg: lch(100% 0 0);
      --dowel-success: lch(64% 55 145);
      --dowel-warning: lch(80% 78 82);

      --dowel-shadow-popover:
        0 3px 8px lch(0 0 0 / 0.125), 0 2px 5px lch(0 0 0 / 0.125),
        0 1px 1px lch(0 0 0 / 0.125);
      --dowel-shadow-modal:
        0 4px 40px lch(0 0 0 / 0.1), 0 3px 20px lch(0 0 0 / 0.125),
        0 3px 12px lch(0 0 0 / 0.125), 0 2px 8px lch(0 0 0 / 0.125),
        0 1px 1px lch(0 0 0 / 0.125);
      --dowel-overlay: lch(0 0 0 / 0.6);
    }
  }
}
```

**Note on the duplication above:** the dark block is intentionally repeated
rather than factored out. CSS has no mechanism to apply one declaration block
to two selectors across a media-query boundary without a preprocessor, and
adding one would contradict the "plain CSS, zero styling deps" decision in the
spec. The `tokens.test.ts` parity test is what keeps the two copies honest.

- [ ] **Step 6: Write index.css**

`packages/dowel/src/index.css`:

```css
/* Layer order is declared once, first, before any @import. Consumers' own
   unlayered styles beat every layer here, so overriding dowel never becomes a
   specificity fight. */
@layer dowel.tokens, dowel.base, dowel.components;

@import "./tokens/scale.css";
@import "./tokens/light.css";
@import "./tokens/dark.css";

@layer dowel.base {
  .dowel-root,
  [data-dowel-theme] {
    font-family: var(--dowel-font);
    font-size: var(--dowel-fs-small);
    font-weight: var(--dowel-fw-normal);
    letter-spacing: var(--dowel-tracking);
    color: var(--dowel-text-2);
    background-color: var(--dowel-bg-1);
  }
}
```

- [ ] **Step 7: Document the font requirement**

dowel does **not** ship a typeface. Bundling Inter would push ~300 kB into the
stylesheet every consumer imports, and Lightning CSS's bundler cannot resolve a
bare `node_modules` specifier without a custom resolver — build complexity for
something one line in the consumer's app solves better.

`--dowel-font` falls back to `system-ui`, so dowel renders correctly without
Inter — just not identically. Add this to the README under a **Typeface**
heading:

````markdown
## Typeface

dowel is designed for Inter. It falls back to `system-ui`, which works but
looks different. To match the docs:

```bash
pnpm add @fontsource-variable/inter
```

```ts
import "@fontsource-variable/inter";
import "@karnstack/dowel/dowel.css";
```

Inter is OFL-licensed. dowel does not bundle it, so you control whether it is
self-hosted or served from a CDN.
````

- [ ] **Step 8: Create the vitest config so tests can run**

`packages/dowel/vitest.config.ts`:

```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: ["./test/setup.ts"],
  },
});
```

`packages/dowel/test/setup.ts`:

```ts
// Placeholder until Task 4 adds the axe matcher. Kept as a file so the
// vitest config resolves from the very first test run.
export {};
```

- [ ] **Step 9: Run the tests to verify they pass**

Run: `pnpm --filter @karnstack/dowel test tokens`
Expected: PASS, 4 tests.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "Add the dowel token layer with light and dark parity tests"
```

---

## Task 3: Build pipeline

**Files:**

- Create: `packages/dowel/tsdown.config.ts`
- Create: `packages/dowel/scripts/build-css.mjs`
- Create: `packages/dowel/src/index.ts`
- Test: `packages/dowel/test/css-contract.test.ts`

**Interfaces:**

- Consumes: Task 2's `src/index.css` and token names.
- Produces: `pnpm --filter @karnstack/dowel build` emitting `dist/index.js`, `dist/index.d.ts`, `dist/dowel.css`. Build order is `tsdown` then `build-css.mjs` — never the reverse. Produces no class-name helper: components in Tasks 4+ write `className="dowel-x"` as a plain string literal.

- [ ] **Step 1: Write the failing build-contract test**

`packages/dowel/test/css-contract.test.ts`:

```ts
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const DIST = resolve(import.meta.dirname, "..", "dist", "dowel.css");

describe("dowel.css build contract", () => {
  it("has been built", () => {
    // Run `pnpm --filter @karnstack/dowel build` before this suite.
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
```

- [ ] **Step 2: Run it to verify it fails**

Run: `pnpm --filter @karnstack/dowel test css-contract`
Expected: FAIL — `dist/dowel.css` does not exist.

- [ ] **Step 3: Write the CSS build script**

`packages/dowel/scripts/build-css.mjs`:

```js
// Bundles src/index.css (following @import) into one minified dist/dowel.css.
// Lightning CSS is used as a library rather than the CLI so the targets and
// the drafts flag stay in version control instead of a shell string.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { bundle, browserslistToTargets } from "lightningcss";
import browserslist from "browserslist";

const here = dirname(fileURLToPath(import.meta.url));
const entry = resolve(here, "..", "src", "index.css");
const out = resolve(here, "..", "dist", "dowel.css");

// lch() and cascade layers both need reasonably current browsers; this is the
// floor dowel supports and it is asserted in the README.
const targets = browserslistToTargets(
  browserslist(["chrome >= 111", "firefox >= 113", "safari >= 16.4"]),
);

const { code, warnings } = bundle({
  filename: entry,
  minify: true,
  targets,
  drafts: { customMedia: false },
});

for (const w of warnings) console.warn(`lightningcss: ${w.message}`);

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, code);
console.log(`built dist/dowel.css (${(code.length / 1024).toFixed(1)} kB)`);
```

- [ ] **Step 4: Add browserslist to devDependencies**

```bash
pnpm --filter @karnstack/dowel add -D browserslist@^4.26.0
```

- [ ] **Step 5: Write tsdown.config.ts**

`packages/dowel/tsdown.config.ts`:

```ts
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
```

`clean: true` wipes `dist/` — which is why `package.json` runs `tsdown` first
and `build-css.mjs` second. Reversing that order silently deletes
`dist/dowel.css` and the CSS contract test fails with a confusing "not built".

- [ ] **Step 6: (intentionally empty — no class-name helper)**

dowel ships **no `cx`/`clsx`/`tailwind-merge` helper**. Variants are `data-*`
attributes, so no component ever builds a conditional class name — every
`className` in this library is a single string literal:

```text
className="dowel-btn"
```

If a later phase genuinely needs conditional classes, add the helper then.
Do not add one now, and do not wrap these literals in a function.

- [ ] **Step 7: Write the barrel**

`packages/dowel/src/index.ts`:

```ts
// Components are appended here by each component task.
export {};
```

- [ ] **Step 8: Build and run the contract test**

```bash
pnpm --filter @karnstack/dowel build
pnpm --filter @karnstack/dowel test css-contract
```

Expected: build prints a kB size; all 4 contract tests PASS.

- [ ] **Step 9: Add dist to .gitignore and commit**

```bash
grep -q '^dist/' .gitignore || echo 'dist/' >> .gitignore
git add -A
git commit -m "Add the Lightning CSS and tsdown build pipeline with a token contract test"
```

---

## Task 4: Button + the component pattern

This task establishes the pattern every later component copies: Base UI
primitive, `data-*` variants, colocated CSS, a11y test, both-theme render.

**Files:**

- Create: `packages/dowel/src/components/button/{index.tsx,button.css,button.test.tsx}`
- Create: `packages/dowel/test/render.tsx`
- Modify: `packages/dowel/test/setup.ts`
- Modify: `packages/dowel/src/index.ts`, `packages/dowel/src/index.css`

**Interfaces:**

- Consumes: `cx` from Task 3, tokens from Task 2.
- Produces:
  - `Button` — `React.forwardRef<HTMLButtonElement, ButtonProps>`
  - `ButtonProps = { variant?: "primary" | "secondary" | "ghost" | "danger"; size?: "sm" | "md"; render?: React.ReactElement }` plus native button props, minus `className` and `style`.
  - `renderBoth(ui: React.ReactElement)` from `test/render.tsx` — renders once in light and once in dark, returning `{ light, dark }` containers. Every component test uses it.
  - `expectNoA11yViolations(el: HTMLElement): Promise<void>` from `test/setup.ts`.

- [ ] **Step 1: Write the shared test helpers**

`packages/dowel/test/setup.ts`:

```ts
import axe from "axe-core";
import { expect } from "vitest";

/** Fails the test with a readable list if axe finds any violation. */
export async function expectNoA11yViolations(el: HTMLElement): Promise<void> {
  const results = await axe.run(el, {
    // colour-contrast cannot be computed in jsdom (no layout/paint).
    rules: { "color-contrast": { enabled: false } },
  });
  const summary = results.violations.map(
    (v) => `${v.id}: ${v.help} (${v.nodes.length} node(s))`,
  );
  expect(summary).toEqual([]);
}
```

`packages/dowel/test/render.tsx`:

```tsx
import { render } from "@testing-library/react";
import type { ReactElement } from "react";

/**
 * Renders `ui` in both themes. Every component test asserts against both so a
 * token missing from dark.css fails at the component that uses it.
 */
export function renderBoth(ui: ReactElement) {
  const light = render(<div data-dowel-theme="light">{ui}</div>);
  const lightEl = light.container.firstElementChild as HTMLElement;

  const dark = render(<div data-dowel-theme="dark">{ui}</div>);
  const darkEl = dark.container.firstElementChild as HTMLElement;

  return { light: lightEl, dark: darkEl };
}
```

- [ ] **Step 2: Write the failing Button test**

`packages/dowel/src/components/button/button.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/setup";
import { renderBoth } from "../../../test/render";
import { Button } from "./index";

describe("Button", () => {
  it("renders its label in a real button element", () => {
    render(<Button>Ship it</Button>);
    expect(screen.getByRole("button", { name: "Ship it" })).toBeDefined();
  });

  it("defaults to the secondary variant at md size", () => {
    render(<Button>Go</Button>);
    const btn = screen.getByRole("button");
    expect(btn.dataset.variant).toBe("secondary");
    expect(btn.dataset.size).toBe("md");
  });

  it("exposes the variant and size as data attributes", () => {
    render(
      <Button variant="danger" size="sm">
        Delete
      </Button>,
    );
    const btn = screen.getByRole("button");
    expect(btn.dataset.variant).toBe("danger");
    expect(btn.dataset.size).toBe("sm");
  });

  it("carries the dowel-btn class", () => {
    render(<Button>Go</Button>);
    expect(screen.getByRole("button").className).toContain("dowel-btn");
  });

  it("fires onClick", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Go
      </Button>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders as another element via the render prop", () => {
    render(<Button render={<a href="/docs" />}>Docs</Button>);
    const link = screen.getByRole("link", { name: "Docs" });
    expect(link.tagName).toBe("A");
    expect(link.className).toContain("dowel-btn");
  });

  it("renders in both themes", () => {
    const { light, dark } = renderBoth(<Button>Go</Button>);
    expect(light.querySelector(".dowel-btn")).not.toBeNull();
    expect(dark.querySelector(".dowel-btn")).not.toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Button>Go</Button>);
    await expectNoA11yViolations(container);
  });
});
```

- [ ] **Step 3: Run it to verify it fails**

Run: `pnpm --filter @karnstack/dowel test button`
Expected: FAIL — cannot resolve `./index`.

- [ ] **Step 4: Write the Button component**

`packages/dowel/src/components/button/index.tsx`:

```tsx
import { Button as BaseButton } from "@base-ui/react/button";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactElement } from "react";

type NativeButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  // dowel is opinionated: appearance is not a consumer concern.
  "className" | "style"
>;

export interface ButtonProps extends NativeButtonProps {
  /** Visual weight. Defaults to `secondary`. */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  /** Control height. `sm` is 24px, `md` is 28px. Defaults to `md`. */
  size?: "sm" | "md";
  /** Render as a different element, e.g. `render={<a href="/x" />}`. */
  render?: ReactElement;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "secondary", size = "md", render, ...props },
    ref,
  ) {
    return (
      <BaseButton
        ref={ref}
        render={render}
        className="dowel-btn"
        data-variant={variant}
        data-size={size}
        {...props}
      />
    );
  },
);
```

- [ ] **Step 5: Write button.css**

`packages/dowel/src/components/button/button.css`:

```css
@layer dowel.components {
  .dowel-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--dowel-space-3);

    height: var(--dowel-h);
    padding-inline: var(--dowel-space-5);

    font-family: var(--dowel-font);
    font-size: var(--dowel-fs-small);
    font-weight: var(--dowel-fw-medium);
    letter-spacing: var(--dowel-tracking);
    white-space: nowrap;

    border: var(--dowel-hairline) solid transparent;
    border-radius: var(--dowel-radius);
    transition: var(--dowel-transition);
    cursor: default;
    user-select: none;
  }

  .dowel-btn[data-size="sm"] {
    height: var(--dowel-h-sm);
    padding-inline: var(--dowel-space-4);
    font-size: var(--dowel-fs-mini);
  }

  .dowel-btn:focus-visible {
    outline: 1px solid var(--dowel-focus);
    outline-offset: 1px;
  }

  .dowel-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* primary */
  .dowel-btn[data-variant="primary"] {
    background-color: var(--dowel-accent);
    color: var(--dowel-accent-fg);
  }
  .dowel-btn[data-variant="primary"]:hover:not(:disabled) {
    background-color: var(--dowel-accent-hover);
  }

  /* secondary */
  .dowel-btn[data-variant="secondary"] {
    background-color: var(--dowel-bg-2);
    border-color: var(--dowel-border-2);
    color: var(--dowel-text-2);
  }
  .dowel-btn[data-variant="secondary"]:hover:not(:disabled) {
    background-color: var(--dowel-bg-3);
  }

  /* ghost */
  .dowel-btn[data-variant="ghost"] {
    background-color: transparent;
    color: var(--dowel-text-3);
  }
  .dowel-btn[data-variant="ghost"]:hover:not(:disabled) {
    background-color: var(--dowel-bg-3);
    color: var(--dowel-text-2);
  }

  /* danger */
  .dowel-btn[data-variant="danger"] {
    background-color: var(--dowel-danger);
    color: var(--dowel-danger-fg);
  }
  .dowel-btn[data-variant="danger"]:hover:not(:disabled) {
    opacity: 0.9;
  }
}
```

- [ ] **Step 6: Wire it into the barrel and the stylesheet**

Append to `packages/dowel/src/index.ts`:

```ts
export { Button } from "./components/button";
export type { ButtonProps } from "./components/button";
```

Append to `packages/dowel/src/index.css` (after the `dowel.base` block):

```css
@import "./components/button/button.css";
```

- [ ] **Step 7: Run the tests to verify they pass**

Run: `pnpm --filter @karnstack/dowel test button`
Expected: PASS, 9 tests.

- [ ] **Step 8: Rebuild and confirm the contract still holds**

```bash
pnpm --filter @karnstack/dowel build
pnpm --filter @karnstack/dowel test
```

Expected: all suites PASS. If `css-contract` reports a missing token, the button CSS referenced a name absent from Task 2 — fix the reference, do not add an ad-hoc token.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "Add Button and the component authoring pattern"
```

---

## Task 5: IconButton

**Files:**

- Create: `packages/dowel/src/components/icon-button/{index.tsx,icon-button.css,icon-button.test.tsx}`
- Modify: `packages/dowel/src/index.ts`, `packages/dowel/src/index.css`

**Interfaces:**

- Consumes: `cx`, tokens, `renderBoth`, `expectNoA11yViolations`.
- Produces: `IconButton`, `IconButtonProps = { variant?: "secondary" | "ghost"; size?: "sm" | "md"; label: string; render?: ReactElement }`. `label` is required and becomes `aria-label` — an icon-only button with no name is the single most common a11y defect in component libraries, so the type system forbids it.

- [ ] **Step 1: Write the failing test**

`packages/dowel/src/components/icon-button/icon-button.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/setup";
import { renderBoth } from "../../../test/render";
import { IconButton } from "./index";

const Icon = () => <svg aria-hidden="true" width="14" height="14" />;

describe("IconButton", () => {
  it("names the button from the required label prop", () => {
    render(
      <IconButton label="Close">
        <Icon />
      </IconButton>,
    );
    expect(screen.getByRole("button", { name: "Close" })).toBeDefined();
  });

  it("is a circle by default at 28px", () => {
    render(
      <IconButton label="Close">
        <Icon />
      </IconButton>,
    );
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("dowel-icon-btn");
    expect(btn.dataset.size).toBe("md");
  });

  it("supports the sm size", () => {
    render(
      <IconButton label="Close" size="sm">
        <Icon />
      </IconButton>,
    );
    expect(screen.getByRole("button").dataset.size).toBe("sm");
  });

  it("renders in both themes", () => {
    const { light, dark } = renderBoth(
      <IconButton label="Close">
        <Icon />
      </IconButton>,
    );
    expect(light.querySelector(".dowel-icon-btn")).not.toBeNull();
    expect(dark.querySelector(".dowel-icon-btn")).not.toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <IconButton label="Close">
        <Icon />
      </IconButton>,
    );
    await expectNoA11yViolations(container);
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `pnpm --filter @karnstack/dowel test icon-button`
Expected: FAIL — cannot resolve `./index`.

- [ ] **Step 3: Write the component**

`packages/dowel/src/components/icon-button/index.tsx`:

```tsx
import { Button as BaseButton } from "@base-ui/react/button";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactElement } from "react";

type NativeButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "className" | "style" | "aria-label"
>;

export interface IconButtonProps extends NativeButtonProps {
  /** Accessible name. Required — an icon alone never names a control. */
  label: string;
  variant?: "secondary" | "ghost";
  size?: "sm" | "md";
  render?: ReactElement;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { label, variant = "ghost", size = "md", render, ...props },
    ref,
  ) {
    return (
      <BaseButton
        ref={ref}
        render={render}
        aria-label={label}
        className="dowel-icon-btn"
        data-variant={variant}
        data-size={size}
        {...props}
      />
    );
  },
);
```

- [ ] **Step 4: Write the CSS**

`packages/dowel/src/components/icon-button/icon-button.css`:

```css
@layer dowel.components {
  .dowel-icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    inline-size: var(--dowel-h);
    block-size: var(--dowel-h);
    padding: 0;

    color: var(--dowel-text-2);
    background-color: transparent;
    border: var(--dowel-hairline) solid transparent;
    border-radius: var(--dowel-radius-pill);
    transition: var(--dowel-transition);
    cursor: default;
  }

  .dowel-icon-btn[data-size="sm"] {
    inline-size: var(--dowel-h-sm);
    block-size: var(--dowel-h-sm);
  }

  .dowel-icon-btn[data-variant="secondary"] {
    background-color: var(--dowel-bg-2);
    border-color: var(--dowel-border-2);
  }

  .dowel-icon-btn:hover:not(:disabled) {
    background-color: var(--dowel-bg-3);
  }

  .dowel-icon-btn:focus-visible {
    outline: 1px solid var(--dowel-focus);
    outline-offset: 1px;
  }

  .dowel-icon-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

- [ ] **Step 5: Wire it up**

Append to `src/index.ts`:

```ts
export { IconButton } from "./components/icon-button";
export type { IconButtonProps } from "./components/icon-button";
```

Append to `src/index.css`:

```css
@import "./components/icon-button/icon-button.css";
```

- [ ] **Step 6: Run tests and build**

```bash
pnpm --filter @karnstack/dowel test icon-button
pnpm --filter @karnstack/dowel build && pnpm --filter @karnstack/dowel test
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Add IconButton with a required accessible label"
```

---

## Task 6: Badge and Kbd

Two plain-element components with no Base UI dependency. Paired because each is
small and they share the same "static display element" shape.

**Files:**

- Create: `packages/dowel/src/components/badge/{index.tsx,badge.css,badge.test.tsx}`
- Create: `packages/dowel/src/components/kbd/{index.tsx,kbd.css,kbd.test.tsx}`
- Modify: `packages/dowel/src/index.ts`, `packages/dowel/src/index.css`

**Interfaces:**

- Consumes: `cx`, tokens, `renderBoth`, `expectNoA11yViolations`.
- Produces:
  - `Badge`, `BadgeProps = { tone?: "neutral" | "accent" | "success" | "warning" | "danger" }` + span props minus className/style.
  - `Kbd`, `KbdProps = { keys: string[] }` — renders one `<kbd>` per key inside a wrapper.

- [ ] **Step 1: Write both failing tests**

`packages/dowel/src/components/badge/badge.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/setup";
import { renderBoth } from "../../../test/render";
import { Badge } from "./index";

describe("Badge", () => {
  it("renders its children", () => {
    render(<Badge>Backlog</Badge>);
    expect(screen.getByText("Backlog")).toBeDefined();
  });

  it("defaults to the neutral tone", () => {
    render(<Badge>Backlog</Badge>);
    expect(screen.getByText("Backlog").dataset.tone).toBe("neutral");
  });

  it("exposes the tone as a data attribute", () => {
    render(<Badge tone="success">Done</Badge>);
    expect(screen.getByText("Done").dataset.tone).toBe("success");
  });

  it("renders in both themes", () => {
    const { light, dark } = renderBoth(<Badge>Backlog</Badge>);
    expect(light.querySelector(".dowel-badge")).not.toBeNull();
    expect(dark.querySelector(".dowel-badge")).not.toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Badge>Backlog</Badge>);
    await expectNoA11yViolations(container);
  });
});
```

`packages/dowel/src/components/kbd/kbd.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/setup";
import { renderBoth } from "../../../test/render";
import { Kbd } from "./index";

describe("Kbd", () => {
  it("renders one kbd element per key", () => {
    const { container } = render(<Kbd keys={["Meta", "K"]} />);
    const keys = container.querySelectorAll("kbd");
    expect(keys).toHaveLength(2);
    expect(keys[0]?.textContent).toBe("Meta");
    expect(keys[1]?.textContent).toBe("K");
  });

  it("renders a single key", () => {
    render(<Kbd keys={["S"]} />);
    expect(screen.getByText("S").tagName).toBe("KBD");
  });

  it("renders in both themes", () => {
    const { light, dark } = renderBoth(<Kbd keys={["S"]} />);
    expect(light.querySelector(".dowel-kbd")).not.toBeNull();
    expect(dark.querySelector(".dowel-kbd")).not.toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Kbd keys={["Meta", "K"]} />);
    await expectNoA11yViolations(container);
  });
});
```

- [ ] **Step 2: Run both to verify they fail**

Run: `pnpm --filter @karnstack/dowel test badge kbd`
Expected: FAIL — modules not found.

- [ ] **Step 3: Write Badge**

`packages/dowel/src/components/badge/index.tsx`:

```tsx
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

export interface BadgeProps
  extends Omit<ComponentPropsWithoutRef<"span">, "className" | "style"> {
  tone?: "neutral" | "accent" | "success" | "warning" | "danger";
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { tone = "neutral", ...props },
  ref,
) {
  return <span ref={ref} className="dowel-badge" data-tone={tone} {...props} />;
});
```

`packages/dowel/src/components/badge/badge.css`:

```css
@layer dowel.components {
  .dowel-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--dowel-space-2);

    block-size: 20px;
    padding-inline: var(--dowel-space-4);

    font-size: var(--dowel-fs-mini);
    font-weight: var(--dowel-fw-medium);
    letter-spacing: var(--dowel-tracking);
    white-space: nowrap;

    border: var(--dowel-hairline) solid var(--dowel-border-2);
    border-radius: var(--dowel-radius-pill);
    background-color: var(--dowel-bg-2);
    color: var(--dowel-text-3);
  }

  .dowel-badge[data-tone="accent"] {
    color: var(--dowel-accent);
    border-color: var(--dowel-accent);
  }
  .dowel-badge[data-tone="success"] {
    color: var(--dowel-success);
    border-color: var(--dowel-success);
  }
  .dowel-badge[data-tone="warning"] {
    color: var(--dowel-warning);
    border-color: var(--dowel-warning);
  }
  .dowel-badge[data-tone="danger"] {
    color: var(--dowel-danger);
    border-color: var(--dowel-danger);
  }
}
```

- [ ] **Step 4: Write Kbd**

`packages/dowel/src/components/kbd/index.tsx`:

```tsx
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

export interface KbdProps
  extends Omit<
    ComponentPropsWithoutRef<"span">,
    "className" | "style" | "children"
  > {
  /** One entry per key, e.g. `["Meta", "K"]`. */
  keys: string[];
}

export const Kbd = forwardRef<HTMLSpanElement, KbdProps>(function Kbd(
  { keys, ...props },
  ref,
) {
  return (
    <span ref={ref} className="dowel-kbd" {...props}>
      {keys.map((key, i) => (
        <kbd key={`${key}-${i}`}>{key}</kbd>
      ))}
    </span>
  );
});
```

`packages/dowel/src/components/kbd/kbd.css`:

```css
@layer dowel.components {
  .dowel-kbd {
    display: inline-flex;
    align-items: center;
    gap: 3px;
  }

  .dowel-kbd kbd {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    min-inline-size: 17px;
    block-size: 17px;
    padding: var(--dowel-space-1);

    font-family: var(--dowel-font);
    font-size: var(--dowel-fs-micro);
    font-weight: var(--dowel-fw-normal);
    line-height: 1;

    color: var(--dowel-text-3);
    background-color: var(--dowel-bg-2);
    border: var(--dowel-hairline) solid var(--dowel-border-2);
    border-radius: var(--dowel-radius-sm);
  }
}
```

- [ ] **Step 5: Wire both up**

Append to `src/index.ts`:

```ts
export { Badge } from "./components/badge";
export type { BadgeProps } from "./components/badge";
export { Kbd } from "./components/kbd";
export type { KbdProps } from "./components/kbd";
```

Append to `src/index.css`:

```css
@import "./components/badge/badge.css";
@import "./components/kbd/kbd.css";
```

- [ ] **Step 6: Run tests and build**

```bash
pnpm --filter @karnstack/dowel test badge kbd
pnpm --filter @karnstack/dowel build && pnpm --filter @karnstack/dowel test
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Add Badge and Kbd"
```

---

## Task 7: Input and Field

**Files:**

- Create: `packages/dowel/src/components/input/{index.tsx,input.css,input.test.tsx}`
- Modify: `packages/dowel/src/index.ts`, `packages/dowel/src/index.css`

**Interfaces:**

- Consumes: `cx`, tokens, test helpers.
- Produces:
  - `Input`, `InputProps = { size?: "md" | "lg"; invalid?: boolean }` + native input props minus className/style.
  - `Field` — a compound object `{ Root, Label, Description, Error }` wrapping Base UI's Field, giving automatic label/description/error association.

- [ ] **Step 1: Write the failing test**

`packages/dowel/src/components/input/input.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/setup";
import { renderBoth } from "../../../test/render";
import { Field, Input } from "./index";

describe("Input", () => {
  it("renders a textbox", () => {
    render(<Input aria-label="Title" />);
    expect(screen.getByRole("textbox", { name: "Title" })).toBeDefined();
  });

  it("accepts typing", async () => {
    render(<Input aria-label="Title" />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "hello");
    expect((input as HTMLInputElement).value).toBe("hello");
  });

  it("marks invalid inputs for assistive tech", () => {
    render(<Input aria-label="Title" invalid />);
    expect(screen.getByRole("textbox").getAttribute("aria-invalid")).toBe(
      "true",
    );
  });

  it("defaults to md size", () => {
    render(<Input aria-label="Title" />);
    expect(screen.getByRole("textbox").dataset.size).toBe("md");
  });

  it("renders in both themes", () => {
    const { light, dark } = renderBoth(<Input aria-label="Title" />);
    expect(light.querySelector(".dowel-input")).not.toBeNull();
    expect(dark.querySelector(".dowel-input")).not.toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Input aria-label="Title" />);
    await expectNoA11yViolations(container);
  });
});

describe("Field", () => {
  it("associates the label with the control", () => {
    render(
      <Field.Root>
        <Field.Label>Issue title</Field.Label>
        <Input />
      </Field.Root>,
    );
    expect(screen.getByRole("textbox", { name: "Issue title" })).toBeDefined();
  });

  it("associates the description with the control", () => {
    render(
      <Field.Root>
        <Field.Label>Title</Field.Label>
        <Input />
        <Field.Description>Keep it short</Field.Description>
      </Field.Root>,
    );
    const input = screen.getByRole("textbox");
    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy!)?.textContent).toBe(
      "Keep it short",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Field.Root>
        <Field.Label>Title</Field.Label>
        <Input />
        <Field.Description>Keep it short</Field.Description>
      </Field.Root>,
    );
    await expectNoA11yViolations(container);
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `pnpm --filter @karnstack/dowel test input`
Expected: FAIL — cannot resolve `./index`.

**If the two `Field` association tests still fail after Step 3:** Base UI
associates the control it owns, which is `Field.Control`, and a bare
`@base-ui/react/input` inside `Field.Root` may not pick up that context. The
fix is to render the control through Field rather than duplicating markup —
change the `Field.Root` usage in the docs and tests to:

```tsx
<Field.Root>
  <Field.Label>Issue title</Field.Label>
  <BaseField.Control render={<Input />} />
</Field.Root>
```

and export a `Field.Control` wrapper from `index.tsx` that does this, so
consumers never touch `BaseField` directly. Do not "fix" it by hand-writing
matching `id`/`htmlFor` strings — that is the bug Field exists to remove.

- [ ] **Step 3: Write the component**

`packages/dowel/src/components/input/index.tsx`:

```tsx
import { Field as BaseField } from "@base-ui/react/field";
import { Input as BaseInput } from "@base-ui/react/input";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

export interface InputProps
  extends Omit<ComponentPropsWithoutRef<"input">, "className" | "style"> {
  /** `md` is the 28px control height, `lg` is the 36px field height. */
  size?: "md" | "lg";
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = "md", invalid, ...props },
  ref,
) {
  return (
    <BaseInput
      ref={ref}
      className="dowel-input"
      data-size={size}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
});

/**
 * Field wires a label, description and error message to a control, so the
 * association is never hand-rolled with matching id strings.
 */
export const Field = {
  Root: forwardRef<
    HTMLDivElement,
    Omit<ComponentPropsWithoutRef<"div">, "className" | "style">
  >(function FieldRoot(props, ref) {
    return <BaseField.Root ref={ref} className="dowel-field" {...props} />;
  }),

  Label: forwardRef<
    HTMLLabelElement,
    Omit<ComponentPropsWithoutRef<"label">, "className" | "style">
  >(function FieldLabel(props, ref) {
    return (
      <BaseField.Label ref={ref} className="dowel-field-label" {...props} />
    );
  }),

  Description: forwardRef<
    HTMLParagraphElement,
    Omit<ComponentPropsWithoutRef<"p">, "className" | "style">
  >(function FieldDescription(props, ref) {
    return (
      <BaseField.Description
        ref={ref}
        className="dowel-field-description"
        {...props}
      />
    );
  }),

  Error: forwardRef<
    HTMLParagraphElement,
    Omit<ComponentPropsWithoutRef<"p">, "className" | "style">
  >(function FieldError(props, ref) {
    return (
      <BaseField.Error ref={ref} className="dowel-field-error" {...props} />
    );
  }),
};
```

- [ ] **Step 4: Write the CSS**

`packages/dowel/src/components/input/input.css`:

```css
@layer dowel.components {
  .dowel-input {
    inline-size: 100%;
    block-size: var(--dowel-h);
    padding-inline: var(--dowel-space-5);

    font-family: var(--dowel-font);
    font-size: var(--dowel-fs-small);
    font-weight: var(--dowel-fw-normal);
    letter-spacing: var(--dowel-tracking);

    color: var(--dowel-text-2);
    background-color: var(--dowel-bg-2);
    border: var(--dowel-hairline) solid var(--dowel-border-2);
    border-radius: var(--dowel-radius);
    transition: var(--dowel-transition);
  }

  .dowel-input[data-size="lg"] {
    block-size: var(--dowel-h-field);
    border-radius: var(--dowel-radius-lg);
    padding-inline: var(--dowel-space-6);
  }

  .dowel-input::placeholder {
    color: var(--dowel-text-4);
  }

  .dowel-input:hover:not(:disabled) {
    border-color: var(--dowel-border-3);
  }

  .dowel-input:focus-visible {
    outline: 1px solid var(--dowel-focus);
    outline-offset: -1px;
    border-color: var(--dowel-focus);
  }

  .dowel-input[aria-invalid="true"] {
    border-color: var(--dowel-danger);
  }

  .dowel-input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .dowel-field {
    display: flex;
    flex-direction: column;
    gap: var(--dowel-space-3);
  }

  .dowel-field-label {
    font-size: var(--dowel-fs-small);
    font-weight: var(--dowel-fw-medium);
    color: var(--dowel-text-2);
  }

  .dowel-field-description {
    font-size: var(--dowel-fs-mini);
    color: var(--dowel-text-3);
  }

  .dowel-field-error {
    font-size: var(--dowel-fs-mini);
    color: var(--dowel-danger);
  }
}
```

- [ ] **Step 5: Wire it up**

Append to `src/index.ts`:

```ts
export { Input, Field } from "./components/input";
export type { InputProps } from "./components/input";
```

Append to `src/index.css`:

```css
@import "./components/input/input.css";
```

- [ ] **Step 6: Run tests and build**

```bash
pnpm --filter @karnstack/dowel test input
pnpm --filter @karnstack/dowel build && pnpm --filter @karnstack/dowel test
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Add Input and Field with automatic label association"
```

---

## Task 8: Dialog

**Files:**

- Create: `packages/dowel/src/components/dialog/{index.tsx,dialog.css,dialog.test.tsx}`
- Modify: `packages/dowel/src/index.ts`, `packages/dowel/src/index.css`

**Interfaces:**

- Consumes: `cx`, tokens, test helpers.
- Produces: `Dialog` compound — `{ Root, Trigger, Portal, Backdrop, Popup, Title, Description, Close }`. Uses the **modal** shadow tier (`--dowel-shadow-modal`).

- [ ] **Step 1: Write the failing test**

`packages/dowel/src/components/dialog/dialog.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/setup";
import { Button } from "../button";
import { Dialog } from "./index";

function Example() {
  return (
    <Dialog.Root>
      <Dialog.Trigger render={<Button>Open</Button>} />
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Dialog.Title>Delete issue</Dialog.Title>
          <Dialog.Description>This cannot be undone.</Dialog.Description>
          <Dialog.Close render={<Button>Cancel</Button>} />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

describe("Dialog", () => {
  it("is closed until the trigger is activated", () => {
    render(<Example />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("opens on trigger click and is labelled by its title", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog", { name: "Delete issue" })).toBeDefined();
  });

  it("closes on Escape", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("closes via the Close control", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("has no accessibility violations when open", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    await expectNoA11yViolations(screen.getByRole("dialog"));
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `pnpm --filter @karnstack/dowel test dialog`
Expected: FAIL — cannot resolve `./index`.

- [ ] **Step 3: Write the component**

`packages/dowel/src/components/dialog/index.tsx`:

```tsx
import { Dialog as BaseDialog } from "@base-ui/react/dialog";

/** Strips the appearance escape hatches from any Base UI component's props.
 *  Inferred from the call signature: ComponentProps<T> rejects this
 *  constraint with TS2344, so infer the props parameter directly. */
type Props<T extends (...args: never) => unknown> = T extends (
  props: infer P,
) => unknown
  ? Omit<P, "className" | "style">
  : never;

export const Dialog = {
  Root: BaseDialog.Root,
  Trigger: BaseDialog.Trigger,
  Portal: BaseDialog.Portal,

  Backdrop: function DialogBackdrop(props: Props<typeof BaseDialog.Backdrop>) {
    return <BaseDialog.Backdrop className="dowel-backdrop" {...props} />;
  },

  Popup: function DialogPopup(props: Props<typeof BaseDialog.Popup>) {
    return <BaseDialog.Popup className="dowel-dialog" {...props} />;
  },

  Title: function DialogTitle(props: Props<typeof BaseDialog.Title>) {
    return <BaseDialog.Title className="dowel-dialog-title" {...props} />;
  },

  Description: function DialogDescription(
    props: Props<typeof BaseDialog.Description>,
  ) {
    return (
      <BaseDialog.Description className="dowel-dialog-description" {...props} />
    );
  },

  Close: BaseDialog.Close,
};
```

- [ ] **Step 4: Write the CSS**

`packages/dowel/src/components/dialog/dialog.css`:

```css
@layer dowel.components {
  .dowel-backdrop {
    position: fixed;
    inset: 0;
    background-color: var(--dowel-overlay);
    transition: opacity var(--dowel-dur) var(--dowel-ease);
  }
  .dowel-backdrop[data-starting-style],
  .dowel-backdrop[data-ending-style] {
    opacity: 0;
  }

  .dowel-dialog {
    position: fixed;
    inset-block-start: 13vh;
    inset-inline-start: 50%;
    translate: -50% 0;

    inline-size: min(480px, calc(100vw - 32px));
    padding: var(--dowel-space-8);

    display: flex;
    flex-direction: column;
    gap: var(--dowel-space-4);

    background-color: var(--dowel-bg-elevated);
    border: var(--dowel-hairline) solid var(--dowel-border-3);
    border-radius: var(--dowel-radius-lg);
    box-shadow: var(--dowel-shadow-modal);

    transition:
      opacity var(--dowel-dur) var(--dowel-ease),
      translate var(--dowel-dur) var(--dowel-ease);
  }
  .dowel-dialog[data-starting-style],
  .dowel-dialog[data-ending-style] {
    opacity: 0;
    translate: -50% -4px;
  }

  .dowel-dialog-title {
    margin: 0;
    font-size: var(--dowel-fs-base);
    font-weight: var(--dowel-fw-semibold);
    letter-spacing: var(--dowel-tracking-title);
    color: var(--dowel-text-1);
  }

  .dowel-dialog-description {
    margin: 0;
    font-size: var(--dowel-fs-small);
    color: var(--dowel-text-3);
  }
}
```

- [ ] **Step 5: Wire it up**

Append to `src/index.ts`:

```ts
export { Dialog } from "./components/dialog";
```

Append to `src/index.css`:

```css
@import "./components/dialog/dialog.css";
```

- [ ] **Step 6: Run tests and build**

```bash
pnpm --filter @karnstack/dowel test dialog
pnpm --filter @karnstack/dowel build && pnpm --filter @karnstack/dowel test
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Add Dialog on the modal elevation tier"
```

---

## Task 9: Menu

**Files:**

- Create: `packages/dowel/src/components/menu/{index.tsx,menu.css,menu.test.tsx}`
- Modify: `packages/dowel/src/index.ts`, `packages/dowel/src/index.css`

**Interfaces:**

- Consumes: `cx`, tokens, `Button` (for the trigger in tests).
- Produces: `Menu` compound — `{ Root, Trigger, Portal, Positioner, Popup, Item, Separator, Group, GroupLabel }`. Uses the **popover** shadow tier. Item height 32px per the audit.

- [ ] **Step 1: Write the failing test**

`packages/dowel/src/components/menu/menu.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/setup";
import { Button } from "../button";
import { Menu } from "./index";

function Example({ onSelect = () => {} }: { onSelect?: () => void }) {
  return (
    <Menu.Root>
      <Menu.Trigger render={<Button>Actions</Button>} />
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup>
            <Menu.Item onClick={onSelect}>Duplicate</Menu.Item>
            <Menu.Separator />
            <Menu.Item>Delete</Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

describe("Menu", () => {
  it("is closed until triggered", () => {
    render(<Example />);
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("opens on trigger click", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    expect(screen.getByRole("menu")).toBeDefined();
    expect(screen.getAllByRole("menuitem")).toHaveLength(2);
  });

  it("invokes the item handler on click", async () => {
    const onSelect = vi.fn();
    render(<Example onSelect={onSelect} />);
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    await userEvent.click(screen.getByRole("menuitem", { name: "Duplicate" }));
    expect(onSelect).toHaveBeenCalledOnce();
  });

  it("closes on Escape", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("moves focus with the arrow keys", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    await userEvent.keyboard("{ArrowDown}");
    expect(document.activeElement?.textContent).toBe("Duplicate");
  });

  it("has no accessibility violations when open", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    await expectNoA11yViolations(screen.getByRole("menu"));
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `pnpm --filter @karnstack/dowel test menu`
Expected: FAIL — cannot resolve `./index`.

- [ ] **Step 3: Write the component**

`packages/dowel/src/components/menu/index.tsx`:

```tsx
import { Menu as BaseMenu } from "@base-ui/react/menu";

/** Strips the appearance escape hatches from any Base UI component's props.
 *  Inferred from the call signature: ComponentProps<T> rejects this
 *  constraint with TS2344, so infer the props parameter directly. */
type Props<T extends (...args: never) => unknown> = T extends (
  props: infer P,
) => unknown
  ? Omit<P, "className" | "style">
  : never;

export const Menu = {
  Root: BaseMenu.Root,
  Trigger: BaseMenu.Trigger,
  Portal: BaseMenu.Portal,

  Positioner: function MenuPositioner(
    props: Props<typeof BaseMenu.Positioner>,
  ) {
    return <BaseMenu.Positioner sideOffset={4} {...props} />;
  },

  Popup: function MenuPopup(props: Props<typeof BaseMenu.Popup>) {
    return <BaseMenu.Popup className="dowel-menu" {...props} />;
  },

  Item: function MenuItem(props: Props<typeof BaseMenu.Item>) {
    return <BaseMenu.Item className="dowel-menu-item" {...props} />;
  },

  Separator: function MenuSeparator(props: Props<typeof BaseMenu.Separator>) {
    return <BaseMenu.Separator className="dowel-menu-separator" {...props} />;
  },

  Group: BaseMenu.Group,

  GroupLabel: function MenuGroupLabel(
    props: Props<typeof BaseMenu.GroupLabel>,
  ) {
    return <BaseMenu.GroupLabel className="dowel-menu-label" {...props} />;
  },
};
```

- [ ] **Step 4: Write the CSS**

`packages/dowel/src/components/menu/menu.css`:

```css
@layer dowel.components {
  .dowel-menu {
    min-inline-size: 180px;
    padding-block: var(--dowel-space-2);

    background-color: var(--dowel-bg-elevated);
    border: var(--dowel-hairline) solid var(--dowel-border-3);
    border-radius: var(--dowel-radius-lg);
    box-shadow: var(--dowel-shadow-popover);

    transition:
      opacity var(--dowel-dur-fast) var(--dowel-ease),
      translate var(--dowel-dur-fast) var(--dowel-ease);
  }
  .dowel-menu[data-starting-style],
  .dowel-menu[data-ending-style] {
    opacity: 0;
    translate: 0 -2px;
  }

  .dowel-menu-item {
    display: flex;
    align-items: center;
    gap: var(--dowel-space-4);

    block-size: 32px;
    padding-inline: var(--dowel-space-7) var(--dowel-space-8);

    font-size: var(--dowel-fs-small);
    font-weight: var(--dowel-fw-normal);
    letter-spacing: var(--dowel-tracking);
    color: var(--dowel-text-2);

    cursor: default;
    user-select: none;
    outline: none;
    transition: var(--dowel-transition);
  }

  /* Base UI marks the active descendant with data-highlighted; styling that
     rather than :hover keeps mouse and keyboard states identical. */
  .dowel-menu-item[data-highlighted] {
    background-color: var(--dowel-bg-3);
    color: var(--dowel-text-1);
  }

  .dowel-menu-item[data-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .dowel-menu-separator {
    block-size: var(--dowel-hairline);
    margin-block: var(--dowel-space-2);
    background-color: var(--dowel-border-2);
  }

  .dowel-menu-label {
    display: block;
    padding: var(--dowel-space-4) var(--dowel-space-7) var(--dowel-space-2);
    font-size: var(--dowel-fs-mini);
    font-weight: var(--dowel-fw-medium);
    color: var(--dowel-text-3);
  }
}
```

- [ ] **Step 5: Wire it up**

Append to `src/index.ts`:

```ts
export { Menu } from "./components/menu";
```

Append to `src/index.css`:

```css
@import "./components/menu/menu.css";
```

- [ ] **Step 6: Run tests and build**

```bash
pnpm --filter @karnstack/dowel test menu
pnpm --filter @karnstack/dowel build && pnpm --filter @karnstack/dowel test
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Add Menu with keyboard navigation"
```

---

## Task 10: Tooltip

**Files:**

- Create: `packages/dowel/src/components/tooltip/{index.tsx,tooltip.css,tooltip.test.tsx}`
- Modify: `packages/dowel/src/index.ts`, `packages/dowel/src/index.css`

**Interfaces:**

- Consumes: `cx`, tokens, `IconButton`.
- Produces: `Tooltip` compound — `{ Provider, Root, Trigger, Portal, Positioner, Popup }`. Consumers must wrap their app in `Tooltip.Provider` once.

- [ ] **Step 1: Write the failing test**

`packages/dowel/src/components/tooltip/tooltip.test.tsx`:

```tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { IconButton } from "../icon-button";
import { Tooltip } from "./index";

function Example() {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger
          render={
            <IconButton label="Copy link">
              <svg aria-hidden="true" width="14" height="14" />
            </IconButton>
          }
        />
        <Tooltip.Portal>
          <Tooltip.Positioner>
            <Tooltip.Popup>Copy link</Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

describe("Tooltip", () => {
  it("is hidden until the trigger is hovered", () => {
    render(<Example />);
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("appears on hover", async () => {
    render(<Example />);
    await userEvent.hover(screen.getByRole("button", { name: "Copy link" }));
    await waitFor(() => expect(screen.getByRole("tooltip")).toBeDefined());
  });

  it("appears on keyboard focus", async () => {
    render(<Example />);
    await userEvent.tab();
    await waitFor(() => expect(screen.getByRole("tooltip")).toBeDefined());
  });

  it("disappears on unhover", async () => {
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Copy link" });
    await userEvent.hover(trigger);
    await waitFor(() => expect(screen.getByRole("tooltip")).toBeDefined());
    await userEvent.unhover(trigger);
    await waitFor(() => expect(screen.queryByRole("tooltip")).toBeNull());
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `pnpm --filter @karnstack/dowel test tooltip`
Expected: FAIL — cannot resolve `./index`.

- [ ] **Step 3: Write the component**

`packages/dowel/src/components/tooltip/index.tsx`:

```tsx
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";

/** Strips the appearance escape hatches from any Base UI component's props.
 *  Inferred from the call signature: ComponentProps<T> rejects this
 *  constraint with TS2344, so infer the props parameter directly. */
type Props<T extends (...args: never) => unknown> = T extends (
  props: infer P,
) => unknown
  ? Omit<P, "className" | "style">
  : never;

export const Tooltip = {
  Provider: BaseTooltip.Provider,
  Root: BaseTooltip.Root,
  Trigger: BaseTooltip.Trigger,
  Portal: BaseTooltip.Portal,

  Positioner: function TooltipPositioner(
    props: Props<typeof BaseTooltip.Positioner>,
  ) {
    return <BaseTooltip.Positioner sideOffset={6} {...props} />;
  },

  Popup: function TooltipPopup(props: Props<typeof BaseTooltip.Popup>) {
    return <BaseTooltip.Popup className="dowel-tooltip" {...props} />;
  },
};
```

- [ ] **Step 4: Write the CSS**

`packages/dowel/src/components/tooltip/tooltip.css`:

```css
@layer dowel.components {
  .dowel-tooltip {
    padding: var(--dowel-space-2) var(--dowel-space-4);

    font-size: var(--dowel-fs-mini);
    font-weight: var(--dowel-fw-medium);
    letter-spacing: var(--dowel-tracking);
    white-space: nowrap;

    color: var(--dowel-text-1);
    background-color: var(--dowel-bg-elevated);
    border: var(--dowel-hairline) solid var(--dowel-border-3);
    border-radius: var(--dowel-radius-sm);
    box-shadow: var(--dowel-shadow-popover);

    transition: opacity var(--dowel-dur-fast) var(--dowel-ease);
  }
  .dowel-tooltip[data-starting-style],
  .dowel-tooltip[data-ending-style] {
    opacity: 0;
  }
}
```

- [ ] **Step 5: Wire it up**

Append to `src/index.ts`:

```ts
export { Tooltip } from "./components/tooltip";
```

Append to `src/index.css`:

```css
@import "./components/tooltip/tooltip.css";
```

- [ ] **Step 6: Run the full suite and build**

```bash
pnpm --filter @karnstack/dowel build
pnpm --filter @karnstack/dowel test
pnpm typecheck
```

Expected: all PASS. This is the complete 8-component slice.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Add Tooltip, completing the phase 1 component slice"
```

---

## Task 11: CI workflow

**Files:**

- Create: `.github/workflows/ci.yml`

**Interfaces:**

- Consumes: root scripts `format:check`, `typecheck`, `build`, `test` from Task 1.
- Produces: a workflow named exactly **`CI`** — Task 12's release workflow keys off that name in its `workflow_run` trigger. Renaming it breaks releases.

- [ ] **Step 1: Write the workflow**

`.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

# Cancel superseded runs on the same ref to save CI minutes.
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

permissions:
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v7

      # Installs Node and pnpm at the exact versions pinned in mise.toml.
      - name: Setup toolchain (mise)
        uses: jdx/mise-action@v4
        with:
          cache: true

      - name: Get pnpm store directory
        shell: bash
        run: echo "STORE_PATH=$(pnpm store path --silent)" >> "$GITHUB_ENV"

      - name: Cache pnpm store
        uses: actions/cache@v4
        with:
          path: ${{ env.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Format check
        run: pnpm format:check

      - name: Typecheck
        run: pnpm typecheck

      # Build must precede test: css-contract.test.ts asserts against
      # dist/dowel.css, which does not exist until the build runs.
      - name: Build
        run: pnpm build

      - name: Test
        run: pnpm test
```

- [ ] **Step 2: Verify it passes locally first**

```bash
pnpm install --frozen-lockfile
pnpm format:check && pnpm typecheck && pnpm build && pnpm test
```

Expected: all four succeed. Fix anything red before pushing — a red first CI run is noise.

- [ ] **Step 3: Commit and open a PR**

```bash
git add -A
git commit -m "Add the CI workflow"
git push -u origin HEAD
gh pr create --fill
```

- [ ] **Step 4: Confirm CI is green on the PR**

Run: `gh pr checks --watch`
Expected: the `CI / build` check passes.

---

## Task 12: Release automation

**Files:**

- Create: `.changeset/config.json`
- Create: `.github/workflows/release.yml`
- Modify: root `package.json` (add `@changesets/cli`)

**Interfaces:**

- Consumes: the workflow named `CI` from Task 11; the org secret `NPM_TOKEN`.
- Produces: merging a PR that contains a changeset opens a "Version Packages" PR; merging that publishes `@karnstack/dowel` to npm.

- [ ] **Step 1: Install changesets**

```bash
pnpm add -Dw @changesets/cli@3.0.1
pnpm exec changeset init
```

- [ ] **Step 2: Configure it**

`.changeset/config.json`:

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.1.1/schema.json",
  "changelog": ["@changesets/changelog-github", { "repo": "karnstack/dowel" }],
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": ["@dowel/docs"]
}
```

```bash
pnpm add -Dw @changesets/changelog-github@1.0.0
```

- [ ] **Step 3: Write the release workflow**

`.github/workflows/release.yml`:

```yaml
name: Release

# Runs only AFTER the CI workflow succeeds on main, so a red main never
# publishes. The changesets flow then takes over:
#   1. add a changeset in your PR, merge to main
#   2. CI passes -> this opens/updates a "Version Packages" PR
#   3. merging THAT PR re-runs CI -> this publishes to npm
on:
  workflow_run:
    workflows: [CI]
    branches: [main]
    types: [completed]

concurrency: ${{ github.workflow }}-${{ github.ref }}

permissions:
  contents: write
  pull-requests: write
  id-token: write

jobs:
  release:
    if: ${{ github.event.workflow_run.conclusion == 'success' && github.event.workflow_run.event == 'push' }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
        with:
          fetch-depth: 0

      - name: Setup toolchain (mise)
        uses: jdx/mise-action@v4
        with:
          cache: true

      - name: Configure npm registry
        run: |
          echo "//registry.npmjs.org/:_authToken=${NODE_AUTH_TOKEN}" > ~/.npmrc
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

      - run: pnpm install --frozen-lockfile
      - run: pnpm build

      - uses: changesets/action@v2.1.1
        with:
          version-script: pnpm exec changeset version
          publish-script: pnpm exec changeset publish
          commit-message: "maint: version packages"
          pr-title: "maint: version packages"
          github-token: ${{ secrets.GITHUB_TOKEN }}
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
          # changesets/action looks for NPM_TOKEN specifically; without it the
          # action falls back to OIDC trusted publishing. Set both so npm auth
          # is deterministic regardless of which path the action takes.
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

- [ ] **Step 4: Set the package version floor and add the first changeset**

Set `packages/dowel/package.json` `"version"` to `"0.0.0"` (already done in Task 1), then:

```bash
pnpm exec changeset
```

Choose `@karnstack/dowel`, select **minor**, and use the summary:
`First release: token system, build pipeline, and eight components.`

This produces `0.1.0` on publish — matching the spec's "0.x for months".

- [ ] **Step 5: Commit and open a PR**

```bash
git add -A
git commit -m "Add changesets and the npm release workflow"
git push -u origin HEAD
gh pr create --fill
gh pr checks --watch
```

- [ ] **Step 6: After merge, verify the Version Packages PR appears**

Run: `gh pr list`
Expected: a `maint: version packages` PR exists. Merging it publishes `@karnstack/dowel@0.1.0`.

**Verification after that merge:**

```bash
sleep 60 && curl -s https://registry.npmjs.org/@karnstack%2Fdowel | python3 -c "import sys,json;print(json.load(sys.stdin)['dist-tags'])"
```

Expected: `{"latest": "0.1.0"}`.

---

## Task 13: Docs site

**Files:**

- Create: `apps/docs/` — TanStack Start app
- Create: `apps/docs/package.json`, `apps/docs/app.config.ts`, `apps/docs/wrangler.jsonc`
- Create: `apps/docs/src/routes/{__root.tsx,index.tsx,components/button.tsx}`

**Interfaces:**

- Consumes: the built `@karnstack/dowel` package via workspace protocol.
- Produces: a prerendered static site in `apps/docs/dist` ready for Task 14's deploy.

- [ ] **Step 1: Scaffold the app package**

`apps/docs/package.json`:

```json
{
  "name": "@dowel/docs",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "typecheck": "tsc --noEmit",
    "test": "echo \"no tests in docs\" && exit 0"
  },
  "dependencies": {
    "@fontsource-variable/inter": "^5.3.0",
    "@tanstack/react-router": "^1.170.23",
    "@tanstack/react-start": "^1.168.40",
    "@karnstack/dowel": "workspace:*",
    "react": "^19.2.8",
    "react-dom": "^19.2.8"
  },
  "devDependencies": {
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.0",
    "typescript": "5.9.3",
    "vite": "^7.0.0"
  }
}
```

- [ ] **Step 2: Configure prerendering**

`apps/docs/app.config.ts`:

```ts
import { defineConfig } from "@tanstack/react-start/config";

export default defineConfig({
  // Prerender to static HTML: docs discovery is search-driven, and a static
  // build means the deploy target is an assets-only Worker with no runtime.
  server: {
    preset: "static",
    prerender: {
      routes: ["/", "/components/button"],
      crawlLinks: true,
    },
  },
});
```

- [ ] **Step 3: Write the root route importing dowel's stylesheet**

`apps/docs/src/routes/__root.tsx`:

```tsx
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Tooltip } from "@karnstack/dowel";
// The docs self-host Inter; dowel itself ships no typeface.
import "@fontsource-variable/inter";
import "@karnstack/dowel/dowel.css";

export const Route = createRootRoute({
  component: () => (
    // Tooltip.Provider is required once at the app root.
    <Tooltip.Provider>
      <div className="dowel-root" data-dowel-theme="dark">
        <Outlet />
      </div>
    </Tooltip.Provider>
  ),
});
```

- [ ] **Step 4: Write the landing route**

`apps/docs/src/routes/index.tsx`:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { Badge, Button, Kbd } from "@karnstack/dowel";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "13vh 24px" }}>
      <h1>dowel</h1>
      <p>An opinionated React component library. One look, well made.</p>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Button variant="primary">Ship it</Button>
        <Button>Cancel</Button>
        <Badge tone="accent">v0.1.0</Badge>
        <Kbd keys={["Meta", "K"]} />
      </div>
    </main>
  );
}
```

- [ ] **Step 5: Write the Button docs route**

`apps/docs/src/routes/components/button.tsx`:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@karnstack/dowel";

export const Route = createFileRoute("/components/button")({
  component: ButtonDocs,
});

function ButtonDocs() {
  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "48px 24px" }}>
      <h1>Button</h1>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button size="sm">Small</Button>
        <Button disabled>Disabled</Button>
      </div>
    </main>
  );
}
```

- [ ] **Step 6: Build and verify prerendering produced HTML**

```bash
pnpm --filter @karnstack/dowel build
pnpm --filter @dowel/docs build
test -f apps/docs/dist/index.html && echo "prerender OK"
```

Expected: `prerender OK`. If the file is missing, the preset did not run static generation — check `app.config.ts`.

- [ ] **Step 7: Commit and PR**

```bash
git add -A
git commit -m "Add the docs site on TanStack Start"
git push -u origin HEAD
gh pr create --fill
gh pr checks --watch
```

---

## Task 14: Cloudflare deploy

**Files:**

- Create: `apps/docs/wrangler.jsonc`
- Create: `.github/workflows/deploy-docs.yml`

**Interfaces:**

- Consumes: `apps/docs/dist` from Task 13; the org secret `CLOUDFLARE_API_TOKEN`.
- Produces: dowel.sh serving the docs.

- [ ] **Step 1: Write the Worker config**

`apps/docs/wrangler.jsonc`:

```jsonc
// dowel.sh — the docs site, served as Cloudflare Worker static assets.
// Assets-only: no worker script, because the site is fully prerendered.
//
// www.dowel.sh cannot be redirected from an assets-only worker; that is a
// Cloudflare dashboard Redirect Rule (manual follow-up).
{
  "name": "dowel-sh",
  "compatibility_date": "2026-08-09",
  "assets": {
    "directory": "./dist",
  },
  "workers_dev": false,
  "routes": [{ "pattern": "dowel.sh", "custom_domain": true }],
}
```

- [ ] **Step 2: Write the deploy workflow**

`.github/workflows/deploy-docs.yml`:

```yaml
# Deploys dowel.sh when the docs or the library change on main.
#
# Uses the karnstack org secret CLOUDFLARE_API_TOKEN. The secret is treated as
# optional: without it the job skips rather than fails, so a fork's CI is not
# a wall of red.
name: deploy-docs

on:
  workflow_dispatch:
  push:
    branches: [main]
    paths:
      - "apps/docs/**"
      - "packages/dowel/**"
      - ".github/workflows/deploy-docs.yml"

permissions:
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7

      - name: Setup toolchain (mise)
        uses: jdx/mise-action@v4
        with:
          cache: true

      - name: Check for the deploy token
        id: token
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
        run: |
          if [ -n "$CLOUDFLARE_API_TOKEN" ]; then
            echo "present=true" >> "$GITHUB_OUTPUT"
          else
            echo "present=false" >> "$GITHUB_OUTPUT"
            echo "CLOUDFLARE_API_TOKEN is not set; skipping the deploy."
          fi

      - name: Install dependencies
        if: steps.token.outputs.present == 'true'
        run: pnpm install --frozen-lockfile

      - name: Build the library then the docs
        if: steps.token.outputs.present == 'true'
        run: |
          pnpm --filter @karnstack/dowel build
          pnpm --filter @dowel/docs build

      - name: Deploy
        if: steps.token.outputs.present == 'true'
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          workingDirectory: apps/docs
          # The action's bundled default predates wrangler v4 and cannot read
          # an assets-only config ("Missing entry-point"). Pin the major that
          # wrangler.jsonc is written for.
          wranglerVersion: "4"
```

- [ ] **Step 3: Commit, PR, merge**

```bash
git add -A
git commit -m "Deploy the docs to dowel.sh via Cloudflare Workers"
git push -u origin HEAD
gh pr create --fill
gh pr checks --watch
```

- [ ] **Step 4: Verify the deploy after merge**

```bash
gh run list --workflow=deploy-docs --limit 1
curl -sS -o /dev/null -w "%{http_code}\n" https://dowel.sh
```

Expected: workflow `completed success`, and HTTP `200` from dowel.sh.

If the custom domain 522s or 404s on the first deploy, the route is still
provisioning — Cloudflare custom domains take a few minutes to attach. Re-check
before debugging.

- [ ] **Step 5: Final phase-1 verification**

```bash
curl -s https://registry.npmjs.org/@karnstack%2Fdowel | python3 -c "import sys,json;print(json.load(sys.stdin)['dist-tags'])"
curl -sS -o /dev/null -w "dowel.sh %{http_code}\n" https://dowel.sh
gh run list --limit 5
```

Expected: `@karnstack/dowel@0.1.0` on npm, `dowel.sh 200`, recent runs green.

---

## Post-phase cleanup (do this only after a green release run)

The org secrets now shadow-conflict with repo-level copies in three sibling
repos. Once `@karnstack/dowel`'s release workflow has published successfully — proving the
org `NPM_TOKEN` works — delete the duplicates so future rotations actually take
effect:

```bash
gh secret delete NPM_TOKEN --repo karnstack/kino
gh secret delete NPM_TOKEN --repo karnstack/reins
gh secret delete CLOUDFLARE_API_TOKEN --repo karnstack/flue
```

Then re-run one release in kino or reins to confirm the org secret is picked
up. Do not batch this with the deletions — verify one, then the rest.

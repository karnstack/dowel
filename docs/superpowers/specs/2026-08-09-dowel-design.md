# dowel — design spec

**Date:** 2026-08-09
**Status:** superseded 2026-08-25

> This document is historical. The StyleX architecture, new Linear audit, and
> expanded component catalog supersede it. See
> `2026-08-25-dowel-stylex-design.md`.

---

## 1. What this is

`dowel` is an opinionated React component library with the visual language of
Linear. It ships as a real npm package with compiled CSS — not a copy-in
generator. Users get one look, well made, and upgrade with a version bump.

A dowel is the small precision-turned pin that joins two pieces of wood:
identical, unglamorous, load-bearing. That is what a component is.

- **repo:** `github.com/karnstack/dowel`
- **npm:** `dowel` (unscoped)
- **docs:** `dowel.sh`
- **licence:** MIT

### Homage, stated plainly

dowel is an homage to Linear's craft. The README credits them and states
clearly that dowel is unaffiliated with and unendorsed by Linear.

We reimplement the _visual language_ — colour relationships, spacing, density,
radii, motion curves — which is not protectable and is fair to learn from.
We ship none of their assets:

| never ship             | reason                 | dowel does instead              |
| ---------------------- | ---------------------- | ------------------------------- |
| Linear logo / wordmark | trademark              | own mark                        |
| Linear's icon set      | their original artwork | Lucide, or redraw               |
| Berkeley Mono          | commercial licence     | JetBrains Mono / `ui-monospace` |
| any affiliation claim  | false endorsement      | explicit disclaimer             |

Inter Variable is OFL-licensed and safe to self-host.

---

## 2. Non-goals

- **Not customisable per component.** No copy-in, no `eject`, no
  `styles`/`classNames` override API. Retheming is `--dowel-hue` and
  `--dowel-accent`. That is the whole knob set. If someone needs a different
  button, dowel is the wrong library — that is a feature.
- **Not framework-agnostic.** React 19 only. No Vue/Svelte port.
- **Not a Tailwind plugin.** No preset, no `@apply`, no utility classes.
- **Not headless.** Behaviour and appearance ship together.

---

## 3. Design foundation (measured, not guessed)

Derived from a reins audit of `linear.app` on 2026-08-09. Full measurements in
`docs/linear-audit-glossary.md`. Three rules carry most of the look:

1. **One hue for every neutral.** Surfaces, borders and text are all
   `lch(L C 272)` at chroma `0.4–1.93`. Barely chromatic, never flat grey.
2. **Base text weight 450**, UI labels 500, tracking `-0.02em` at 13px. 13px is
   the workhorse size — sidebar, rows, control labels, menu options.
3. **28px control height, 0.15s, four properties.** Only
   `border, background-color, color, opacity` ever animate. Never `all`, never
   transform or size on hover.

Plus: `0.5px` hairline borders, and exactly two elevation tiers.

### Token layer

Tokens are ours, generated from these rules — not Linear's values copied.
All public tokens are prefixed `--dowel-`.

```css
:root {
  --dowel-hue: 272;

  /* surfaces — 4 steps */
  --dowel-bg-1: lch(99% 0.4 var(--dowel-hue));
  --dowel-bg-2: lch(97% 0.85 var(--dowel-hue));
  --dowel-bg-3: lch(94.5% 1.3 var(--dowel-hue));
  --dowel-bg-4: lch(92% 0.85 var(--dowel-hue));
  --dowel-bg-elevated: lch(100% 0 var(--dowel-hue));

  /* borders — 3 steps */
  --dowel-border-1: lch(91% 1.48 var(--dowel-hue));
  --dowel-border-2: lch(87% 1.48 var(--dowel-hue));
  --dowel-border-3: lch(82% 1.93 var(--dowel-hue));

  /* text — 4 steps, phi-derived */
  --dowel-text-1: lch(14% 0 var(--dowel-hue));
  --dowel-text-2: lch(28% 1.2 var(--dowel-hue));
  --dowel-text-3: lch(48% 1.2 var(--dowel-hue));
  --dowel-text-4: lch(61.803% 1.2 var(--dowel-hue));

  /* accent — ours, not Linear's. Same energy (L~49, high chroma, indigo),
     deliberately a different hue angle: their #5e6ad2 is lch(48.7% 60.8 295)
     and that exact value is their brand mark, not a design pattern. */
  --dowel-accent: lch(49% 62 285);
  --dowel-accent-fg: lch(100% 0 0);
  --dowel-focus: var(--dowel-accent);

  /* type */
  --dowel-font: "Inter Variable", system-ui, sans-serif;
  --dowel-mono: "JetBrains Mono", ui-monospace, monospace;
  --dowel-fs-micro: 0.6875rem; /* 11 */
  --dowel-fs-mini: 0.75rem; /* 12 */
  --dowel-fs-small: 0.8125rem; /* 13 — workhorse */
  --dowel-fs-base: 0.9375rem; /* 15 */
  --dowel-fs-lg: 1.125rem; /* 18 */
  --dowel-fw-normal: 450;
  --dowel-fw-medium: 500;
  --dowel-fw-semibold: 600;
  --dowel-tracking: -0.02em;

  /* shape */
  --dowel-radius: 8px;
  --dowel-radius-lg: 12px;
  --dowel-radius-sm: 4px;
  --dowel-radius-pill: 9999px;
  --dowel-hairline: 0.5px;

  /* size */
  --dowel-h-sm: 24px;
  --dowel-h: 28px;
  --dowel-h-lg: 32px;

  /* motion */
  --dowel-dur: 0.15s;
  --dowel-ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);

  /* elevation — two tiers, no more */
  --dowel-shadow-popover:
    0 3px 8px lch(0 0 0/0.125), 0 2px 5px lch(0 0 0/0.125),
    0 1px 1px lch(0 0 0/0.125);
  --dowel-shadow-modal:
    0 4px 40px lch(0 0 0/0.1), 0 3px 20px lch(0 0 0/0.125),
    0 3px 12px lch(0 0 0/0.125), 0 2px 8px lch(0 0 0/0.125),
    0 1px 1px lch(0 0 0/0.125);
}
```

Dark theme overrides only the colour tokens. Light values are derived from the
same hue rule; Linear injects its colour tokens at runtime so its light ramp
was not extractable, and copying it was not the goal.

### Theming contract

```css
.dowel-dark,
[data-dowel-theme="dark"] {
  /* colour overrides */
}
@media (prefers-color-scheme: dark) {
  :root:not([data-dowel-theme="light"]) {
    /* same overrides */
  }
}
```

Both themes ship in one stylesheet. Dark activates by class, data attribute, or
system preference. Retheming = override `--dowel-hue` and `--dowel-accent`.

---

## 4. Architecture

```
karnstack/dowel
├── packages/dowel/
│   ├── src/
│   │   ├── tokens/{scale,light,dark}.css
│   │   ├── components/<name>/{index.tsx,<name>.css}
│   │   └── index.ts
│   └── dist/{index.js,index.d.ts,dowel.css}
├── apps/docs/            → TanStack Start, deploys to dowel.sh
├── .changeset/
├── mise.toml
└── pnpm-workspace.yaml
```

**Runtime deps:** `@base-ui/react` only. React 19 as peer.

**Styling.** Hand-authored plain CSS, one file per component, classes prefixed
`dowel-`. No Tailwind, no CSS-in-JS, no vanilla-extract. Lightning CSS bundles
and minifies into a single `dist/dowel.css` using cascade layers:

```css
@layer dowel.tokens, dowel.base, dowel.components;
```

Consumers import `dowel/dowel.css` once. Layers mean their own styles win
without specificity fights.

**Behaviour.** Every component Base UI covers wraps it, giving one uniform
composition model: the `render` prop for polymorphism and `data-*` attributes
for state. Components Base UI has no behaviour for are plain elements.

**State styling.** Components expose `data-*` hooks (`data-variant`,
`data-size`, `data-state`) so appearance keys off attributes, not class
soup — and consumers can target states without forking.

**Build.** `tsup` for JS (ESM only, `.d.ts` emitted), Lightning CSS for
styles. `sideEffects: ["*.css"]` so JS tree-shakes.

---

## 5. Components

49 total: 39 Base UI-backed, 10 plain elements _(marked)_.

**Actions** Button · IconButton · Toggle · ToggleGroup · Toolbar
**Form** Input · Textarea _(plain)_ · NumberField · OTPField · Checkbox ·
CheckboxGroup · Radio · RadioGroup · Switch · Slider · Field · Fieldset · Form
**Selection** Select · Combobox · Autocomplete
**Overlay** Dialog · AlertDialog · Drawer · Popover · PreviewCard · Tooltip ·
Toast
**Navigation** Menu · ContextMenu · Menubar · NavigationMenu · Tabs ·
Breadcrumb _(plain)_ · Pagination _(plain)_
**Disclosure** Accordion · Collapsible
**Display** Avatar · Badge _(plain)_ · Card _(plain)_ · Kbd _(plain)_ ·
Callout _(plain)_ · Code _(plain)_ · Table _(plain)_ · Separator · Progress ·
Meter · Skeleton _(plain)_ · ScrollArea

### Measured component specs

| component             | spec                                                         |
| --------------------- | ------------------------------------------------------------ |
| Button / control      | `h 28 · radius 8 · 13px/500 · pad 0 10`                      |
| Button (pill variant) | `h 28 · radius 9999 · pad 0 10 0 6` (asymmetric, icon side)  |
| IconButton            | `28×28` or `24×24 · radius 9999 · pad 0 2`                   |
| Tab (segmented)       | `h 28 · radius 9999 · 12px/500`                              |
| Menu / Select option  | `h 32 · pad 0 18 0 14 · 13px/400`                            |
| Popover container     | `radius 12 · hairline border · shadow-popover`               |
| Dialog                | `radius 12 · hairline border · shadow-modal · 13vh from top` |
| Command palette       | `720w · input h 40 · group h 30 · row h 46`                  |
| Kbd                   | `radius 4 · 11px/400 · hairline border · gap 3`              |
| Avatar                | `20×20 · radius 8` (**not** a circle)                        |
| Input                 | `h 28 · radius 8`; large `h 40 · radius 12`                  |
| Hover surface         | `bg-3`                                                       |
| Sidebar item          | `h 28 · radius 8 · pad 0 9 0 8 · 13px/500`                   |

---

## 6. Testing

- **Behaviour:** vitest + @testing-library/react per component
- **Accessibility:** `axe-core` assertion per component, keyboard-nav tests for
  every overlay and composite widget
- **Build guard:** a real Lightning CSS build test asserting `dowel.css`
  compiles and contains **no unresolved `var(--dowel-…)`** — catches token
  typos before publish, which is otherwise a silent visual bug
- **Themes:** every component renders in light and dark in tests

---

## 7. Release

- **changesets** from the first commit
- GitHub Actions → `pnpm publish --provenance`
- **0.x for months.** No 1.0.0 until the API has lived in real apps. Phases
  land as 0.1.0, 0.2.0, 0.3.0 …
- `main` protected; all work via PR (karnstack convention)
- **Requires `NPM_TOKEN` in repo secrets** before the first publish workflow run

### Phasing

**Phase 1 — foundation + vertical slice (v0.1.0).** Token system, build
pipeline, docs site, release automation, and 8 components end-to-end:
Button, IconButton, Badge, Kbd, Input, Dialog, Menu, Tooltip.
Proves the whole pipeline before it is replicated 40×.

**Phases 2+ — fan out** the remaining 41 against the proven pattern, grouped
by family, one minor version per group.

---

## 8. Docs site

TanStack Start at `dowel.sh` — prerendered for SEO (discovery for a component
library is search-driven), React for live demos, same Router model as
`flue/web`. Dogfoods dowel: the docs site is built with the library.

Per component: live demo, props table, keyboard map, light/dark toggle,
copy-paste snippet.

**Prerendered**, so deployment is an assets-only Cloudflare Worker — the same
shape as `flue.sh`, no server runtime to operate.

---

## 9. Infrastructure

`dowel.sh` is already on Cloudflare (nameservers `craig`/`wally.ns.cloudflare.com`,
same account as `karnstack.com`).

### Deploy

`apps/docs` builds to static assets, served by an assets-only Worker:

```jsonc
// apps/docs/wrangler.jsonc
{
  "name": "dowel-sh",
  "compatibility_date": "2026-08-09",
  "assets": { "directory": "./dist" },
  "workers_dev": false,
  "routes": [{ "pattern": "dowel.sh", "custom_domain": true }],
}
```

Workflow mirrors `flue/.github/workflows/deploy-site.yml`:
`cloudflare/wrangler-action@v3` pinned to `wranglerVersion: "4"` (the action's
bundled default predates v4 and cannot read an assets-only config), and the
job **skips rather than fails** when the token is absent.

`www.dowel.sh` cannot be redirected from an assets-only Worker — that is a
dashboard Redirect Rule, same manual follow-up flue needed.

### Shared credentials → org level

Today the same credentials are duplicated per repo:

| secret                 | currently in | needed by |
| ---------------------- | ------------ | --------- |
| `NPM_TOKEN`            | kino, reins  | + dowel   |
| `CLOUDFLARE_API_TOKEN` | flue         | + dowel   |

Both move to **karnstack org secrets**, so a rotation is one update instead of
N. New repos inherit them.

**Precedence caveat:** a repo secret _shadows_ an org secret of the same name.
So after setting the org secrets, the per-repo duplicates in kino, reins and
flue must be deleted — otherwise those repos keep silently using their old
copies and a rotation appears to work while doing nothing.

Token scopes:

- `NPM_TOKEN` — npm **granular automation** token, write access to the
  `dowel`, `@karnstack/*` packages
- `CLOUDFLARE_API_TOKEN` — **Workers Scripts: Edit** on the karnstack account

Setting org secrets requires `admin:org` on the `gh` token; the default
`repo, read:org, gist` set returns 403.

**Plan constraint:** karnstack is on GitHub Free, where org secrets only reach
_public_ repositories. This is why dowel is public from the start rather than
private until launch — it is also the honest posture for a project whose
premise is an open homage.

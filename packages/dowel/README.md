# dowel

An opinionated React component library with Linear's visual language. One
look, well made — no config, no forking, no theme bikeshedding.

[dowel.sh](https://dowel.sh) · MIT

## Install

```bash
pnpm add dowel
```

## Use

```tsx
import "dowel/dowel.css";
import { Button } from "dowel";

<Button variant="primary">Ship it</Button>;
```

That is the whole setup. dowel is **ESM-only** — the `exports` map has no
`require` condition, so it needs a bundler or Node's ESM loader.

## Components

`Button` · `IconButton` · `Badge` · `Kbd` · `Input` (with `Field`) ·
`Dialog` · `Menu` · `Tooltip`

Behaviour comes from [Base UI](https://base-ui.com); every component is
keyboard-tested and axe-checked.

## Theming

There is no per-component `className` or `style` override API, by design. If
you need a different button, dowel is the wrong library. What you do get is a
root class, a theme switch and three variables.

### `.dowel-root`

Put it on an element that wraps your app. It supplies dowel's page defaults:
`--dowel-font`, the 13px `--dowel-fs-small` size, the 450 `--dowel-fw-normal`
weight, `--dowel-tracking`, `--dowel-text-2` for text and `--dowel-bg-1` for
the background.

```tsx
<div className="dowel-root">{/* your app */}</div>
```

Put it on `<html>` or `<body>` if you want that background to reach the
viewport edges instead of stopping at a content box. Any element carrying a
`data-dowel-theme` attribute picks up the same defaults, so a themed wrapper
does not need both.

### Dark mode

Light and dark ship in the one stylesheet. Three ways to reach dark:

- **`.dowel-dark`** — a class on any element. Applies to it and its subtree.
- **`[data-dowel-theme="dark"]`** — an attribute, same scope. This is the one
  to drive from a toggle.
- **System preference** — `@media (prefers-color-scheme: dark)` matching
  `:root:not(.dowel-light):not([data-dowel-theme="light"])`. It applies at the
  document root only, and the `:not()` guards are the light escape hatch: put
  `class="dowel-light"` or `data-dowel-theme="light"` on `<html>` to pin light
  against a dark OS setting. There is no `.dowel-light` token block — light is
  the `:root` default, so that class exists purely as the opt-out.

### Retheming

Three custom properties, and **they must be declared on `:root`**:

```css
:root {
  --dowel-hue: 210; /* a number, not a colour — retints every neutral */
  --dowel-accent: lch(49% 62 210);
  --dowel-accent-fg: lch(100% 0 0); /* text drawn on the accent */
}
```

`--dowel-accent-hover` (a `color-mix()` against the accent) and `--dowel-focus`
(a plain alias) both derive from `--dowel-accent`, so hover and focus follow a
retint for free. Custom properties resolve on the element that declares them,
which is why `:root` is the supported surface: override `--dowel-accent` on a
nested wrapper and the inherited `--dowel-accent-hover` still resolves against
the default accent, so buttons snap back to teal on hover.

`--dowel-accent-fg` is the one knob you have to think about, because dowel's
own two themes do not agree on it. The default accent is teal —
`lch(52% 32 195)` in light, lifted to `lch(68% 36 195)` in dark so it still
carries on near-black surfaces. Teal is luminous for its lightness, so the
dark accent leaves white text at 2.4:1; dark mode therefore draws a near-black
ink (`lch(14% 6 195)`, 6.4:1) on the accent instead of white. If you retheme to
a darker or less luminous hue, set `--dowel-accent-fg` to white and check the
result in both themes — the value that works for one is not automatically
right for the other.

## Typeface

dowel is designed for Inter but ships no font; it falls back to `system-ui`.
To match the docs:

```bash
pnpm add @fontsource-variable/inter
```

```ts
import "@fontsource-variable/inter";
import "dowel/dowel.css";
```

## Status

Pre-1.0. The API will change between minor versions.

## Licence

MIT

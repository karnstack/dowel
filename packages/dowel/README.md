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

That is the whole setup. Light and dark ship in the one stylesheet, switched
by class, data attribute or system preference.

## Components

`Button` · `IconButton` · `Badge` · `Kbd` · `Input` (with `Field`) ·
`Dialog` · `Menu` · `Tooltip`

Behaviour comes from [Base UI](https://base-ui.com); every component is
keyboard-tested and axe-checked.

## Theming

Two CSS variables — `--dowel-hue` and `--dowel-accent` — are the only
supported knobs. There is no per-component `className` or `style` override
API, by design. If you need a different button, dowel is the wrong library.

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

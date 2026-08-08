<div align="center">

# dowel

**An opinionated React component library.**
One look, well made. No config, no forking, no theme bikeshedding.

[dowel.sh](https://dowel.sh) · MIT

</div>

---

> A dowel is the small precision-turned pin that joins two pieces of wood.
> Identical, unglamorous, load-bearing. That is what a component is.

```bash
pnpm add dowel
```

```tsx
import "dowel/dowel.css";
import { Button } from "dowel";

<Button variant="primary">Ship it</Button>;
```

That is the whole setup. No Tailwind, no PostCSS config, no preset, no
`components.json`, no copy-in generator.

## What dowel is

- **A real package.** Import components, bump a version, get the fixes. Your
  UI does not drift across apps.
- **Opinionated on purpose.** There is no per-component override API. Retheming
  is two CSS variables: `--dowel-hue` and `--dowel-accent`.
- **Light and dark from day one**, in one stylesheet, by class, data attribute
  or system preference.
- **Accessible by construction.** Behaviour comes from
  [Base UI](https://base-ui.com); every component is keyboard-tested and
  axe-checked.

## What dowel is not

Not headless, not framework-agnostic, not a Tailwind plugin, not customisable
per component. If you need a different button, dowel is the wrong library —
that is the point.

## Typeface

dowel is designed for Inter. It falls back to `system-ui`, which works but
looks different. To match the docs:

```bash
pnpm add @fontsource-variable/inter
```

```ts
import "@fontsource-variable/inter";
import "dowel/dowel.css";
```

Inter is OFL-licensed. dowel does not bundle it, so you control whether it is
self-hosted or served from a CDN.

## Credit

dowel is an homage to the craft of [Linear](https://linear.app). Their
interface is the clearest argument I know that density, restraint and one
well-chosen hue beat a hundred configuration options.

I studied the visual language — the colour relationships, the type scale, the
28px control rhythm, the two elevation tiers — and reimplemented it from
measurements. dowel ships none of Linear's assets: not their logo, not their
icons, not their licensed typefaces.

**dowel is not affiliated with, endorsed by, or sponsored by Linear.**

Built by [Karn Gyan](https://karngyan.com) under
[karnstack](https://github.com/karnstack).

## Status

Pre-1.0 and moving. The API will change between minor versions until it has
lived in enough real apps to deserve a 1.0.0.

## Licence

MIT

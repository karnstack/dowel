# dowel

Opinionated React components for dense product interfaces.

[dowel.sh](https://dowel.sh) · [Components](https://dowel.sh/components) · MIT

StyleX. Base UI. TanStack Table. Light and dark included.

## Install

```bash
pnpm add @karnstack/dowel
```

## Use

```tsx
import "@karnstack/dowel/dowel.css";
import { Button, ThemeProvider } from "@karnstack/dowel";

<ThemeProvider theme="system">
  <Button variant="primary">Create</Button>
</ThemeProvider>;
```

## Components

Alert Dialog · Badge · Button · Callout · Checkbox · Composer · Data Table · Dialog · Icon Button · Input · Kbd · Menu · Native Select · Property Picker · Radio Group · Search Field · Select · Sidebar · Switch · Tabs · Tooltip

Visual controls own their appearance. Layout primitives accept application
hooks. Every theme, focus state, and interaction ships with the package.

See [dowel.sh](https://dowel.sh) for live examples and API details.

## Notes

- ESM only
- React 19
- Host Grotesk Variable recommended
- Pre-1.0, with no compatibility promises yet
- Releases stay on `0.0.x` until Sourcetown completes the first production integration. That milestone becomes `0.1.0`.

Inspired by Linear's craft and restraint. Not affiliated with Linear.

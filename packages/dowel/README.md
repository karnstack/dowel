# dowel

Opinionated React components for dense product interfaces.

[dowel.sh](https://dowel.sh) · [Components](https://dowel.sh/components) · MIT

StyleX. Base UI. TanStack Table. Light and dark included.

## Install

```bash
pnpm add dowel
```

## Use

```tsx
import "dowel/dowel.css";
import { Button, ThemeProvider } from "dowel";

<ThemeProvider theme="system">
  <Button variant="primary">Create</Button>
</ThemeProvider>;
```

## Components

Badge · Button · Composer · Data Table · Dialog · Icon Button · Input · Kbd · Menu · Property Picker · Sidebar · Tooltip

Visual controls own their appearance. Layout primitives accept application
hooks. Every theme, focus state, and interaction ships with the package.

See [dowel.sh](https://dowel.sh) for live examples and API details.

## Notes

- ESM only
- React 19
- Inter Variable recommended
- Pre-1.0, with no compatibility promises yet

Inspired by Linear's craft and restraint. Not affiliated with Linear.

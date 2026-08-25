# dowel

Opinionated React components for product interfaces.

[Website](https://dowel.sh) · [Components](https://dowel.sh/components) · [MIT](LICENSE)

Styled with StyleX. Built on Base UI and TanStack Table. Light and dark included.

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

The system theme is the default. Pass `light` or `dark` to pin a theme.

## Components

Badge · Button · Composer · Data Table · Dialog · Icon Button · Input · Kbd · Menu · Property Picker · Sidebar · Tabs · Tooltip

Every component is keyboard tested and axe checked. The rendered catalog is contrast tested against WCAG 2.2 AA in light and dark. Visual controls own their appearance. Layout primitives accept application shell hooks.

For the complete API and theme tokens, see the [package reference](packages/dowel/README.md).

Designed for Host Grotesk Variable. Inspired by the craft and restraint of Linear. Not affiliated with Linear.

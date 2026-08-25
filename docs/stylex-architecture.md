# StyleX architecture

**Date:** 2026-08-25

**Status:** approved direction
**StyleX baseline:** 0.19.0

## Decision

Dowel will use StyleX as its only component styling system. The published npm
package will contain compiled JavaScript plus one extracted `dowel.css` file.
Consumers will not install or configure StyleX.

This replaces the current plain CSS and Lightning CSS architecture. The
existing eight components and their CSS contracts are disposable because the
package has not been released. The migration should optimize for the final
system, not preserve the current API or generated markup.

## Why this distribution model

StyleX is both an authoring model and a compiler. `stylex.create()` keeps styles
next to components, turns declarations into shared atomic rules, and leaves a
small merge operation only where styles cross a file boundary. That is useful
inside Dowel.

Requiring every Dowel consumer to compile dependency source would be a poor
library contract. It would couple consumers to Dowel's compiler version,
module-resolution settings, and bundler integration. It would also fail in
tools that do not transform StyleX source from `node_modules`.

The package boundary is therefore:

```text
Dowel source (.tsx + .stylex.ts)
            |
            v
StyleX compile + TypeScript build
            |
            +--> dist/index.js       compiled class composition
            +--> dist/index.d.ts     public React types
            +--> dist/dowel.css      all extracted atomic rules
```

The consumer imports `@karnstack/dowel` and `@karnstack/dowel/dowel.css`. No Dowel `.stylex.ts`
source crosses the package boundary.

## Compiler configuration

Use the official `@stylexjs/unplugin` integration through its Rollup adapter.
The first implementation task must prove that the adapter runs correctly in
the current tsdown pipeline. If tsdown cannot expose the extracted asset
reliably, replace tsdown with a direct Rollup or Vite library build. The build
tool is not a compatibility constraint.

Target configuration:

```ts
stylex({
  dev: false,
  runtimeInjection: false,
  sxPropName: false,
  treeshakeCompensation: true,
  useCSSLayers: false,
  unstable_moduleResolution: {
    type: "commonJS",
    rootDir: packageRoot,
  },
})
```

Important constraints:

- The StyleX transform runs before the React transform in Vite.
- Production builds never inject styles from JavaScript.
- The extracted asset is normalized to `dist/dowel.css`.
- Component rules are unlayered. Layered library rules lose to every unlayered
  host reset regardless of selector specificity, which lets a generic
  `input { font: inherit }` rule break Dowel's visual contract. Unlayered
  StyleX classes still beat ordinary type-selector resets through specificity.
- The JSX `sx` shorthand is disabled. Component source uses
  `stylex.props(...)` explicitly and public component APIs never expose `sx`.
- ESLint uses the official StyleX plugin because the compiler intentionally
  accepts some invalid declarations instead of reporting authoring mistakes.
- CI fails if distributable JavaScript still imports `@stylexjs/stylex` source
  helpers that should have compiled away, or if it refers to `.stylex.ts`.

## Source organization

```text
packages/dowel/src/
  theme/
    tokens.stylex.ts
    light.stylex.ts
    dark.stylex.ts
    ThemeProvider.tsx
  primitives/
    button/
      Button.tsx
      Button.stylex.ts
  components/
    command-menu/
      CommandMenu.tsx
      CommandMenu.stylex.ts
  internal/
    focus-ring.stylex.ts
    typography.stylex.ts
```

A style file contains one component's styles or one explicitly shared mixin.
Do not create a utility-class layer in TypeScript. Shared semantics belong in
tokens, component composition, or a narrowly named internal mixin.

## Component pattern

```tsx
import * as stylex from "@stylexjs/stylex";

import * as styles from "./Button.stylex";

export function Button({ variant = "secondary", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      {...stylex.props(
        styles.root,
        styles.variant[variant],
        props.disabled && styles.disabled,
      )}
      style={undefined}
      data-variant={variant}
    />
  );
}
```

Local variant maps are ordinary StyleX style objects. No new variant DSL is
needed. The `data-variant` attribute is retained when it helps state inspection
or compound selectors, not as the styling engine.

## Public override policy

Using StyleX internally does not create a public styling escape hatch.
`className`, `style`, and `sx` remain absent from public props and are
neutralized after consumer props are spread. Dowel owns the component look.

The supported customization surface is semantic:

- documented component variants and sizes
- documented layout props on layout primitives
- `ThemeProvider` for `light`, `dark`, or `system`
- stable public `--dowel-*` theme variables
- composition through slots that the component explicitly exposes

Generated `sx-*` class names are never stable API.

## Tokens and themes

Tokens use named `stylex.defineVars()` exports from `.stylex.ts` files. Keys
start with `--dowel-` when the variable is public, which preserves a readable
custom property name in output CSS.

```ts
export const tokens = stylex.defineVars({
  "--dowel-bg-canvas": "#f7f7f6",
  "--dowel-text-primary": "#20201f",
  "--dowel-control-height": "28px",
});
```

Light and dark themes use `stylex.createTheme()`. `ThemeProvider` applies the
chosen theme class at the subtree root and sets `color-scheme`. System mode
tracks `prefers-color-scheme` without a flash during hydration. The first
implementation may use CSS `light-dark()` if server rendering and nested theme
tests prove it reliable.

The live Linear audit does not justify a fixed hue of 272. That hue belongs to
the audited Customer.io workspace theme. Dowel should start from quieter,
warmer neutral defaults and offer an intentional accent, while keeping color
values as Dowel-owned tokens.

## Style composition rules

- Put the base style first and the winning variant or state later.
- Pass style conditions directly to `stylex.props()`. Do not prebuild class
  strings or use `clsx`.
- Keep state close to the component that owns it. Cross-file style composition
  is allowed for genuine public style props, but Dowel currently exposes none.
- Prefer pseudo-classes and ARIA/data state selectors over event-driven hover
  state.
- Keep transitions to border, background color, color, and opacity unless a
  component interaction explicitly requires spatial motion.
- Honor `prefers-reduced-motion` for every nonessential animation.
- Use logical properties so right-to-left layouts work without duplicate
  component rules.

## CSS that remains outside StyleX

Plain CSS is limited to:

- `@font-face` declarations
- document-level reset rules used by the docs app
- browser features not representable by the current StyleX compiler
- documented third-party integration selectors

Every package-level exception gets a comment with the limitation and a test
that proves why it exists. There is no parallel component CSS architecture.

## Build and verification contract

The first StyleX implementation is complete only when all of these pass:

1. A clean `pnpm build` emits `index.js`, `index.d.ts`, and `dowel.css`.
2. A fixture Vite app imports the published tarball without a StyleX plugin.
3. A fixture SSR build renders without injecting style tags at runtime.
4. Every public component renders with styles after importing the one CSS file.
5. Duplicate semantic declarations collapse into atomic rules in the output.
6. Production JavaScript does not contain source style objects.
7. Light, dark, system, nested theme, right-to-left, forced-colors, and reduced
   motion cases have browser coverage.
8. The docs app uses the built package, not uncompiled source aliases.

## Sources

- [StyleX introduction](https://stylexjs.com/docs/learn/)
- [StyleX installation](https://stylexjs.com/docs/learn/installation/)
- [Thinking in StyleX](https://stylexjs.com/docs/learn/thinking-in-stylex/)
- [Style variants](https://stylexjs.com/docs/learn/recipes/variants/)
- [`defineVars`](https://stylexjs.com/docs/api/javascript/defineVars/)
- [Creating themes](https://stylexjs.com/docs/learn/theming/creating-themes/)
- [Light and dark themes](https://stylexjs.com/docs/learn/recipes/light-dark-themes/)
- [Unplugin configuration](https://stylexjs.com/docs/api/configuration/unplugin/)

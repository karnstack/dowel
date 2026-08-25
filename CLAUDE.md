# dowel - agent notes

## Writing style

- **Never use em dashes (`—`) or en dashes (`–`) as punctuation.** Not in code
  comments, commit messages, PR descriptions, docs prose, README copy, or
  replies to the user. Rewrite the sentence, or use a comma, colon,
  parenthesis, or full stop instead.
- A hyphen inside a compound word (`build-time`, `zero-runtime`) is fine. The
  rule is about dashes standing in for punctuation.
- This applies to text you generate anywhere in this repo and to anything you
  say about it.

## Workflow

- `main` is protected. Never commit to or merge into `main` locally.
- All work happens on a branch and lands via a pull request, even for one-line
  fixes. Push the branch, open the PR with `gh pr create`, hand back the URL.
- Package manager is pnpm. Never `npm` or `npx`. Node and pnpm versions are
  pinned in `mise.toml`; CI installs them via `jdx/mise-action`.
- TypeScript is pinned to 5.9.x. Do not move to 7.x (the Go port) without a
  deliberate decision: it generates the `.d.ts` every consumer depends on.

## Library rules (packages/dowel)

- **No override API.** `className` and `style` are omitted from every public
  prop type and neutralised at runtime. Do not add them back. If someone needs
  a different button, dowel is the wrong library. That is the point.
- Spread `{...props}` FIRST, then the result of `stylex.props(...)`, then
  `style={undefined}`. Spreading last lets a consumer strip the generated
  class and it typechecks clean, because JSX spreads skip excess-property
  checks.
- Author component styles with StyleX. Express variants as local style maps
  and boolean entries passed to `stylex.props()`. Use `data-*` attributes only
  when state must remain visible to CSS selectors or tests.
- Define public theme tokens with `stylex.defineVars()` in named `.stylex.ts`
  exports. Public custom properties start with `--dowel-`. Internal generated
  class names are opaque and must never be treated as API.
- Only `border`, `background-color`, `color`, `opacity` may transition. Never
  `all`, never transform or size on hover.
- Hairlines are `0.5px`. Controls are 28px. Base font weight is 450, UI labels
  500, workhorse size 13px.
- Hover rules need `:hover:not(:disabled):not([aria-disabled="true"])`, since
  `:not(:disabled)` is true for an anchor.
- No Tailwind and no class-name helper (`cx`/`clsx`). StyleX is the only
  component styling system. Do not add CSS Modules, styled-components,
  Emotion, or hand-authored component stylesheets alongside it.
- StyleX must compile at build time with runtime injection disabled. The npm
  package ships compiled JavaScript and one extracted `dowel.css`, so a
  consumer does not need a StyleX compiler.
- Plain CSS is reserved for font faces, document resets, and third-party escape
  hatches that StyleX cannot represent. Record every such exception in the
  architecture document.

## Testing

- jsdom cannot verify styling. It ignores every rule inside `@layer` and never
  substitutes `var()`. Do not write assertions about computed colour, geometry
  or hover: they cannot fail. Verify extracted StyleX rules against the built
  `dist/dowel.css` and use browser visual tests for rendered appearance.
- Vitest intercepts `console`. Grepping the run log cannot observe
  `console.error`. Use `vi.spyOn(console, "error")`.
- Base UI overlays open asynchronously. Use `findByRole`/`waitFor`, never a
  synchronous `getByRole` after a click: the synchronous form does not just
  fail, it can make the whole test pass vacuously.
- `pnpm test` requires a build first (the CSS contract test asserts against
  `dist/`). A `pretest` script handles this locally; CI builds before testing.

## Release

- changesets. A pending changeset in `.changeset/` triggers an npm publish on
  merge to main. If a change should not release, add an empty changeset.
- Secrets `NPM_TOKEN` and `CLOUDFLARE_API_TOKEN` live at the **karnstack org**
  level with visibility ALL. Never create repo-level copies: a repo secret
  shadows the org one and silently breaks rotations.

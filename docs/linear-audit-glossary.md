# Linear UI audit — measured glossary

Captured 2026-08-09 from `linear.app/karngyan` (dark theme) via reins.
All values are **measured computed styles**, not guesses. This is the input
spec for `dowel`.

---

## 1. The core insight

Linear's neutrals are **not grey**. Every surface, border and text colour is
`lch(L C 272)` — a single indigo hue at chroma `0.4–1.93`. Barely chromatic,
never neutral. Combined with `font-weight: 450` and negative tracking, this is
most of the reason the UI "feels" different from a Tailwind-default app.

Three rules reproduce ~80% of the look:

1. One hue (272) for every neutral, chroma 0.4→1.93 rising with lightness
2. Base text weight 450, not 400; UI labels 500
3. Everything interactive is 28px tall with a 0.15s transition

---

## 2. Colour system (dark, measured)

### Surfaces

| token                  | value                  |
| ---------------------- | ---------------------- |
| `bg-primary`           | `lch(5.52%  0.4  272)` |
| `bg-secondary`         | `lch(7.32%  0.85 272)` |
| `bg-tertiary`          | `lch(8.22%  1.3  272)` |
| `bg-quaternary`        | `lch(9.345% 0.85 272)` |
| app canvas / sidebar   | `lch(2.595% 0.4 272)`  |
| elevated (menu, modal) | `lch(12.72% 0.85 272)` |

### Borders

| token              | value                  |
| ------------------ | ---------------------- |
| `border-primary`   | `lch(9.84%  1.48 272)` |
| `border-secondary` | `lch(14.16% 1.48 272)` |
| `border-tertiary`  | `lch(16.32% 1.48 272)` |
| popover border     | `lch(25.68% 1.93 272)` |

### Text

| token             | value                  | use                         |
| ----------------- | ---------------------- | --------------------------- |
| `text-primary`    | `lch(100%    0   272)` | titles, selected            |
| `text-secondary`  | `lch(90.451% 1.2 272)` | body, control labels        |
| `text-tertiary`   | `lch(61.803% 1.2 272)` | metadata, idle tabs — **φ** |
| `text-quaternary` | `lch(36.975% 1.2 272)` | disabled                    |

`61.803` is the golden ratio. The ramp is φ-derived, not hand-picked.

### Accent

- brand / primary action: `#5e6ad2`
- focus ring: `#5e69d1`, `1px solid`, also seen as `0 0 0 1px`
- accent ramp: `#636fd7 #6974e1 #6b75df #727ce6 #6f7ffe`

### Light-theme anchors (exposed, not fully readable)

`bg base #f9f9fa` · `sidebar #efeff0` · `border #e2e2e2` · `text #23252a` ·
`elevated #fefeff` · `muted #b0b5c0`

Colour tokens are injected at runtime by JS (declared `initial` in CSS), so
the full light LCH ramp is not extractable without switching the account's
theme. dowel derives its own light ramp from the same hue-272 rule.

---

## 3. Type

Font: **Inter Variable** (`InterVariable.woff2`), mono: Berkeley Mono (licensed
— dowel must substitute).

| step    | size     | px  |
| ------- | -------- | --- |
| micro   | .6875rem | 11  |
| mini    | .75rem   | 12  |
| small   | .8125rem | 13  |
| regular | .9375rem | 15  |
| large   | 1.125rem | 18  |
| title3  | 1.25rem  | 20  |
| title2  | 1.5rem   | 24  |
| title1  | 2.25rem  | 36  |

Weights: `300 / 450 / 500 / 600 / 700` — **normal is 450**.

Tracking: `-0.26px` on 13px text (≈ `-0.02em`); editor `-0.00667em`;
page title `24px/600` at `-0.1px`.

**13px is the workhorse.** Sidebar items, list rows, control labels, menu
options are all 13px. 12px for tabs and section headers. 15px only for
body/editor copy.

---

## 4. Shape & elevation

| thing                        | value                    |
| ---------------------------- | ------------------------ |
| control radius               | `8px`                    |
| pill / tab / property button | `9999px`                 |
| popover, modal, input        | `12px`                   |
| kbd, small chip              | `4px`                    |
| editor block                 | `6px`                    |
| settings row                 | `10px`                   |
| avatar (20px)                | `8px` — **not a circle** |
| hairline border              | `0.5px`                  |

Two elevation tiers only:

```css
/* popover, dropdown, select, context menu */
box-shadow:
  0 3px 8px lch(0 0 0/0.125),
  0 2px 5px lch(0 0 0/0.125),
  0 1px 1px lch(0 0 0/0.125);

/* modal, command palette */
box-shadow:
  0 4px 40px lch(0 0 0/0.1),
  0 3px 20px lch(0 0 0/0.125),
  0 3px 12px lch(0 0 0/0.125),
  0 2px 8px lch(0 0 0/0.125),
  0 1px 1px lch(0 0 0/0.125);
```

Both pair with `border: 0.5px solid <border-tertiary>`. The 0.5px hairline plus
layered shadow is the "expensive" feel — a single 1px border loses it.

---

## 5. Motion

Declared: `quick .1s` · `regular .25s` · `slow .35s`, plus a full 18-curve
easing set (`ease-out-quad` = `cubic-bezier(.25,.46,.45,.94)` is the workhorse).

**Measured on real controls: `0.15s`** — and never `all`:

```css
transition:
  border 0.15s,
  background-color 0.15s,
  color 0.15s,
  opacity 0.15s;
```

Only these four properties animate. Nothing transitions transform or size on
hover. This is a deliberate restraint worth copying.

---

## 6. Component measurements

### Control heights

`24px` small icon button · `28px` **everything else** · `32px` menu option ·
`36px` filter input · `40px` command-palette input · `46px` palette row

### Segmented tabs (Assigned / Created / …)

```
height 28 · padding 0 10 · radius 9999 · font 12/500
idle   bg lch(10.149 0.593 272)  text lch(61.803 1.2 272)
active bg lch(16.706 0.979 272)  text lch(100 0 272)
border 0.5px solid transparent
```

### Sidebar item

```
height 28 · padding 0 9 0 8 · radius 8 · font 13/500
idle  text lch(60.621 1.2 272)
hover bg lch(8.445 1.3 272)   ← = bg-tertiary
active text lch(100 0 272)
transition color .15s
sidebar width 244px
```

### Property button (status, assignee, label — the pill)

```
height 28 · padding 0 10 0 6 · radius 9999 · font 13/500
text lch(90.451 1.2 272)
open bg lch(14.006 0.593 272)
transition border, background-color, color, opacity
```

Asymmetric padding: 6px left (icon side), 10px right.

### Icon button

```
28×28 · padding 0 2 · radius 9999 · border 0.5px solid transparent
24×24 · padding 0 4 · radius 9999   (compact)
hover bg lch(10.149 0.689 272)
```

### Popover / Select

```
container role=dialog · radius 12 · bg lch(12.72 0.85 272)
border 0.5px solid lch(25.68 1.93 272) · 3-layer shadow
width 207 (content-sized)
option li[role=option] · height 32 · padding 0 18 0 14 · font 13/400
option idle  text lch(91.178 1.425 272)
option selected text lch(100 0 272)
filter input height 36 · padding 10 0 9 · transition color .1s ease-in-out
```

### Command palette

```
dialog 720×450 · radius 12 · bg lch(12.72 0.85 272)
border 0.5px solid lch(25.68 1.93 272) · 5-layer shadow
positioned 13vh from top
input  height 40 · radius 12 · padding 11 12 · font 13/400
group  height 30 · padding 8 12 · font 12/500 · text lch(64.714 1.425 272)
row    height 46 · padding 0 12 · gap 12 · font 15/400
```

### Kbd

```
24×17 · padding 2 · radius 4 · font 11/400
border 0.5px solid lch(20.28 1.93 272)
text lch(64.714 1.425 272) · gap 3px between keys
```

### List row (issue)

```
id     13/450 · tracking -0.26px · text tertiary
title  13/500 · text primary
gap 4px between inline meta
group header 13/500 · text lch(90.826 1.425 272)
avatar 20×20 radius 8
```

### Editor / composer

```
title    24/600 · tracking -0.1px
body     15/450 · line-height 1.6 · tracking -0.00667em
```

---

## 7. What dowel must NOT copy

- Linear logo / wordmark
- Their custom icon set (redraw or use Lucide)
- **Berkeley Mono** — commercially licensed; substitute JetBrains Mono or
  ui-monospace
- Inter Variable is OFL — safe to use, but self-host our own copy
- Any claim of affiliation

Colour ramps, spacing, radii, motion curves and density are not protectable
and are fair to reimplement.

---

## 8. Screenshots

`linear-01-issues-dark.png` · `linear-02-cmdk.png` ·
`linear-03-issue-detail.png` · `linear-04-select.png`

## 9. Raw data

`linear-tokens-dark.json` — 507 custom properties

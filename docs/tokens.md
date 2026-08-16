# Design tokens

Tokens are the single source of visual truth. The authoritative definitions live in **`src/scss/base/_tokens.scss`** (build-time) and the compiled CSS custom properties (runtime). Values listed here are for orientation — if this page and the source file disagree, the source file wins.

## Sass vs runtime

IndigoKit keeps a deliberate boundary between build-time and runtime values:

- **Build-time (Sass):** the `$mu-*` and Bootstrap `$*-*` variables in `_tokens.scss`. These shape the compiled CSS and are the place to *change* the design system.
- **Runtime (CSS custom properties):** the `--bs-*` variables Bootstrap emits (plus the dark-theme overrides in `src/scss/base/_themes.scss` and `_base.scss`). These are what components actually consume, and they are what flips when the theme changes.

Only values that genuinely need runtime theming are exposed as CSS custom properties — not every Sass token is duplicated as a runtime variable.

## Colors

IndigoKit maps a curated palette onto Bootstrap's semantic color roles. Semantic roles stay **constant across themes** (indigo stays indigo) — themes change surfaces and emphasis, not meaning.

| Semantic role | Color | Hex |
|---|---|---|
| `$primary` | Indigo | `#4F46E5` |
| `$secondary` | Slate | `#64748B` |
| `$success` | Emerald | `#10B981` |
| `$info` | Cyan | `#06B6D4` |
| `$warning` | Amber | `#F59E0B` |
| `$danger` | Red | `#EF4444` |

### Dark-theme surface scale

| Token | Hex | Usage |
|---|---|---|
| `$mu-dark-bg` | `#0F172A` (slate-900) | Body, cards, tables, forms |
| `$mu-dark-surface` | `#1E293B` (slate-800) | Sidebar, modals, offcanvas, dropdowns, popovers |
| `$mu-dark-hover` | `#334155` (slate-700) | Item hovers, disabled surfaces, tracks |
| `$mu-dark-border` | `#475569` (slate-600) | Borders |
| `$mu-dark-text` | `#E2E8F0` (slate-200) | Body text |
| `$mu-dark-emphasis` | `#F8FAFC` (slate-50) | Emphasis text |
| `$mu-dark-focus` | `#A5B4FC` (indigo-300) | Focus indicator in dark |

## Typography

- Font stack: `"Inter", system-ui, -apple-system, "Segoe UI", Roboto, ...` — Inter is preferred but **not bundled**; the stack falls back gracefully.
- Weights: 400 / 500 / 600 / 700 (Bootstrap's normal / medium / semibold / bold).
- Headings, display, lead, and blockquote utilities all follow Bootstrap's typography scale.

## Spacing

- Base unit **4px** — Bootstrap's `$spacer` scale (0, 4, 8, 16, 24, 48px via `$spacers`) is reused as-is: `.p-2`, `.mt-4`, `.gap-3`, etc.
- No parallel spacing system.

## Border radius

| Token | Value |
|---|---|
| `$border-radius-sm` | 4px |
| `$border-radius` | 6px |
| `$border-radius-lg` | 8px |
| `$border-radius-xl` | 12px |
| `$border-radius-pill` | 9999px |

## Shadows

Subtle by design — enterprise, not decorative:

| Token | Value |
|---|---|
| `$mu-shadow-none` | none |
| `$mu-shadow-xs` | `0 1px 2px rgba(15, 23, 42, 0.04)` |
| `$mu-shadow-sm` | `0 1px 3px rgba(15, 23, 42, 0.07)` |
| `$mu-shadow-md` | `0 4px 8px rgba(15, 23, 42, 0.08)` |
| `$mu-shadow-lg` | `0 12px 24px rgba(15, 23, 42, 0.12)` |

## Motion

| Token | Value |
|---|---|
| `$mu-motion-fast` | 125ms |
| `$mu-motion-normal` | 200ms |
| `$mu-motion-slow` | 300ms |

Transitions come from Bootstrap (collapse, offcanvas, modal, carousel, accordion, tooltip/popover) plus IndigoKit's restrained hover states. All motion respects `prefers-reduced-motion` (Bootstrap ships the media query; IndigoKit adds no custom animation).

## Focus

- Ring: `0 0 0 0.25rem` via `--bs-focus-ring-color` — indigo in light, indigo-300 in dark.
- All components consume the same theme-aware ring variable; validated form controls use it too (see [Accessibility](accessibility.md#focus)).

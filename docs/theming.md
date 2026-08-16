# Theming

IndigoKit builds on **Bootstrap's own theme mechanism** — no custom theme API, no framework, no runtime engine.

## Theme modes

Set the theme with the `data-bs-theme` attribute on `<html>`:

```html
<html lang="en" data-bs-theme="light">
```

```html
<html lang="en" data-bs-theme="dark">
```

The attribute is the entire API. Bootstrap's `--bs-*` CSS custom properties re-resolve automatically; IndigoKit's components are all wired to those variables, so the whole library — buttons, forms, tables, overlays, navigation, feedback — flips with a single attribute change.

### Supported modes

| Mode | Behavior |
|---|---|
| `light` | Force light (the design baseline) |
| `dark` | Force dark |
| `system` | Follow `prefers-color-scheme` (resolved by the consumer) |

IndigoKit ships **no theme JavaScript**. Theme switching is implementation-level behavior for your application; the playground demonstrates it.

## Playground switcher (reference implementation)

`playground/theme.js` (~86 lines, vanilla, dependency-free) is the reference implementation — **playground-only, not part of the framework**. It shows the recommended pattern:

- **Default:** System preference when no explicit choice exists (never silently override a user's choice).
- **Persistence:** `localStorage` key `indigokit-theme`, allowlist-validated to `light` | `dark` | `system`. Invalid stored values fall back to System safely. Blocked storage degrades to session-only theming.
- **Initial load:** the script runs synchronously in `<head>`, before first paint, to avoid a flash of the wrong theme.
- **System mode:** `matchMedia('(prefers-color-scheme: dark)')` with the native `change` event — reacts to OS changes while System is active, no polling.
- **Security:** allowlist validation only — no `innerHTML`, no `eval`.

## Light theme

The light theme **is the design baseline** — the original visual system, verified unchanged. Body `#fff`, text `#0F1115`, indigo primary, slate secondary.

## Dark theme

The dark theme is intentionally designed, not an inversion:

- **Surfaces** form a hierarchy — body `#0F172A`, raised `#1E293B` (sidebar + overlays), hover `#334155`, borders `#475569`.
- **Text** — primary `#E2E8F0` (14.48:1 on body), secondary ≈8.5:1, emphasis `#F8FAFC`.
- **Semantic colors stay constant** — indigo stays indigo; Bootstrap's emphasis/tint families (`--bs-*-text-emphasis`, `-bg-subtle`, `-border-subtle`) flip to dark-friendly values.
- **Focus** — the ring becomes indigo-300 (`#A5B4FC`, ≈5.7–9:1) instead of solid indigo (which measured 2.85:1 on slate-900).
- **Overlays are raised** (modals, offcanvas, dropdowns, popovers, toasts sit on the slate-800 surface — mirroring light's white-on-white relationship). Bootstrap's backdrops go black at .5 opacity so dimming remains visible.

## Contrast across themes

Representative measured ratios (computed, both themes):

| Pair | Light | Dark |
|---|---|---|
| Body text | 18.9:1 | 14.48:1 |
| Secondary text | 9.62:1 | 8.53:1 |
| Links | 6.29:1 | 6.39:1 |
| Primary button | 6.29:1 | 6.29:1 |
| Outline button | 6.29:1 | 6.39:1 |
| Alerts (primary) | 11.18:1 | 6.68:1 |
| Badge (warning) | 9.78:1 | 9.78:1 |
| Table header | 21:1 | 17.06:1 |

Known exception: placeholder/disabled (tertiary) text runs ≈3.8:1 light / ≈4.46:1 dark — WCAG 1.4.3 exempts inactive/placeholder controls, and this matches Bootstrap's own defaults.

## Known limitations

- `.mu-card-interactive` hover shadow is subtle in dark (the border shift still communicates the state).
- The carousel caption follows Bootstrap's own black↔white flip; prefer content slides with visible text for captions in dark.
- Placeholder/disabled text contrast is Bootstrap parity (documented above).

## Future

Bootstrap's `[data-bs-theme="auto"]` remains an available alternative for system synchronization inside Bootstrap itself. The playground utility already covers the demo need; no framework-level change is required to adopt it later.

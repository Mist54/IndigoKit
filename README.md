# IndigoKit

A reusable **Modern + Enterprise** UI framework built on top of **Bootstrap 5.3.x**.

IndigoKit keeps Bootstrap's familiar class names as the public API and adds a small set of `mu-*` extensions for what Bootstrap does not provide (application shell, sidebar, navbar composition). The result: a developer who knows Bootstrap can use IndigoKit immediately, and the whole library — buttons, forms, tables, overlays, navigation — works in light and dark themes with a single `data-bs-theme` attribute.

## Status

- **v1.1.0** — UI refinement, design tokens, component polish, bug fixes.
- Component coverage: buttons, cards, alerts, badges, dropdowns, modals, tabs, breadcrumbs, pagination, forms, tables, progress, loading, toasts, list groups, empty states, tooltips/popovers, accordion, offcanvas, carousel, scrollspy, navigation patterns, and the application shell — plus the data-table and form-patterns pages.
- Application examples: dashboard, analytics dashboard, sales dashboard, profile, settings, pricing, FAQ, invoice, user list, products, five auth pages, four error pages — all built from Bootstrap classes + IndigoKit shell, with zero page-specific CSS.
- Layout examples: application shell, top navigation layout, landing page layout.

## What's New in v1.1.0

- **Design token system** — 50+ `--ik-*` CSS custom properties for spacing, color, typography, shadows, and component tokens. Consumers can customize without touching source.
- **Button transitions** — Smooth color/bg/border transitions on hover (5-property), subtle lift effect, proper reduced-motion support.
- **Card refinements** — `--ik-card-radius`, `--ik-card-shadow`, `--ik-card-padding` tokens. Interactive cards with hover lift effect.
- **Table refinements** — Styled headers (600 weight, uppercase, subtle bg), row hover transitions, reduced-motion support.
- **Nav refinements** — Flex alignment, icon scaling, hover transitions, active tab weight, underline indicator.
- **Form refinements** — Tighter label spacing, focused border/glow using `--ik-primary-ghost`, reduced-motion support.
- **Collapsed sidebar tooltips** — Plain nav links show a tooltip on hover in collapsed mode (matching flyout design).
- **Error pages** — Redesigned 404, 403, 500, and maintenance pages with professional, minimalist design.
- **Dark mode** — Full `--ik-*` dark mode overrides for colors, borders, shadows, and component tokens.
- **Reduced-motion** — All component transitions respect `prefers-reduced-motion: reduce`.
- **Fixed double scrollbar** — `html:has(.mu-app)` prevents page-level scrollbar on shell pages.
- **Fixed sidebar scroll** — `overscroll-behavior: contain` prevents scroll cross-contamination.
- **Fixed button foreground colors** — `.btn-success`, `.btn-danger`, `.btn-info` show white text consistently across all states.
- **Fixed Pages section bug** — Sidebar "Pages" group no longer expands incorrectly on non-Pages pages.
- **Chart.js on all three dashboards** — Revenue trend area chart + sales-by-channel doughnut on the main dashboard, line chart on Analytics, bar + category doughnut on Sales. All charts resolve IndigoKit tokens (`--bs-*` CSS variables), re-render on `data-bs-theme` change, respect `prefers-reduced-motion`, never duplicate instances, and keep visually-hidden data-table fallbacks (content survives without Chart.js). Doughnuts show a canvas-drawn center total.
- **Select2 dark mode** — the optional Select2 integration themes correctly in light and dark (explicit `[data-bs-theme="dark"]` overrides), with proper dropdown positioning above overlays.
- **UI consistency pass** — every component page shares one header pattern, all card headers use semantic `h2` titles, and all three dashboards share the same KPI card language (icon tile + value + trend badge).

## Philosophy

- **Bootstrap-first.** Bootstrap's API is the API. IndigoKit extends the implementation, never the class names.
- **Modern + Enterprise.** Clean, professional, data-dense interfaces with restrained motion, strong forms and tables, accessibility, and responsive behavior at every size.
- **SCSS is the source of truth.** Framework styling lives in `src/scss/`; the playground consumes the compiled output and never implements IndigoKit.

```html
<!-- Bootstrap's API stays the public API -->
<button type="button" class="btn btn-primary">Save</button>
```

## Quick start

```bash
npm install indigokit
```

```html
<!doctype html>
<html lang="en" data-bs-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="node_modules/indigokit/dist/css/indigokit.css">
</head>
<body>
  <div class="card" style="max-width: 24rem;">
    <div class="card-body">
      <h2 class="card-title h5">Projects</h2>
      <p class="card-text text-body-secondary">Manage your team's projects in one place.</p>
      <button type="button" class="btn btn-primary">New project</button>
    </div>
  </div>
  <script src="node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

### Local development

```bash
npm install
npm run build:css   # src/scss → dist/css/indigokit.css
npm run build:js    # src/js → dist/js/indigokit.js
```

## Design Tokens

IndigoKit provides `--ik-*` CSS custom properties that sit on top of Bootstrap's `--bs-*` variables:

```css
/* Customize IndigoKit without touching source */
:root {
  --ik-primary: #10B981;      /* Change primary color */
  --ik-card-radius: 1rem;     /* Change card radius */
  --ik-btn-radius: 9999px;    /* Pill buttons */
}
```

Available token categories:
- **Spacing** — `--ik-space-1` through `--ik-space-12` (4px base)
- **Colors** — `--ik-primary`, `--ik-text-primary`, `--ik-bg-page`, `--ik-border-*`
- **Shadows** — `--ik-shadow-sm` through `--ik-shadow-xl`
- **Radius** — `--ik-radius-sm` through `--ik-radius-full`
- **Typography** — `--ik-text-xs` through `--ik-text-4xl`, `--ik-font-*`
- **Motion** — `--ik-motion-fast` (125ms), `--ik-motion-normal` (200ms), `--ik-motion-slow` (300ms)
- **Components** — `--ik-card-*`, `--ik-table-*`, `--ik-input-*`, `--ik-btn-*`, `--ik-badge-*`, `--ik-nav-*`, `--ik-stat-*`

## Documentation

- **[Documentation home](docs/README.md)** — philosophy, quick example, component map.
- **[Getting started](docs/getting-started.md)** — requirements, install, build, usage.
- **[Principles](docs/principles.md)** — the Bootstrap-first rule and the `mu-*` policy.
- **[Design tokens](docs/tokens.md)** — colors, typography, spacing, radius, shadows, motion.
- **[Theming](docs/theming.md)** — light, dark, and system themes.
- **[Accessibility](docs/accessibility.md)** — semantics, keyboard, focus, contrast, motion.
- **[Optional integrations](docs/integrations.md)** — Chart.js and Select2, page-level opt-in, jQuery containment.
- **[Components](docs/components/)** — reference for every component.

## Playground

[`playground/index.html`](playground/index.html) is the live visual reference — every component with variants, responsive behavior, and both themes:

```bash
cd playground && python3 -m http.server 8080
```

## Structure

```
src/scss/      # framework SCSS (source of truth) → dist/css/indigokit.css
src/js/        # vanilla JS (shell behavior) → dist/js/indigokit.js
playground/    # visual development & reference environment
dist/          # generated — never edit by hand
docs/          # developer-facing documentation
```

## License

ISC.

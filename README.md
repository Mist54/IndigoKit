# IndigoKit

A reusable **Modern + Enterprise** UI framework built on top of **Bootstrap 5.3.x**.

IndigoKit keeps Bootstrap's familiar class names as the public API and adds a small set of `mu-*` extensions for what Bootstrap does not provide (application shell, sidebar, navbar composition). The result: a developer who knows Bootstrap can use IndigoKit immediately, and the whole library — buttons, forms, tables, overlays, navigation — works in light and dark themes with a single `data-bs-theme` attribute.

## Status

- **Phase: v1 execution — packaging in progress.** The component library, theme system, accessibility hardening, playground, and full developer documentation are complete. Package metadata (`package.json` fields, `LICENSE`, `files`/`exports`), a minified CSS build, and install/CDN docs are in place; publishing is deferred until the release gates pass.
- Component coverage: buttons, cards, alerts, badges, dropdowns, modals, tabs, breadcrumbs, pagination, forms, tables, progress, loading, toasts, list groups, empty states, tooltips/popovers, accordion, offcanvas, carousel, scrollspy, navigation patterns, and the application shell — plus the data-table and form-patterns pages.
- Application examples: dashboard, analytics dashboard, profile, settings, pricing, FAQ, invoice, user list, products, five auth pages, four error pages — all built from Bootstrap classes + IndigoKit shell, with zero page-specific CSS.

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
npm install
npm run build:css   # src/scss → dist/css/indigokit.css
npm run build:js    # src/js → dist/js/indigokit.js
```

```html
<!doctype html>
<html lang="en" data-bs-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="dist/css/indigokit.css">
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

# IndigoKit Documentation

**IndigoKit** is a reusable **Modern + Enterprise** UI framework built on top of **Bootstrap 5.3.x**. It keeps Bootstrap's familiar class names and adds a small set of `mu-*` extensions for concepts Bootstrap does not provide (application shell, sidebar, navbar composition).

IndigoKit is for data-heavy, professional interfaces: admin panels, CRUD screens, reports, user management, activity logs, financial data, settings, and search results. It prioritizes usability, accessibility, responsive behavior, and light + dark themes over decoration.

## Why Bootstrap?

Bootstrap is the foundation, not a dependency to hide.

- A developer who knows Bootstrap can use IndigoKit immediately — **no second class naming system**.
- Bootstrap's battle-tested JavaScript (modals, dropdowns, offcanvas, carousel, collapse, toasts, scrollspy, tabs) is reused as-is.
- IndigoKit *extends and refines* Bootstrap through SCSS variables, CSS custom properties, and a small set of components Bootstrap does not ship.

```html
<!-- Bootstrap's API stays the public API -->
<button type="button" class="btn btn-primary">Save</button>
```

## Design philosophy

- **Modern** — clean, professional, good whitespace, subtle shadows, controlled radius, restrained motion, light and dark themes.
- **Enterprise** — efficient use of screen space, excellent tables, strong forms, data-dense interfaces, clear navigation, accessibility, responsive at every size.
- **Avoid** — excessive gradients and animation, oversized rounded cards, decorative UI that hurts usability, Dribbble-style flash.

## Quick example

```html
<!doctype html>
<html lang="en" data-bs-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>My app</title>
  <link rel="stylesheet" href="dist/css/indigokit.css">
</head>
<body>
  <div class="card" style="max-width: 24rem;">
    <div class="card-body">
      <h2 class="card-title h5">Projects</h2>
      <p class="card-text text-body-secondary">Manage your team's projects in one place.</p>
      <button type="button" class="btn btn-primary">New project</button>
      <button type="button" class="btn btn-outline-secondary">View all</button>
    </div>
  </div>
  <script src="node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

See [Getting started](getting-started.md) for the full setup.

## Documentation map

| Section | Covers |
|---|---|
| [Getting started](getting-started.md) | Requirements, install, build, usage, Bootstrap compatibility |
| [Principles](principles.md) | The Bootstrap-first rule, the `mu-*` policy, do/don't conventions |
| [Design tokens](tokens.md) | Colors, typography, spacing, radius, shadows, motion — Sass vs runtime |
| [Theming](theming.md) | Light, dark, and system themes via `data-bs-theme` |
| [Accessibility](accessibility.md) | Semantic HTML, labels, keyboard, focus, contrast, reduced motion |
| [Optional integrations](integrations.md) | Chart.js and Select2 — page-level opt-in, loading, jQuery containment |
| [Components](components/) | Reference for every IndigoKit component |
| [Design guidelines](guidelines/) | **How to combine components** — foundations, states, navigation, overlays, composition patterns, do/don't |
| [API reference](api-reference.md) | **What IndigoKit actually exposes** — public classes, tokens, JS, theme API, and what is intentionally not an API |

## Components

| Component | Page |
|---|---|
| Buttons | [components/buttons.md](components/buttons.md) |
| Cards | [components/cards.md](components/cards.md) |
| Alerts | [components/alerts.md](components/alerts.md) |
| Badges | [components/badges.md](components/badges.md) |
| Dropdowns | [components/dropdowns.md](components/dropdowns.md) |
| Modals | [components/modals.md](components/modals.md) |
| Tabs | [components/tabs.md](components/tabs.md) |
| Breadcrumbs | [components/breadcrumbs.md](components/breadcrumbs.md) |
| Pagination | [components/pagination.md](components/pagination.md) |
| Forms | [components/forms.md](components/forms.md) |
| Tables | [components/tables.md](components/tables.md) |
| Progress | [components/progress.md](components/progress.md) |
| Loading | [components/loading.md](components/loading.md) |
| Toasts | [components/toasts.md](components/toasts.md) |
| List groups | [components/list-groups.md](components/list-groups.md) |
| Empty states | [components/empty-states.md](components/empty-states.md) |
| Tooltips | [components/tooltips.md](components/tooltips.md) |
| Popovers | [components/popovers.md](components/popovers.md) |
| Accordion | [components/accordion.md](components/accordion.md) |
| Offcanvas | [components/offcanvas.md](components/offcanvas.md) |
| Carousel | [components/carousel.md](components/carousel.md) |
| Scrollspy | [components/scrollspy.md](components/scrollspy.md) |
| Navigation patterns | [components/navigation-patterns.md](components/navigation-patterns.md) |

## Playground

The [`playground/`](../playground/index.html) directory is the **visual development and reference environment** — every component demonstrated live with variants, responsive behavior, and both themes. These docs are the developer-facing reference; the playground is where examples are proven visually. When the two disagree, the playground (and the source SCSS it consumes) is the source of truth.

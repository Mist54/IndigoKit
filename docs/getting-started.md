# Getting started

## Requirements

- Node.js (for the Sass build) and npm.
- No framework, no bundler, no TypeScript required. IndigoKit ships as SCSS + vanilla JavaScript.

## Installation

**Using IndigoKit in your application** (the package ships compiled CSS + JS in `dist/`):

```bash
npm install indigokit
```

Then link the compiled output (either local or via CDN):

```html
<!-- local -->
<link rel="stylesheet" href="node_modules/indigokit/dist/css/indigokit.css">
<script src="node_modules/indigokit/dist/js/indigokit.js"></script>

<!-- or CDN (unpkg / jsdelivr) -->
<link rel="stylesheet" href="https://unpkg.com/indigokit@1.1.0/dist/css/indigokit.min.css">
```

Interactive components (dropdowns, modals, collapse, tabs, toasts, …) are Bootstrap's JS. IndigoKit ships **no duplicate JS** for them — load Bootstrap's bundle once, before IndigoKit's script:

```html
<script src="node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
<script src="node_modules/indigokit/dist/js/indigokit.js"></script>
```

`bootstrap` is an **optional peer dependency**: the compiled CSS is self-contained, so CSS-only consumers never need to install it. Lucide is likewise an optional peer, needed only for IndigoKit's guarded icon-swap integration.

**Developing IndigoKit itself** (this repository):

```bash
npm install
```

Installs the approved dependencies:

| Package | Role |
|---|---|
| `bootstrap` ^5.3.8 | Foundation — SCSS imported into IndigoKit's entry file (optional peer; CSS-only consumers never install it) |
| `lucide` ^1.31.0 | Icon library (playground + optional JS integration) |
| `sass` (dev) | SCSS compiler |
| `chart.js` ^4.5.1 (optional) | Page-level charts — see [Optional integrations](integrations.md) |
| `select2` ^4.1.0 (optional) | Searchable/multi/tagging selects — see [Optional integrations](integrations.md) |
| `jquery` (dev, for IndigoKit itself) | Runtime dependency of the Select2 integration ONLY — contained in `dist/js/indigokit-select2.js` |

## Build

```bash
npm run build:css   # SCSS → dist/css/indigokit.css + .min.css (+ select2 theme pair)
npm run build:js    # src/js/*.js → dist/js/*.js (plain copy) + dist/js/*.min.js (minified)
```

- `build:css` resolves Bootstrap from `node_modules`, so the SCSS entry (`src/scss/indigokit.scss`) is the **source of truth** for all framework styling. It emits both the readable build and a compressed `indigokit.min.css` (no source map).
- `build:js` copies the two scripts unchanged (the debuggable variants) and writes minified `*.min.js` variants next to them. Minification is dependency-free and conservative (comments + whitespace only — semantics are untouched).
- Current sizes: `dist/css/indigokit.css` ≈ 299 KB, `dist/css/indigokit.min.css` ≈ 253 KB, `dist/js/indigokit.js` ≈ 23 KB, `dist/js/indigokit.min.js` ≈ 9.8 KB.
- **Never edit `dist/` by hand** — it is generated.

## Basic HTML usage

Include the compiled CSS in `<head>` and Bootstrap's JS (which IndigoKit relies on for interactive components) before `</body>`:

```html
<!doctype html>
<html lang="en" data-bs-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>My app</title>
  <link rel="stylesheet" href="dist/css/indigokit.min.css">
</head>
<body>
  <h1>Hello, IndigoKit</h1>
  <button type="button" class="btn btn-primary">Save</button>
  <script src="node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
  <script src="dist/js/indigokit.js"></script>
</body>
</html>
```

> The `data-bs-theme="light"` attribute is optional but recommended; see [Theming](theming.md).

This page is Bootstrap-compatible by design — every class in it comes from Bootstrap's public API.

## Icons

Lucide is the icon library. The UMD build is used in the playground; icons are PascalCase keys (`data-lucide="Plus"` etc.) and are initialized with `lucide.createIcons()`.

```html
<span data-lucide="Search" aria-hidden="true" class="me-1"></span>
```

Decorative icons use `aria-hidden="true"`; icon-only controls must carry an accessible name (e.g. `aria-label`). See [Accessibility](accessibility.md#icons).

## The application shell

IndigoKit adds a small set of `mu-*` classes for the application shell — the one area Bootstrap provides no equivalent. The shell composes Bootstrap navbar/dropdown/modal/offcanvas behavior inside a fixed layout:

```
.mu-app
├── .mu-app-navbar        (top bar)
├── .mu-app-side          (sidebar column)
│   └── .mu-sidebar       (collapsible navigation)
└── .mu-app-main
    └── .mu-app-content   (scrollable content)
```

See [Principles → The `mu-*` policy](principles.md#the-mu--policy) and the [layout playground page](../playground/pages/layout.html).

## Bootstrap compatibility

- IndigoKit **preserves** Bootstrap's class names, markup patterns, and JavaScript API.
- Bootstrap's JS bundle (`bootstrap.bundle.min.js`) provides dropdowns, modals, toasts, offcanvas, collapse/accordion, carousel, tabs, scrollspy, and tooltips/popovers.
- IndigoKit's own `dist/js/indigokit.js` is a small standalone file for the shell (sidebar collapse, focus management) — no framework, no build step.

## Optional integrations

Chart.js (charts) and Select2 (searchable selects) are **optional, page-level integrations** — never core requirements. See [Optional integrations](integrations.md) for the loading pattern, the `data-mu-select2` opt-in, and how jQuery is contained to the Select2 wrapper.

## Playground

The [`playground/`](../playground/index.html) is a live reference environment: every component with variants, responsive checks, and both themes. Open it locally with any static server:

```bash
cd playground && python3 -m http.server 8080
# or: npx serve playground
```

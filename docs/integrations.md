# Optional integrations

IndigoKit's core is Bootstrap + a small vanilla JS shell file. Two optional
libraries are approved and isolated so consumers can opt into them per page
without the core ever depending on them:

| Integration | What it adds | When to use it | Loads |
|---|---|---|---|
| **Chart.js** | Canvas charts (line/bar/doughnut) | Dashboard/analytics visualizations | Page-level `<script>` |
| **Select2** | Searchable, multi-select, and tagging selects | Large option lists that a native `<select>` handles poorly | Page-level jQuery + Select2 + IndigoKit wrapper |

Both follow the same rule: **the native Bootstrap control stays the default**,
and the integration is opt-in per page. Removing either leaves IndigoKit core
fully working.

Every production file ships in two variants: the readable unminified build
(for debugging) and a `*.min.*` build (for production). For the core that
means `dist/js/indigokit.js` / `dist/js/indigokit.min.js` and
`dist/css/indigokit.css` / `dist/css/indigokit.min.css`; the Select2 integration
ships `dist/js/indigokit-select2.js` / `.min.js` and
`dist/css/indigokit-select2.css` / `.min.css`. Swap in the minified variants
the same way — behavior is identical.

## Chart.js

Chart.js is loaded **page-level** — only pages that render a chart include it.
`dist/js/indigokit.js` never references Chart.js, and no global initialization
runs.

```html
<!-- before </body> -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.5.1/dist/chart.umd.min.js"></script>
```

The reference pattern lives in `playground/pages/dashboard-analytics.html`:

1. A `<canvas>` with `role="img"` and a descriptive `aria-label`.
2. A small guarded inline script — `if (!canvas || !window.Chart) return;` — so
   the page still works if the library is absent.
3. Colors resolved from IndigoKit's CSS variables (`--bs-primary`,
   `--bs-secondary`, `--bs-border-color`, `--bs-body-bg`, …), so the chart
   follows the theme.
4. A visually-hidden data table as the accessible fallback — the chart is
   **supplementary**, never the only representation of the data.
5. Theme changes re-render the chart (a `MutationObserver` on
   `data-bs-theme`); duplicate instances are destroyed via
   `Chart.getChart(canvas)`; `prefers-reduced-motion` disables animation.

Chart.js is an optional peer dependency (`chart.js ^4.5.1`). A CSS-only
consumer never needs it.

## Select2

Select2 upgrades native `<select class="form-select">` elements into
searchable / multi-select / tagging controls. The **native select remains the
default** — Select2 only touches elements that explicitly opt in:

```html
<!-- searchable single select -->
<select class="form-select" data-mu-select2>
  <option></option>
  <option value="a">Option A</option>
  ...
</select>

<!-- multi-select -->
<select class="form-select" data-mu-select2 multiple>
  ...
</select>

<!-- free tagging (options + typed values) -->
<select class="form-select" data-mu-select2 data-mu-select2-tags="true" multiple>
  ...
</select>
```

A `placeholder` attribute needs a leading empty `<option>`, matching
Select2's own requirement.

### Loading

Three things must be on the page, **in order**, before `</body>`:

```html
<script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0/dist/js/select2.min.js"></script>
<script src="node_modules/indigokit/dist/js/indigokit-select2.js"></script>
<link rel="stylesheet" href="node_modules/indigokit/dist/css/indigokit-select2.css">
```

The IndigoKit wrapper (`dist/js/indigokit-select2.js`) reads `data-mu-select2` and
initializes Select2 with IndigoKit styling. If jQuery or Select2 is missing it
does nothing — the native select stays.

### jQuery containment

Select2 4.1 requires a global jQuery at runtime. That dependency is **fully
contained**:

- `src/js/indigokit-select2.js` is **the only file in IndigoKit allowed to use
  `window.jQuery`**.
- `dist/js/indigokit.js` (the core) is jQuery-free — removing Select2 changes
  nothing about core behavior.
- jQuery is a `devDependency` for IndigoKit's own playground only; consumers who
  use Select2 supply their own copy (a CDN script tag is enough).
- No other IndigoKit component, page script, or utility may use jQuery.

### Styling and dark mode

`dist/css/indigokit-select2.css` themes the Select2 control and dropdown from
IndigoKit's tokens (`--bs-border-color`, `--bs-body-bg`, `--bs-primary`,
IndigoKit's focus ring), so the control matches `.form-select` geometry and
flips correctly in light and dark themes. It is a **separate stylesheet** —
it is never imported into `indigokit.css`, so CSS-only consumers of the core
don't download it.

### Accessibility notes

The wrapper restores the combobox's accessible name: Select2 hardcodes
`aria-labelledby` to its own container span, so the control would otherwise
announce the placeholder instead of the label. The wrapper looks up the
associated `<label for="...">` (or an explicit `aria-label` on the select)
and applies it to the rendered combobox. Label your selects normally and the
enhanced control keeps the same accessible name.

> **Do not use `data-select2` as the opt-in attribute.** jQuery's `.data()`
> auto-reads `data-*` attributes into its cache, and Select2 stores its
> instance under the `select2` key — a bare `data-select2=""` puts an empty
> string there and Select2's constructor then calls `.destroy()` on it
> (`TypeError: … destroy is not a function`). `data-mu-select2` avoids the
> collision entirely.

## Dependency summary

| Package | Kind | Needed by |
|---|---|---|
| `bootstrap` | optional peer | Core CSS (self-contained) and interactive JS |
| `lucide` | optional peer | Icon swap in `indigokit.js` (guarded) |
| `chart.js` | optional peer | Chart.js integration only |
| `select2` | optional peer | Select2 integration only |
| `jquery` | dev-only for IndigoKit itself | Select2 integration only (consumer supplies) |
| `sass` | dev-only | Building IndigoKit's SCSS from source |

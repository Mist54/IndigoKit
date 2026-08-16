# Offcanvas

## Purpose

Offcanvas is Bootstrap's — slide-in panels for mobile navigation, filters, and contextual settings. It's a secondary contextual/navigation surface and complements the desktop sidebar; it does **not** replace it.

## Bootstrap API

`.offcanvas` · `.offcanvas-start` · `.offcanvas-end` · `.offcanvas-top` · `.offcanvas-bottom` · `.offcanvas-header` · `.offcanvas-title` · `.offcanvas-body` · `data-bs-toggle="offcanvas"` · `data-bs-target` · `.btn-close` · `data-bs-dismiss="offcanvas"` · Bootstrap JS

## Basic Usage

```html
<button type="button" class="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#filters">
  Filters
</button>

<div class="offcanvas offcanvas-end" tabindex="-1" id="filters" aria-labelledby="filtersTitle">
  <div class="offcanvas-header">
    <h2 class="offcanvas-title" id="filtersTitle">Filters</h2>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <!-- search, selects, checkboxes, Apply / Reset -->
  </div>
</div>
```

## Variants

- Directions: `.offcanvas-start` (navigation), `.offcanvas-end` (filters/settings), `.offcanvas-top` / `.offcanvas-bottom` (rarely — only where genuinely useful).
- Mobile navigation: a Bootstrap navbar toggler opening an offcanvas containing the existing nav links — one navigation system, not a second one.
- Filter panels: the existing form system (search, select, checkbox, switches, Apply/Reset) inside `.offcanvas-body`.

## Accessibility

- Accessible name via `aria-labelledby` → `.offcanvas-title` (or `aria-label`).
- Bootstrap's focus lifecycle: focus into the panel, containment, Escape to close, focus return; the backdrop closes on click.
- Real `.btn-close` with `aria-label="Close"`.
- Long content scrolls within `.offcanvas-body`; background content is inert while open.

## Responsive Behavior

Widths fit 320–430px with the close button reachable; body scroll locks while open; zero viewport overflow at every tested width (320 → 1440px).

## Theming

Panels sit on the raised surface in dark (slate-800); backdrop becomes black at .5 opacity in dark; transition respects `prefers-reduced-motion`.

## Offcanvas vs sidebar

| | Offcanvas | Sidebar |
|---|---|---|
| Purpose | Temporary panel (mobile nav, filters, contextual) | Persistent desktop navigation |
| Presence | Overlay on demand | Always visible (collapsible) |
| Use on mobile | Yes — the primary pattern | Collapses/hides |

## Do

- Use `class="offcanvas offcanvas-end"` (or `-start`/`-top`/`-bottom`) — Bootstrap's API.
- Rely on Bootstrap's focus behavior (focus in, containment, Escape, focus return).

## Don't

- Don't use `class="mu-drawer"` or a custom drawer system.
- Don't write custom focus management — Bootstrap handles it.

## Playground

[Playground — offcanvas](../playground/pages/offcanvas.html)

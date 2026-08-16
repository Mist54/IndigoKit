# Principles

## The Bootstrap-first rule

IndigoKit does **not** replace Bootstrap's familiar API. For every component that has an established Bootstrap class, the Bootstrap name is the public API — IndigoKit extends the *implementation*, never the class name.

> A developer familiar with Bootstrap can use IndigoKit without learning a second class naming system.

**GOOD** — Bootstrap classes:

```html
<button type="button" class="btn btn-primary btn-sm">Save</button>
<div class="table-responsive">
  <table class="table table-striped table-hover">
    <!-- ... -->
  </table>
</div>
```

**NOT** — parallel IndigoKit classes (forbidden):

```html
<button type="button" class="mu-btn-primary mu-btn-sm">Save</button>
<div class="mu-table">
  <!-- ... -->
</div>
```

This rule is permanent and applies to all IndigoKit usage. `mu-*` classes exist only where Bootstrap has **no equivalent concept**.

## The `mu-*` policy

`mu-*` classes are permitted only when:

1. Bootstrap provides no equivalent concept, **or**
2. IndigoKit introduces genuinely new functionality that cannot be expressed with Bootstrap's API.

### Sanctioned `mu-*` API (application shell)

| Class | Purpose |
|---|---|
| `.mu-app`, `.mu-app-body` | Application shell root / body |
| `.mu-app-navbar` | Fixed top bar (wraps Bootstrap navbar content) |
| `.mu-app-side` | Sidebar column |
| `.mu-app-main`, `.mu-app-content` | Main content area |
| `.mu-app-top`, `.mu-app-backdrop` | Top strip / mobile backdrop |
| `.mu-sidebar` (+ `.mu-sidebar-nav`, `.mu-sidebar-link`, `.mu-sidebar-nested`, `.mu-sidebar-section`, `.mu-sidebar-label`, `.mu-sidebar-header`, `.mu-sidebar-close`, `.mu-sidebar-badge`, `.mu-sidebar-list`) | Collapsible navigation sidebar |
| `.mu-navbar-main`, `.mu-navbar-actions`, `.mu-navbar-user`, `.mu-user-name` | Navbar composition |
| `.mu-avatar` | Avatar image treatment |
| `.mu-card-interactive` | Card hover affordance (border + shadow shift) |

### Classification

The full `mu-*` surface in `src/scss/` — 25 classes, the only ones that exist:

| Category | Classes | Notes |
|---|---|---|
| **Public layout API** | `.mu-app`, `.mu-app-body`, `.mu-app-top`, `.mu-app-backdrop`, `.mu-app-navbar`, `.mu-app-side`, `.mu-app-main`, `.mu-app-content` | Compose the application shell; safe in consumer markup |
| **Sidebar family** | `.mu-sidebar` + `.mu-sidebar-nav`, `.mu-sidebar-link`, `.mu-sidebar-link-text`, `.mu-sidebar-nested`, `.mu-sidebar-section`, `.mu-sidebar-label`, `.mu-sidebar-header`, `.mu-sidebar-close`, `.mu-sidebar-badge`, `.mu-sidebar-list` | Use `.mu-sidebar` as the container; the sub-classes style its internals — treat them as implementation detail and copy the [layout playground page](../playground/pages/layout.html) markup |
| **Navbar composition** | `.mu-navbar-main`, `.mu-navbar-actions`, `.mu-navbar-user`, `.mu-user-name` | Optional slots inside `.mu-app-navbar` |
| **Small utilities** | `.mu-avatar`, `.mu-card-interactive` | Avatar image treatment; card hover affordance |

Playground-only presentation classes (`.demo-*` in `playground/playground.css`) are **never** public IndigoKit API — they exist only to style the playground demos.

### Forbidden `mu-*` classes

Buttons, alerts, badges, forms, cards, tables, pagination, modals, dropdowns, progress, spinners, toasts, list groups, accordions, offcanvas, carousels, tooltips, popovers, tabs — every component Bootstrap already provides. `.mu-btn*`, `.mu-table*`, `.mu-toast*`, `.mu-progress*`, `.mu-spinner*`, `.mu-form*`, `.mu-tooltip*`, `.mu-carousel*`, `.mu-modal*`, etc. are **never** valid.

If a new concept is genuinely needed, propose the `mu-*` class and document why Bootstrap cannot express it before using it.

## Do / Don't

| Component | DO | DON'T |
|---|---|---|
| Buttons | `class="btn btn-primary"` | `class="mu-btn-primary"` |
| Tables | `<div class="table-responsive"><table class="table">` | `<div class="mu-table">` |
| Forms | `class="form-control"`, `class="form-select"` | `class="mu-form-control"` |
| Toasts | `class="toast"` inside `class="toast-container"` | `class="mu-toast"` |
| Progress | `class="progress"` + `class="progress-bar"` | `class="mu-progress"` |
| Loading | `class="spinner-border spinner-border-sm"` | `class="mu-spinner"` |
| Accordion | `class="accordion"` + `class="accordion-button"` | `class="mu-accordion"` |
| Offcanvas | `class="offcanvas offcanvas-end"` | `class="mu-drawer"` |
| Carousel | `class="carousel"` + `class="carousel-item"` | `class="mu-carousel"` |

## Styling architecture

- **SCSS is the source of truth.** All framework styling lives in `src/scss/` and is compiled to `dist/css/indigokit.css`.
- Never place framework styling in HTML (`<style>` blocks or `style="..."` attributes).
- Prefer design tokens and Bootstrap CSS variables over hard-coded values (see [Design tokens](tokens.md)).
- Avoid `!important` and excessive specificity; extend Bootstrap's SCSS variables rather than duplicating rules.
- The playground **consumes** the compiled output — it demonstrates IndigoKit, it does not implement it.

## Documentation vs playground

- `playground/` is the **visual development and reference environment** — live proof of every component, variant, responsive state, and theme.
- `docs/` is the **developer-facing reference** — how to use IndigoKit correctly and why.
- Examples in these docs are deliberately minimal; the playground shows the full range.

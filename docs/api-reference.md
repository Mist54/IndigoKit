# API reference

This is the authoritative reference for what IndigoKit actually exposes. Everything here is verified against the implementation (`src/` → `dist/css/indigokit.css`, `dist/js/indigokit.js`) and Bootstrap 5.3.8. If an API is not listed here, it does not exist.

## The Bootstrap API principle

**IndigoKit's primary public API is Bootstrap's API.** IndigoKit refines the implementation of Bootstrap components through SCSS variables and CSS custom properties; the class names, markup, and JavaScript behavior are Bootstrap's.

### Preferred

```html
<button type="button" class="btn btn-primary btn-sm">Save</button>
<div class="card"><div class="card-body">…</div></div>
<table class="table table-striped table-hover">…</table>
```

### Not IndigoKit API

```html
<button type="button" class="mu-btn-primary mu-btn-sm">Save</button>
<div class="mu-card">…</div>
<div class="mu-table">…</div>
```

This rule is permanent: **no `mu-*` class exists for any component Bootstrap already provides.** If you are tempted to write one, use the Bootstrap class.

## Bootstrap APIs in use

The full Bootstrap 5.3.8 surface is available and documented component-by-component in [Components](components/): `.btn*`, `.card*`, `.alert*`, `.badge*`, `.dropdown*`, `.modal*`, `.nav*`, `.nav-tabs`, `.nav-pills`, `.tab-*`, `.breadcrumb*`, `.pagination*`, `.form-*` (controls, checks, switches, ranges, floating, input groups, validation), `.table*` (incl. contextual and `.table-group-divider`), `.progress*`, `.spinner-*`, `.toast*`, `.list-group*`, `.tooltip`, `.popover`, `.accordion*`, `.collapse`, `.offcanvas*`, `.carousel*`, Scrollspy data attributes, and the full utility system (`p-*`, `m-*`, `gap-*`, `d-*`, `text-*`, `bg-*`, `border-*`, `rounded-*`, `position-*`, responsive variants).

Bootstrap's JavaScript API (`bootstrap.*` — Modal, Dropdown, Toast, Offcanvas, Collapse, Carousel, Tab, ScrollSpy, Tooltip, Popover) is the interactive API. Bootstrap's data attributes (`data-bs-toggle`, `data-bs-target`, `data-bs-dismiss`, `data-bs-ride`, `data-bs-slide`, `data-bs-slide-to`, `data-bs-parent`, `data-bs-placement`, `data-bs-title`, `data-bs-content`, `data-bs-trigger`, `data-bs-delay`, `data-bs-autohide`, `data-bs-spy`, `data-bs-root-margin`, `data-bs-offset`, `data-bs-auto-close`, …) are used exactly as Bootstrap documents. `data-bs-theme` is consumed by **CSS**, not JS.

## Public IndigoKit tokens (Sass)

Build-time variables defined in `src/scss/base/_tokens.scss` (and `_themes.scss`). These are the documented customization surface — override them before importing IndigoKit's SCSS:

| Token | Value | Role |
|---|---|---|
| `$mu-indigo` / `$mu-slate` / `$mu-cyan` / `$mu-emerald` / `$mu-amber` / `$mu-red` | `#4F46E5` / `#64748B` / `#06B6D4` / `#10B981` / `#F59E0B` / `#EF4444` | Palette |
| `$primary` … `$danger` | mapped from the palette | Bootstrap semantic roles |
| `$border-radius-sm` / base / `-lg` / `-xl` / `-pill` | 4 / 6 / 8 / 12px / pill | Radius scale |
| `$mu-shadow-none` / `-xs` / `-sm` / `-md` / `-lg` | see [Tokens](tokens.md) | Shadow scale |
| `$mu-motion-fast` / `-normal` / `-slow` | 125 / 200 / 300ms | Motion scale |
| `$mu-dark-bg` … `$mu-dark-focus` | see [Tokens](tokens.md) | Dark theme scale |

**Internal implementation variables** (e.g. `$mu-sidebar-width`, `$mu-sidebar-width-collapsed`, `$mu-backdrop-bg`, `$focus-ring-*`) exist in the same files and are *available* to advanced customizers but are not part of the stable public token surface — treat their names as changeable.

**Runtime CSS variables** — the `--bs-*` custom properties Bootstrap emits (plus the dark overrides). Components consume these; consumers can read/override them at runtime. See [Tokens](tokens.md#sass-vs-runtime).

## Public IndigoKit classes

The complete `mu-*` surface — **25 classes, all verified in `dist/css/indigokit.css`**. Every one exists because Bootstrap provides no equivalent concept.

### Application shell (public layout API)

| Class | Purpose |
|---|---|
| `.mu-app` | Shell root — fixed full-viewport layout |
| `.mu-app-body` | Shell body row (navbar + side + main) |
| `.mu-app-top` | Top strip above the navbar |
| `.mu-app-backdrop` | Mobile backdrop under the drawer |
| `.mu-app-navbar` | Fixed top bar (contains Bootstrap navbar content) |
| `.mu-app-side` | Sidebar column |
| `.mu-app-main` | Main column |
| `.mu-app-content` | Scrollable content region |

### Sidebar family

`.mu-sidebar` (container) + `.mu-sidebar-nav`, `.mu-sidebar-link`, `.mu-sidebar-link-text`, `.mu-sidebar-nested`, `.mu-sidebar-section`, `.mu-sidebar-label`, `.mu-sidebar-header`, `.mu-sidebar-close`, `.mu-sidebar-badge`, `.mu-sidebar-list`.

**Usage note:** `.mu-sidebar` is the public container; the sub-classes style its internals. Copy the [layout playground page](../playground/pages/layout.html) markup rather than composing them ad hoc — they are implementation-shaped.

### Navbar composition

`.mu-navbar-main`, `.mu-navbar-actions`, `.mu-navbar-user`, `.mu-user-name` — optional slots inside `.mu-app-navbar`.

### Small utilities

`.mu-avatar` (avatar image treatment), `.mu-card-interactive` (card hover affordance — border + shadow shift on hover).

## JavaScript API

| Asset | What it provides | Public API |
|---|---|---|
| `bootstrap.bundle.min.js` (Bootstrap 5.3.8) | All interactive components — dropdowns, modals, toasts, offcanvas, collapse/accordion, carousel, tabs, scrollspy, tooltips, popovers | Bootstrap's `bootstrap.*` + data attributes |
| `dist/js/indigokit.js` | The application shell only — desktop sidebar collapse, mobile drawer, focus management, `aria-expanded` sync, backdrop | **No global API** — self-initializing IIFE; consumers include the file and get shell behavior |
| `playground/theme.js` | Playground-only theme switching (Light/Dark/System + `localStorage`) | `window.playgroundTheme = { get(), set() }` — **not part of IndigoKit** |

IndigoKit ships **no theme JavaScript** in the framework and **no custom component engines**. `dist/js/indigokit.js` is a plain vanilla IIFE with no exports — there is no `window.mistUI` object to document.

## Theme API

- **Mechanism:** `data-bs-theme="light"` / `data-bs-theme="dark"` on `<html>` — Bootstrap's own system. This is the *entire* theme API.
- **System mode:** follows `prefers-color-scheme`; implemented by the consumer (reference: `playground/theme.js`).
- **Persistence key (playground reference):** `localStorage["indigokit-theme"]`, allowlist `light` / `dark` / `system`.
- Semantic colors stay constant across themes; surfaces, emphasis, borders, and focus flip via `--bs-*`. See [Theming](theming.md).

## What is intentionally NOT an API

- **No `mu-*` duplicates of Bootstrap components** — `.mu-btn*`, `.mu-card`, `.mu-alert`, `.mu-badge`, `.mu-table`, `.mu-form*`, `.mu-modal`, `.mu-dropdown`, `.mu-tabs`, `.mu-pagination`, `.mu-accordion`, `.mu-offcanvas`, `.mu-carousel`, `.mu-tooltip`, `.mu-popover`, `.mu-toast` do not exist and never will (audited: zero occurrences in `src/`).
- **No theme classes** — `.mu-theme*`, `.mu-dark`, `.mu-light`, switcher components are not framework API.
- **No data-grid framework** — no sorting/filtering/selection engines; tables render data.
- **No loading/progress/toast managers** — Bootstrap's components and data attributes are the API.
- **No framework-level JavaScript API** — `window.mistUI` does not exist.
- **Playground-only classes** (`.demo-*` in `playground/playground.css`) are presentation helpers for the demo environment — never use them in an application.
- **Internal Sass variables** beyond the documented token set are not stable API.

## Package metadata (current)

From `package.json` — informational; packaging comes in a later task:

| Field | Value |
|---|---|
| name | `indigokit` |
| version | `1.0.0` |
| license | ISC |
| dependencies | `bootstrap` ^5.3.8, `lucide` ^1.31.0 |
| devDependencies | `sass` ^1.102.0 |
| scripts | `build:css` (Sass CLI → `dist/css/indigokit.css`), `build:js` (copy `src/js/indigokit.js` → `dist/js/indigokit.js`) |

## Related

- [Principles](principles.md) — the rules this reference derives from.
- [Tokens](tokens.md) · [Theming](theming.md) · [Components](components/) · [Design guidelines](guidelines/)

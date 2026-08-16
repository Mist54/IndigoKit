# Engineering guidelines

How to extend IndigoKit without breaking it.

## SCSS guidelines

- **SCSS is the source of truth.** All framework styling lives in `src/scss/` and compiles to `dist/css/indigokit.css`. Never put framework styling in HTML (`<style>` or `style="…"`).
- **Use tokens.** Reference `$mu-*` and Bootstrap variables in SCSS; reference `--bs-*` custom properties at runtime. No hard-coded hex in components.
- **Extend Bootstrap variables, don't duplicate Bootstrap CSS.** If Bootstrap already styles it, refine via its variables — don't copy its rules.
- **Avoid `!important`** unless documented and unavoidable.
- **Avoid excessive specificity and deep nesting.**
- **`mu-*` only when genuinely necessary** — Bootstrap has no equivalent concept and the capability can't be expressed with its API (see [Principles](../principles.md#the-mu--policy)).
- Component styling → `src/scss/components/`; layout → `src/scss/layout/`; tokens/theming → `src/scss/base/`.

## JavaScript guidelines

- **Bootstrap's JS first.** Dropdowns, modals, toasts, offcanvas, collapse, carousel, tabs, scrollspy, tooltips/popovers — use `bootstrap.bundle.min.js` and data attributes. Never reinvent them.
- **Vanilla JS where necessary** — IndigoKit's own JS (`src/js/indigokit.js`) is a small standalone vanilla file for the shell (sidebar collapse, focus management, aria sync).
- **No framework required.** IndigoKit adds no React/Vue/jQuery dependency in its core. The one exception is the approved optional Select2 integration, whose jQuery requirement is contained exclusively in `src/js/indigokit-select2.js` (see [Optional integrations](../integrations.md)) — `indigokit.js` stays vanilla.
- **No duplicate component engines** — one dropdown system, one modal system, one spinner API.
- **No unnecessary dependencies.** Before adding one, explain the problem, why the existing stack can't solve it, and the bundle impact (see [Rules](../principles.md)).

## Playground relationship

Three layers, each with a job:

| Layer | Role |
|---|---|
| `playground/` | **Visual experimentation & reference** — live demos of every component, variant, responsive state, and theme |
| `docs/` | **Developer guidance** — how to use IndigoKit correctly and why |
| `src/scss/` + `src/js/` | **Implementation truth** — what the framework actually is |

Rules:

- The playground **consumes** the compiled output (`dist/css/indigokit.css`) — it demonstrates IndigoKit, it never implements it. Playground-only presentation goes in `playground/playground.css` (never framework styles).
- When docs and playground disagree, the source (`src/`) and the compiled output win.
- Every significant component change lands in `src/` first, then gets a playground demo — never the reverse.

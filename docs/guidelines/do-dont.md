# Do / Don't patterns

## Bootstrap API first

```html
<!-- GOOD -->
<button type="button" class="btn btn-primary">Save</button>
<div class="table-responsive"><table class="table">…</table></div>

<!-- BAD -->
<button type="button" class="mu-btn-primary">Save</button>
<div class="mu-table">…</div>
```

## Labels, not placeholders

```html
<!-- GOOD -->
<label for="email">Email</label>
<input type="email" id="email" class="form-control">

<!-- BAD — placeholder used as the only label -->
<input type="email" class="form-control" placeholder="Email">
```

## Semantic structure

```html
<!-- GOOD — real heading, real button -->
<div class="card"><div class="card-body">
  <h2 class="card-title h5">No projects yet</h2>
  <button type="button" class="btn btn-primary">Create project</button>
</div></div>

<!-- BAD — clickable div pretending to be interactive -->
<div class="card" onclick="…">…</div>
```

## Icon-only controls

```html
<!-- GOOD — icon aria-hidden, accessible name on the button -->
<button type="button" class="btn btn-outline-secondary" aria-label="Delete project">
  <span data-lucide="Trash2" aria-hidden="true"></span>
</button>

<!-- BAD — icon with no accessible name -->
<button type="button" class="btn btn-outline-secondary"><span data-lucide="Trash2"></span></button>
```

## Status is never color-only

```html
<!-- GOOD — text + color -->
<span class="badge text-bg-success">Healthy</span>

<!-- BAD — green alone -->
<span class="badge text-bg-success"></span>
```

## Anti-patterns (IndigoKit discourages these)

| Anti-pattern | Instead |
|---|---|
| Custom duplicate Bootstrap classes (`.mu-btn`, `.mu-table`) | Use the Bootstrap class — IndigoKit already refined it |
| **Excessive cards** — every row wrapped in a card | Cards for meaningful groups; lists/tables for continuous content |
| **Excessive colors** — semantic colors used decoratively | Semantic colors for meaning; neutrals for everything else |
| **Giant icons** — oversized decorative icons | Restrained icons (default Lucide size) |
| **Modal abuse** — a modal for every message | Toast for feedback, alert for persistent info, modal for decisions |
| **Tooltip-only labels** — meaning lives only in a tooltip | Real labels/content; tooltip is supplementary |
| **Clickable divs** | Real buttons and links |
| **Inline styles** (`style="…"`) for framework styling | Bootstrap utilities and IndigoKit SCSS |
| **Hard-coded theme colors** (`#fff` in markup) | `--bs-*` variables / utilities |
| **Unnecessary custom JavaScript** — reinvented dropdowns, menus, spinners | Bootstrap's JS and data attributes |

## Practical accessibility (quick checks)

- **Icon-only button** → `aria-label` on the button, `aria-hidden="true"` on the icon.
- **Form field** → `<label for>`, `.form-text`/`aria-describedby` for help, `.invalid-feedback` text for errors, `required` + visible marker.
- **Table** → `caption` where useful, `th scope="col"|"row"`, real buttons in action cells.
- **Modal** → `aria-labelledby` → `.modal-title`; Bootstrap handles focus, Escape, and focus return.
- **Navigation** → landmarks with names, active states with `aria-current`/`aria-selected`/`aria-pressed`, keyboard-reachable controls.
- **Focus** → never remove the focus ring; it's theme-aware (indigo in light, indigo-300 in dark).
- **Reduced motion** → rely on Bootstrap's transitions; they already respect `prefers-reduced-motion`.

Full conventions: [Accessibility](../accessibility.md).

## Related

- [Principles](../principles.md) — the permanent rules.
- [Dark theme](dark-mode.md) — theme-specific guidance.

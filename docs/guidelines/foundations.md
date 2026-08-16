# Foundations

Spacing, typography, color, and density are the four levers that make an interface feel consistent. All four come from tokens — never invent your own values.

## Spacing

- **Base unit is 4px.** Bootstrap's `$spacer` scale is the spacing system: `0 / 4 / 8 / 16 / 24 / 48px`.
- Prefer spacing utilities over custom CSS: `p-*`, `px-*`, `py-*`, `m-*`, `mx-*`, `my-*`, `gap-*`, `mt-*`, `mb-*`, `ms-*`, `me-*`.
- **There is no second spacing scale.** If you need "less than 4px", question the layout instead of adding a token.

```html
<!-- Standard form spacing -->
<div class="mb-3">
  <label for="name" class="form-label">Project name</label>
  <input type="text" class="form-control" id="name">
</div>

<!-- Toolbar with consistent gaps -->
<div class="d-flex gap-2 mb-3">
  <button type="button" class="btn btn-primary">Save</button>
  <button type="button" class="btn btn-outline-secondary">Cancel</button>
</div>
```

## Typography

- **Font family:** Inter first, falling back through the system stack (Inter is not bundled — the fallback is seamless).
- **Weights:** 400 (body), 500 (medium emphasis), 600 (semibold — labels/titles), 700 (bold — headings).
- **Headings:** use the heading tag that fits the page outline (`h1` page title, `h2` sections, `h3` sub-sections) with size utilities when a smaller visual size is wanted (`<h2 class="h5">`).
- **Body text:** default, `text-body-secondary` for supporting text, `text-body-tertiary`/placeholder styles for disabled/placeholder contexts.
- **Labels:** `.form-label` (semibold). **Helper text:** `.form-text` (muted, small).
- Never introduce arbitrary `font-size` values in markup — use the existing scale.

```html
<h1 class="h3 mb-1">Projects</h1>
<p class="text-body-secondary mb-4">12 active projects across 3 teams.</p>
```

## Color

Semantic roles communicate meaning — that is their job, and it's the only reason to use them:

| Role | Meaning | Use for |
|---|---|---|
| `primary` (indigo) | Brand / main action | Primary buttons, active nav, links, focus |
| `secondary` (slate) | Neutral support | Secondary buttons, muted emphasis |
| `success` (emerald) | Positive / healthy | Confirmation, healthy status |
| `info` (cyan) | Neutral information | Informational hints |
| `warning` (amber) | Attention | Warnings, near-limit states |
| `danger` (red) | Negative / destructive | Errors, destructive actions, failure status |

Rules:

- Semantic colors communicate meaning — **do not use them for decoration** (a green button that doesn't mean success).
- Pair every color with text: a badge says "Healthy", not just green.
- Use `text-bg-*`/`bg-*`/`text-*` utilities and Bootstrap variables — never hard-coded hex in markup.

## Density

IndigoKit is enterprise-oriented; three density levels exist via Bootstrap variants — **there is no density API**:

| Density | How | When |
|---|---|---|
| Compact | `.table-sm`, `.btn-sm`, `.form-control-sm`, tight spacing (`p-2`, `py-1`) | Admin tables, report rows, dense lists |
| Normal | default component sizes | Most interfaces |
| Spacious | `p-4`/`p-5`, `.btn-lg`, `gap-4` | Dashboards, marketing-ish pages, focus pages |

Keep one density per screen region; don't mix `.table-sm` and default tables side by side without intent.

## Related

- [Design tokens](../tokens.md) — the authoritative values.
- [Dark theme](dark-mode.md) — how these foundations behave in dark.

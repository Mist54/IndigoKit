# Cards

## Purpose

Cards are Bootstrap's — IndigoKit keeps the structure and adds restrained surfaces, controlled radius, and a hover affordance for interactive cards.

## Bootstrap API

`.card` · `.card-header` · `.card-body` · `.card-footer` · `.card-title` · `.card-subtitle` · `.card-text` · `.card-link` · `.card-img-top` · `.card-img-bottom` · `.card-group` · horizontal card (`.row g-0`)

## Basic Usage

```html
<div class="card">
  <div class="card-body">
    <h2 class="card-title h5">Projects</h2>
    <p class="card-text text-body-secondary">Manage your team's work.</p>
    <button type="button" class="btn btn-primary">New project</button>
  </div>
</div>
```

Use heading tags that fit the page outline (`h2`, `h3`, …) with size classes (`h5`) — the `.card-title` class is styling, not semantics.

## Variants

- Header / footer: `.card-header`, `.card-footer`.
- Interactive: `.mu-card-interactive` adds a hover border + shadow affordance (the one sanctioned IndigoKit card extension — pure presentation).
- Image cards, horizontal cards, card groups, and Bootstrap's layout (`.row-cols-*`) for grids.

## Accessibility

- Card titles participate in the heading outline — no skipped levels.
- An entire card should be clickable only via a real link/button inside it, never a clickable div.

## Responsive Behavior

Cards stack naturally; use Bootstrap's grid (`row-cols-1 row-cols-md-2 row-cols-xl-3`) for responsive grids.

## Theming

Cards sit on the body surface in both themes (white in light, slate-900 in dark); header/footer and borders flip via `--bs-*` variables.

## Do

- Use a semantic heading (`h2`, `h3`, …) with a size class (`h5`) for card titles.
- Use real controls for card actions.

## Don't

- Don't use a styling-only `h5` when the card should be an `h2` in the page outline.
- Don't make the whole card a clickable div — no fake link semantics.

## Playground

[Playground — cards](../playground/pages/cards.html)

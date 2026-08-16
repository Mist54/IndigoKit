# List groups

## Purpose

List groups are Bootstrap's — simple record lists, activity feeds, settings navigation, and selectable items.

## Bootstrap API

`.list-group` · `.list-group-item` · `.list-group-item-action` · `.list-group-flush` · `.list-group-numbered` · `.list-group-horizontal` (+ breakpoint variants) · `.active` · `.disabled` · `.list-group-item-{primary|secondary|success|info|warning|danger}` · badges (`.badge`)

## Basic Usage

```html
<ul class="list-group">
  <li class="list-group-item">Profile</li>
  <li class="list-group-item active" aria-current="true">Security</li>
  <li class="list-group-item">Notifications</li>
  <li class="list-group-item disabled" aria-disabled="true">Billing</li>
</ul>
```

Navigation list (real links):

```html
<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active" aria-current="true">Overview</a>
  <a href="#" class="list-group-item list-group-item-action">Usage</a>
</div>
```

## Variants

- `.list-group-flush` inside cards (borderless edges).
- `.list-group-numbered` for ordered content (custom-counter, aligned).
- `.list-group-horizontal` + breakpoints (`-sm/-md/…`) for horizontal rows.
- Contextual `.list-group-item-{color}` with text meaning (status), never tint alone.
- Badges: `d-flex justify-content-between align-items-center` items with `.badge` on the end.
- Activity/settings lists: icon (aria-hidden) + title + supporting text + timestamp/badge using utilities.

## Accessibility

- Semantic `<ul>/<li>` (or `<div>` only when items are actions); navigation items are real `<a>`s, actions are real `<button>`s — never clickable divs.
- `.active` marked `aria-current="true"`; `.disabled` marked `aria-disabled="true"` and not focusable.
- Don't make non-interactive items look clickable (no `.list-group-item-action` without a control).

## Responsive Behavior

Long labels and supporting text wrap cleanly at 320px; horizontal lists use breakpoint variants to avoid cramping.

## Theming

Surfaces, borders, hover, active (indigo), and contextual variants flip via `--bs-*`; hover/active are never color-only.

## Do

- Use real `<a>` links for navigation items and `<button>`s for actions.
- Use `class="list-group"` — Bootstrap's API.

## Don't

- Don't build clickable list items from divs.
- Don't use `class="mu-list-group"` — no parallel list API.

## Playground

[Playground — list groups](../playground/pages/list-groups.html)

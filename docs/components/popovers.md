# Popovers

## Purpose

Popovers provide **richer contextual information** than a tooltip — a titled panel with content, opened from a trigger. Use them for additional details and contextual explanations; do not use them for essential labels or instructions (see [Tooltips](tooltips.md) for brief supplementary info).

## Bootstrap API

`.popover` · `data-bs-toggle="popover"` · `data-bs-placement="top|bottom|start|end"` · `data-bs-title` · `data-bs-content` · `data-bs-trigger` · `data-bs-custom-class` · Bootstrap JS

## Basic Usage

```html
<button type="button" class="btn btn-outline-secondary" data-bs-toggle="popover"
        data-bs-placement="bottom" data-bs-title="Plan limits"
        data-bs-content="The Free plan includes 3 projects and 10 GB of storage.">
  Limits
</button>
```

Initialize with Bootstrap's JS:

```js
document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => new bootstrap.Popover(el));
```

## Variants

- Placements: `top` / `bottom` / `start` / `end`.
- Triggers: hover, focus, click — choose by content purpose; click is typical for richer content.
- `data-bs-custom-class` for scoped styling overrides.
- Popovers may contain a title + body; keep them restrained.

## Accessibility

- The trigger is a real button with an accessible name independent of the popover.
- Content must be discoverable by keyboard (focus trigger), not hover-only.
- Dismissal follows Bootstrap behavior (click elsewhere / Escape); no focus trap.
- Don't put essential steps or validation in a popover — use real content.

## Responsive Behavior

Long content wraps inside the popover; test near viewport edges and at 320px where Bootstrap repositions the panel.

## Theming

Popovers sit on the raised surface in dark (slate-800 with a distinct header) — elevation matches modals/offcanvas.

## Do

- Give the trigger an accessible name.
- Use popovers for supplementary contextual detail.

## Don't

- Don't make essential information hover-only.
- Don't build a custom popover/positioning system — Bootstrap + Popper already ship in the bundle.
- Don't create `.mu-popover*` classes.

## Playground

[Playground — tooltips & popovers](../playground/pages/tooltips-popovers.html)

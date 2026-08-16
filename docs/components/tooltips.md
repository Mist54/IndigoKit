# Tooltips

## Purpose

Tooltips provide **brief supplementary information** on hover or focus. They are not a replacement for labels, instructions, or essential content — if the information matters, put it in real content (see [Popovers](popovers.md) for richer contextual content).

## Bootstrap API

`.tooltip` · `data-bs-toggle="tooltip"` · `data-bs-placement="top|bottom|start|end"` · `data-bs-title` · `data-bs-trigger` · Bootstrap JS (Popper included in the bundle)

## Basic Usage

```html
<button type="button" class="btn btn-outline-secondary" data-bs-toggle="tooltip"
        data-bs-placement="top" data-bs-title="Restores the last saved version">
  Restore
</button>
```

Initialize with Bootstrap's JS:

```js
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));
```

## Variants

- Placements: `top` / `bottom` / `start` / `end` — Bootstrap flips automatically near viewport edges.
- Triggers: hover, focus, click (`data-bs-trigger`). Never hover-only for information that matters — keyboard users must reach it via focus (`data-bs-trigger="hover focus"`).

## Accessibility

- The trigger has its own accessible name — a tooltip is **never** the accessible name.
- Icon-only buttons: `aria-label` on the button + tooltip as supplementary context.
- Hover-only information is inaccessible; keep essential info in real content.
- Tooltips are compact by design — do not put multi-sentence instructions in one.

## Responsive Behavior

Test near viewport edges and at 320px; on touch devices hover doesn't exist — prefer focus/click triggers or real content.

## Theming

Tooltips invert by design (light surface, dark text), so they stay readable on any background, including dark surfaces.

## Do

- Give icon-only triggers an `aria-label` first, tooltip second.
- Use `data-bs-trigger="hover focus"` when the tooltip adds useful context.

## Don't

- Don't use a tooltip as the only accessible name.
- Don't hide essential instructions in a tooltip.
- Don't create `.mu-tooltip*` classes — this is Bootstrap's component.

## Playground

[Playground — tooltips & popovers](../playground/pages/tooltips-popovers.html)

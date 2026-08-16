# Buttons

## Purpose

Buttons are Bootstrap's — IndigoKit refines the visual system (radius, focus ring, restrained hover) without changing the API.

## Bootstrap API

`.btn` · `.btn-primary` · `.btn-secondary` · `.btn-success` · `.btn-info` · `.btn-warning` · `.btn-danger` · `.btn-light` · `.btn-dark` · `.btn-link` · `.btn-outline-{color}` · `.btn-sm` · `.btn-lg` · `.disabled` · `data-bs-toggle="button"`

## Basic Usage

```html
<button type="button" class="btn btn-primary">Save</button>
<a class="btn btn-outline-secondary" href="#">Cancel</a>
<button type="button" class="btn btn-danger btn-sm">Delete</button>
```

Always set `type="button"` unless the button actually submits a form.

## Variants

- Solid: `btn-primary` / `btn-secondary` / semantic colors.
- Outline: `btn-outline-primary` etc. — resting color adapts to the theme (in dark it lightens to keep ≥4.5:1 on the body surface).
- Sizes: `.btn-sm`, `.btn-lg`.
- Disabled: the `.disabled` class or the native `disabled` attribute.
- Icon + text buttons: use Lucide icons with `aria-hidden="true"` and `me-*` spacing utilities.
- Loading state: a spinner inside the button with text that changes ("Saving…") — see [Loading](loading.md).

## Accessibility

- Real `<button>` for actions, `<a>` for navigation.
- Icon-only buttons need `aria-label`.
- Disabled buttons are announced as disabled (use the `disabled` attribute over `.disabled` for real controls).
- Focus: the global theme-aware ring applies — never remove it.

## Responsive Behavior

Buttons never overflow at any viewport; use Bootstrap flex/gap utilities to wrap button groups (`d-flex flex-wrap gap-2`).

## Theming

Semantic colors are constant across themes (indigo stays indigo); white text on primary measures 6.29:1 in both themes. Outline buttons flip their resting color in dark.

## Do

- Use `class="btn btn-primary"` — Bootstrap's API.
- Put `aria-label` on icon-only buttons.

## Don't

- Don't use `class="mu-btn-primary"` — no parallel button API.
- Don't make a tooltip the only accessible name.

## Playground

[Playground — buttons](../playground/pages/buttons.html)

# Loading states

## Purpose

Loading states communicate that work is in progress. Spinners are Bootstrap's; a spinner alone is **not** an accessible loading message — pair it with text.

## Bootstrap API

`.spinner-border` · `.spinner-grow` · `.spinner-border-sm` · `.spinner-grow-sm` · `.visually-hidden` · `.text-{color}` · `.btn` (for button loading)

## Basic Usage

```html
<!-- Standalone loading message -->
<div class="d-flex align-items-center text-body-secondary" role="status">
  <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
  <span>Loading projects…</span>
</div>
```

```html
<!-- Button loading -->
<button type="button" class="btn btn-primary" disabled>
  <span class="spinner-border spinner-border-sm me-1" aria-hidden="true"></span>
  Saving…
</button>
```

## Variants

- `.spinner-border` (default) and `.spinner-grow` (pulsing).
- Small contexts: `.spinner-border-sm` / `.spinner-grow-sm` inside buttons, tables, cards, forms.
- Colors via `.text-*` utilities (semantic only).
- Inline loading inside cards, tables, forms, lists, and buttons using utilities (`d-flex align-items-center`, `text-body-secondary`).
- Section loading: a spinner + visible text inside the content region; avoid overlays unless the region genuinely blocks interaction.

## Accessibility

- `role="status"` + visible or `visually-hidden` text ("Loading…") — never animation alone.
- Spinners themselves are `aria-hidden="true"` (decorative).
- A loading button keeps its text ("Saving…") and is `disabled` — the state is understandable without the spinner.
- Spinners pause under `prefers-reduced-motion` (Bootstrap handles it).

## Responsive Behavior

Loading states are compact and never overflow at 320px; avoid multiple competing loaders per view.

## Theming

Spinners inherit `currentcolor`, so `.text-*` semantic colors work in both themes; the default body color reads correctly on dark surfaces.

## Do

- Pair every spinner with visible or `visually-hidden` text ("Loading…").
- Use `class="spinner-border"` / `spinner-grow` — Bootstrap's API.

## Don't

- Don't rely on animation alone — no accessible meaning.
- Don't use `class="mu-spinner"` or a custom loader library.

## Playground

[Playground — loading](../playground/pages/loading.html)

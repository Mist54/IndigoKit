# Progress

## Purpose

Progress is Bootstrap's — determinate progress indication with accessible semantics. No progress engine; bars are static markup.

## Bootstrap API

`.progress` · `.progress-bar` · `.progress-bar-striped` · `.progress-bar-animated` · `.bg-primary` (and other semantic `bg-*`) · `role="progressbar"` · `aria-valuenow` · `aria-valuemin` · `aria-valuemax`

## Basic Usage

```html
<div class="progress" role="progressbar" aria-label="Upload progress" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: 75%">75%</div>
</div>
```

## Variants

- Percentages: 0 / 25 / 50 / 75 / 100 (width via inline `style` — this is data, not framework styling).
- Semantic colors: `.bg-success`, `.bg-warning`, `.bg-danger`, `.bg-info` — meaningful, not decorative.
- `.progress-bar-striped` (sparingly) and `.progress-bar-animated` (only while an operation is actively running).
- Stacked segments: multiple `.progress-bar`s in one `.progress` (each with its own `aria-valuenow`).
- Labeled progress: text outside the bar ("Uploading files — 75%") when in-bar text hurts readability.

## Accessibility

- `role="progressbar"` with `aria-valuenow/min/max` and an accessible name (`aria-label` or visible text).
- The percentage should be visually understandable; don't rely on the bar alone.
- `.progress-bar-animated` stops under `prefers-reduced-motion` (Bootstrap handles it).

## Responsive Behavior

Bars stretch to container width and remain readable at 320px; labels wrap without overflow.

## Theming

The track flips to the dark surface; bars keep their constant semantic fills (indigo/emerald/amber/red) with visible progress in both themes.

## Do

- Use `role="progressbar"` with `aria-valuenow` / `min` / `max` and an accessible name.
- Use `class="progress"` + `progress-bar` — Bootstrap's API.

## Don't

- Don't use a bare div with a width as progress — no semantics.
- Don't use `class="mu-progress"` — no parallel progress API.

## Playground

[Playground — progress](../playground/pages/progress.html)

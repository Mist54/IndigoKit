# Empty states

Empty states are **not** a Bootstrap component and not a new IndigoKit component — they are a **composition pattern** built entirely from Bootstrap utilities. No `.mu-*` class is required or sanctioned.

## Purpose

An empty state answers three questions: **What is empty? Why? What can I do next?**

## Composition

```
Icon (Lucide, aria-hidden, restrained size)
↓
Title (heading)
↓
Description (text-body-secondary)
↓
Action (btn btn-primary / btn-outline-secondary)
```

Built from: `.card` / `.card-body` (optional container), `.d-flex`, `.flex-column`, `.align-items-center`, `.text-center`, `.gap-*`, `.text-*`, `.btn`, spacing utilities.

```html
<div class="card">
  <div class="card-body text-center py-5">
    <span data-lucide="FolderOpen" aria-hidden="true" class="mb-3"></span>
    <h2 class="h5 mb-2">No projects yet</h2>
    <p class="text-body-secondary mb-4">Create your first project to get started.</p>
    <button type="button" class="btn btn-primary">Create project</button>
  </div>
</div>
```

## Variants (content, not classes)

- First-use ("No projects yet — create one").
- No search results (show the query + a clear/reset action).
- No filtered results (explain the filters + a reset action).
- No notifications / no activity / no table records.

No variant classes such as `.mu-empty-search` or `.mu-empty-table` — use content and composition.

## Empty vs error vs loading

- **Empty:** data loaded successfully and there are no records.
- **Error:** data could not be loaded — an empty state must never mask an error.
- **Loading:** data is still being retrieved — never show empty messaging while loading.

## Accessibility

- A real heading (matching the page outline) as the title; readable description; real buttons for actions.
- Decorative icons `aria-hidden="true"` — the title/description carry meaning.
- Ordinary empty states are **not** alerts — no `role="alert"`; `role="status"` only when the state is dynamically announced.
- Keep the icon restrained; no giant illustrations.

## Responsive Behavior

Title wraps, description stays readable, and actions remain usable at 320px; the pattern is naturally centered.

## Theming

Muted text and the card surface flip with the theme; no dark-specific classes.

## Do

- Compose empty states from Bootstrap utilities + meaningful content.
- Use a real heading, readable description, and a real action button.

## Don't

- Don't create `.mu-empty-*` variant classes.
- Don't ship icon-only empty states without a heading and description.

## Playground

[Playground — empty states](../playground/pages/empty-states.html)

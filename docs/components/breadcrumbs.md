# Breadcrumbs

## Purpose

Breadcrumbs are Bootstrap's — they show the current page's location in a hierarchy and let users jump back to an ancestor.

## Bootstrap API

`.breadcrumb` · `.breadcrumb-item` · `.active` · `aria-label="breadcrumb"` · `aria-current="page"`

## Basic Usage

```html
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
    <li class="breadcrumb-item"><a href="#">Projects</a></li>
    <li class="breadcrumb-item active" aria-current="page">Project details</li>
  </ol>
</nav>
```

## Variants

- Multiple levels with real links to ancestors.
- The current page is `.active` + `aria-current="page"` — never a link.
- Separators are Bootstrap's default (CSS-generated, not announced).

## Accessibility

- Wrap in `<nav aria-label="breadcrumb">` so the landmark is distinguishable.
- Links have meaningful text; the current item is marked, not linked.

## Responsive Behavior

On narrow screens, long breadcrumbs may wrap; the first item ("Home"/"Dashboard") plus ancestors keeps context.

## Theming

Borders/color of the current item flip via `--bs-*`; current-page emphasis is weight/color + `aria-current`, never color alone.

## Do

- Wrap breadcrumbs in `<nav aria-label="breadcrumb">`.
- Mark the current item `.active` + `aria-current="page"`.

## Don't

- Don't render a bare `<ol>` without the nav landmark.
- Don't make the current page a link.

## Playground

[Playground — breadcrumbs](../playground/pages/breadcrumbs.html)

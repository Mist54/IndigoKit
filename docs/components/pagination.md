# Pagination

## Purpose

Pagination is Bootstrap's — used below tables and lists to page through records.

## Bootstrap API

`.pagination` · `.page-item` · `.page-link` · `.active` · `.disabled` · `.pagination-sm` · `.pagination-lg` · `aria-label` · `aria-current="page"` · `aria-disabled`

## Basic Usage

```html
<nav aria-label="Projects page navigation">
  <ul class="pagination">
    <li class="page-item disabled">
      <a class="page-link" href="#" aria-disabled="true">Previous</a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item active" aria-current="page"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav>
```

## Variants

- Sizes: `.pagination-sm` for dense data tables, `.pagination-lg` for primary browsing.
- Prev/next labeled links ("Previous"/"Next") — avoid icon-only controls without accessible names.
- The current page is `.active` + `aria-current="page"`.

## Accessibility

- Wrap in `<nav aria-label="...">` with a descriptive label.
- Current page marked with `aria-current="page"`; disabled steps use `aria-disabled="true"`.
- Real links for pages (or buttons if JS-driven paging) — keyboard focusable with the global ring.

## Responsive Behavior

On 320–430px, long page runs should collapse (ellipsis or "showing X–Y of Z" summary) rather than overflow.

## Theming

Current page = white on indigo (6.29:1) in both themes; disabled steps use the theme's disabled treatment.

## Do

- Wrap pagination in `<nav aria-label="...">` with a descriptive label.
- Mark the current page with `.active` + `aria-current="page"`.

## Don't

- Don't render a bare `<ul>` without the nav landmark.
- Don't leave the current page without `aria-current` context.

## Playground

[Playground — pagination](../playground/pages/pagination.html)

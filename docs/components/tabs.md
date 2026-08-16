# Tabs

## Purpose

Tabs are Bootstrap's — switching between related content panels in the same context. Use tabs for related panels; use nav-pills for navigation/filter-style choices (see [Navigation patterns](navigation-patterns.md)).

## Bootstrap API

`.nav` · `.nav-tabs` · `.nav-pills` · `.nav-item` · `.nav-link` · `.active` · `.disabled` · `.tab-content` · `.tab-pane` · `.fade` · `data-bs-toggle="tab"` · `data-bs-toggle="pill"` · `.nav-fill` · `.nav-justified` · `aria-selected` (Bootstrap-managed)

## Basic Usage

```html
<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-overview" type="button"
            role="tab" aria-selected="true">Overview</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-usage" type="button"
            role="tab" aria-selected="false" tabindex="-1">Usage</button>
  </li>
</ul>
<div class="tab-content">
  <div class="tab-pane fade show active" id="tab-overview" role="tabpanel" tabindex="0">…</div>
  <div class="tab-pane fade" id="tab-usage" role="tabpanel" tabindex="0">…</div>
</div>
```

Use `<button>` tabs (keyboard-accessible, Bootstrap-managed `aria-selected`/`tabindex`); anchor tabs are for navigation.

## Variants

- `.nav-tabs` (panel switching) vs `.nav-pills` (navigation/filters).
- `.nav-fill` / `.nav-justified` for equal-width layouts.
- Vertical stacks via flex utilities (`flex-column`).

## Accessibility

- `role="tablist"` / `role="tab"` / `role="tabpanel"` with Bootstrap-managed `aria-selected`, `tabindex`, and arrow-key navigation.
- Panels are reachable and announced; the active tab is never color-only.

## Responsive Behavior

Tabs wrap or scroll horizontally (`overflow-x-auto`) on narrow screens; consider pills for filters on mobile.

## Theming

Tab borders/active states flip via `--bs-*` variables; active text uses the theme-aware emphasis color.

## Do

- Use tablist semantics for real panel switching (`role="tab"` + `aria-selected`, Bootstrap-managed).
- Use real `<button>` tabs with Bootstrap's Tab JS.

## Don't

- Don't put `role="tablist"` on static pills that don't switch panels — that misleads screen readers.
- Don't use tabs as decoration.

## Playground

[Playground — tabs](../playground/pages/tabs.html)

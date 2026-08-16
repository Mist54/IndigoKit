# Navigation patterns

## Purpose

Navigation is composed from existing Bootstrap/IndigoKit components — there is **no** navigation framework. These are the proven combinations for enterprise apps.

## Bootstrap API

`.navbar` · `.navbar-nav` · `.nav` · `.nav-link` · `.nav-tabs` · `.nav-pills` · `.dropdown` · `.breadcrumb` · `.pagination` · `.offcanvas` · `.mu-app-*` shell · Scrollspy (`data-bs-spy`)

## Patterns

### Admin shell

```
.mu-app-navbar        (top bar — Bootstrap navbar content)
.mu-app-side          (desktop sidebar — .mu-sidebar)
.mu-app-main          (content — breadcrumbs + page + footer)
```

Mobile: the navbar toggler opens an offcanvas with the same navigation links — one navigation system, responsive by composition.

### Settings navigation

Sidebar (shell) or nav-pills/tabs for in-page settings sections. Use **tabs** to switch related content panels; use **pills** for navigation/filter-style choices. Never use tabs as decoration.

### Breadcrumb integration

`Dashboard / Projects / Project details` — semantic `<nav aria-label="breadcrumb">`, current item `aria-current="page"`, accessible CSS separators.

### Pagination

Below tables/lists: `nav aria-label` + `.pagination` with `.active` + `aria-current="page"`, disabled prev/next with `aria-disabled`.

### Dropdown navigation

Small action menus (`Actions ▾`) with real buttons, Bootstrap keyboard behavior, and an accessible toggle name.

### Scrollspy

Documentation/settings pages: sticky nav-pills tracking long content sections (see [Scrollspy](scrollspy.md)).

## Conventions

- One navigation system per app — don't combine competing navs (e.g. sidebar + top-nav for the same items) without intent.
- Active/current states are never color-only: weight/shape + `aria-current` / `aria-selected` / `aria-pressed`.
- Every nav region that needs distinguishing gets an accessible name.
- No mega menus, no command palette, no routing/authorization in IndigoKit's scope.

## Responsive Behavior

Navigation composes down to 320px without overcrowding: navbar collapses to offcanvas, tabs/pills wrap or scroll, breadcrumbs truncate/wrap, pagination collapses to prev/next + summary.

## Theming

All patterns use the shell + Bootstrap nav systems, which flip with the theme (sidebar raised surface, indigo active, theme-aware focus).

## Do

- Compose existing components (navbar, sidebar, breadcrumbs, tabs/pills, pagination, dropdowns, offcanvas, scrollspy).
- Use tabs for panel switching and pills for navigation/filter choices.

## Don't

- Don't create `.mu-nav*` classes or new navigation APIs.
- Don't use tabs as decoration.

## Playground

[Playground — navigation patterns](../playground/pages/navigation-patterns.html)

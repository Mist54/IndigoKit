# Composition patterns

Full-page recipes built from existing components. Every pattern uses the [application shell](../principles.md#the-mu--policy) + Bootstrap components — no application-specific components.

## Dashboard

```
mu-app-navbar (brand, search, user)
mu-app-side (sidebar)
mu-app-main → mu-app-content
  page title (h1) + actions
  row-cols-1 row-cols-md-2 row-cols-xl-4 → summary cards
  row g-4 → [ recent activity table  |  progress / usage card ]
```

- Summary cards: title + value + trend, `text-body-secondary` supporting text.
- One table (recent activity), one progress card (storage/quota) — don't cram every metric in.

## CRUD page

```
Breadcrumbs (Dashboard / Projects)
h1 "Projects" + primary "New project" button
table-responsive → .table .table-hover
  columns: name (th scope=row), status badge, owner, updated, actions
  actions: View / Edit / Delete (.btn-sm outline; delete = btn-outline-danger)
pagination
empty state (first-use: "No projects yet" + Create project)
delete confirmation modal (danger)
```

## Settings page

```
Breadcrumbs (Dashboard / Settings)
nav-pills or sidebar section (Profile · Security · Notifications · Appearance)
content: cards or accordion sections per setting group
forms: switches (.form-switch), selects, save buttons (.btn-primary)
```

## Data table page

```
h1 + actions
filter toolbar (card): search input + selects + Apply / Reset (.btn-outline-secondary)
table-responsive → .table .table-sm (dense) with .table-hover
pagination below
empty state: "No matches for your filters" + clear-filters action
```

## Detail page

```
Breadcrumbs (…/ Project details)
h1 title + action buttons (Edit, danger Delete)
cards for sections: summary / team / activity
a table for related records (deployments, invoices)
```

## Form page

```
Breadcrumbs (…/ New project)
card containing the form
  fieldsets or sections with h2/h3 headings
  row g-3 col-md-* for multi-column
  validation: .invalid-feedback on submit
sticky footer or card-footer: Save (primary) + Cancel (outline)
```

## Mobile navigation

```
navbar: brand + toggler (data-bs-toggle="offcanvas", data-bs-target="#mobileNav")
offcanvas-start #mobileNav: offcanvas-header + offcanvas-body
  → the SAME nav links as the sidebar
```

One navigation system, reorganized by viewport — the sidebar for desktop, offcanvas for mobile.

## Filter drawer

```
"Filters" button → offcanvas-end
offcanvas-header: "Filters" + close
offcanvas-body: search input, selects, checkboxes/switches, Apply (primary) + Reset (outline)
```

The drawer is contextual — it does not replace the desktop sidebar.

## Composition rules

- One primary action per region (see [Components](components.md#buttons)).
- State discipline: loading / empty / error are distinct (see [States](states.md)).
- Every pattern works at 320px with zero horizontal overflow (see [Navigation](navigation.md#responsive-design)).

# Scrollspy

## Purpose

Scrollspy is Bootstrap's — the navigation highlights the content section currently in view. Used for documentation/settings pages with long content.

## Bootstrap API

`data-bs-spy="scroll"` · `data-bs-target` · `data-bs-root-margin` · `.nav` / `.nav-pills` / `.nav-tabs` · `position-sticky` · Bootstrap JS

## Basic Usage

```html
<div class="row g-4">
  <div class="col-lg-3">
    <nav id="docNav" class="nav nav-pills flex-column position-sticky top-0 pt-3" aria-label="Documentation sections">
      <a class="nav-link" href="#overview">Overview</a>
      <a class="nav-link" href="#configuration">Configuration</a>
      <a class="nav-link" href="#security">Security</a>
      <a class="nav-link" href="#notifications">Notifications</a>
      <a class="nav-link" href="#advanced">Advanced</a>
    </nav>
  </div>
  <div class="col-lg-9">
    <div data-bs-spy="scroll" data-bs-target="#docNav" tabindex="0">
      <section id="overview">
        <h2>Overview</h2>
        <!-- long content -->
      </section>
      <section id="configuration">
        <h2>Configuration</h2>
        <!-- long content -->
      </section>
      <!-- … -->
    </div>
  </div>
</div>
```

## Variants

- Sidebar integration: the existing `.mu-sidebar`/nav-pills as the spy target alongside the shell — no shell changes.
- Nested navigation: one level deep is supported; don't build deep trees.
- Mobile: when the nav becomes impractical (320–430px), use an offcanvas or a top pill row instead — no new mobile navigation API.

## Accessibility

- The navigation has an accessible name (`aria-label`) and links with meaningful names pointing to real section IDs.
- Active state is weight/shape + `aria-current` — never color alone.
- Sections use real `<section>` + `<h2>` structure; the scroll region is keyboard-scrollable.

## Responsive Behavior

Active-state tracking works across 320 → 1440px; sticky behavior uses Bootstrap utilities (`position-sticky`), no custom scroll listeners.

## Theming

Active nav styling comes from the existing nav-pills system and flips with the theme.

## Do

- Use `data-bs-spy="scroll"` + `data-bs-target` with Bootstrap's JS.
- Give the nav an accessible name and point links at real section IDs.

## Don't

- Don't write custom scroll-tracking JavaScript.
- Don't create `.mu-scrollspy*` classes.

## Playground

[Playground — scrollspy](../playground/pages/scrollspy.html)

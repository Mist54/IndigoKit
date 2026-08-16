# Dropdowns

## Purpose

Dropdowns are Bootstrap's — toggle menus with full keyboard support, powered by Bootstrap's JS.

## Bootstrap API

`.dropdown` · `.dropdown-toggle` · `.dropdown-menu` · `.dropdown-item` · `.dropdown-item-text` · `.dropdown-header` · `.dropdown-divider` · `.dropdown-menu-end` · `.dropdown-menu-{sm|md|lg|xl|xxl}-end` · `.dropup` · `.dropstart` · `.dropend` · `data-bs-toggle="dropdown"` · `data-bs-auto-close` · `data-bs-offset`

## Basic Usage

```html
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button"
          data-bs-toggle="dropdown" aria-expanded="false">
    Actions
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Edit</a></li>
    <li><a class="dropdown-item" href="#">Duplicate</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><button class="dropdown-item text-danger" type="button">Delete</button></li>
  </ul>
</div>
```

## Variants

- Alignment: `.dropdown-menu-end`, responsive `.dropdown-menu-md-end` etc.
- Directions: `.dropup`, `.dropstart`, `.dropend`.
- Menu content: items (links or buttons), `.dropdown-header` (h6 in popup context), `.dropdown-divider`, `.dropdown-item-text`.

## Accessibility

- The toggle is a real button with `aria-expanded` (Bootstrap manages it).
- Menu items are real links or buttons; destructive actions are buttons, not links.
- Bootstrap provides Escape-to-close, click-outside close, and arrow-key navigation — no custom code.
- Focus moves into the menu on open and returns to the toggle on close (Bootstrap behavior).

## Responsive Behavior

Long menus scroll within the viewport (Bootstrap clamps); use `.dropdown-menu-end` for right-aligned actions on small screens.

## Theming

Menus sit on the raised surface in dark (slate-800) with hover items lifted to slate-700 — elevation mirrors the light theme.

## Do

- Use real `dropdown-item` links (`<a>`) or buttons inside the menu.
- Use Bootstrap's dropdown JS and `data-bs-toggle="dropdown"`.

## Don't

- Don't build menus from clickable divs.
- Don't write a custom menu framework — Bootstrap ships keyboard, Escape, and focus behavior.

## Playground

[Playground — dropdowns](../playground/pages/dropdowns.html)

# Badges

## Purpose

Badges are Bootstrap's — small count/status labels. IndigoKit keeps the API and relies on Bootstrap's color-contrast function for ink choice.

## Bootstrap API

`.badge` · `.text-bg-primary` · `.text-bg-secondary` · `.text-bg-success` · `.text-bg-info` · `.text-bg-warning` · `.text-bg-danger` · `.text-bg-light` · `.text-bg-dark` · `.rounded-pill` · `.position-absolute` (notification counts) · `aria-label`

## Basic Usage

```html
<span class="badge text-bg-success">Healthy</span>
<button type="button" class="btn btn-outline-secondary position-relative">
  Inbox
  <span class="badge text-bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">4</span>
</button>
```

## Variants

- Colors via `text-bg-*` (preferred over legacy `.bg-*`).
- `.rounded-pill` for count-style badges.
- Notification counts: position with utilities on a relative parent, and give the badge an `aria-label` ("4 unread messages") so the count is announced in context.

## Accessibility

- Badge text is the accessible content — never icon-only.
- On vivid fills (emerald, red, cyan, amber) Bootstrap's contrast function selects **black ink** — measured ≥8.28:1; on indigo it selects white (6.29:1).
- Notification badges need a text or `aria-label` context.

## Responsive Behavior

Badges scale with surrounding text; overflow is not a practical concern.

## Theming

`text-bg-*` colors are constant across themes; contrast is preserved in both.

## Do

- Use `.badge text-bg-*` with readable text (never icon-only).
- Give floating notification counts an `aria-label` with context ("4 unread messages").

## Don't

- Don't use an icon-only badge — the text is the accessible content.
- Don't float a count without context.

## Playground

[Playground — badges](../playground/pages/badges.html)

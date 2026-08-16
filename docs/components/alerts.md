# Alerts

## Purpose

Alerts are Bootstrap's — persistent, page-level information. They are distinct from toasts (transient notifications); do not use alerts for events and do not use toasts for persistent page information.

## Bootstrap API

`.alert` · `.alert-primary` · `.alert-secondary` · `.alert-success` · `.alert-info` · `.alert-warning` · `.alert-danger` · `.alert-heading` · `.alert-link` · `.alert-dismissible` · `.btn-close` · `data-bs-dismiss="alert"`

## Basic Usage

```html
<div class="alert alert-primary" role="alert">
  <h2 class="alert-heading h6">Deployment queued</h2>
  <p class="mb-0">Your changes are building. You'll be notified when they finish.</p>
</div>
```

`role="alert"` is appropriate because an alert is imperative, page-level information.

## Variants

- Semantic colors: primary (neutral/informational), success, warning, danger, info.
- `.alert-dismissible` with a `.btn-close` for dismissible alerts.
- `.alert-heading` + `.alert-link` for structured messages.
- Meaning is carried by **text + heading**, never by tint alone.

## Accessibility

- `role="alert"` on imperative alerts announces them; non-blocking informational messages can use `role="status"` instead.
- The dismiss button is a real `.btn-close` (accessible name "Close", keyboard focusable).
- Warning/danger alerts need real text, not just color: "Backup failed — check the log", never "Something went wrong."

## Responsive Behavior

Alerts wrap naturally at any width; keep messages concise to avoid tall alerts on 320px screens.

## Theming

Alerts use Bootstrap's `-bg-subtle` / `-text-emphasis` variable family, so they flip correctly in dark (tinted dark surfaces with light emphasis text — primary alert 6.68:1 in dark).

## Do

- Use `role="alert"` with real message text.
- Use alerts for persistent page information.

## Don't

- Don't communicate status with color alone.
- Don't use alerts for transient events — that's a [toast](toasts.md).

## Playground

[Playground — alerts](../playground/pages/alerts.html)

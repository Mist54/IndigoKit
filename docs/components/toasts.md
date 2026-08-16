# Toasts

## Purpose

Toasts are Bootstrap's — transient, non-blocking notifications about events. They complement, never replace, persistent alerts: an alert is page-level information; a toast is a brief event notification.

## Bootstrap API

`.toast` · `.toast-container` · `.toast-header` · `.toast-body` · `.btn-close` · `data-bs-dismiss="toast"` · `data-bs-delay` · `data-bs-autohide` · positioning utilities (`top-0 end-0 p-3` etc.) · Bootstrap JS

## Basic Usage

```html
<div class="toast-container position-fixed top-0 end-0 p-3">
  <div class="toast" role="status" aria-live="polite" aria-atomic="true" data-bs-autohide="true" data-bs-delay="5000">
    <div class="toast-header">
      <span class="me-auto fw-semibold">Saved</span>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">Project saved successfully.</div>
  </div>
</div>
```

Show toasts with Bootstrap's JS: `bootstrap.Toast.getOrCreateInstance(el).show()`.

## Variants

- Semantic urgency: success ("Project saved."), info ("Backup finished"), warning (non-blocking), error (`role="alert"`).
- Positions: top-right (default), top-center, bottom-right, bottom-center — via `position-fixed` + placement utilities on the container.
- Stacking: multiple toasts in one container, spaced and ordered (newest on top), no overlap.

## Accessibility

- **Live regions:** `role="status"` + `aria-live="polite"` + `aria-atomic="true"` for non-urgent info; `role="alert"` only for genuinely urgent/error messages. Do not blanket-apply `role="alert"`.
- The dismiss control is a real `.btn-close` with `aria-label="Close"`.
- Auto-dismiss: sensible timing (≈5s), **never** for critical errors — important errors persist or wait for user dismissal.
- Announcements must not duplicate: one live region per toast.

## Responsive Behavior

Toasts are width-constrained, wrap text, and never overflow the viewport at 320px; the close button stays reachable.

## Theming

Toasts sit on the raised surface in dark (slate-800 body, subtly darker header) with theme-flipping text/borders and a visible close button.

## Do

- Use `role="status"` for non-urgent info and `role="alert"` only for urgent/error messages.
- Use a real `.btn-close` with `aria-label="Close"` for dismissal.
- Use `class="toast"` inside `toast-container` — Bootstrap's API.

## Don't

- Don't put `role="alert"` on every toast.
- Don't ship an icon-only close without a name.
- Don't use `class="mu-toast"` or a custom notification manager.

## Playground

[Playground — toasts](../playground/pages/toasts.html)

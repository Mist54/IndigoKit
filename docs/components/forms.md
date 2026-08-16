# Forms

## Purpose

Forms are Bootstrap's — the complete control set with IndigoKit's visual refinement (surface, focus ring, validation states that flip with the theme).

## Bootstrap API

`.form-label` · `.form-control` · `.form-select` · `.form-check` · `.form-check-input` · `.form-check-label` · `.form-switch` · `.form-range` · `.input-group` · `.input-group-text` · `.form-floating` · `.form-text` · `.form-control-sm|lg` · `.form-select-sm|lg` · `.invalid-feedback` · `.valid-feedback` · `.is-invalid` · `.is-valid` · `.was-validated` · `.disabled` · `.readonly`

## Basic Usage

```html
<div class="mb-3">
  <label for="email" class="form-label">Work email</label>
  <input type="email" class="form-control" id="email" required aria-describedby="emailHelp">
  <div id="emailHelp" class="form-text">Use your company address.</div>
</div>

<div class="mb-3">
  <label for="role" class="form-label">Role</label>
  <select class="form-select" id="role">
    <option value="">Choose…</option>
    <option value="admin">Admin</option>
    <option value="member">Member</option>
  </select>
</div>

<div class="form-check form-switch mb-3">
  <input class="form-check-input" type="checkbox" role="switch" id="notify">
  <label class="form-check-label" for="notify">Email notifications</label>
</div>
```

## Variants

- Text inputs, selects, textareas, checkboxes, radios, switches, ranges, file inputs, input groups, floating labels.
- Sizes: `form-control-sm` / `form-control-lg`.
- Validation: `was-validated` on the form (or `.is-invalid`/`.is-valid` on controls) with `.invalid-feedback` / `.valid-feedback` messages.

## Accessibility

- Every control has a `<label for>` (or equivalent accessible name); help text via `.form-text` / `aria-describedby`.
- Errors: icon + border + message text — never color alone. `.invalid-feedback` is announced with the control.
- Grouped choices use `<fieldset>` + `<legend>`.
- `role="switch"` on switches for correct announcements.
- Disabled controls are exempt from contrast requirements (WCAG 1.4.3) but must remain perceivable.

## Responsive Behavior

Controls stretch to container width; `form-row`/flex/grid utilities handle multi-column layouts that collapse on mobile.

## Theming

Inputs sit on the body surface in both themes; focus uses the strong theme-aware ring (validated controls included); validation icons re-render as theme-adaptive data URIs; valid/invalid feedback text flips color with the theme.

## Do

- Put a `<label for>` on every control; use `.form-text` / `aria-describedby` for help.
- Show errors as `.invalid-feedback` text with icon + border.
- Use `class="form-control"` / `form-select` — Bootstrap's API.

## Don't

- Don't use a placeholder as the only label.
- Don't communicate errors with a red border alone.
- Don't use `class="mu-form-control"` — no parallel form API.

## Playground

[Playground — forms](../playground/pages/forms.html)

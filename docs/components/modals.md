# Modals

## Purpose

Modals are Bootstrap's — focused dialogs that demand attention and are completed before returning to the page. Use them for focused interaction requiring attention; use [offcanvas](offcanvas.md) for secondary contextual surfaces and [toasts](toasts.md) for non-blocking feedback.

## Bootstrap API

`.modal` · `.modal-dialog` · `.modal-content` · `.modal-header` · `.modal-title` · `.modal-body` · `.modal-footer` · `.modal-sm` · `.modal-lg` · `.modal-xl` · `.modal-dialog-centered` · `.modal-dialog-scrollable` · `.modal-fullscreen` (+ responsive variants) · `data-bs-toggle="modal"` · `data-bs-target` · `.btn-close` · `data-bs-dismiss="modal"`

## Basic Usage

```html
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Open dialog
</button>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title fs-5" id="exampleModalTitle">Delete project?</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>This permanently removes "Q3 roadmap". This action cannot be undone.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
</div>
```

## Variants

- Sizes: `.modal-sm`, `.modal-lg`, `.modal-xl`, fullscreen.
- `.modal-dialog-centered` for dialogs, `.modal-dialog-scrollable` for long content.
- Use `aria-labelledby` → the `.modal-title`.

## Accessibility

- Accessible name via `aria-labelledby` (or `aria-label`); `aria-hidden="true"` when closed.
- Focus moves into the dialog on open, is contained while open, Escape closes, and focus returns to the trigger (Bootstrap's focus trap).
- The close control is a real `.btn-close` with `aria-label="Close"`.
- Multiple stacked modals are supported by Bootstrap but avoid them by design where possible.

## Responsive Behavior

Modals are width-constrained with safe gutters at 320–430px; `.modal-dialog-centered` handles vertical centering on small heights.

## Theming

Modal content sits on the raised surface in dark (slate-800, header/borders flipping via `--bs-*`); the backdrop becomes black at .5 opacity in dark so dimming stays visible.

## Do

- Give the dialog an accessible name via `aria-labelledby` → `.modal-title`.
- Rely on Bootstrap's focus trap, Escape, and focus-return behavior.

## Don't

- Don't open unnamed dialogs.
- Don't write custom focus trapping — Bootstrap already handles it.

## Playground

[Playground — modals](../playground/pages/modals.html)

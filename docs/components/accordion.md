# Accordion & collapse

## Purpose

Accordions are Bootstrap's — stacked collapsible sections (single-open by default) with full keyboard support from Bootstrap's collapse JS.

## Bootstrap API

`.accordion` · `.accordion-item` · `.accordion-header` · `.accordion-button` · `.accordion-collapse` · `.accordion-body` · `.accordion-flush` · `.collapse` · `data-bs-toggle="collapse"` · `data-bs-parent` · `aria-expanded` / `aria-controls` (Bootstrap-managed)

## Basic Usage

```html
<div class="accordion" id="faqAccordion">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse"
              data-bs-target="#faq-1" aria-expanded="true" aria-controls="faq-1">
        How do I invite team members?
      </button>
    </h2>
    <div id="faq-1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
      <div class="accordion-body">
        <p>Open <strong>Settings → Members</strong> and choose Invite.</p>
      </div>
    </div>
  </div>
  <!-- more items… -->
</div>
```

## Variants

- Single-open: the `data-bs-parent` accordion behavior (one section open at a time).
- Independent sections: omit `data-bs-parent` — each collapse is independent (Bootstrap's plain collapse API).
- `.accordion-flush` for edge-to-edge styling inside cards/surfaces.
- Content: paragraphs, lists, and forms work naturally inside `.accordion-body`.

## Accessibility

- The control is a real `<button class="accordion-button">` inside a semantic heading (`h2`/`h3` matching the outline) — never a clickable div.
- `aria-expanded` and `aria-controls` are managed by Bootstrap — don't hand-manage them.
- Native button behavior: Tab, Enter, Space all work; no custom keyboard code, no traps.

## Responsive Behavior

Long headings and forms inside accordion bodies wrap and scroll correctly at 320px.

## Theming

Active buttons use the deep-indigo emphasis surface with light-indigo text in dark (7.22:1); borders and chevron flip via `--bs-*`; collapse transitions respect `prefers-reduced-motion`.

## Do

- Put `.accordion-button` inside a semantic heading (`h2`/`h3` matching the outline).
- Use `class="accordion"` + Bootstrap's collapse JS.

## Don't

- Don't build clickable div headers.
- Don't use `class="mu-accordion"` or a custom accordion engine.

## Playground

[Playground — accordion](../playground/pages/accordion.html)

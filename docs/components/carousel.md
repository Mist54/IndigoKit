# Carousel

## Purpose

Carousels are Bootstrap's — restrained, content-focused slides for dashboards, announcements, and product highlights. **No autoplay by default** — slides advance on user intent unless a strong UX reason exists.

## Bootstrap API

`.carousel` · `.carousel-inner` · `.carousel-item` · `.carousel-control-prev` · `.carousel-control-next` · `.carousel-indicators` · `.carousel-caption` · `.active` · `data-bs-ride` · `data-bs-slide` · Bootstrap JS

## Basic Usage

```html
<div id="highlights" class="carousel slide" data-bs-ride="false">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#highlights" data-bs-slide-to="0" class="active"
            aria-label="Slide 1, Q3 roadmap" aria-current="true"></button>
    <button type="button" data-bs-target="#highlights" data-bs-slide-to="1"
            aria-label="Slide 2, Hiring plan"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <div class="p-5 bg-body-tertiary text-center">
        <h2 class="h5">Q3 roadmap is live</h2>
        <p class="text-body-secondary mb-3">Twelve milestones, one shared view.</p>
        <a href="#" class="btn btn-primary btn-sm">Open roadmap</a>
      </div>
    </div>
    <div class="carousel-item">
      <!-- … -->
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#highlights" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#highlights" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
```

## Variants

- Controls, indicators, captions — all Bootstrap's.
- Content slides (heading + description + action) work better than image-only slides for enterprise dashboards.
- Image slides: meaningful images get useful `alt`; decorative images get empty `alt`/`aria-hidden`.

## Accessibility

- Controls and indicators are real buttons with accessible names ("Previous"/"Next", descriptive slide labels).
- Keyboard: controls are focusable; Bootstrap supports keyboard interaction when focused.
- **Autoplay:** only with a strong UX reason — document it, respect `prefers-reduced-motion` (Bootstrap pauses), keep transitions slow, and provide pause/control behavior. IndigoKit demos do not autoplay.

## Responsive Behavior

Slides scale, captions wrap, and controls/indicators stay usable at 320px with zero horizontal overflow.

## Theming

Content slides use the theme's surfaces; image slides need caption contrast handled per slide (prefer content slides in dark).

## Do

- Use `class="carousel"` with Bootstrap's JS and real buttons for controls.
- Keep autoplay off by default; if used, document it and respect `prefers-reduced-motion`.

## Don't

- Don't use `class="mu-carousel"` or a custom slider engine.
- Don't autoplay by default.

## Playground

[Playground — carousel](../playground/pages/carousel.html)

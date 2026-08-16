# Design Guidelines

These guidelines answer **"how should I combine IndigoKit components?"** — not "what components exist" (that's the [component reference](../components/)). They exist so interfaces built with IndigoKit look and behave like one system.

## The 10 design principles

1. **Bootstrap familiarity** — Bootstrap's class names and markup are the public API. Users of Bootstrap can use IndigoKit without learning a second system.
2. **Modern visual language** — clean, professional, good whitespace, subtle shadows, controlled radius, restrained motion, light and dark themes.
3. **Enterprise usability** — efficient screen space, excellent tables, strong forms, data-dense interfaces, clear navigation.
4. **Accessibility first** — semantics, keyboard, focus, and contrast are requirements, not afterthoughts.
5. **Consistency over decoration** — one spacing scale, one type scale, one radius scale. Decoration that hurts usability is cut.
6. **Progressive complexity** — start simple, add only what the interface genuinely needs.
7. **Responsive by default** — every composition is built mobile-first with Bootstrap's responsive utilities.
8. **Semantic HTML** — real buttons, links, headings, tables, labels. No clickable divs.
9. **Minimal custom API** — `mu-*` classes only where Bootstrap has no equivalent.
10. **Token-driven styling** — colors, spacing, type, radius, and motion come from tokens, never hard-coded values.

## The Bootstrap-first rule (extremely clear)

**IndigoKit never replaces Bootstrap's API.** If Bootstrap has a class, use Bootstrap's class.

```html
<!-- ALWAYS -->
<button type="button" class="btn btn-primary btn-sm">Save</button>
<div class="card">
  <div class="card-body">…</div>
</div>
```

```html
<!-- NEVER — no parallel API exists -->
<button type="button" class="mu-btn-primary mu-btn-sm">Save</button>
<div class="mu-card">…</div>
```

The only exceptions are the documented `mu-*` classes for capabilities Bootstrap does not provide — the [application shell](../principles.md#the-mu--policy). If you're reaching for a `mu-` prefix on a Bootstrap component, stop and use the Bootstrap class.

## Guideline index

| Guideline | Covers |
|---|---|
| [Foundations](foundations.md) | Spacing · Typography · Color · Density |
| [Components](components.md) | Buttons · Forms · Cards · Tables |
| [States](states.md) | Empty vs Loading vs Error · Toast / Alert / Modal feedback |
| [Navigation](navigation.md) | Navbar · Sidebar · Tabs · Pills · Breadcrumbs · Pagination · Scrollspy · Offcanvas · Overlays · Responsive |
| [Do / Don't](do-dont.md) | Practical good/bad patterns · Anti-patterns · Practical accessibility |
| [Dark theme](dark-mode.md) | Semantic colors · Surfaces · Contrast · Focus |
| [Composition patterns](composition.md) | Dashboard · CRUD · Settings · Data table · Detail · Form · Mobile nav · Filter drawer |
| [Engineering](engineering.md) | SCSS guidelines · JavaScript guidelines · Playground relationship |

## Related

- [Principles](../principles.md) — the permanent rules behind these guidelines.
- [Accessibility](../accessibility.md) — the full accessibility conventions.
- [Theming](../theming.md) — light/dark/system themes.

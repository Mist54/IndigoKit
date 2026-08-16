# Dark theme

IndigoKit's dark theme is Bootstrap's `[data-bs-theme="dark"]` — the same markup, the same classes, one attribute. Full mechanics and measured contrast are in [Theming](../theming.md). These are the design rules for *building* with it.

## Semantic colors stay constant

Indigo stays indigo, emerald stays emerald, amber stays amber — in both themes. Meaning does not change with the theme:

```html
<button type="button" class="btn btn-primary">Save</button>   <!-- indigo in both themes -->
<span class="badge text-bg-success">Healthy</span>            <!-- emerald in both themes -->
```

Never swap classes per theme (`<button class="btn …" data-…dark>` or theme-conditional classing). The theme flips the *surfaces and emphasis*, not the meaning.

## No component-specific dark classes

Do not create `.mu-*`-dark variants, `.btn-dark-primary`, or `[data-bs-theme="dark"] .something` hacks in your app. If a component genuinely misbehaves in dark, that's a IndigoKit bug — report it instead of patching around it.

## Surfaces

The dark theme has a surface hierarchy — body `#0F172A`, raised `#1E293B` (sidebar, modals, offcanvas, dropdowns, popovers, toasts), hover `#334155`, borders `#475569`. Follow it:

- Don't make every surface the same color — elevation is expressed as surface lightness, exactly like the light theme's white-on-white.
- Your custom surfaces (e.g. a chart background) should sit on `--bs-body-bg` or the raised token family, not a hard-coded hex.

## Contrast

Measured dark values (all ≥4.5:1 text / ≥3:1 focus): body text 14.48:1, secondary ≈8.5:1, links 6.39:1, primary button 6.29:1, outline button 6.39:1, badges 9.78:1, table header 17.06:1.

- Test your custom content against the dark surface — don't assume light-mode contrast carries over.
- Exception to know: placeholder/disabled text runs ≈4.46:1 in dark (WCAG-exempt, Bootstrap parity).

## Focus

Dark uses indigo-300 (`#A5B4FC`) for focus — outline ≈9:1 on body, ring ≈5.7:1. Never remove or weaken focus indicators; they're theme-aware already.

## Related

- [Theming](../theming.md) — mechanism, modes, persistence, full contrast table.
- [Tokens](../tokens.md) — the dark surface scale.

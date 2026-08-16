# Navigation, overlays & responsive

## Navigation: when to use what

| Pattern | Use for | Avoid when |
|---|---|---|
| **Navbar** (`.mu-app-navbar` + Bootstrap navbar) | App-level chrome: brand, primary actions, user menu | The only navigation for a deep hierarchy |
| **Sidebar** (`.mu-sidebar`) | Persistent primary navigation for multi-section apps (desktop) | A single-page app with 3 links — use a navbar |
| **Tabs** (`.nav-tabs`) | Switching between **related content panels** in one context | Decoration; navigation between pages |
| **Pills** (`.nav-pills`) | Navigation/filter-style choices; settings sub-sections | Panel switching when tabs fit |
| **Breadcrumbs** | Location in a hierarchy; back-jump to ancestors | Flat/single-level apps |
| **Pagination** | Paging through records below tables/lists | Short lists that fit on one page |
| **Scrollspy** | Long documentation/settings pages; highlights the section in view | Short content; decorative highlighting |
| **Offcanvas** | Mobile navigation, filter panels, contextual settings | Persistent desktop navigation (that's the sidebar) |

Rules:

- **One navigation system per app.** Don't run a sidebar and a top nav for the same items.
- Active/current states are never color-only: add `aria-current="page"` / `aria-selected` / `aria-pressed` + weight/shape.
- Navigation regions get accessible names (`aria-label="Breadcrumb"`, etc.) when they need distinguishing.

## Overlays: a decision guide

```
Need a menu of actions?
  → Dropdown

Need brief supplementary information?
  → Tooltip

Need richer contextual information (title + content)?
  → Popover

Need a focused user action/decision?
  → Modal

Need a secondary panel (filters, mobile nav, settings)?
  → Offcanvas
```

| Overlay | Character | Key rule |
|---|---|---|
| **Dropdown** | Action menu from a button | Real `dropdown-item` links/buttons |
| **Tooltip** | Brief supplementary info on hover/focus | Never the only accessible name; never essential info |
| **Popover** | Richer contextual panel | Trigger keeps its own name; content discoverable by keyboard |
| **Modal** | Blocking, focused decision | Named via `aria-labelledby`; used for decisions, not simple messages |
| **Offcanvas** | Secondary panel/navigation surface | Complements the sidebar on desktop; primary nav on mobile |

## Responsive design

- **Mobile first.** Design the narrow layout first, then enhance with Bootstrap's responsive utilities (`col-md-*`, `d-md-flex`, `table-responsive`, breakpoint variants).
- **One experience, not two.** Don't build a separate mobile site — the same components reflow. The canonical example: the navbar toggler opens an **offcanvas containing the same nav links** on mobile; the sidebar remains the desktop pattern.
- Component behavior at small widths: tables scroll (`table-responsive`), tabs wrap, breadcrumbs wrap, pagination collapses to prev/next + summary, offcanvas becomes primary navigation.
- Test every composition at 320 / 390 / 430 / 768 / 1024 / 1280 / 1440px; the requirement is **zero page-level horizontal overflow** and no clipped controls.
- Theme switching must not cause layout shifts.

## Related

- [Navigation patterns](../components/navigation-patterns.md) · [Offcanvas](../components/offcanvas.md) · [Scrollspy](../components/scrollspy.md)

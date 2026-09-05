# IndigoKit — Project Rules

IndigoKit is a reusable Modern + Enterprise UI framework built on top of Bootstrap 5.

> **Brand note (Task 065):** The project was renamed from **MistUI** to **IndigoKit** after v1.0.0 feature completion. Architecture and functionality are unchanged. The public identity is now **IndigoKit** — "Bootstrap-first Enterprise UI Kit". The `mu-*` component namespace and the `data-mu-*` opt-in attributes are an intentional, established technical API and are **NOT** renamed by the rebrand (see CUSTOM CLASS NAMING).

## ROLE

- The human developer is the final decision-maker.
- The coding agent implements changes under these rules.
- ChatGPT is the architecture/review/advisory agent.
- Do not make major architectural decisions silently.
- If a requested change conflicts with these rules or requires a new dependency/architecture decision, explain the issue and ask for approval before proceeding.

## DECISION WORKFLOW

- The human developer acts as the mediator between the coding agent and ChatGPT.
- The coding agent should not assume that ChatGPT has approved a design unless the human explicitly communicates that approval.
- ChatGPT may provide architectural recommendations, but the human developer has final authority.
- When a major architectural question arises, pause implementation and ask the human to obtain a decision.

## CONVERSATION CONTINUITY

At the beginning of every IndigoKit task:
1. Read `PROJECT_RULES.md`.
2. Read the relevant sections of `AGENT_KNOWLEDGE.md`.
3. Treat both as authoritative project context.
4. Do not assume rules from a previous conversation are still valid if they are not recorded there.
5. Update `AGENT_KNOWLEDGE.md` after meaningful architectural changes.

## COMMITS

- Commit messages are plain and attribution-free: never append tool/agent attribution footers (e.g. `Co-Authored-By:`, "Generated with …") to commit messages or commit bodies.
- Keep the existing conventional style: `type: summary — detail` (`feat`, `fix`, `chore`, `release`, `docs`, `refactor`).

`PROJECT_RULES.md` contains permanent rules and constraints.
`AGENT_KNOWLEDGE.md` contains current project state, decisions, architecture, conventions and implementation history.

When the two conflict:
- `PROJECT_RULES.md` takes precedence.
- If the conflict cannot be resolved, ask the human developer.

## CORE STACK

- Bootstrap 5.3.x is the foundation.
- SCSS is the source styling language.
- Sass compiles SCSS into distributable CSS.
- Vanilla JavaScript is the initial JavaScript approach.
- Lucide is the icon library.
- No React, Angular, jQuery, Tailwind, TypeScript, or additional UI framework unless explicitly approved.

## BOOTSTRAP PHILOSOPHY

- Preserve Bootstrap's familiar class names.
- Do NOT replace Bootstrap classes unnecessarily.
- Prefer extending/customizing existing Bootstrap components over creating duplicate components.
- Examples:
    - `.btn`
    - `.btn-primary`
    - `.card`
    - `.table`
    - `.form-control`
    - `.form-select`
    - `.modal`
    - `.navbar`
    - `.dropdown`
- IndigoKit should improve Bootstrap rather than force existing Bootstrap developers to learn an entirely new API.

## CUSTOM CLASS NAMING

- When Bootstrap does not provide the required concept, create a IndigoKit-specific class.
- All custom IndigoKit classes must use the `mu-` namespace.
- The `mu-` namespace is a stable technical API and is intentionally independent of the public brand name (MistUI → IndigoKit in Task 065). Do NOT introduce `ik-` / `indigo-` classes or rename `mu-*` classes.
- Examples:
    - `.mu-sidebar`
    - `.mu-app-layout`
    - `.mu-page-header`
    - `.mu-stat-card`
- Do not introduce random prefixes or naming conventions.

## BOOTSTRAP PUBLIC API PRESERVATION

IndigoKit is Bootstrap-first.

For any component that already has an established Bootstrap class/API:

- Preserve the Bootstrap class names.
- Extend/customize Bootstrap's implementation.
- Do not create a parallel `mu-*` class for the same functionality.

Example:

CORRECT:
- `.btn`
- `.btn-primary`
- `.btn-secondary`
- `.btn-sm`
- `.btn-lg`
- `.btn-outline-primary`

INCORRECT:
- `.mu-btn`
- `.mu-btn-primary`
- `.mu-btn-secondary`
- `.mu-btn-sm`
- `.mu-btn-lg`
- `.mu-btn-outline-primary`

A developer familiar with Bootstrap should be able to use IndigoKit without learning a second class naming system for existing Bootstrap components.

Use `mu-*` classes ONLY when:
1. Bootstrap has no equivalent concept, OR
2. IndigoKit introduces genuinely new functionality that cannot reasonably be expressed through Bootstrap's existing API.

Examples where `mu-*` may be appropriate:
- `.mu-sidebar`
- `.mu-app-navbar`
- `.mu-app-content`

Examples where `mu-*` should NOT be created:
- buttons
- alerts
- badges
- forms
- cards
- tables
- pagination
- standard Bootstrap components

Before creating a new `mu-*` component class, determine whether Bootstrap already provides the corresponding public API.

If Bootstrap provides it:
EXTEND BOOTSTRAP.

Do not create a parallel API.

This rule applies to ALL future IndigoKit tasks and conversations.

## DESIGN DIRECTION

IndigoKit follows a Modern + Enterprise design philosophy.

### Modern

- Clean
- Professional
- Good whitespace
- Subtle shadows
- Controlled border radius
- Modern typography
- Smooth but restrained interactions
- Light and dark themes

### Enterprise

- Efficient use of screen space
- Excellent tables
- Strong form design
- Data-heavy interfaces
- Filters and toolbars
- Clear navigation
- Accessibility
- Responsive layouts
- Suitable for ERP, CRM, HRMS, SaaS and internal applications

### Avoid

- Excessive gradients
- Excessive animations
- Huge rounded cards everywhere
- Decorative UI that hurts usability
- Dribbble-style designs that prioritize appearance over functionality

## SCSS RULES

- SCSS is the source of truth.
- Do not manually edit generated files in `dist/`.
- Use Bootstrap's SCSS architecture where appropriate.
- Avoid unnecessary overrides.
- Avoid `!important` unless there is a documented reason.
- Prefer design tokens and variables over repeated hard-coded values.
- Keep SCSS modular and organized.
- Do not create files/folders merely for the sake of appearing architecturally complex.

## CURRENT STRUCTURE

```
src/
    scss/
        base/        # tokens, themes, base layer, elements
        components/  # IndigoKit component refinements
        layout/      # app shell, navbar, sidebar
        indigokit.scss # entry point → dist/css/indigokit.css
        indigokit-select2.scss # optional Select2 theme → dist/css/indigokit-select2.css
    js/
        indigokit.js        # shell behavior → dist/js/indigokit.js + indigokit.min.js
        indigokit-select2.js # optional Select2 wrapper → dist/js/indigokit-select2.js + .min.js

scripts/
    minify-js.js      # dependency-free JS minifier (build:js)

playground/
    index.html     # single navigation entry
    pages/         # example application pages (consumers of dist/, never implement IndigoKit)
    assets/        # playground-only assets

dist/  # generated distributable output (CSS + JS, incl. .min variants) — never edit by hand
docs/  # developer-facing documentation
```

## BUILD

- `src/` contains source code.
- `playground/` is for development and visual testing.
- `dist/` contains generated distributable files.
- `docs/` contains future documentation.
- Never manually modify generated files in `dist/`.

## DEPENDENCIES

Current approved dependencies:
- bootstrap
- lucide
- sass
- chart.js (OPTIONAL — charts in dashboard/analytics examples only)
- select2 (OPTIONAL — searchable select / multi-select / tagging only)
- jquery (devDependency ONLY — required at runtime solely by the Select2 integration; never a IndigoKit core requirement)

OPTIONAL INTEGRATION RULES (Task 057):
- Chart.js is optional. Pages that chart load it page-level (`chart.umd.min.js`); `indigokit.js` never depends on it. No second chart library.
- Select2 is optional. The native Bootstrap `<select class="form-select">` remains the default control; pages opt in via `data-mu-select2` (never `data-select2` — that attribute name collides with jQuery's data cache key that Select2 uses for its instance, which breaks initialization).
- jQuery is required ONLY by the Select2 integration. It is referenced exclusively inside `src/js/indigokit-select2.js` (the containment wrapper). It must never appear anywhere else in IndigoKit — `indigokit.js` stays jQuery-free, and no other component, page script, or utility may use it.
- IndigoKit core remains Bootstrap-first and framework-free.

Do NOT add a dependency without explaining:
1. What problem it solves.
2. Why the existing stack cannot solve it.
3. Why the dependency is preferable to implementing the functionality ourselves.
4. Its impact on bundle size/maintenance when relevant.

Do not add dependencies simply because they are common in frontend projects.

## JAVASCRIPT

- Prefer vanilla JavaScript initially.
- Keep JavaScript modular.
- Avoid jQuery.
- Do not add a JavaScript framework unless explicitly approved.
- Accessibility and keyboard behavior must be considered for interactive components.

## ACCESSIBILITY

- Use semantic HTML.
- Maintain visible focus states.
- Interactive components must be keyboard accessible.
- Use ARIA only when appropriate; do not add unnecessary ARIA.
- Maintain reasonable color contrast.
- Modals, dropdowns, navigation and forms must be accessible.

## RESPONSIVE DESIGN

Every component/layout should consider:
- Desktop
- Tablet
- Mobile

Do not treat responsive behavior as an afterthought.

## COMPONENT DEVELOPMENT

Before implementing a new component:
1. Check whether Bootstrap already provides the component.
2. Check whether IndigoKit already provides similar functionality.
3. Determine whether we should extend Bootstrap or create a new `mu-*` component.
4. Implement only after the approach is clear.

Do not create duplicate functionality.

## PLAYGROUND

Every significant component should have a playground example.

The playground should demonstrate:
- Normal usage
- Important variants
- Responsive behavior where applicable
- Dark mode where applicable
- Edge cases where useful

## QUALITY

Before considering a meaningful feature complete:
- Build successfully.
- Check for SCSS compilation errors.
- Check browser behavior when relevant.
- Check responsive behavior when relevant.
- Check accessibility for interactive components.
- Run code review for meaningful changes.

## CODE REVIEW

Use the code-reviewer/review workflow for meaningful changes.

Do not blindly accept review output.
The human developer makes the final decision.

## COMMUNICATION

When implementing a task:
1. Explain the intended approach briefly.
2. Identify files that will change.
3. Implement the change.
4. Report what changed.
5. Report any assumptions.
6. Report any issues or follow-up decisions.

Do not silently introduce architectural changes.

## PLAYGROUND & STYLING ARCHITECTURE

These rules apply to ALL future IndigoKit tasks, conversations, sessions, and implementations unless explicitly changed by the human developer.

1. **SCSS IS THE SOURCE OF TRUTH**
   All IndigoKit framework styling must originate from `src/scss/`. Never implement IndigoKit framework styles directly inside HTML files.

2. **NO INLINE FRAMEWORK CSS**
   Do not place IndigoKit implementation CSS inside `<style>...</style>` in any HTML file. Do not use inline `style="..."` attributes for IndigoKit implementation styling, unless there is a specific technical reason that has been explicitly approved.

3. **PLAYGROUND IS A CONSUMER**
   The playground demonstrates and tests IndigoKit. The playground does NOT implement IndigoKit.

   ```
   src/scss/ → Sass build → dist/css/indigokit.css → playground HTML
   ```

4. **PLAYGROUND-ONLY STYLES**
   If the playground itself requires styling that is NOT part of IndigoKit, put it in `playground/playground.css`. Playground-only CSS must never implement or duplicate IndigoKit components.

5. **SINGLE PLAYGROUND ENTRY**
   The primary playground entry point is `playground/index.html`. It must provide navigation to the available IndigoKit demonstrations. New showcase pages must be linked from the central playground navigation.

6. **NEW COMPONENT RULE**
   When implementing a new IndigoKit component:
   - Component styling belongs under `src/scss/components/`
   - Component behavior belongs under `src/js/` when necessary
   - A demonstration belongs under `playground/pages/`
   - The playground page must consume the compiled IndigoKit output
   - Do not implement the component again inside the playground page

7. **NO DUPLICATION**
   Never solve a playground styling problem by duplicating framework CSS. If a playground page requires a visual behavior that should actually be part of IndigoKit, move the implementation into the appropriate IndigoKit source instead.

8. **BEFORE IMPLEMENTATION**
   For every future task involving UI styling, determine whether the requested style belongs to:
   - **A. IndigoKit framework** → implement it in `src/scss/`.
   - **B. Playground-only presentation** → implement it in `playground/playground.css`.

9. **PERMANENT RULE**
   These rules apply to every future IndigoKit task and conversation. Do not treat them as instructions limited to the current task.

10. **ARCHITECTURAL CONFLICT**
    If a requested implementation appears to require violating these rules: **STOP.** Explain the conflict and ask the human developer for a decision. Do not silently bypass the rule.

## PLAYGROUND APPLICATION EXAMPLES

These rules apply to ALL future IndigoKit tasks, conversations, sessions, and implementations unless explicitly changed by the human developer.

1. **PERMANENT RULE — NO PAGE-SPECIFIC CUSTOM CSS**
   Example application pages in `playground/` must be built exclusively using Bootstrap-compatible IndigoKit APIs and existing shared infrastructure. Page-specific custom CSS, inline styles, and page-specific `mu-*` classes are prohibited.

2. **EXAMPLE PAGES ARE A TEST OF INDIGOKIT**
   Example pages (dashboard, auth, errors, profile, settings, pricing, FAQ, invoice, users, products, etc.) must be composed from:
   - Bootstrap classes and utilities
   - IndigoKit's existing styling and tokens
   - existing IndigoKit components
   They must NEVER hide a missing design-system capability with one-off page CSS. If an example cannot be built cleanly, report the missing reusable capability instead.

3. **NO PAGE-SPECIFIC FILES**
   Do not create page-specific CSS files (e.g., `login.css`, `dashboard.css`) or page-specific `mu-*` classes (e.g., `.mu-login-*`, `.mu-dashboard-*`, `.mu-error-*`, `.mu-auth-*`). Only genuinely reusable IndigoKit capabilities may enter `src/scss/`.

4. **SHELLS**
   Application pages use the existing `.mu-app` shell (navbar + sidebar + main). Auth and error pages use a minimal centered Bootstrap composition without the shell. No separate CSS shells.

5. **DISCLOSED EXCEPTION — PROGRESS WIDTH**
   The only inline `style="width: …%"` allowed is Bootstrap's canonical `.progress-bar` value mechanism (Bootstrap's own documented API for setting progress), matching the existing progress demo convention. All other inline styles are prohibited on example pages.

## IMPORTANT

Do not generate the entire framework at once.

Build IndigoKit incrementally.

Each feature should be:
- Small
- Understandable
- Testable
- Reusable
- Consistent with the existing architecture.

When uncertain between two approaches, stop and present the options with pros/cons instead of guessing.

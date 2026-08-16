# Component usage

How to choose and combine the core components.

## Buttons

| Emphasis | Class | Use for |
|---|---|---|
| Primary | `.btn-primary` | The **main action** on the screen — one per view/region |
| Secondary | `.btn-secondary` | Supporting actions next to the main one |
| Outline | `.btn-outline-*` | Lower-emphasis actions (secondary sets, toolbar filters) |
| Danger | `.btn-danger` | Destructive actions (delete, remove, revoke) |
| Link | `.btn-link` | Inline text-style actions |

Guidelines:

- **One primary action per region.** If everything is primary, nothing is.
- Destructive actions are `btn-danger` **and** clearly worded ("Delete project", not "Remove").
- Icon + text buttons: icon `aria-hidden="true"`, text carries the meaning, `me-1`/`me-2` for spacing.
- Loading state: keep the text ("Saving…"), add `spinner-border spinner-border-sm`, and `disabled`.
- Preserve Bootstrap's API — `.btn`, `.btn-primary`, `.btn-sm` are the classes, always.

```html
<div class="d-flex gap-2">
  <button type="button" class="btn btn-primary">Save changes</button>
  <button type="button" class="btn btn-outline-secondary">Discard</button>
</div>
```

## Forms

- **Label first.** Every control has a `<label for>`. A placeholder is never a label — it disappears on input and is invisible to many screen readers.
- **Group related controls.** Use `<fieldset>` + `<legend>` for option groups; use cards or section headings for larger groups. Don't dump 20 fields into one flat column.
- **Validation that helps.** `.invalid-feedback` text says what's wrong and how to fix it ("Enter a work email"), never just "invalid". Icon + border + text — never color alone.
- **Concise help text.** One line of `.form-text` per control, `aria-describedby`-linked. Delete help text that restates the label.
- **Required clarity.** `required` attribute + a visible marker in the label + `.form-text` note ("Required").
- **Layout.** `row g-3` with `col-md-*` for multi-column; collapse to single column on mobile.

```html
<div class="mb-3">
  <label for="email" class="form-label">Work email <span class="text-danger">*</span></label>
  <input type="email" class="form-control" id="email" required aria-describedby="emailHelp">
  <div id="emailHelp" class="form-text">Required. Use your company address.</div>
</div>
```

## Cards

Cards group **meaningful content**: an entity summary, an interactive item, a self-contained module.

- Use cards for: entity cards (project, customer), summary modules (usage, quota), interactive items (with `.mu-card-interactive`), forms/panels that need visual containment.
- **Don't "card everything."** Continuous content stays in lists and tables; form fields live in forms, not in a stack of cards. Cards add separation — use them when separation adds meaning.
- Card titles are headings that fit the page outline (`<h2 class="card-title h5">`); body text uses `text-body-secondary` for supporting content.

## Tables

Tables render **tabular data** — rows that share the same columns.

- Use a table when users scan, compare, sort, or export records. Use cards/lists when items are heterogeneous or each item is mostly unique content.
- Wrap in `.table-responsive`; let it scroll horizontally at narrow widths instead of breaking the table.
- **Column priority:** put the identifying column first (`th scope="row"`), keep high-value columns, let `.table-responsive` handle overflow rather than dropping columns unless genuinely redundant.
- **Actions:** a trailing column of `.btn-sm` outline buttons (View / Edit / Delete), right-aligned with `d-flex gap-1 justify-content-end`. Icon-only actions need `aria-label`.
- **Empty:** show an empty state (see [States](states.md)), not a bare header row.
- **Paging:** pagination below the table with the current page marked.
- Don't force complex, hierarchical information into a table — that's what detail pages are for.

## Related

- [Component reference](../components/) — API and variants for each component.
- [Composition patterns](composition.md) — full-page recipes.

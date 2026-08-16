# Tables

## Purpose

Tables are Bootstrap's — IndigoKit refines headers, borders, and density. No data-grid framework: sorting/filtering engines are out of scope; tables render data.

## Bootstrap API

`.table` · `.table-striped` · `.table-hover` · `.table-bordered` · `.table-borderless` · `.table-sm` · `.table-responsive` · `.table-group-divider` · `.table-{primary|secondary|success|info|warning|danger|light|dark}` · `caption` · `<th scope>`

## Basic Usage

```html
<div class="table-responsive">
  <table class="table table-striped table-hover">
    <caption>Deployments in the last 30 days</caption>
    <thead>
      <tr>
        <th scope="col">Project</th>
        <th scope="col">Status</th>
        <th scope="col" class="text-end">Cost</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Q3 roadmap</th>
        <td><span class="badge text-bg-success">Healthy</span></td>
        <td class="text-end">$1,240.00</td>
        <td>
          <div class="d-flex gap-1 justify-content-end">
            <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
            <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
            <button type="button" class="btn btn-sm btn-outline-danger" aria-label="Delete Q3 roadmap">Delete</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

## Variants

- `.table-striped`, `.table-hover`, `.table-bordered`, `.table-borderless`, `.table-sm` (dense admin mode), `.table-group-divider`.
- Contextual `.table-{color}` rows/columns with accompanying text ("Healthy"/"Down") — never tint alone.
- `text-end` on numeric cells (currency, quantities, percentages); dates read naturally left-to-right.

## Accessibility

- `caption` describes the table where useful; don't hide it for visual convenience.
- `th scope="col"` for column headers, `th scope="row"` for row headers.
- Action cells use real `.btn .btn-sm` buttons; icon-only buttons need `aria-label`.
- Responsive wrap is `.table-responsive` — scrolls horizontally only when genuinely needed, never breaking the table into divs.

## Responsive Behavior

`.table-responsive` contains overflow at 320–430px; the header stays readable and cells remain usable inside the scroll area. Tested 320 → 1440px with zero page-level overflow.

## Theming

Headers, borders, hover, and striping flip via `--bs-*`. Contextual variants re-map to the emphasis/subtle variable family in dark so tinted rows never render as bright pastel on the dark body.

## Do

- Wrap tables in `<div class="table-responsive">` and use `class="table"`.
- Use `th scope="col"` / `scope="row"` and a `caption` where useful.
- Use real `.btn .btn-sm` buttons in action cells.

## Don't

- Don't use `class="mu-table"` or rebuild tables as div grids.
- Don't omit `scope` on headers.
- Don't ship icon-only action buttons without `aria-label`.

## Playground

[Playground — tables](../playground/pages/tables.html)

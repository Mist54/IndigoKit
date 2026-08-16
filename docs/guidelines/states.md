# States & feedback

## Empty vs loading vs error

Three states that are easy to confuse — and must never be confused:

| State | Meaning | What to show |
|---|---|---|
| **Loading** | The system is retrieving data | A spinner + text ("Loading projects…"), or a loading row/section. Never empty messaging. |
| **Empty** | Data loaded **successfully** and there is nothing to show | An empty state: icon, title, description, action (see [Empty states](../components/empty-states.md)) |
| **Error** | The operation **failed** | An error message: what failed and how to proceed. An empty state must **never** mask an error |

Practical rules:

- Don't render empty-state messaging while data is still loading.
- Don't say "No results" when the request actually failed — say what failed.
- Empty states answer: what is empty? why? what can I do next?
- Distinguish no-search-results (show the query + clear action) from no-data-at-all (first-use guidance).

## Feedback: toast vs alert vs modal

| Channel | Character | Use for |
|---|---|---|
| **Toast** | Non-blocking, transient, top/bottom corner | "Project saved." "Backup finished." Background operation completion |
| **Alert** | Persistent, page-level, in content flow | Contextual info/errors that must stay visible ("You're on the Free plan — 2 of 3 projects used") |
| **Modal** | Focused, blocking, demands a decision | Destructive confirmations, focused decisions, forms that must be completed before continuing |

Guidelines:

- **Don't use a modal for simple messages.** "Saved" is a toast; a plain "Note" is an alert. Reserve modals for decisions.
- Toasts complement alerts — they never replace them (persistent page info belongs in an alert).
- Error toasts use `role="alert"` and persist (no aggressive auto-dismiss); informational toasts use `role="status"`.
- Destructive actions deserve a modal confirmation **or** an undo path — never an instant, unrecoverable action.

```html
<!-- Destructive confirmation: modal -->
<div class="modal" tabindex="-1" aria-labelledby="delTitle" aria-hidden="true">…</div>

<!-- Persistent context: alert -->
<div class="alert alert-warning" role="alert">You've used 2 of 3 plan projects.</div>

<!-- Event feedback: toast -->
<div class="toast" role="status" aria-live="polite" aria-atomic="true">Project saved.</div>
```

## Related

- [Loading](../components/loading.md) · [Empty states](../components/empty-states.md) · [Alerts](../components/alerts.md) · [Toasts](../components/toasts.md) · [Modals](../components/modals.md)

---
type: Quest
summary: "Bring the Ashen Lantern out of the chapel."
sources: []
status: ""
revealed: ""
title: "Lantern for the Chapel"
---

## At a glance

- **Offered by.** [[Mara Voss]]
- **Reward.** Text.
- **Deadline.** Text.
- **Done when.** Text.
- **Failed when.** Text.
- **Advances.** [[The Cold Hearth]]

> [!narration] The offer
> A lantern waits on the pew.

## Play

- **Leads.** Text.
- **Opposition.** Text.
- **Complications.** Text.
- **Payoff.** Text.

## Depth

Text.

### Hidden truths

Text.

## Links

```base
filters:
  and:
    - file.hasLink(this.file)
views:
  - type: table
    name: Linked from
    groupBy:
      property: note.type
      direction: ASC
    order:
      - file.name
      - note.summary
```

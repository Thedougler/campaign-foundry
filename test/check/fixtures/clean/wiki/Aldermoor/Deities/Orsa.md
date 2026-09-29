---
type: Deity
summary: "Goddess of hearths and second chances."
sources: []
---

## At a glance

- **Domains.** Text.
- **Symbol.** Text.
- **Alignment.** Text.
- **Worshipped by.** [[Ember Court]]
- **Asks of followers.** Text.

> [!narration] Invocation
> Spoken text for the table.

## Play

- **Boons.** Text.
- **Costs.** Text.
- **Clergy and shrines.** Text.
- **How it intervenes.** Text.

## Depth

Text.

### Myth

Text.

### Rivals and allies

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

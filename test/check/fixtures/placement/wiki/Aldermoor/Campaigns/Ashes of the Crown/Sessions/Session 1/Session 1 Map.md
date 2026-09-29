---
type: Handout
summary: "One line."
sources: []
---

## At a glance

- **Kind.** Text.
- **Presented as.** Text.
- **Handed over in.** Text.
- **From.** Text.

> [!narration] Handout text
> Spoken text for the table.

## Play

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

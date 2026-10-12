---
type: Handout
summary: "A poster for the Bandit Captain."
sources: []
revealed: ""
title: "Wanted Poster"
---

- **Kind.** Text.
- **Presented as.** Text.
- **Handed over in.** [[Session 1 - Storm at the Crossing]]
- **From.** Text.

> [!narration] Handout text
> Fifty gold for the Bandit Captain, who burned the mill.

![[wanted-poster.png]]

## Hand-over

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

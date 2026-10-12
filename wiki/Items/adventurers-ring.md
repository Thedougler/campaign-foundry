---
title: Adventurer's Ring
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Ring, Common.*

While the cover on this ring is open, the ring produces a flame that creates no heat and consumes no fuel. It sheds Bright Light in a 20-foot radius and Dim Light for an additional 20 feet. As a Bonus Action, you can close the cover, smothering the flame, or open it again.

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

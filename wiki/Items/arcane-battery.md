---
title: Arcane Battery
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Uncommon.*

This smooth, oval stone is etched with faintly glowing, magical symbols. While holding the battery, you can take a Magic action to touch the battery to one magic item. If that magic item normally regains expended charges daily, it immediately regains 1d4 + 1 expended charges, and the battery loses its magic.

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

---
title: Ring of Water Walking
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Ring, Uncommon.*

While wearing this ring, you cast *Water Walk* from it, targeting only yourself.

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

---
title: Ring of Three Wishes
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Ring, Legendary.*

While wearing this ring, you can expend 1 of its 3 charges to cast *Wish* from it. The ring becomes nonmagical when you use the last charge.

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

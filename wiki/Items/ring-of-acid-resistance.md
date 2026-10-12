---
title: Ring of Acid Resistance
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Ring, Rare.*

You have Resistance to Acid damage while wearing this ring. The ring is set with pearl.

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

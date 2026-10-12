---
title: Amulet of Health
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Rare (Requires Attunement), 1 lb.*

Your Constitution score is 19 while you wear this amulet. It has no effect on you if your Constitution is already 19 or higher without it.

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

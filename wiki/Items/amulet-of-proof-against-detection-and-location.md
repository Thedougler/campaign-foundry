---
title: Amulet of Proof against Detection and Location
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Uncommon (Requires Attunement), 1 lb.*

While wearing this amulet, you can't be targeted by Divination spells or perceived through magical scrying sensors unless you allow it.

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

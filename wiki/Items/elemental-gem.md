---
title: Elemental Gem
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Uncommon.*

Multiple variations of this item exist, as listed below:

- *Elemental Gem, Blue Sapphire*
- *Elemental Gem, Emerald*
- *Elemental Gem, Red Corundum*
- *Elemental Gem, Yellow Diamond*

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

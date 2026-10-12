---
title: Infiltrator's Key
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item, Legendary (Requires Attunement).*

Vestige

This mithral skeleton key was forged using the blood of twelve master thieves executed for trying to steal magic items during the Age of Arcanum.

***Vestige of Divergence.*** *This item is a Vestige of Divergence, see *Vestiges of Divergence* for more information.*

Multiple variations of this item exist, as listed below:

- *Infiltrator's Key (Dormant)*
- *Infiltrator's Key (Awakened)*
- *Infiltrator's Key (Exalted)*

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

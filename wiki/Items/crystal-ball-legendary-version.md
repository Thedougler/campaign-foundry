---
title: Crystal Ball (Legendary Version)
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Legendary (Requires Attunement), Major Tier, 3 lb.*

Multiple variations of this item exist, as listed below:

- *Crystal Ball of Mind Reading*
- *Crystal Ball of Telepathy*
- *Crystal Ball of True Seeing*

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

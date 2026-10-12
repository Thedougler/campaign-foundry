---
title: Dragon Vessel
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item (Requires Attunement).*

This vessel can be a potion bottle, drinking horn, or other container meant to hold a liquid.

Multiple variations of this item exist, as listed below:

- *Slumbering Dragon Vessel*
- *Stirring Dragon Vessel*
- *Wakened Dragon Vessel*
- *Ascendant Dragon Vessel*

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

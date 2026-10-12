---
title: Scaled Ornament
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Wondrous Item (Requires Attunement).*

This ornament can be jewellery, a cloak, or another wearable accessory. It appears to be fashioned from a dragon's scale, tooth, or claw, or it incorporates images in those shapes.

Multiple variations of this item exist, as listed below:

- *Slumbering Scaled Ornament*
- *Stirring Scaled Ornament*
- *Wakened Scaled Ornament*
- *Ascendant Scaled Ornament*

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

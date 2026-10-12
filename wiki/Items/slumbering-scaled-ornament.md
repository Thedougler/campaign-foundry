---
title: Slumbering Scaled Ornament
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Wondrous Item, Uncommon (Requires Attunement).*

This ornament can be jewellery, a cloak, or another wearable accessory. It appears to be fashioned from a dragon's scale, tooth, or claw, or it incorporates images in those shapes.

You have advantage on saving throws you make to avoid being charmed or frightened or to end those conditions on you.

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

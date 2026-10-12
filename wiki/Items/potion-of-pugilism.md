---
title: Potion of Pugilism
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Potion, Uncommon, ½ lb.*

After you drink this potion, each Unarmed Strike you make deals an extra 1d6 Force damage on a hit. This effect lasts 10 minutes.

This potion is a thick green fluid that tastes like spinach.

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

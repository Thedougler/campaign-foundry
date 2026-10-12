---
title: Ring of Warmth
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Ring, Uncommon (Requires Attunement).*

If you take Cold damage while wearing this ring, the ring reduces the damage you take by 2d8.

In addition, while wearing this ring, you and everything you wear and carry are unharmed by temperatures of 0 degrees Fahrenheit or lower.

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

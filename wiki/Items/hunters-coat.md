---
title: Hunter's Coat
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Light Armour (*Leather Armour*), Very Rare (Requires Attunement), 10 lb.*

AC 11 + Dex

You have a +1 bonus to AC while wearing this armour.

The coat has 3 charges. When you hit a creature with an attack and that creature doesn't have all its hit points, you can expend 1 charge to deal an extra 1d10 necrotic damage to the target. The coat regains 1d3 expended charges daily at dawn.

The breastplate and shoulder protectors of this armour are made of leather that has been stiffened by being boiled in oil. The rest of the armour is made of softer and more flexible materials.

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

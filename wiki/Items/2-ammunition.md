---
title: +2 Ammunition
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Ammunition, Generic Variant, Rare.*

You have a +2 bonus to attack and damage rolls made with this piece of magic ammunition. Once it hits a target, the ammunition is no longer magical.

This ammunition is typically found or sold in quantities of ten or twenty pieces. Ten pieces of this ammunition are equivalent in value to a potion of the same rarity *(2,000 GP)*.

***Base items.*** This item variant can be applied to the following base items:

- *Arrow* (*+2 Arrow*)
- *Bolt* (*+2 Bolt*)
- *Energy Cell* (*+2 Energy Cell*)
- *Firearm Bullet* (*+2 Firearm Bullet*)
- *Needle* (*+2 Needle*)
- *Sling Bullet* (*+2 Sling Bullet*)

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

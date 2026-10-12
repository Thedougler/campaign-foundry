---
title: +1 Ammunition
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Ammunition, Generic Variant, Uncommon.*

You have a +1 bonus to attack and damage rolls made with this piece of magic ammunition. Once it hits a target, the ammunition is no longer magical.

This ammunition is typically found or sold in quantities of ten or twenty pieces. Ten pieces of this ammunition are equivalent in value to a potion of the same rarity *(200 GP)*.

***Base items.*** This item variant can be applied to the following base items:

- *Arrow* (*+1 Arrow*)
- *Bolt* (*+1 Bolt*)
- *Energy Cell* (*+1 Energy Cell*)
- *Firearm Bullet* (*+1 Firearm Bullet*)
- *Needle* (*+1 Needle*)
- *Sling Bullet* (*+1 Sling Bullet*)

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

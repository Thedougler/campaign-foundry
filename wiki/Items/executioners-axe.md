---
title: Executioner's Axe
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Generic Variant, Very Rare.*

You gain a +1 bonus to attack rolls and damage rolls made with this magic weapon.

Any Humanoid you hit with the weapon takes an extra 2d6 Slashing damage, and you gain Temporary Hit Points equal to the extra damage dealt.

***Base items.*** This item variant can be applied to the following base items:

- *Battleaxe* (*Executioner's Battleaxe*)
- *Greataxe* (*Executioner's Greataxe*)
- *Halberd* (*Executioner's Halberd*)
- *Handaxe* (*Executioner's Handaxe*)

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

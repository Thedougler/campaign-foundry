---
title: Mace of Smiting
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Weapon (*Mace*), Rare, Simple Weapon, Melee Weapon, 4 lb.*

1d6 Bludgeoning

Mastery:  Sap

You gain a +1 bonus to attack rolls and damage rolls made with this magic weapon. The bonus increases to +3 when you use the weapon to attack a Construct.

When you roll a 20 on an attack roll made with this weapon, the target takes an extra 7 Bludgeoning damage, or 14 Bludgeoning damage if it's a Construct. If a Construct has 25 Hit Points or fewer after taking this damage, it is destroyed.

***Mastery: Sap.*** If you hit a creature with this weapon, that creature has Disadvantage on its next attack roll before the start of your next turn.

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

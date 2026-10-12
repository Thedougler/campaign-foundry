---
title: Martialist's Quarterstaff
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Staff, Weapon (*Quarterstaff*), Uncommon (Requires Attunement), Simple Weapon, Melee Weapon, 4 lb.*

1d6 Bludgeoning

Versatile (1d8)

Mastery:  Topple

This magic *Quarterstaff* has 4 charges and regains 1d4 expended charges daily at dawn. It has the following additional properties.

***Searing Smite.*** You can expend 2 charges to cast the *Searing Smite* spell (DC 13).

***Throw.*** When you take the Attack action, you can expend 1 charge to imbue the staff with magical velocity. Until the end of your next turn, the staff gains the Thrown property, with a normal range of 20 feet and a long range of 60 feet, and immediately after you make a ranged attack with the weapon, it flies back to your hand.

***Trip.*** When you make a melee attack with this weapon, you can expend 1 charge to give yourself Advantage on the attack roll. If the attack hits, the target makes a DC 13 Strength saving throw. On a failed save, the target has the Prone condition.

***Versatile.*** A Versatile weapon can be used with one or two hands. A damage value in parentheses appears with the property. The weapon deals that damage when used with two hands to make a melee attack.

***Mastery: Topple.*** If you hit a creature with this weapon, you can force the creature to make a Constitution saving throw (DC 8 plus the ability modifier used to make the attack roll and your Proficiency Bonus). On a failed save, the creature has the Prone condition.

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

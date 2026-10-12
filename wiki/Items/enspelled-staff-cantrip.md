---
title: Enspelled Staff (Cantrip)
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Staff, Weapon, Uncommon (Requires Attunement By a Spellcaster), Simple Weapon, Melee Weapon, 4 lb.*

1d6 Bludgeoning

Versatile (1d8)

Mastery:  Topple

Bound into this staff is a cantrip. The cantrip is determined when the staff is created and can be of any school of magic. The staff has 6 charges and regains 1d6 expended charges daily at dawn. While holding the staff, you can expend 1 charge to cast its spell. If you expend the staff's last charge, roll 1d20. On a 1, the staff loses its properties and becomes a nonmagical *Quarterstaff*.

The spell's saving throw DC is 13, and its attack bonus is +5.

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

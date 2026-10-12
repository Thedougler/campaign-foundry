---
title: Trident of Fish Command
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Weapon (*Trident*), Uncommon (Requires Attunement), Martial Weapon, Melee Weapon, 4 lb.*

1d8 Piercing

Thrown (20/60 ft.), Versatile (1d10)

Mastery:  Topple

This magic weapon has 3 charges, and it regains 1d3 expended charges daily at dawn. While you carry it, you can expend 1 charge to cast *Dominate Beast* (save DC 15) from it on a Beast that has a Swim Speed.

***Thrown.*** If a weapon has the Thrown property, you can throw the weapon to make a ranged attack, and you can draw that weapon as part of the attack. If the weapon is a Melee weapon, use the same ability modifier for the attack and damage rolls that you use for a melee attack with that weapon.

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

---
title: Staff of the Lost
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Play

### Properties

*Staff, Weapon, Very Rare (Requires Attunement), Simple Weapon, Melee Weapon, 4 lb.*

1d6 Bludgeoning

Versatile (1d8)

Mastery:  Topple

This staff can be wielded as a magic *Quarterstaff* that grants a +1 bonus to attack rolls and damage rolls made with it.

The staff has 3 charges. While holding the staff, you can expend 1 charge to cast either *Maze* (save DC 18) or *Teleport* from it. When the staff has no more charges remaining, it loses its magic and becomes a nonmagical *Quarterstaff*.

***Curse.*** This staff is cursed. Becoming attuned to it extends the curse to you. As long as you remain cursed, you are unwilling to part with the staff, keeping it on your person at all times.

While attuned to this staff, you never know which way is north, and you have Disadvantage on Wisdom (Survival) checks made to navigate. Additionally, whenever you expend a charge from the staff, roll 1d20. On a 1, 1d4 **minotaurs of Baphomet** materialize, each appearing in an unoccupied space within 30 feet of you. The minotaurs begin combat with you immediately.

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

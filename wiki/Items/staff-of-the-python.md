---
title: Staff of the Python
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Staff, Weapon, Uncommon (Requires Attunement), Simple Weapon, Melee Weapon, 4 lb.*

1d6 Bludgeoning

Versatile (1d8)

Mastery:  Topple

As a Magic action, you can throw this staff so that it lands in an unoccupied space within 10 feet of you, causing the staff to become a **Giant Constrictor Snake** in that space. The snake is under your control and shares your Initiative count, taking its turn immediately after yours.

On your turn, you can mentally command the snake (no action required) if it is within 60 feet of you and you don't have the Incapacitated condition. You decide what action the snake takes and where it moves during its turn, or you can issue it a general command, such as to attack your enemies or guard a location. Absent commands from you, the snake defends itself.

As a Bonus Action, you can command the snake to revert to staff form in its current space, and you can't use the staff's property again for 1 hour. If the snake is reduced to 0 Hit Points, it dies and reverts to its staff form; the staff then shatters and is destroyed. If the snake reverts to staff form before losing all its Hit Points, it regains all of them.

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

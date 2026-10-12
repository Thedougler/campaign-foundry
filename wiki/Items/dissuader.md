---
title: Dissuader
type: Item
summary: ""
sources: ["archive/all-magic-items.md"]
---

## Properties

*Staff, Weapon, Rare (Requires Attunement), Simple Weapon, Melee Weapon, 4 lb.*

1d6 Bludgeoning

Versatile (1d8)

Mastery:  Topple

This staff can be wielded as a magic *Quarterstaff* that grants a +1 bonus to attack rolls and damage rolls made with it. It also has the following additional properties. Once one of these properties is used, that property can't be used again until the next dawn.

***Calm Emotions.*** You can cast the *Calm Emotions* spell (save DC 15) from the staff.

***Dissuading Aura.*** As a Magic action while holding the staff, you can create a 30-foot Emanation of mental unrest originating from you that lasts for 1 minute. Whenever the Emanation enters the space of a creature you can see and whenever a creature you can see enters the Emanation or ends its turn there, you can force that creature to make a DC 15 Wisdom saving throw. On a failed save, the creature has the Frightened condition until the start of its next turn.

***Repel.*** When a creature enters a space within 5 feet of you, you can take a Reaction to create a shock wave of force. Each creature of your choice in a 30-foot Emanation originating from you must succeed on a DC 15 Strength saving throw or be pushed up to 30 feet straight away from you.

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

---
title: Talon Beast
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Monstrosity
size: Large
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Talon Beast
size: Large
type: monstrosity
alignment: Unaligned
ac: 14
ac_class: natural armour
hp: 114
hit_dice: 12d10 + 48
modifier: 2
speed: 40 ft.
stats: [ 22, 14, 19, 5, 12, 5 ]
skillsaves:
  - perception: 4
condition_immunities: frightened
senses: darkvision 60 ft., passive Perception 14
cr: "7"
traits:
  - name: Magic Resistance
    desc: The talon beast has advantage on saving throws against spells and other magical effects.
  - name: Sense Magic
    desc: The talon beast can detect and pinpoint the location of magic within 120 feet of itself.
actions:
  - name: Multiattack
    desc: The talon beast makes two Talon attacks or a Talon attack and a Beak attack.
  - name: Beak
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one target. *Hit:* 17 (2d10 + 6) piercing damage, and if the target has any spell effects on itself or any magic items in its possession, the target must make a DC 15 Charisma saving throw. On a failed save, a random spell effect on the target ends. If the target has no spell effects on it, one random magic item in its possession has its magical properties suppressed for 1 minute. If the item is a potion or scroll, it becomes nonmagical instead."
  - name: Talon
    desc: "*Melee Weapon Attack:* +9 to hit, reach 10 ft., one target. *Hit:* 15 (2d8 + 6) slashing damage, and the target has the grappled condition (escape DC 17). Until the grapple ends, the target has the restrained condition, and the talon beast can't use Talon on another target."
```

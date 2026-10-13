---
title: Armanite
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Fiend
size: Large
habitat:
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Armanite
size: Large
type: fiend
subtype: demon
alignment: Typically Chaotic Evil
ac: 16
ac_class: natural armour
hp: 94
hit_dice: 9d10 + 45
modifier: 4
speed: 60 ft.
stats: [ 21, 18, 21, 8, 12, 13 ]
damage_resistances: cold, fire, lightning
damage_immunities: poison
condition_immunities: poisoned
senses: darkvision 120 ft., passive Perception 11
languages: Abyssal, telepathy 120 ft.
cr: "7"
traits:
  - name: Magic Resistance
    desc: The armanite has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The armanite makes one Claw attack, one Hooves attack, and one Serrated Tail attack.
  - name: Claw
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 10 (2d4 + 5) slashing damage plus 9 (2d8) lightning damage."
  - name: Hooves
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 12 (2d6 + 5) bludgeoning damage. If the target is a Large or smaller creature, it must succeed on a DC 16 Strength saving throw or be knocked prone."
  - name: Serrated Tail
    desc: "*Melee Weapon Attack:* +8 to hit, reach 10 ft., one target. *Hit:* 16 (2d10 + 5) slashing damage."
  - name: Lightning Lance (Recharge 5–6)
    desc: The armanite looses a bolt of lightning in a line that is 60 feet long and 10 feet wide. Each creature in the line must make a DC 15 Dexterity saving throw, taking 36 (8d8) lightning damage on a failed save, or half as much damage on a successful one.
```

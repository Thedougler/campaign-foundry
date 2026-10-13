---
title: Clockwork Stone Defender
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Construct
size: Medium
habitat:
  - Forest
  - Grassland
  - Hill
  - Mountain
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
  - Return to the Glory
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Clockwork Stone Defender
size: Medium
type: construct
alignment: Unaligned
ac: 16
ac_class: natural armour
hp: 105
hit_dice: 14d8 + 42
modifier: 0
speed: 30 ft.
stats: [ 19, 10, 17, 3, 10, 1 ]
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned
senses: darkvision 60 ft., passive Perception 10
languages: understands one language of its creator but can't speak
cr: "4"
traits:
  - name: Magic Resistance
    desc: The clockwork has advantage on saving throws against spells and other magical effects.
  - name: Unusual Nature
    desc: The clockwork doesn't require air, food, drink, or sleep.
actions:
  - name: Slam
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 11 (2d6 + 4) bludgeoning damage, and if the target is Large or smaller, it is knocked prone."
reactions:
  - name: Intercept Attack
    desc: In response to another creature within 5 feet of it being hit by an attack roll, the clockwork gives that creature a +5 bonus to its AC against that attack, potentially causing a miss. To use this ability, the clockwork must be able to see the creature and the attacker.
```

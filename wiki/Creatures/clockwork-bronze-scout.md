---
title: Clockwork Bronze Scout
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
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
name: Clockwork Bronze Scout
size: Medium
type: construct
alignment: Unaligned
ac: 13
hp: 36
hit_dice: 8d8
modifier: 3
speed: 30 ft., burrow 30 ft.
stats: [ 10, 16, 11, 3, 14, 1 ]
skillsaves:
  - perception: 6
  - stealth: 7
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned
senses: darkvision 60 ft., passive Perception 16
languages: understands one language of its creator but can't speak
cr: "1"
traits:
  - name: Earth Armour
    desc: The clockwork doesn't provoke opportunity attacks when it burrows.
  - name: Magic Resistance
    desc: The clockwork has advantage on saving throws against spells and other magical effects.
  - name: Unusual Nature
    desc: The clockwork doesn't require air, food, drink, or sleep.
actions:
  - name: Bite
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 5 (1d4 + 3) piercing damage plus 3 (1d6) lightning damage."
  - name: Lightning Flare (Recharges after a Short or Long Rest)
    desc: Each creature in contact with the ground within 15 feet of the clockwork must make a DC 13 Dexterity saving throw, taking 14 (4d6) lightning damage on a failed save, or half as much damage on a successful one.
```

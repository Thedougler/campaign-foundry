---
title: Aeorian Reverser
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Monstrosity
size: Large
habitat: []
sourcebooks:
  - Explorer's Guide to Wildemount
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Aeorian Reverser
size: Large
type: monstrosity
alignment: Neutral Evil
ac: 15
ac_class: natural armour
hp: 133
hit_dice: 14d10 + 56
modifier: 3
speed: 40 ft., climb 40 ft.
stats: [ 21, 16, 18, 6, 14, 8 ]
saves:
  - wis: 5
  - cha: 2
skillsaves:
  - perception: 5
  - stealth: 6
  - survival: 5
damage_immunities: necrotic, radiant
senses: darkvision 120 ft., passive Perception 15
languages: understands Draconic but can't speak
cr: "8"
traits:
  - name: Magic Resistance
    desc: The reverser has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: "The reverser makes three attacks: one with its bite and two with its claws."
  - name: Bite
    desc: "*Melee Weapon Attack:* +8 to hit, range 5 ft., one creature. *Hit:* 11 (1d12 + 5) piercing damage plus 6 (1d12) force damage."
  - name: Claws
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 8 (1d6 + 5) slashing damage plus 7 (2d6) force damage."
reactions:
  - name: Reversal
    desc: When a creature the reverser can see within 30 feet of it regains hit points, the reverser reduces the number of hit points regained to 0, and the reverser deals 13 (3d8) force damage to the creature.
```

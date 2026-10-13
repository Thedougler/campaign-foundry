---
title: Alseid
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Fey
size: Medium
habitat: []
sourcebooks:
  - Mythic Odysseys of Theros
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Alseid
size: Medium
type: fey
alignment: Chaotic Good
ac: 15
ac_class: natural armour
hp: 22
hit_dice: 4d8 + 4
modifier: 0
speed: 30 ft.
stats: [ 15, 10, 12, 13, 14, 18 ]
skillsaves:
  - persuasion: 6
damage_resistances: radiant
damage_immunities: poison
condition_immunities: charmed, frightened, poisoned
senses: passive Perception 12
languages: Common, Sylvan
cr: "1"
traits:
  - name: Innate Spellcasting
    desc: |-
      The alseid's spellcasting ability is Charisma (spell save DC 14). It can innately cast the following spells, requiring no material components:

      **3/day each:** *cure wounds*, *charm person*, *sleep*

      **1/day each:** *calm emotions*, *lesser restoration*, *plant growth*
  - name: Hide in Plain Sight
    desc: The alseid has advantage on Dexterity (Stealth) checks made to hide while it is in grassland.
  - name: Magic Resistance
    desc: The alseid has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The alseid makes two radiant touch attacks.
  - name: Radiant Touch
    desc: "*Melee Spell Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 9 (1d10 + 4) radiant damage."
```

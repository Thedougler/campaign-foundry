---
title: Pixie
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.25
creature_type: Fey
size: Tiny
habitat:
  - Forest
  - Planar (Feywild)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Pixie
size: Tiny
type: fey
alignment: Neutral Good
ac: 15
hp: 9
hit_dice: 6d4 - 6
modifier: 5
speed: 10 ft., fly 30 ft.
stats: [ 2, 20, 8, 10, 14, 15 ]
skillsaves:
  - perception: 4
  - stealth: 7
senses: passive Perception 14
languages: Sylvan
cr: 1/4
traits:
  - name: Magic Resistance
    desc: The pixie has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Faerie Dust
    desc: "*Melee or Ranged Attack Roll:* +4, reach 5 ft. or range 60 ft. *Hit:* 1 Radiant damage, and the target has the Charmed or Poisoned condition (pixie's choice) until the start of the pixie's next turn."
  - name: Spellcasting
    desc: |-
      The pixie casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 12):

      **At will:** *Dancing Lights*, *Druidcraft*, *Invisibility* (self only)

      **1/day each:** *Detect Thoughts*, *Fly*, *Sleep*
```

---
title: Pixie Wonderbringer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
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
name: Pixie Wonderbringer
size: Tiny
type: fey
alignment: Neutral Good
ac: 15
hp: 60
hit_dice: 24d4
modifier: 5
speed: 10 ft., fly 30 ft.
stats: [ 2, 20, 10, 11, 14, 18 ]
skillsaves:
  - arcana: 3
  - perception: 5
  - stealth: 8
senses: passive Perception 15
languages: Common, Elvish, Sylvan
cr: "5"
traits:
  - name: Magic Resistance
    desc: The pixie has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The pixie makes two Faerie Dust attacks.
  - name: Faerie Dust
    desc: "*Melee or Ranged Attack Roll:* +7, reach 5 ft. or range 60 ft. *Hit:* 15 (2d10 + 4) Radiant damage, and the target has the Charmed or Poisoned condition (pixie's choice) until the start of the pixie's next turn."
  - name: Spellcasting
    desc: |-
      The pixie casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 15):

      **At will:** *Dancing Lights*, *Druidcraft*, *Invisibility* (self only)

      **1/day each:** *Detect Thoughts*, *Fly*, *Major Image*
bonus_actions:
  - name: Burst of Wonder (Recharge 5–6)
    desc: |
      The pixie casts *Entangle*, *Polymorph*, or *Tasha's Hideous Laughter*, requiring no Material components and using the same spellcasting ability as Spellcasting.
```

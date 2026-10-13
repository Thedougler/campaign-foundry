---
title: Green Slaad
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Aberration
size: Large
habitat:
  - Planar (Limbo)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Green Slaad
size: Large
type: aberration
alignment: Chaotic Neutral
ac: 16
hp: 144
hit_dice: 17d10 + 51
modifier: 5
speed: 30 ft.
stats: [ 16, 15, 16, 11, 8, 18 ]
skillsaves:
  - arcana: 3
  - perception: 2
damage_resistances: acid, cold, fire, lightning, thunder
senses: Blindsight 30 ft., Darkvision 60 ft., passive Perception 12
languages: Common, Slaad; telepathy 60 ft.
cr: "8"
traits:
  - name: Magic Resistance
    desc: The slaad has Advantage on saving throws against spells and other magical effects.
  - name: Regeneration
    desc: The slaad regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point.
actions:
  - name: Multiattack
    desc: The slaad makes three Chaos Staff attacks.
  - name: Chaos Staff
    desc: "*Melee or Ranged Attack Roll:* +7, reach 10 ft. or range 60 ft. *Hit:* 8 (1d8 + 4) Force damage. Until the start of the slaad's next turn, the target has a condition determined by rolling 1d4: on a 1, Charmed; on a 2, Frightened; on a 3, Poisoned; or on a 4, Incapacitated."
  - name: Spellcasting
    desc: |-
      The slaad casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 14, +6 to hit with spell attacks):

      **At will:** *Detect Magic*, *Detect Thoughts*, *Mage Hand*

      **1/day each:** *Fireball*, *Invisibility* (self only)
bonus_actions:
  - name: Shape-Shift
    desc: The slaad shape-shifts into a Small or Medium Humanoid, or it returns to its true form. Other than its size, its game statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed.
```

---
title: Death Slaad
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Aberration
size: Medium
habitat:
  - Planar (Limbo)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Death Slaad
size: Medium
type: aberration
alignment: Chaotic Evil
ac: 18
hp: 178
hit_dice: 21d8 + 84
modifier: 10
speed: 40 ft.
stats: [ 20, 15, 19, 15, 10, 19 ]
skillsaves:
  - arcana: 6
  - perception: 8
damage_resistances: acid, cold, fire, lightning, thunder
senses: Blindsight 60 ft., Darkvision 60 ft., passive Perception 18
languages: Common, Slaad; telepathy 60 ft.
cr: "10"
traits:
  - name: Magic Resistance
    desc: The slaad has Advantage on saving throws against spells and other magical effects.
  - name: Regeneration
    desc: The slaad regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point.
actions:
  - name: Multiattack
    desc: The slaad makes two Chaos Blade attacks.
  - name: Chaos Blade
    desc: "*Melee Attack Roll:* +9, reach 10 ft. *Hit:* 11 (1d12 + 5) Slashing damage plus 10 (3d6) Necrotic damage. Until the start of the slaad's next turn, the target has a condition determined by rolling 1d4: on a 1, Charmed; on a 2, Frightened; on a 3, Poisoned; or on a 4, Incapacitated."
  - name: Spellcasting
    desc: |-
      The slaad casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 16):

      **At will:** *Detect Magic*, *Detect Thoughts*, *Invisibility* (self only), *Mage Hand*, *Major Image*

      **1/day each:** *Blight* (level 8 version), *Cloudkill* (level 6 version), *Fly*, *Plane Shift*, *Tongues*
bonus_actions:
  - name: Shape-Shift
    desc: The slaad shape-shifts into a Small or Medium Humanoid, or it returns to its true form. Other than its size, its game statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed.
```

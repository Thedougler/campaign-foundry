---
title: Gray Slaad
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
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
name: Gray Slaad
size: Medium
type: aberration
alignment: Chaotic Neutral
ac: 18
hp: 150
hit_dice: 20d8 + 60
modifier: 7
speed: 40 ft.
stats: [ 19, 17, 16, 13, 8, 18 ]
skillsaves:
  - arcana: 5
  - perception: 7
damage_resistances: acid, cold, fire, lightning, thunder
senses: Blindsight 60 ft., Darkvision 60 ft., passive Perception 17
languages: Common, Slaad; telepathy 60 ft.
cr: "9"
traits:
  - name: Magic Resistance
    desc: The slaad has Advantage on saving throws against spells and other magical effects.
  - name: Regeneration
    desc: The slaad regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point.
actions:
  - name: Multiattack
    desc: The slaad makes two Chaos Claw attacks.
  - name: Chaos Claw
    desc: "*Melee Attack Roll:* +8, reach 10 ft. *Hit:* 9 (1d10 + 4) Slashing damage plus 11 (2d10) Necrotic damage. Until the start of the slaad's next turn, the target has a condition determined by rolling 1d4: on a 1, Charmed; on a 2, Frightened; on a 3, Poisoned; or on a 4, Incapacitated."
  - name: Spellcasting
    desc: |-
      The slaad casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 16):

      **At will:** *Detect Magic*, *Detect Thoughts*, *Invisibility* (self only), *Mage Hand*, *Major Image*

      **1/day each:** *Cloudkill*, *Fly*, *Plane Shift* (self only), *Tongues*
bonus_actions:
  - name: Shape-Shift
    desc: The slaad shape-shifts into a Small or Medium Humanoid, or it returns to its true form. Other than its size, its game statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed.
```

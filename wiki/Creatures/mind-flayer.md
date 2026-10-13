---
title: Mind Flayer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Aberration
size: Medium
habitat:
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Mind Flayer
size: Medium
type: aberration
alignment: Lawful Evil
ac: 15
hp: 99
hit_dice: 18d8 + 18
modifier: 4
speed: 30 ft., fly 15 ft. (hover)
stats: [ 11, 12, 12, 19, 17, 17 ]
saves:
  - dex: 4
  - int: 7
  - wis: 6
  - cha: 6
skillsaves:
  - arcana: 7
  - insight: 6
  - perception: 6
  - stealth: 4
damage_resistances: psychic
gear:
  - breastplate
senses: Darkvision 120 ft., passive Perception 16
languages: Deep Speech, Undercommon; telepathy 120 ft.
cr: "7"
traits:
  - name: Magic Resistance
    desc: The mind flayer has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Tentacles
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 22 (4d8 + 4) Psychic damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 14) from all the mind flayer's tentacles, and the target has the Stunned condition until the grapple ends."
  - name: Extract Brain
    desc: "*Constitution Saving Throw:* DC 15, one creature that is Grappled by the mind flayer's Tentacles. *Failure:* 55 (10d10) Piercing damage. *Success:* Half damage. *Failure or Success:* If this damage reduces the target to 0 Hit Points, the mind flayer kills it and devours its brain."
  - name: Mind Blast (Recharge 5–6)
    desc: "*Intelligence Saving Throw:* DC 15, each creature in a 60-foot Cone. *Failure:* 31 (6d8 + 4) Psychic damage, and the target has the Stunned condition until the end of the mind flayer's next turn. *Success:* Half damage only."
  - name: Spellcasting
    desc: |-
      The mind flayer casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 15):

      **At will:** *Detect Thoughts*

      **1/day each:** *Dominate Monster*, *Plane Shift* (self only)
```

---
title: Deva
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Celestial
size: Medium
habitat:
  - Planar (Upper)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Deva
size: Medium
type: celestial
subtype: angel
alignment: Lawful Good
ac: 17
hp: 229
hit_dice: 27d8 + 108
modifier: 4
speed: 30 ft., fly 90 ft. (hover)
stats: [ 18, 18, 18, 17, 20, 20 ]
saves:
  - wis: 9
  - cha: 9
skillsaves:
  - insight: 9
  - perception: 9
damage_resistances: radiant
condition_immunities: charmed, exhaustion, frightened
senses: Darkvision 120 ft., passive Perception 19
languages: all; telepathy 120 ft.
cr: "10"
traits:
  - name: Exalted Restoration
    desc: If the deva dies outside Mount Celestia, its body disappears, and it gains a new body instantly, reviving with all its Hit Points somewhere in Mount Celestia.
  - name: Magic Resistance
    desc: The deva has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The deva makes two Holy Mace attacks.
  - name: Holy Mace
    desc: "*Melee Attack Roll:* +8, reach 5 ft. *Hit:* 7 (1d6 + 4) Bludgeoning damage plus 18 (4d8) Radiant damage."
  - name: Spellcasting
    desc: |-
      The deva casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 17):

      **At will:** *Detect Evil and Good*, *Shapechange* (Beast or Humanoid form only, no Temporary Hit Points gained from the spell, and no Concentration or Temporary Hit Points required to maintain the spell)

      **1/day each:** *Commune*, *Raise Dead*
bonus_actions:
  - name: Divine Aid (2/Day)
    desc: |
      The deva casts *Cure Wounds*, *Lesser Restoration*, or *Remove Curse*, using the same spellcasting ability as Spellcasting.
```

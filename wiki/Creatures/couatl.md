---
title: Couatl
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Celestial
size: Medium
habitat:
  - Desert
  - Forest
  - Grassland
  - Urban
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Couatl
size: Medium
type: celestial
alignment: Lawful Good
ac: 19
hp: 60
hit_dice: 8d8 + 24
modifier: 5
speed: 30 ft., fly 90 ft.
stats: [ 16, 20, 17, 18, 20, 18 ]
saves:
  - con: 5
  - wis: 7
damage_resistances: bludgeoning, piercing, slashing
damage_immunities: psychic, radiant
senses: Truesight 120 ft., passive Perception 15
languages: all; telepathy 120 ft.
cr: "4"
traits:
  - name: Shielded Mind
    desc: The couatl's thoughts can't be read by any means, and other creatures can communicate with it telepathically only if it allows them.
actions:
  - name: Bite
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 11 (1d12 + 5) Piercing damage, and the target has the Poisoned condition until the end of the couatl's next turn."
  - name: Constrict
    desc: "*Strength Saving Throw:* DC 15, one Medium or smaller creature the couatl can see within 5 feet. *Failure:* 8 (1d6 + 5) Bludgeoning damage. The target has the Grappled condition (escape DC 13), and it has the Restrained condition until the grapple ends."
  - name: Spellcasting
    desc: |-
      The couatl casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability (spell save DC 15):

      **At will:** *Detect Evil and Good*, *Detect Magic*, *Detect Thoughts*, *Shapechange* (Beast or Humanoid form only, no Temporary Hit Points gained from the spell, and no Concentration or Temporary Hit Points required to maintain the spell)

      **1/day each:** *Create Food and Water*, *Dream*, *Greater Restoration*, *Scrying*, *Sleep*
bonus_actions:
  - name: Divine Aid (2/Day)
    desc: |
      The couatl casts *Bless*, *Lesser Restoration*, or *Sanctuary*, requiring no spell components and using the same spellcasting ability as Spellcasting.
```

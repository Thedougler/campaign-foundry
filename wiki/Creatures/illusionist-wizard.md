---
title: Illusionist Wizard
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Humanoid
size: Medium
habitat:
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Illusionist Wizard
size: Medium
type: humanoid
alignment: Any alignment
ac: 12
ac_class: 15 with *mage armour*
hp: 44
hit_dice: 8d8 + 8
modifier: 2
speed: 30 ft.
stats: [ 9, 14, 13, 16, 11, 12 ]
saves:
  - int: 5
  - wis: 2
skillsaves:
  - arcana: 5
  - history: 5
senses: passive Perception 10
languages: any four languages
cr: "3"
actions:
  - name: Multiattack
    desc: The illusionist makes two Arcane Burst attacks.
  - name: Arcane Burst
    desc: "*Melee or Ranged Spell Attack:* +5 to hit, reach 5 ft. or range 120 ft., one target. *Hit:* 14 (2d10 + 3) psychic damage."
  - name: Spellcasting
    desc: |-
      The illusionist casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 13):

      **At will:** *dancing lights*, *mage hand*, *minor illusion*

      **2/day each:** *disguise self*, *invisibility*, *mage armour*, *major image*, *phantasmal force*, *phantom steed*
bonus_actions:
  - name: Displacement (Recharge 5–6)
    desc: The illusionist projects an illusion that makes the illusionist appear to be standing in a place a few inches from its actual location, causing any creature to have disadvantage on attack rolls against the illusionist. The effect lasts for 1 minute, and it ends early if the illusionist takes damage, if it is incapacitated, or if its speed becomes 0.
```

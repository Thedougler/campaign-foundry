---
title: Tower Sage
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Quests from the Infinite Staircase
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Tower Sage
size: Medium
type: humanoid
alignment: Any alignment
ac: 10
ac_class: 13 with *mage armour*
hp: 22
hit_dice: 5d8
modifier: 0
speed: 30 ft.
stats: [ 10, 10, 10, 16, 14, 16 ]
skillsaves:
  - arcana: 5
  - history: 5
  - insight: 4
senses: passive Perception 12
languages: Common plus any three languages
cr: "1"
actions:
  - name: Multiattack
    desc: The tower sage makes two Arcane Burst attacks and can use Starry Radiance if available.
  - name: Arcane Burst
    desc: "*Melee or Ranged Spell Attack:* +5 to hit, reach 5 ft. or range 120 ft., one target. *Hit:* 8 (1d10 + 3) radiant damage."
  - name: Starry Radiance (Recharge 5–6)
    desc: Dazzling light bursts from the tower sage's fingertips in a 15-foot cone. Each creature in that area must succeed on a DC 13 Constitution saving throw or have the blinded condition until the end of the tower sage's next turn.
  - name: Spellcasting
    desc: |-
      The tower sage casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 13):

      **At will:** *Dancing Lights*, *Mage Hand*, *Prestidigitation*

      **1/day each:** *Arcane Lock*, *Burning Hands*, *Comprehend Languages*, *Detect Magic*, *Levitate*, *Mage Armour*
```

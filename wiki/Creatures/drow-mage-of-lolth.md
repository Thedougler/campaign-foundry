---
title: Drow Mage of Lolth
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Humanoid
size: Medium
habitat:
  - Underdark
  - Urban
sourcebooks:
  - "Forgotten Realms: Adventures in Faerûn"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Drow Mage of Lolth
size: Medium
type: humanoid
subtype: Drow elf
alignment: Chaotic Evil
ac: 15
hp: 81
hit_dice: 18d8
modifier: 2
speed: 30 ft., fly 15 ft. (hover)
stats: [ 9, 14, 10, 17, 13, 12 ]
saves:
  - dex: 5
  - wis: 4
skillsaves:
  - arcana: 6
  - perception: 4
  - stealth: 5
senses: Darkvision 120 ft., passive Perception 14
languages: Abyssal, Common, Elvish, Undercommon
cr: "7"
traits:
  - name: Fey Ancestry
    desc: The drow has Advantage on saving throws it makes to avoid or end the Charmed condition, and magic can't put the drow to sleep.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the drow has Disadvantage on attack rolls.
actions:
  - name: Multiattack
    desc: The drow makes three Abyssal Burst attacks.
  - name: Abyssal Burst
    desc: "*Melee or Ranged Attack Roll:* +6, reach 5 ft. or range 120 ft. *Hit:* 21 (4d8 + 3) Poison damage."
  - name: Spellcasting
    desc: |-
      The drow casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 14, +6 to hit with spell attacks):

      **At will:** *Dancing Lights*, *Mage Armour* (included in AC), *Mage Hand*, *Minor Illusion*

      **1/day:** Summon Fiend (demon only)
bonus_actions:
  - name: Underdark Magic (3/Day)
    desc: |
      The drow casts *Faerie Fire* or *Misty Step*, requiring no Material components and using the same spellcasting ability as Spellcasting.
```

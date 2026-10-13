---
title: Drow Priestess of Lolth
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
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
name: Drow Priestess of Lolth
size: Medium
type: humanoid
subtype: Drow elf
alignment: Chaotic Evil
ac: 16
hp: 99
hit_dice: 18d8 + 18
modifier: 2
speed: 30 ft., fly 15 ft. (hover)
stats: [ 10, 14, 12, 13, 18, 17 ]
saves:
  - con: 4
  - wis: 7
  - cha: 6
skillsaves:
  - insight: 7
  - perception: 7
  - religion: 4
  - stealth: 5
senses: Darkvision 120 ft., passive Perception 17
languages: Abyssal, Common, Elvish, Undercommon
cr: "8"
traits:
  - name: Fey Ancestry
    desc: The drow has Advantage on saving throws it makes to avoid or end the Charmed condition, and magic can't put the drow to sleep.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the drow has Disadvantage on attack rolls.
actions:
  - name: Multiattack
    desc: The drow makes three Scourge attacks.
  - name: Scourge
    desc: "*Melee Attack Roll:* +5, reach 10 ft. *Hit:* 6 (1d6 + 3) Piercing damage plus 17 (5d6) Poison damage."
  - name: Spider Vortex (Recharge 5–6)
    desc: "*Constitution Saving Throw:* DC 15, each enemy in a 20-foot Emanation originating from the drow. *Failure:* 33 (6d10) Piercing damage, and the target has the Restrained condition until the start of the drow's next turn. *Success:* Half damage only."
  - name: Spellcasting
    desc: |-
      The drow casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability:

      **At will:** *Dancing Lights*, *Guidance*, *Thaumaturgy*
bonus_actions:
  - name: Lolth's Blessing (3/Day)
    desc: |
      The drow casts *Cure Wounds*, *Darkness*, *Dispel Magic*, or *Lesser Restoration*, using the same spellcasting ability as Spellcasting.
```

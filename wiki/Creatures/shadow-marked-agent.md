---
title: Shadow-Marked Agent
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - "Eberron: Forge of the Artificer"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Shadow-Marked Agent
size: Medium
type: humanoid
subtype: elf
alignment: Neutral
ac: 17
hp: 132
hit_dice: 24d8 + 24
modifier: 8
speed: 30 ft.
stats: [ 12, 20, 12, 11, 16, 17 ]
saves:
  - dex: 8
  - wis: 6
skillsaves:
  - perception: 6
  - performance: 6
  - sleight of hand: 8
  - stealth: 11
gear:
  - studded leather armour
senses: Darkvision 60 ft., passive Perception 16
languages: Common, Elvish, Thieves' cant
cr: "7"
actions:
  - name: Multiattack
    desc: The agent makes two Shadow Knife attacks.
  - name: Shadow Knife
    desc: "*Melee or Ranged Attack Roll:* +8, reach 5 ft. or range 20/60 ft. *Hit:* 10 (2d4 + 5) Piercing damage plus 14 (4d6) Necrotic damage, and the target's Speed is reduced by 10 feet until the end of its next turn."
  - name: Spellcasting
    desc: |-
      The agent casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (DC 14):

      **At will:** *Disguise Self*, *Minor Illusion*

      **1/day:** *Pass without Trace*
bonus_actions:
  - name: Shadow Cloak
    desc: The agent has the Invisible condition until the start of its next turn. This invisibility ends early immediately after the agent makes an attack roll.
```

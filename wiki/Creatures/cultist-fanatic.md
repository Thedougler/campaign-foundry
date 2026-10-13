---
title: Cultist Fanatic
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Humanoid
size: Small or Medium
habitat:
  - Any
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Cultist Fanatic
size: Small or Medium
type: humanoid
alignment: Neutral
ac: 13
hp: 44
hit_dice: 8d8 + 8
modifier: 2
speed: 30 ft.
stats: [ 11, 14, 12, 10, 14, 13 ]
saves:
  - wis: 4
skillsaves:
  - deception: 3
  - persuasion: 3
  - religion: 2
gear:
  - holy symbol
  - leather armour
senses: passive Perception 12
languages: Common
cr: "2"
actions:
  - name: Pact Blade
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 6 (1d8 + 2) Slashing damage plus 7 (2d6) Necrotic damage."
  - name: Spellcasting
    desc: |-
      The cultist casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 12, +4 to hit with spell attacks):

      **At will:** *Light*, *Thaumaturgy*

      **2/day:** *Command*

      **1/day:** *Hold Person*
bonus_actions:
  - name: Spiritual Weapon (2/Day)
    desc: |
      The cultist casts the *Spiritual Weapon* spell, using the same spellcasting ability as Spellcasting.
```

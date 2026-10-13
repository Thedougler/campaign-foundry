---
title: Fated Shaker
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Humanoid
size: Small or Medium
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Fated Shaker
size: Small or Medium
type: humanoid
alignment: Any alignment
ac: 13
ac_class: 16 with *mage armour*
hp: 76
hit_dice: 17d8
modifier: 3
speed: 30 ft.
stats: [ 10, 16, 10, 15, 16, 15 ]
saves:
  - int: 5
  - wis: 6
skillsaves:
  - insight: 6
  - investigation: 5
  - perception: 6
senses: passive Perception 16
languages: Common plus two more languages
cr: "5"
actions:
  - name: Multiattack
    desc: The shaker makes two Golden Rod or Radiant Bolt attacks.
  - name: Golden Rod
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) bludgeoning damage plus 9 (2d8) radiant damage."
  - name: Radiant Bolt
    desc: "*Ranged Spell Attack:* +6 to hit, range 120 ft., one target. *Hit:* 14 (2d10 + 3) radiant damage."
  - name: Spellcasting
    desc: |-
      The shaker casts one of the following spells, requiring no material components and using Wisdom as the spellcasting ability (spell save DC 14):

      **At will:** *mage armour*, *mage hand*

      **1/day each:** *enlarge/reduce*, *fly*, *suggestion*
bonus_actions:
  - name: Commanding Words
    desc: |-
      The shaker speaks magical words to order a creature it can see within 30 feet of itself. The target must succeed on a DC 14 Wisdom saving throw or be affected by one of the following effects (choose one or roll a d4):

      - **1–2 Grovel.** The target takes 14 (4d6) psychic damage, drops whatever it is holding, and has the prone condition.  
      - **3–4 Cower.** The target takes 10 (3d6) psychic damage and has the frightened condition until the end of its next turn.
```

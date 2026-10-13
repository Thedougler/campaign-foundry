---
title: Githyanki Xenomancer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Githyanki Xenomancer
size: Medium
type: humanoid
subtype: druid, gith
alignment: Any alignment
ac: 14
hp: 157
hit_dice: 21d8 + 63
modifier: 4
speed: 30 ft.
stats: [ 14, 18, 17, 15, 18, 13 ]
saves:
  - dex: 8
  - con: 7
  - wis: 8
skillsaves:
  - animal handling: 8
  - nature: 6
  - perception: 8
  - survival: 8
senses: passive Perception 18
languages: Gith plus any four languages
cr: "9"
actions:
  - name: Multiattack
    desc: The githyanki makes three Staff attacks, three Telekinetic Bolt attacks, or a combination thereof.
  - name: Staff
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) bludgeoning damage, or 6 (1d8 + 2) bludgeoning damage when used with two hands, plus 14 (4d6) psychic damage."
  - name: Telekinetic Bolt
    desc: "*Ranged Spell Attack:* +8 to hit, range 60 ft., one target. *Hit:* 20 (3d10 + 4) force damage."
  - name: Spellcasting (Psionics)
    desc: |-
      The githyanki casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability (spell save DC 16):

      **At will:** *druidcraft*, *light*, *mage hand* (the hand is invisible)

      **2/day each:** *invisibility* (self only), *pass without trace* (self only)

      **1/day each:** *dominate monster*, *forcecage*, *plane shift*, *telekinesis*
bonus_actions:
  - name: Astral Step (Recharge 4–6)
    desc: The githyanki teleports, along with any equipment it is wearing or carrying, up to 30 feet to an unoccupied space it can see.
```

---
title: Githyanki Star Seer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Githyanki Star Seer
size: Medium
type: humanoid
subtype: gith, warlock
alignment: Any alignment
ac: 13
ac_class: "*mage armour*"
hp: 110
hit_dice: 17d8 + 34
modifier: 0
speed: 30 ft.
stats: [ 11, 11, 14, 19, 16, 14 ]
saves:
  - con: 5
  - int: 7
  - wis: 6
skillsaves:
  - arcana: 10
  - history: 10
damage_resistances: radiant
senses: passive Perception 13
languages: Common, Gith
cr: "7"
actions:
  - name: Multiattack
    desc: The githyanki makes three Astral Bolt attacks.
  - name: Astral Bolt
    desc: "*Melee or Ranged Spell Attack:* +7 to hit, reach 5 ft. or range 60 ft., one target. *Hit:* 20 (3d10 + 4) radiant damage."
  - name: Spellcasting (Psionics)
    desc: |-
      The githyanki casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 15):

      **At will:** *light*, *mage hand* (the hand is invisible)

      **2/day each:** *detect magic*, *invisibility* (self only), *mage armour* (self only), *tongues*

      **1/day each:** *contact other plane* (as an action), *plane shift*, *telekinesis*
bonus_actions:
  - name: Astral Step (Recharge 4–6)
    desc: The githyanki teleports, along with any equipment it is wearing or carrying, up to 30 feet to an unoccupied space it can see.
```

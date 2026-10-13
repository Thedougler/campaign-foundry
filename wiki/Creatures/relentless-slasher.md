---
title: Relentless Slasher
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Fiend
size: Medium
habitat:
  - Any
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Relentless Slasher
size: Medium
type: fiend
alignment: Neutral Evil
ac: 15
hp: 91
hit_dice: 14d8 + 28
modifier: 4
speed: 40 ft.
stats: [ 12, 18, 14, 14, 15, 16 ]
saves:
  - str: 4
  - dex: 7
  - con: 5
  - wis: 5
condition_immunities: charmed, frightened
senses: Darkvision 120 ft., passive Perception 12
languages: understands all but can't speak
cr: "8"
traits:
  - name: Legendary Resistance (1/Day)
    desc: If the slasher fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The slasher makes two Slasher's Knife attacks.
  - name: Slasher's Knife
    desc: "*Melee or Ranged Attack Roll:* +7, reach 5 ft. or range 30/60 ft. *Hit:* 9 (2d4 + 4) Slashing damage plus 21 (6d6) Necrotic damage."
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the relentless slasher can expend a use to take one of the following actions. The relentless slasher regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Homing Knife
    desc: "*Dexterity Saving Throw:* DC 15, one creature within 120 feet that the slasher has hit with its Slasher's Knife attack within the last 24 hours. *Failure:* 11 (2d6 + 4) Slashing damage."
  - name: Vanishing Strike
    desc: The slasher makes one Slasher's Knife attack, then teleports up to 30 feet to an unoccupied space it can see. The slasher can't take this action again until the start of its next turn.
```

---
title: Vampire Nightbringer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Undead
size: Small or Medium
habitat:
  - Underdark
  - Urban
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Vampire Nightbringer
size: Small or Medium
type: undead
alignment: Neutral Evil
ac: 16
hp: 142
hit_dice: 19d8 + 57
modifier: 4
speed: 30 ft., fly 30 ft. (hover)
stats: [ 16, 18, 16, 13, 14, 15 ]
saves:
  - dex: 7
  - wis: 5
skillsaves:
  - perception: 5
  - stealth: 7
damage_immunities: cold, necrotic
condition_immunities: charmed, exhaustion, frightened
senses: Darkvision 120 ft., passive Perception 15
languages: Common plus one other language
cr: "8"
traits:
  - name: Sunlight Hypersensitivity
    desc: The vampire takes 10 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.
actions:
  - name: Multiattack
    desc: The vampire makes one Bite attack and one Shadow Strike attack.
  - name: Bite
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 7 (1d6 + 4) Piercing damage plus 10 (3d6) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and the vampire regains Hit Points equal to that amount."
  - name: Shadow Strike
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 7 (1d6 + 4) Slashing damage plus 14 (4d6) Cold damage."
bonus_actions:
  - name: Shadow Stealth
    desc: While in Dim Light or Darkness, the vampire takes the Hide action.
```

---
title: Ghast
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Undead
size: Medium
habitat:
  - Swamp
  - Underdark
  - Urban
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ghast
size: Medium
type: undead
alignment: Chaotic Evil
ac: 13
hp: 36
hit_dice: 8d8
modifier: 3
speed: 30 ft.
stats: [ 16, 17, 10, 11, 10, 8 ]
saves:
  - wis: 2
damage_resistances: necrotic
damage_immunities: poison
condition_immunities: charmed, exhaustion, poisoned
senses: Darkvision 60 ft., passive Perception 10
languages: Common
cr: "2"
traits:
  - name: Stench
    desc: "*Constitution Saving Throw:* DC 10, any creature that starts its turn in a 5-foot Emanation originating from the ghast. *Failure:* The target has the Poisoned condition until the start of its next turn. *Success:* The target is immune to this ghast's Stench for 24 hours."
actions:
  - name: Bite
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 7 (1d8 + 3) Piercing damage plus 9 (2d8) Necrotic damage."
  - name: Claw
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 10 (2d6 + 3) Slashing damage. If the target is a non-Undead creature, it is subjected to the following effect. *Constitution Saving Throw:* DC 10. *Failure:* The target has the Paralysed condition until the end of its next turn."
```

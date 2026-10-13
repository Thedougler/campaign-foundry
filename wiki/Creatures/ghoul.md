---
title: Ghoul
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
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
name: Ghoul
size: Medium
type: undead
alignment: Chaotic Evil
ac: 12
hp: 22
hit_dice: 5d8
modifier: 2
speed: 30 ft.
stats: [ 13, 15, 10, 7, 10, 6 ]
damage_immunities: poison
condition_immunities: charmed, exhaustion, poisoned
senses: Darkvision 60 ft., passive Perception 10
languages: Common
cr: "1"
actions:
  - name: Multiattack
    desc: The ghoul makes two Bite attacks.
  - name: Bite
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 5 (1d6 + 2) Piercing damage plus 3 (1d6) Necrotic damage."
  - name: Claw
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 4 (1d4 + 2) Slashing damage. If the target is a creature that isn't an Undead or elf, it is subjected to the following effect. *Constitution Saving Throw:* DC 10. *Failure:* The target has the Paralysed condition until the end of its next turn."
```

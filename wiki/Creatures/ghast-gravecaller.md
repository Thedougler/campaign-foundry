---
title: Ghast Gravecaller
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
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
name: Ghast Gravecaller
size: Medium
type: undead
alignment: Chaotic Evil
ac: 16
hp: 97
hit_dice: 15d8 + 30
modifier: 3
speed: 30 ft.
stats: [ 16, 17, 14, 18, 14, 8 ]
saves:
  - con: 5
  - wis: 5
damage_immunities: necrotic, poison
condition_immunities: charmed, exhaustion, poisoned
senses: Darkvision 120 ft., passive Perception 12
languages: Abyssal, Common
cr: "6"
traits:
  - name: Stench
    desc: "*Constitution Saving Throw:* DC 13, any creature that starts its turn in a 5-foot Emanation originating from the ghast. *Failure:* The target has the Poisoned condition until the start of its next turn. *Success:* The target is immune to this ghast's Stench for 24 hours."
actions:
  - name: Multiattack
    desc: The ghast makes two Horrific Necrosis attacks. It can replace one attack with a Claw attack.
  - name: Claw
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 13 (3d6 + 3) Slashing damage. If the target isn't an Undead, it has the Paralysed condition until the end of its next turn."
  - name: Horrific Necrosis
    desc: "*Melee or Ranged Attack Roll:* +7, reach 5 ft. or range 120 ft. *Hit:* 15 (2d10 + 4) Necrotic damage, and the target has the Frightened condition until the end of its next turn."
  - name: Spellcasting
    desc: |-
      The ghast casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability:

      **At will:** *Speak with Dead*, *Thaumaturgy*
```

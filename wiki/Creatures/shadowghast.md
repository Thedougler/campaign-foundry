---
title: Shadowghast
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - Explorer's Guide to Wildemount
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Shadowghast
size: Medium
type: undead
alignment: Chaotic Evil
ac: 15
hp: 49
hit_dice: 9d8 + 9
modifier: 5
speed: 35 ft.
stats: [ 14, 20, 12, 12, 11, 8 ]
skillsaves:
  - perception: 3
  - stealth: 8
damage_resistances: necrotic
damage_immunities: poison
condition_immunities: charmed, exhaustion, poisoned
senses: darkvision 60 ft., passive Perception 13
cr: "5"
traits:
  - name: Stench
    desc: Any creature that starts its turn within 5 feet of the shadowghast must succeed on a DC 12 Constitution saving throw or be poisoned until the start of its next turn. On a successful saving throw, the creature is immune to this Stench for 24 hours.
  - name: Shadow Stealth
    desc: While in dim light or darkness, the shadowghast can take the Hide action as a bonus action.
actions:
  - name: Multiattack
    desc: "The shadowghast makes two attacks: one with its bite and one with its claws."
  - name: Bite
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one creature. *Hit:* 11 (2d8 + 2) slashing damage plus 5 (1d10) necrotic damage."
  - name: Claws
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 12 (2d6 + 5) slashing damage. If the target is a creature other than an undead, it must succeed on a DC 12 Constitution saving throw or be paralysed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
```

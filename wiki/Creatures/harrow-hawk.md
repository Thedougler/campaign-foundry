---
title: Harrow Hawk
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Undead
size: Tiny
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Harrow Hawk
size: Tiny
type: undead
alignment: Unaligned
ac: 13
hp: 25
hit_dice: 10d4
modifier: 3
speed: 10 ft., fly 60 ft.
stats: [ 5, 16, 10, 2, 14, 7 ]
skillsaves:
  - perception: 6
  - stealth: 5
damage_immunities: poison
condition_immunities: exhaustion, poisoned
senses: darkvision 120 ft., passive Perception 16
cr: "1"
actions:
  - name: Talons
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 8 (2d4 + 3) slashing damage plus 3 (1d6) necrotic damage."
  - name: Plane Shift (2/Day)
    desc: The hawk casts *Plane Shift* on itself, requiring no spell components and using Wisdom as the spellcasting ability.
bonus_actions:
  - name: Shadow Dash
    desc: When the hawk is in dim light or darkness, it teleports up to 30 feet to an unoccupied space it can see that is also in dim light or darkness. The hawk then has advantage on the first melee attack it makes before the end of the turn.
```

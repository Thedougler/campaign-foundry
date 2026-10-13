---
title: Death Giant Reaper
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Giant
size: Huge
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Death Giant Reaper
size: Huge
type: giant
alignment: Any alignment
ac: 18
ac_class: plate
hp: 172
hit_dice: 15d12 + 75
modifier: 2
speed: 40 ft.
stats: [ 27, 14, 20, 18, 16, 16 ]
saves:
  - con: 9
  - int: 8
  - wis: 7
  - cha: 7
skillsaves:
  - arcana: 8
  - history: 8
  - perception: 7
  - stealth: 6
damage_immunities: necrotic
condition_immunities: frightened
senses: darkvision 120 ft., passive Perception 17
languages: Giant
cr: "12"
actions:
  - name: Multiattack
    desc: The giant makes two Scythe or Soul Bolt attacks.
  - name: Scythe
    desc: "*Melee Weapon Attack:* +12 to hit, reach 15 ft., one target. *Hit:* 21 (3d8 + 8) slashing damage plus 11 (2d10) necrotic damage."
  - name: Soul Bolt
    desc: "*Ranged Spell Attack:* +8 to hit, range 120 ft., one creature. *Hit:* 26 (4d10 + 4) necrotic damage. If the target has the frightened condition, the giant gains temporary hit points equal to the damage dealt."
bonus_actions:
  - name: Frightening Teleport (Recharge 4–6)
    desc: The giant magically teleports, along with any equipment it is wearing or carrying, up to 40 feet to an unoccupied space it can see. Each creature within 10 feet of the location the giant left must succeed on a DC 16 Wisdom saving throw or have the frightened condition until the end of that creature's next turn.
```

---
title: Xorn
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Elemental
size: Medium
habitat:
  - Planar (Earth)
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Xorn
size: Medium
type: elemental
alignment: Neutral
ac: 19
hp: 84
hit_dice: 8d8 + 48
modifier: 0
speed: 20 ft., burrow 20 ft.
stats: [ 17, 10, 22, 11, 10, 11 ]
skillsaves:
  - perception: 6
  - stealth: 6
damage_immunities: poison
condition_immunities: paralysed, petrified, poisoned
senses: Darkvision 60 ft., Tremorsense 60 ft., passive Perception 16
languages: Primordial (Terran)
cr: "5"
traits:
  - name: Earth Glide
    desc: The xorn can burrow through nonmagical, unworked earth and stone. While doing so, the xorn doesn't disturb the material it moves through.
  - name: Treasure Sense
    desc: The xorn can pinpoint the location of precious metals and stones within 60 feet of itself.
actions:
  - name: Multiattack
    desc: The xorn makes one Bite attack and three Claw attacks.
  - name: Bite
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 17 (4d6 + 3) Piercing damage."
  - name: Claw
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 8 (1d10 + 3) Slashing damage."
bonus_actions:
  - name: Charge
    desc: The xorn moves up to its Speed or Burrow Speed straight toward an enemy it can sense.
```

---
title: Strahd Skeleton
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Undead
size: Medium
habitat:
  - Planar (Shadowfell)
  - Underdark
  - Urban
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Strahd Skeleton
size: Medium
type: undead
alignment: Lawful Evil
ac: 16
hp: 65
hit_dice: 10d8 + 20
modifier: 1
speed: 30 ft.
stats: [ 17, 13, 15, 12, 15, 16 ]
saves:
  - str: 5
damage_vulnerabilities: bludgeoning
damage_immunities: poison
condition_immunities: exhaustion, frightened, poisoned
gear:
  - longsword
  - shield
senses: Darkvision 60 ft., passive Perception 12
languages: understands Common but can't speak
cr: "4"
traits:
  - name: Undead Fortitude
    desc: If damage reduces the skeleton to 0 Hit Points, it makes a Constitution saving throw (DC 5 plus the damage taken) unless the damage is Radiant or from a Critical Hit. On a successful save, the skeleton drops to 1 Hit Point instead.
actions:
  - name: Multiattack
    desc: The skeleton makes two Vampiric Longsword attacks. It can replace one attack with a use of Shield Bash.
  - name: Vampiric Longsword
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 7 (1d8 + 3) Slashing damage plus 7 (2d6) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken."
  - name: Shield Bash
    desc: "*Strength Saving Throw:* DC 13, one creature within 5 feet that the skeleton can see. *Failure:* 10 (2d6 + 3) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition."
```

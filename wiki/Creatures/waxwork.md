---
title: Waxwork
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Construct
size: Small or Medium
habitat:
  - Urban
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Waxwork
size: Small or Medium
type: construct
alignment: Neutral Evil
ac: 14
hp: 52
hit_dice: 7d8 + 21
modifier: 1
speed: 30 ft.
stats: [ 17, 13, 16, 1, 10, 1 ]
damage_vulnerabilities: fire
damage_resistances: bludgeoning, piercing, slashing
damage_immunities: poison, psychic
condition_immunities: blinded, charmed, deafened, exhaustion, frightened, paralysed, petrified, poisoned, stunned, unconscious
senses: Blindsight 30 ft., passive Perception 10
languages: understands Common but can't speak
cr: "3"
traits:
  - name: Meltable
    desc: If the waxwork takes Fire damage, until the end of its next turn, its Speed decreases by 20 feet and it has Disadvantage on saving throws.
actions:
  - name: Multiattack
    desc: The waxwork makes two Sculpting Knife attacks.
  - name: Sculpting Knife
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 10 (2d6 + 3) Slashing damage."
  - name: Wax Lob
    desc: "*Ranged Attack Roll:* +5, range 20/60 ft. *Hit:* 8 (2d4 + 3) Bludgeoning damage, and the target's Speed decreases by 10 feet until the end of its next turn."
bonus_actions:
  - name: Shape-Shift
    desc: The waxwork shape-shifts into a humanoid of its size, or it returns to its true form. Its game statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed.
```

---
title: Shadow Demon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Fiend
size: Medium
habitat:
  - Planar (Abyss)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Shadow Demon
size: Medium
type: fiend
subtype: demon
alignment: Chaotic Evil
ac: 14
hp: 66
hit_dice: 12d8 + 12
modifier: 3
speed: 30 ft., fly 30 ft. (hover)
stats: [ 1, 17, 12, 14, 13, 14 ]
saves:
  - dex: 5
  - cha: 4
skillsaves:
  - stealth: 7
damage_vulnerabilities: radiant
damage_resistances: acid, bludgeoning, cold, fire, lightning, piercing, slashing, thunder
damage_immunities: necrotic, poison
condition_immunities: exhaustion, grappled, paralysed, petrified, poisoned, prone, restrained
senses: Darkvision 120 ft., passive Perception 11
languages: Abyssal; telepathy 120 ft.
cr: "4"
traits:
  - name: Demonic Restoration
    desc: If the demon dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Abyss.
  - name: Incorporeal Movement
    desc: The demon can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.
  - name: Light Sensitivity
    desc: While in Bright Light, the demon has Disadvantage on ability checks and attack rolls.
actions:
  - name: Umbral Claw
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 16 (3d8 + 3) Psychic damage."
bonus_actions:
  - name: Shadow Stealth
    desc: While in Dim Light or Darkness, the demon takes the Hide action.
```

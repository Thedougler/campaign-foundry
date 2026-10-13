---
title: Frost Giant Zombie
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Undead
size: Huge
habitat: []
sourcebooks:
  - Explorer's Guide to Wildemount
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Frost Giant Zombie
size: Huge
type: undead
alignment: Neutral Evil
ac: 15
ac_class: patchwork armour
hp: 138
hit_dice: 12d12 + 60
modifier: -2
speed: 40 ft.
stats: [ 23, 6, 21, 3, 6, 5 ]
saves:
  - wis: 2
damage_immunities: cold, poison
condition_immunities: poisoned
gear:
  - greataxe
senses: darkvision 60 ft., passive Perception 8
languages: understands Giant but can't speak
cr: "9"
traits:
  - name: Numbing Aura
    desc: Any creature that starts its turn within 10 feet of the zombie must make a DC 17 Constitution saving throw. Unless the save succeeds, the creature can't make more than one attack, or take a bonus action on that turn.
  - name: Undead Fortitude
    desc: If damage reduces the zombie to 0 hit points, it must make a Constitution saving throw with a DC of 5 + the damage taken, unless the damage is fire, radiant, or from a critical hit. On a success, the zombie drops to 1 hit point instead.
actions:
  - name: Multiattack
    desc: The zombie makes two weapon attacks.
  - name: Greataxe
    desc: "*Melee Weapon Attack:* +10 to hit, reach 10 ft., one target. *Hit:* 25 (3d12 + 6) slashing damage."
  - name: Hurl Rock
    desc: "*Ranged Weapon Attack:* +10 to hit, range 60/240 ft., one target. *Hit:* 28 (4d10 + 6) bludgeoning damage."
  - name: Freezing Stare
    desc: The zombie targets one creature it can see within 60 feet of it. The target must succeed on a DC 17 Constitution saving throw or take 35 (10d6) cold damage and be paralysed until the end of its next turn.
```

---
title: Karrnathi Undead Soldier
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - "Eberron: Rising from the Last War"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Karrnathi Undead Soldier
size: Medium
type: undead
alignment: Lawful Evil
ac: 17
ac_class: half plate armour
hp: 52
hit_dice: 7d8 + 21
modifier: 2
speed: 30 ft.
stats: [ 16, 14, 16, 12, 13, 5 ]
skillsaves:
  - athletics: 5
  - perception: 3
damage_resistances: cold, poison
condition_immunities: charmed, frightened, poisoned
gear:
  - longbow
  - longsword
senses: darkvision 60 ft., passive Perception 13
languages: Common
cr: "3"
traits:
  - name: Pack Tactics
    desc: The soldier has advantage on an attack roll against a creature if at least one of the soldier's allies is within 5 feet of the creature and the ally isn't incapacitated.
  - name: Undead Fortitude
    desc: If damage reduces the soldier to 0 hit points, it must make a Constitution saving throw with a DC of 5 + the damage taken, unless the damage is radiant or from a critical hit. On a success, the soldier drops to 1 hit point instead.
actions:
  - name: Multiattack
    desc: The soldier attacks three times with one of its weapons.
  - name: Longsword
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands."
  - name: Longbow
    desc: "*Ranged Weapon Attack:* +4 to hit, range 150/600 ft., one target. *Hit:* 6 (1d8 + 2) piercing damage."
reactions:
  - name: Parry
    desc: The soldier adds 3 to its AC against one melee attack that would hit it. To do so, the soldier must see the attacker and be wielding a melee weapon.
```

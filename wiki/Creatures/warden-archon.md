---
title: Warden Archon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Celestial
size: Large
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Warden Archon
size: Large
type: celestial
alignment: typically Lawful Good
ac: 18
ac_class: plate armour
hp: 136
hit_dice: 16d10 + 48
modifier: 0
speed: 30 ft., climb 30 ft.
stats: [ 20, 10, 17, 15, 18, 18 ]
saves:
  - con: 6
  - wis: 7
skillsaves:
  - arcana: 5
  - athletics: 8
  - perception: 10
damage_immunities: lightning
condition_immunities: charmed, exhaustion, frightened, paralysed
senses: darkvision 120 ft., truesight 30 ft., passive Perception 20
languages: all
cr: "8"
traits:
  - name: Aura of Menace
    desc: As long as the archon doesn't have the incapacitated condition, each creature of the archon's choice that starts its turn within 20 feet of the archon must make a DC 15 Wisdom saving throw. On a failed save, the creature has the frightened condition until the start of its next turn. On a successful save, the creature is immune to all archons' Aura of Menace for 24 hours.
  - name: Eternal Vigil
    desc: The archon can't be surprised. Moreover, it knows when any creature uses a portal it is assigned to guard.
actions:
  - name: Multiattack
    desc: The archon makes two Claw attacks and one Tracker's Bite attack.
  - name: Claw
    desc: "*Melee Weapon Attack:* +8 to hit, reach 10 ft., one target. *Hit:* 12 (2d6 + 5) slashing damage. If the target is a Medium or smaller creature, the target has the grappled condition (escape DC 18). The archon can have only one creature grappled in this way at a time."
  - name: Tracker's Bite
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 15 (3d6 + 5) piercing damage. If the target is a creature, for the next 24 hours, the archon knows the distance and direction to the target while they are both on the same plane of existence."
  - name: Teleport
    desc: The archon teleports, along with any equipment it is wearing or carrying, to an unoccupied space it can see within 120 feet of itself.
  - name: Spellcasting
    desc: |-
      The archon casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 15):

      **At will:** *detect evil and good*

      **1/day each:** *aid*, *continual flame*, *protection from evil and good*, *scrying* (as an action)
```

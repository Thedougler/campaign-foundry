---
title: Hound Archon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Celestial
size: Medium
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Hound Archon
size: Medium
type: celestial
alignment: typically Lawful Good
ac: 15
ac_class: natural armour
hp: 65
hit_dice: 10d8 + 20
modifier: 1
speed: 40 ft.
stats: [ 18, 12, 15, 11, 14, 15 ]
saves:
  - int: 2
  - wis: 4
skillsaves:
  - insight: 4
  - perception: 6
  - stealth: 3
damage_immunities: lightning
condition_immunities: exhaustion, paralysed
senses: darkvision 120 ft., passive Perception 16
languages: all
cr: "4"
traits:
  - name: Aura of Menace
    desc: As long as the archon doesn't have the incapacitated condition, each creature of the archon's choice that starts its turn within 20 feet of the archon must make a DC 12 Wisdom saving throw. On a failed save, the creature has the frightened condition until the start of its next turn. On a successful save, the creature is immune to all archons' Aura of Menace for 24 hours.
actions:
  - name: Multiattack
    desc: The archon makes two Bite attacks. It can replace one of the attacks with a Shining Blade attack.
  - name: Bite
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 7 (1d6 + 4) piercing damage. If the target is a Large or smaller creature, it must succeed on a DC 14 Strength saving throw or have the prone condition."
  - name: Shining Blade (True Form Only)
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 11 (2d6 + 4) radiant damage."
  - name: Teleport
    desc: The archon teleports, along with any equipment it is wearing or carrying, to an unoccupied space it can see within 120 feet of itself.
  - name: Spellcasting
    desc: |-
      The archon casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability:

      **At will:** *detect evil and good*

      **1/day each:** *aid*, *continual flame*
bonus_actions:
  - name: Change Shape
    desc: The archon magically transforms into any Medium or Large dog or wolf while retaining its game statistics (other than its size and losing its Shining Blade attack). The archon reverts to its true form if reduced to 0 hit points or if it uses a bonus action to do so.
```

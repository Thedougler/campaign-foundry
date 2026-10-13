---
title: Lantern Archon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Celestial
size: Small
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Lantern Archon
size: Small
type: celestial
alignment: typically Lawful Good
ac: 13
hp: 22
hit_dice: 5d6 + 5
modifier: 3
speed: 0 ft., fly 60 ft. (hover)
stats: [ 1, 16, 12, 6, 12, 13 ]
skillsaves:
  - perception: 3
damage_resistances: bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: lightning, radiant
condition_immunities: exhaustion, grappled, paralysed, prone, restrained
senses: darkvision 120 ft., passive Perception 13
languages: all
cr: "2"
traits:
  - name: Aura of Menace
    desc: As long as the archon doesn't have the incapacitated condition, each creature of the archon's choice that starts its turn within 20 feet of the archon must make a DC 11 Wisdom saving throw. On a failed save, the creature has the frightened condition until the start of its next turn. On a successful save, the creature is immune to all archons' Aura of Menace for 24 hours.
  - name: Illumination
    desc: The archon sheds bright light in a 30-foot radius and dim light for an additional 30 feet.
  - name: Incorporeal Movement
    desc: The archon can move through creatures and objects as if they were difficult terrain. If it ends its turn inside an object, it takes 5 (1d10) force damage.
actions:
  - name: Multiattack
    desc: The archon makes two Radiant Strike attacks. It can replace one attack with a use of Teleport.
  - name: Radiant Strike
    desc: "*Melee or Ranged Weapon Attack:* +5 to hit, reach 5 ft. or range 60 ft., one target. *Hit:* 6 (1d6 + 3) radiant damage."
  - name: Teleport
    desc: The archon teleports, along with any equipment it is wearing or carrying, to an unoccupied space it can see within 120 feet of itself.
  - name: Spellcasting
    desc: |-
      The archon casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability:

      **At will:** *detect evil and good*

      **1/day:** *aid*
bonus_actions:
  - name: Shift Radiance
    desc: The archon reduces its Illumination to shed only dim light in a 5-foot radius, or it returns the light to full intensity.
```

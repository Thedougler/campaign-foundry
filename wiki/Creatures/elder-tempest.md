---
title: Elder Tempest
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 23
creature_type: Elemental
size: Gargantuan
habitat:
  - Arctic
  - Coastal
  - Grassland
  - Hill
  - Mountain
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Elder Tempest
size: Gargantuan
type: elemental
alignment: Typically Neutral
ac: 19
hp: 264
hit_dice: 16d20 + 96
modifier: 9
speed: 0 ft., fly 120 ft. (hover)
stats: [ 23, 28, 23, 2, 21, 18 ]
saves:
  - wis: 12
  - cha: 11
damage_resistances: bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: lightning, poison, thunder
condition_immunities: exhaustion, grappled, paralysed, petrified, poisoned, prone, restrained, stunned
senses: darkvision 60 ft., passive Perception 15
cr: "23"
traits:
  - name: Air Form
    desc: The tempest can enter a hostile creature's space and stop there. It can move through a space as narrow as 1 inch wide without squeezing.
  - name: Flyby
    desc: The tempest doesn't provoke opportunity attacks when it flies out of an enemy's reach.
  - name: Legendary Resistance (3/Day)
    desc: If the tempest fails a saving throw, it can choose to succeed instead.
  - name: Living Storm
    desc: The tempest is always at the center of a storm 1d6 + 4 miles in diameter. Heavy precipitation in the form of either rain or snow falls there, causing the area to be lightly obscured. Heavy rain also extinguishes open flames and imposes disadvantage on Wisdom (Perception) checks that rely on hearing. In addition, strong winds swirl in the area covered by the storm. The winds impose disadvantage on ranged attack rolls. They also extinguish open flames and disperse fog.
  - name: Siege Monster
    desc: The tempest deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The tempest makes two Thunderous Slam attacks.
  - name: Thunderous Slam
    desc: "*Melee Weapon Attack:* +16 to hit, reach 20 ft., one target. *Hit:* 23 (4d6 + 9) thunder damage."
  - name: Lightning Storm (Recharge 6)
    desc: Each creature within 120 feet of the tempest must make a DC 21 Dexterity saving throw, taking 27 (6d8) lightning damage on a failed save, or half as much damage on a successful one. If a target's saving throw fails by 5 or more, the creature is also stunned until the end of its next turn.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the elder tempest can expend a use to take one of the following actions. The elder tempest regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Move
    desc: The tempest moves up to its speed.
  - name: Lightning Strike (Costs 2 Actions)
    desc: The tempest can cause a bolt of lightning to strike a point on the ground anywhere under its storm. Each creature within 5 feet of that point must make a DC 21 Dexterity saving throw, taking 16 (3d10) lightning damage on a failed save, or half as much damage on a successful one.
  - name: Screaming Gale (Costs 3 Actions)
    desc: The tempest releases a blast of thunder and wind in a line that is 300 feet long and 20 feet wide. Objects in that area take 22 (4d10) thunder damage. Each creature there must succeed on a DC 21 Dexterity saving throw or take 22 (4d10) thunder damage and be flung up to 60 feet in a direction away from the line. If a thrown target collides with an immovable object (such as a wall or floor) or another creature, the target takes 3 (1d6) bludgeoning damage for every 10 feet it was thrown before impact. If the target collides with another creature, that other creature must succeed on a DC 19 Dexterity saving throw or take the same impact damage and be knocked prone.
```

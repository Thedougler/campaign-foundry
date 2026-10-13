---
title: Cockatrice Regent
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Monstrosity
size: Large
habitat:
  - Grassland
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Cockatrice Regent
size: Large
type: monstrosity
alignment: Unaligned
ac: 15
hp: 136
hit_dice: 16d10 + 48
modifier: 2
speed: 30 ft., fly 60 ft.
stats: [ 19, 14, 16, 3, 16, 5 ]
saves:
  - wis: 6
condition_immunities: petrified
senses: Darkvision 120 ft., passive Perception 13
cr: "8"
traits:
  - name: Flyby
    desc: The cockatrice doesn't provoke an Opportunity Attack when it flies out of an enemy's reach.
actions:
  - name: Multiattack
    desc: The cockatrice makes one Petrifying Bite attack and two Talons attacks.
  - name: Petrifying Bite
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 13 (2d8 + 4) Piercing damage. If the target is a creature, it is subjected to the following effect. *Constitution Saving Throw:* DC 14. *1St Failure:* The target has the Restrained condition and repeats the save at the end of its next turn if it is still Restrained, ending the effect on itself on a success. *2Nd Failure:* The target has the Petrified condition instead of the Restrained condition."
  - name: Talons
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 18 (4d6 + 4) Slashing damage."
reactions:
  - name: Magical Backlash
    desc: "Trigger: A creature within 120 feet of the cockatrice deals damage to it. _Response, _*Dexterity Saving Throw:* DC 14, the triggering creature. *Failure:* 13 (3d6 + 3) Force damage."
```

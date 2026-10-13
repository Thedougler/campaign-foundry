---
title: Wurm
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 14
creature_type: Monstrosity
size: Huge
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Wurm
size: Huge
type: monstrosity
alignment: Unaligned
ac: 18
ac_class: natural armour
hp: 200
hit_dice: 16d12 + 96
modifier: 0
speed: 50 ft., burrow 30 ft.
stats: [ 24, 10, 22, 3, 12, 4 ]
saves:
  - con: 11
  - wis: 6
senses: blindsight 60 ft., tremorsense 60 ft., passive Perception 11
cr: "14"
traits:
  - name: Siege Monster
    desc: The wurm deals double damage to objects and structures.
  - name: Earth Tremors
    desc: The wurm creates earth tremors as it moves overland or underground. Any creature that comes within 30 feet of the moving wurm for the first time on a turn must succeed on a DC 20 Dexterity saving throw or take 10 (3d6) bludgeoning damage and fall prone. Any structure or object anchored to the ground that comes within 30 feet of the moving wurm for the first time on a turn takes 10 (3d6) force damage.
  - name: Tunneler
    desc: The wurm can burrow through solid rock at half its burrow speed and leaves a 10-foot-diameter tunnel in its wake.
actions:
  - name: Bite
    desc: "*Melee Weapon Attack:* +12 to hit, reach 10 ft., one target. *Hit:* 24 (5d6 + 7) piercing damage. If the target is a Medium or smaller creature, it must succeed on a DC 20 Dexterity saving throw or be swallowed by the wurm. A swallowed creature is blinded and restrained, has total cover against attacks and other effects outside the wurm, and takes 17 (5d6) acid damage at the start of each of the wurm's turns. If the wurm takes 30 damage or more on a single turn from a creature inside it, the wurm must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, which fall prone in a space within 10 feet of the wurm. If the wurm dies, a swallowed creature is no longer restrained by it and can escape from the corpse by using 20 feet of movement, exiting prone."
```

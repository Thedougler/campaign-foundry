---
title: Ogre Battering Ram
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Giant
size: Large
habitat:
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
name: Ogre Battering Ram
size: Large
type: giant
alignment: Typically Chaotic Evil
ac: 11
ac_class: hide armour
hp: 76
hit_dice: 9d10 + 27
modifier: -1
speed: 40 ft.
stats: [ 19, 8, 16, 5, 7, 7 ]
senses: darkvision 60 ft., passive Perception 8
languages: Common, Giant
cr: "4"
traits:
  - name: Siege Monster
    desc: The ogre deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The ogre makes two Bash attacks.
  - name: Bash
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 15 (2d10 + 4) bludgeoning damage, and the ogre can push the target 5 feet away if the target is Huge or smaller."
reactions:
  - name: Block the Path
    desc: When a creature enters a space within 5 feet of the ogre, the ogre makes a Bash attack against that creature. If the attack hits, the target's speed is reduced to 0 until the start of the ogre's next turn.
```

---
title: Firenewt Warrior
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Elemental
size: Medium
habitat:
  - Desert
  - Hill
  - Mountain
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Firenewt Warrior
size: Medium
type: elemental
alignment: Typically Neutral
ac: 13
ac_class: shield
hp: 27
hit_dice: 5d8 + 5
modifier: 1
speed: 30 ft.
stats: [ 10, 13, 12, 7, 11, 8 ]
damage_immunities: fire
gear:
  - scimitar
senses: passive Perception 10
languages: Draconic, Ignan
cr: 1/2
traits:
  - name: Amphibious
    desc: The firenewt can breathe air and water.
actions:
  - name: Multiattack
    desc: The firenewt makes two Scimitar attacks.
  - name: Scimitar
    desc: "*Melee Weapon Attack:* +3 to hit, reach 5 ft., one target. *Hit:* 4 (1d6 + 1) slashing damage."
  - name: Spit Fire (Recharges after a Short or Long Rest)
    desc: The firenewt spits fire at a creature within 10 feet of it. The creature must make a DC 11 Dexterity saving throw, taking 9 (2d8) fire damage on a failed save, or half as much damage on a successful one.
```

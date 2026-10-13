---
title: Kruthik Hive Lord
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Monstrosity
size: Large
habitat:
  - Desert
  - Mountain
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Kruthik Hive Lord
size: Large
type: monstrosity
alignment: Unaligned
ac: 20
ac_class: natural armour
hp: 102
hit_dice: 12d10 + 36
modifier: 3
speed: 40 ft., burrow 20 ft., climb 40 ft.
stats: [ 19, 16, 17, 10, 14, 10 ]
skillsaves:
  - perception: 8
senses: darkvision 60 ft., tremorsense 60 ft., passive Perception 18
languages: Kruthik
cr: "5"
traits:
  - name: Pack Tactics
    desc: The kruthik has advantage on an attack roll against a creature if at least one of the kruthik's allies is within 5 feet of the creature and the ally isn't incapacitated.
  - name: Tunneler
    desc: The kruthik can burrow through solid rock at half its burrowing speed and leaves a 10-foot-diameter tunnel in its wake.
actions:
  - name: Multiattack
    desc: The kruthik makes two Stab or Spike attacks.
  - name: Stab
    desc: "*Melee Weapon Attack:* +7 to hit, reach 10 ft., one target. *Hit:* 9 (1d10 + 4) piercing damage."
  - name: Spike
    desc: "*Ranged Weapon Attack:* +6 to hit, range 30/120 ft., one target. *Hit:* 7 (1d6 + 4) piercing damage."
  - name: Acid Spray (Recharge 5–6)
    desc: The kruthik sprays acid in a 15-foot cone. Each creature in that area must make a DC 14 Dexterity saving throw, taking 22 (4d10) acid damage on a failed save, or half as much damage on a successful one.
```

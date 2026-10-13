---
title: Deinonychus
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Beast
size: Medium
habitat:
  - Forest
  - Grassland
  - Hill
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Deinonychus
size: Medium
type: beast
subtype: dinosaur
alignment: Unaligned
ac: 13
ac_class: natural armour
hp: 26
hit_dice: 4d8 + 8
modifier: 2
speed: 40 ft.
stats: [ 15, 15, 14, 4, 12, 6 ]
skillsaves:
  - perception: 3
senses: passive Perception 13
cr: "1"
traits:
  - name: Pounce
    desc: If the deinonychus moves at least 20 feet straight toward a creature and then hits it with a Claw attack on the same turn, that target must succeed on a DC 12 Strength saving throw or be knocked prone. If the target is prone, the deinonychus can make one Bite attack against it as a bonus action.
actions:
  - name: Multiattack
    desc: The deinonychus makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 6 (1d8 + 2) piercing damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 6 (1d8 + 2) slashing damage."
```

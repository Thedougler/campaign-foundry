---
title: Clawfoot
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Beast
size: Medium
habitat: []
sourcebooks:
  - "Eberron: Rising from the Last War"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Clawfoot
size: Medium
type: beast
alignment: Unaligned
ac: 13
hp: 19
hit_dice: 3d8 + 6
modifier: 3
speed: 40 ft.
stats: [ 12, 16, 14, 4, 12, 10 ]
skillsaves:
  - perception: 3
  - stealth: 5
senses: passive Perception 13
cr: "1"
traits:
  - name: Pack Tactics
    desc: The clawfoot has advantage on an attack roll against a creature if at least one of the clawfoot's allies is within 5 feet of the creature and the ally isn't incapacitated.
  - name: Pounce
    desc: If the clawfoot moves at least 20 feet straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 11 Strength saving throw or be knocked prone. If the target is prone, the clawfoot can make one bite attack against it as a bonus action.
actions:
  - name: Multiattack
    desc: "The clawfoot makes two attacks: one with its bite and one with its claws."
  - name: Bite
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 7 (1d8 + 3) piercing damage."
  - name: Claws
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 7 (1d8 + 3) slashing damage."
```

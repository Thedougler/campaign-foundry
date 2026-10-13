---
title: Gloomstalker
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Monstrosity
size: Large
habitat: []
sourcebooks:
  - Explorer's Guide to Wildemount
  - "Critical Role: Call of the Netherdeep"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Gloomstalker
size: Large
type: monstrosity
alignment: Neutral Evil
ac: 15
ac_class: natural armour
hp: 90
hit_dice: 12d10 + 24
modifier: 3
speed: 40 ft., fly 80 ft.
stats: [ 22, 16, 14, 5, 17, 14 ]
saves:
  - str: 9
  - dex: 6
skillsaves:
  - athletics: 9
  - intimidation: 5
  - perception: 6
  - stealth: 6
damage_vulnerabilities: radiant
senses: darkvision 240 ft, passive Perception 16
languages: understands Common but can't speak
cr: "6"
traits:
  - name: Shadowstep
    desc: As a bonus action, the gloomstalker can teleport up to 40 feet to an unoccupied space it can see.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the gloomstalker has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.
actions:
  - name: Multiattack
    desc: "The gloomstalker makes two attacks: one with its bite and one with its claws."
  - name: Bite
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one creature. *Hit:* 15 (2d8 + 6) piercing damage plus 7 (2d6) necrotic damage."
  - name: Claws
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one target. *Hit:* 13 (2d6 + 6) slashing damage plus 7 (2d6) necrotic damage."
  - name: Snatch
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one Medium or smaller creature. *Hit:* 13 (2d6 + 6) slashing damage plus 7 (2d6) necrotic damage, and the target is grappled (escape DC 17). While grappled in this way, the target is restrained."
  - name: Shriek (Recharge 6)
    desc: The gloomstalker emits a terrible shriek. Each enemy within 60 feet of the gloomstalker that can hear it must succeed on a DC 13 Constitution saving throw or be paralysed until the end of the enemy's next turn.
```

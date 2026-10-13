---
title: Ghostblade Eidolon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - Mythic Odysseys of Theros
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ghostblade Eidolon
size: Medium
type: undead
alignment: Any alignment
ac: 12
hp: 55
hit_dice: 10d8 + 10
modifier: 2
speed: 30 ft.
stats: [ 16, 15, 12, 13, 12, 14 ]
skillsaves:
  - acrobatics: 5
  - athletics: 6
  - perception: 4
damage_resistances: necrotic; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, grappled, paralysed, petrified, poisoned, restrained
senses: passive Perception 14
languages: the languages it knew in life
cr: "5"
traits:
  - name: Blurred Form
    desc: Attack rolls against the eidolon are made with disadvantage unless the eidolon is incapacitated.
  - name: Incorporeal Movement
    desc: The eidolon can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
  - name: Turn Resistance
    desc: The eidolon has advantage on saving throws against any effect that turns undead.
actions:
  - name: Multiattack
    desc: The eidolon makes two ghostblade attacks.
  - name: Ghostblade
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 3) slashing damage plus 11 (2d10) force damage."
```

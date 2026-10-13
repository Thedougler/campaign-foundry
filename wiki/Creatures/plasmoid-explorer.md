---
title: Plasmoid Explorer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.25
creature_type: Ooze
size: Medium
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Plasmoid Explorer
size: Medium
type: ooze
alignment: Any alignment
ac: 11
hp: 16
hit_dice: 3d8 + 3
modifier: 1
speed: 30 ft.
stats: [ 13, 12, 12, 10, 14, 10 ]
skillsaves:
  - perception: 4
  - survival: 4
damage_resistances: acid, poison
gear:
  - javelin
senses: darkvision 60 ft., passive Perception 14
languages: Common
cr: 1/4
traits:
  - name: Amorphous
    desc: The plasmoid can squeeze through a space as narrow as 1 inch wide, provided it is wearing and carrying nothing. It has advantage on ability checks it makes to initiate or escape a grapple.
  - name: Hold Breath
    desc: The plasmoid can hold its breath for 1 hour.
actions:
  - name: Multiattack
    desc: The plasmoid makes two Pseudopod attacks. It can replace one of those attacks with a Javelin attack.
  - name: Pseudopod
    desc: "*Melee Weapon Attack:* +3 to hit, reach 5 ft., one target. *Hit:* 3 (1d4 + 1) bludgeoning damage."
  - name: Javelin
    desc: "*Melee or Ranged Weapon Attack:* +3 to hit, reach 5 ft. or range 30/120 ft., one target. *Hit:* 4 (1d6 + 1) piercing damage."
```

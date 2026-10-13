---
title: Plasmoid Warrior
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Ooze
size: Medium
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Plasmoid Warrior
size: Medium
type: ooze
alignment: Any alignment
ac: 16
ac_class: natural armour, shield
hp: 71
hit_dice: 11d8 + 22
modifier: 2
speed: 30 ft.
stats: [ 16, 14, 14, 10, 11, 10 ]
skillsaves:
  - athletics: 5
  - stealth: 4
damage_resistances: acid, poison
gear:
  - pistol
  - spear
senses: darkvision 60 ft., passive Perception 14
languages: Common
cr: "3"
traits:
  - name: Amorphous
    desc: The plasmoid can squeeze through a space as narrow as 1 inch wide, provided it is wearing and carrying nothing. It has advantage on ability checks it makes to initiate or escape a grapple.
  - name: Hold Breath
    desc: The plasmoid can hold its breath for 1 hour.
actions:
  - name: Multiattack
    desc: The plasmoid makes three Pseudopod attacks. It can replace one of those attacks with a Spear or Pistol attack.
  - name: Pseudopod
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) bludgeoning damage."
  - name: Spear
    desc: "*Melee or Ranged Weapon Attack:* +5 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage, or 7 (1d8 + 3) piercing damage when used with two hands to make a melee attack."
  - name: Pistol
    desc: "*Ranged Weapon Attack:* +4 to hit, range 30/90 ft., one target. *Hit:* 7 (1d10 + 2) piercing damage."
```

---
title: Giff
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Humanoid
size: Medium
habitat:
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Giff
size: Medium
type: humanoid
alignment: Any alignment
ac: 16
ac_class: breastplate
hp: 60
hit_dice: 8d8 + 24
modifier: 2
speed: 30 ft.
stats: [ 18, 14, 17, 11, 12, 12 ]
gear:
  - longsword
  - musket
  - pistol
senses: passive Perception 11
languages: Common
cr: "3"
traits:
  - name: Firearms Knowledge
    desc: The giff's mastery of its weapons enables it to ignore the loading property of muskets and pistols.
  - name: Headfirst Charge
    desc: The giff can try to knock a creature over; if the giff moves at least 20 feet in a straight line and ends within 5 feet of a Large or smaller creature, that creature must succeed on a DC 14 Strength saving throw or take 7 (2d6) bludgeoning damage and be knocked prone.
actions:
  - name: Multiattack
    desc: The giff makes two Longsword, Musket, or Pistol attacks.
  - name: Longsword
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 4) slashing damage, or 9 (1d10 + 4) slashing damage if used with two hands."
  - name: Musket
    desc: "*Ranged Weapon Attack:* +4 to hit, range 40/120 ft., one target. *Hit:* 8 (1d12 + 2) piercing damage."
  - name: Pistol
    desc: "*Ranged Weapon Attack:* +4 to hit, range 30/90 ft., one target. *Hit:* 7 (1d10 + 2) piercing damage."
  - name: Fragmentation Grenade (1/Day)
    desc: The giff throws a grenade up to 60 feet, and the grenade explodes in a 20-foot-radius sphere. Each creature in that area must make a DC 15 Dexterity saving throw, taking 17 (5d6) piercing damage on a failed save, or half as much damage on a successful one.
```

---
title: Nupperibo
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Fiend
size: Medium
habitat: []
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Nupperibo
size: Medium
type: fiend
subtype: devil
alignment: Typically Lawful Evil
ac: 13
ac_class: natural armour
hp: 11
hit_dice: 2d8 + 2
modifier: 0
speed: 20 ft.
stats: [ 16, 11, 13, 3, 8, 1 ]
skillsaves:
  - perception: 1
damage_resistances: acid, cold
damage_immunities: fire, poison
condition_immunities: blinded, charmed, frightened, poisoned
senses: blindsight 20 ft. (blind beyond this radius), passive Perception 11
languages: understands Infernal but can't speak
cr: 1/2
traits:
  - name: Cloud of Vermin
    desc: Any creature, other than a devil, that starts its turn within 20 feet of one or more nupperibos must succeed on a DC 11 Constitution saving throw or take 5 (2d4) acid damage. A creature within the areas of two or more nupperibos makes the saving throw with disadvantage.
  - name: Driven Tracker
    desc: In the Nine Hells, the nupperibo can flawlessly track any creature that has taken damage from any nupperibo's Cloud of Vermin within the previous 24 hours.
actions:
  - name: Bite
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage."
```

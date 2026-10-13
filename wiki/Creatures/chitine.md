---
title: Chitine
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Monstrosity
size: Small
habitat:
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Chitine
size: Small
type: monstrosity
alignment: Typically Chaotic Evil
ac: 14
ac_class: hide armour
hp: 18
hit_dice: 4d6 + 4
modifier: 2
speed: 30 ft., climb 30 ft.
stats: [ 10, 14, 12, 10, 10, 7 ]
skillsaves:
  - athletics: 4
  - stealth: 4
gear:
  - dagger
senses: darkvision 60 ft., passive Perception 10
languages: Undercommon
cr: 1/2
traits:
  - name: Fey Ancestry
    desc: The chitine has advantage on saving throws against being charmed, and magic can't put the chitine to sleep.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the chitine has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.
  - name: Web Sense
    desc: While in contact with a web, the chitine knows the exact location of any other creature in contact with the same web.
  - name: Web Walker
    desc: The chitine ignores movement restrictions caused by webbing.
actions:
  - name: Multiattack
    desc: The chitine makes three Dagger attacks.
  - name: Dagger
    desc: "*Melee or Ranged Weapon Attack:* +4 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 4 (1d4 + 2) piercing damage."
```

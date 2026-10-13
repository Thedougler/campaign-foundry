---
title: Kobold Underling
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.125
creature_type: Humanoid
size: Small
habitat: []
sourcebooks:
  - Explorer's Guide to Wildemount
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Kobold Underling
size: Small
type: humanoid
subtype: kobold
alignment: Lawful Evil
ac: 13
hp: 7
hit_dice: 3d6 - 3
modifier: 3
speed: 30 ft.
stats: [ 7, 16, 9, 8, 9, 8 ]
gear:
  - hand crossbow
  - shortsword
senses: darkvision 60 ft., passive Perception 9
languages: Common, Draconic
cr: 1/8
traits:
  - name: Messy End
    desc: The kobold explodes 3 rounds after it dies, or immediately if it was killed by a critical hit. The explosion destroys the kobold's body, leaving its equipment behind. Each creature within 5 feet of the exploding kobold must make a DC 10 Dexterity saving throw, taking 4 (1d8) bludgeoning damage on a failed save, or half as much damage on a successful one.
  - name: Pack Tactics
    desc: The kobold has advantage on an attack roll against a creature if at least one of the kobold's allies is within 5 feet of the creature and the ally isn't incapacitated.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the kobold has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.
actions:
  - name: Shortsword
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage."
  - name: Hand Crossbow
    desc: "*Ranged Weapon Attack:* +5 to hit, range 30/120 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage."
```

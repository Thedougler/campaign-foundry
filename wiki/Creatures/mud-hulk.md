---
title: Mud Hulk
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Elemental
size: Large
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Mud Hulk
size: Large
type: elemental
alignment: typically Chaotic Evil
ac: 13
ac_class: natural armour
hp: 68
hit_dice: 8d10 + 24
modifier: -1
speed: 40 ft.
stats: [ 16, 8, 16, 5, 9, 6 ]
damage_resistances: acid
condition_immunities: exhaustion, paralysed
senses: passive Perception 9
languages: Giant, Terran
cr: "3"
traits:
  - name: Amorphous
    desc: The mud hulk can move through a space as narrow as 1 inch without squeezing.
  - name: Sticky Mud
    desc: The ground within 15 feet of the mud hulk is difficult terrain for other creatures.
actions:
  - name: Enveloping Slam
    desc: |-
      *Melee Weapon Attack:* +5 to hit, reach 10 ft., one target. *Hit:* 9 (1d12 + 3) bludgeoning damage. If the target is a Large or smaller creature, it must succeed on a DC 13 Strength saving throw or be pulled into the mud hulk's space and be engulfed by the mud hulk. While engulfed, the target can't breathe, has the restrained condition, and takes 6 (1d12) acid damage at the start of each of its turns. When the mud hulk moves, the engulfed target moves with it. The mud hulk can have only one target engulfed at a time. While a creature is engulfed, the mud hulk can't use its Amorphous trait.

      An engulfed target can repeat the saving throw at the end of each of its turns. On a successful save, the target escapes and enters the nearest unoccupied space.
  - name: Mud Splash
    desc: The mud hulk lobs a mass of mud that splashes in a 10-foot-radius sphere centred on a point within 30 feet of the mud hulk. Each creature in that area must make a DC 13 Dexterity saving throw, taking 10 (2d6 + 3) bludgeoning damage on a failed save, or half as much damage on a successful one. The affected area is difficult terrain until the start of the mud hulk's next turn.
```

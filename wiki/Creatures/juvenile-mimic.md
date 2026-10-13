---
title: Juvenile Mimic
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0
creature_type: Monstrosity
size: Tiny
habitat: []
sourcebooks:
  - Tasha's Cauldron of Everything
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Juvenile Mimic
size: Tiny
type: monstrosity
subtype: shapechanger
alignment: Unaligned
ac: 11
hp: 7
hit_dice: 2d4 + 2
modifier: 1
speed: 10 ft., climb 10 ft.
stats: [ 1, 12, 13, 10, 13, 10 ]
skillsaves:
  - stealth: 3
damage_immunities: acid
condition_immunities: prone
senses: darkvision 60 ft., passive Perception 11
languages: Common, Undercommon, telepathy 120 ft.
cr: "0"
traits:
  - name: False Appearance (Object Form Only)
    desc: While the mimic remains motionless, it is indistinguishable from an ordinary object.
  - name: Spider Climb
    desc: The mimic can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
actions:
  - name: Bite
    desc: "*Melee Weapon Attack:* +3 to hit, reach 5 ft., one target. *Hit:* 1 piercing damage plus 2 (1d4) acid damage."
  - name: Shape-Shift
    desc: The mimic polymorphs into an object or back into its true, amorphous form. Its statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies.
```

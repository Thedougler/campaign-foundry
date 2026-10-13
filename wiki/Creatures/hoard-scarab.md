---
title: Hoard Scarab
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.125
creature_type: Monstrosity
size: Tiny
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Hoard Scarab
size: Tiny
type: monstrosity
alignment: Unaligned
ac: 14
ac_class: natural armour
hp: 7
hit_dice: 3d4
modifier: 3
speed: 20 ft., burrow 20 ft., fly 20 ft.
stats: [ 4, 16, 11, 3, 8, 6 ]
senses: darkvision 60 ft., tremorsense 60 ft., passive Perception 9
cr: 1/8
traits:
  - name: False Appearance
    desc: If the scarab is motionless at the start of combat, it has advantage on its initiative roll. Moreover, if a creature hasn't observed the scarab move or act, that creature must succeed on a DC 18 Intelligence (Investigation) check to discern that the scarab is animate.
actions:
  - name: Bite
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 5 (1d4 + 3) piercing damage. If the target is a creature, it has disadvantage on attack rolls until the start of its next turn."
bonus_actions:
  - name: Scale Dust (1/Day)
    desc: The scarab releases magical glittering dust from its wings. Each creature within 5 feet of the scarab must succeed on a DC 13 Dexterity saving throw or be outlined in blue light for 10 minutes. While outlined in this way, a creature sheds dim light in a 10-foot radius and can't benefit from being invisible. In addition, every Dragon within 1 mile of the creature becomes aware of it and can unerringly track the creature. Casting *dispel magic* on the creature ends the effect on it.
```

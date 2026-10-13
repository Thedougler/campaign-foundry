---
title: Barkburr
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Plant
size: Small
habitat: []
sourcebooks:
  - Quests from the Infinite Staircase
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Barkburr
size: Small
type: plant
alignment: Unaligned
ac: 16
ac_class: natural armour
hp: 52
hit_dice: 8d6 + 24
modifier: -2
speed: 10 ft., climb 10 ft.
stats: [ 16, 6, 16, 1, 15, 1 ]
skillsaves:
  - athletics: 5
damage_immunities: psychic
condition_immunities: blinded, charmed, deafened, frightened
senses: blindsight 60 ft. (can't see beyond this radius), passive Perception 12
cr: "3"
traits:
  - name: False Appearance
    desc: If the barkburr is motionless at the start of combat, it has advantage on its initiative roll. Moreover, if a creature hasn't observed the barkburr move or act, that creature must succeed on a DC 18 Intelligence (Investigation) check to discern that the barkburr is animate.
  - name: Springing Leap
    desc: With or without a running start, the barkburr's high jump is up to 15 feet, and its long jump is up to 30 feet. The barkburr's jumps can exceed its speed if its speed isn't 0.
actions:
  - name: Multiattack
    desc: The barkburr makes two Poison Barb attacks and uses Lignify if able.
  - name: Poison Barb
    desc: |-
      *Melee Weapon Attack:* +5 to hit, reach 5 ft., one creature. *Hit:* 5 (1d4 + 3) piercing damage plus 7 (2d6) poison damage, and the barkburr attaches to the target. While the barkburr is attached, it can't make Poison Barb attacks, and the target has the restrained condition as its body begins to transform into wood.

      An attached barkburr can detach itself by spending 5 feet of its movement on its turn. A creature that can reach the barkburr, including the target, can use its action to detach the barkburr by making a successful DC 13 Strength (Athletics) check.
  - name: Lignify
    desc: The barkburr targets the creature it is attached to, and the target must make a DC 13 Constitution saving throw. On a failed save, the target has the petrified condition until freed by the *Greater Restoration* spell or another effect, except it turns into a tree instead of stone. Any equipment the target is wearing or carrying is absorbed into the tree's bark.
```

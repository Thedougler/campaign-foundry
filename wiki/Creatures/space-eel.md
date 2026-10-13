---
title: Space Eel
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Beast
size: Small
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Space Eel
size: Small
type: beast
alignment: Unaligned
ac: 14
hp: 7
hit_dice: 2d6
modifier: 4
speed: 10 ft., fly 30 ft.
stats: [ 12, 18, 11, 1, 10, 1 ]
senses: darkvision 60 ft., passive Perception 10
cr: 1/2
traits:
  - name: Unusual Nature
    desc: The eel doesn't require air.
actions:
  - name: Multiattack
    desc: If it isn't attached to a creature, the eel makes one Bite attack and one Tail Spine attack.
  - name: Bite
    desc: "*Melee Weapon Attack:* +3 to hit, reach 5 ft., one creature. *Hit:* 4 (1d6 + 1) piercing damage, and the eel attaches to the target. While attached, the eel can't make Bite attacks. Instead, the target takes 4 (1d6 + 1) piercing damage at the start of each of the eel's turns. The eel can detach itself as a bonus action. A creature, including the target, can use its action to detach the eel."
  - name: Tail Spine
    desc: "*Melee Weapon Attack:* +3 to hit, reach 5 ft., one creature. *Hit:* 3 (1d4 + 1) piercing damage, and the target must succeed on a DC 10 Constitution saving throw or be poisoned for 1 minute. Until this poison ends, the target is paralysed. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
```

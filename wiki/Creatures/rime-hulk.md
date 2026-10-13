---
title: Rime Hulk
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Elemental
size: Large
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Rime Hulk
size: Large
type: elemental
alignment: typically Neutral Evil
ac: 15
ac_class: natural armour
hp: 85
hit_dice: 9d10 + 36
modifier: 0
speed: 30 ft.
stats: [ 18, 10, 18, 8, 9, 6 ]
damage_immunities: cold, poison
condition_immunities: exhaustion, poisoned
senses: passive Perception 9
languages: Aquan, Giant
cr: "5"
traits:
  - name: Death Burst
    desc: When the rime hulk dies, it explodes in a 10-foot-radius sphere of frigid air and frost centred on itself. Each creature in that area must succeed on a DC 15 Constitution saving throw or take 10 (3d6) cold damage.
actions:
  - name: Multiattack
    desc: The rime hulk makes two Slam attacks.
  - name: Slam
    desc: "*Melee Weapon Attack:* +7 to hit, reach 10 ft., one target. *Hit:* 9 (1d10 + 4) bludgeoning damage plus 9 (2d8) cold damage."
  - name: Trail of Frost (Recharge 5–6)
    desc: The rime hulk moves up to its speed without provoking opportunity attacks and can move through the space of any Medium or smaller creature. Each time the rime hulk enters another creature's space for the first time during this move, that creature must make a DC 15 Constitution saving throw. On a failed save, the creature takes 22 (4d10) cold damage, and its speed is reduced by 10 feet until the start of the rime hulk's next turn. On a successful save, the creature takes half as much damage only.
```

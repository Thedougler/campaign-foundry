---
title: Catoblepas
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Monstrosity
size: Large
habitat:
  - Swamp
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Catoblepas
size: Large
type: monstrosity
alignment: Unaligned
ac: 14
ac_class: natural armour
hp: 84
hit_dice: 8d10 + 40
modifier: 1
speed: 30 ft.
stats: [ 19, 12, 21, 3, 14, 8 ]
skillsaves:
  - perception: 5
senses: darkvision 60 ft., passive Perception 15
cr: "5"
traits:
  - name: Stench
    desc: Any creature other than a catoblepas that starts its turn within 10 feet of the catoblepas must succeed on a DC 16 Constitution saving throw or be poisoned until the start of the creature's next turn. On a successful saving throw, the creature is immune to the Stench of any catoblepas for 1 hour.
actions:
  - name: Tail
    desc: "*Melee Weapon Attack:* +7 to hit, reach 10 ft., one target. *Hit:* 21 (5d6 + 4) bludgeoning damage, and the target must succeed on a DC 16 Constitution saving throw or be stunned until the start of the catoblepas's next turn."
  - name: Death Ray (Recharge 5–6)
    desc: The catoblepas targets one creature it can see within 30 feet of it. The target must make a DC 16 Constitution saving throw, taking 36 (8d8) necrotic damage on a failed save, or half as much damage on a successful one. If the saving throw fails by 5 or more, the target instead takes 64 necrotic damage. The target dies if reduced to 0 hit points by this ray.
```

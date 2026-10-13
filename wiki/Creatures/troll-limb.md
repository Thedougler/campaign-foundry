---
title: Troll Limb
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Giant
size: Small
habitat:
  - Arctic
  - Forest
  - Hill
  - Mountain
  - Swamp
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Troll Limb
size: Small
type: giant
alignment: Chaotic Evil
ac: 13
hp: 14
hit_dice: 4d6
modifier: 1
speed: 20 ft.
stats: [ 18, 12, 10, 1, 9, 1 ]
senses: Darkvision 60 ft., passive Perception 9
cr: 1/2
traits:
  - name: Regeneration
    desc: The limb regains 5 Hit Points at the start of each of its turns. If the limb takes Acid or Fire damage, this trait doesn't function on the limb's next turn. The limb dies only if it starts its turn with 0 Hit Points and doesn't regenerate.
  - name: Troll Spawn
    desc: The limb uncannily has the same senses as a whole troll. If the limb isn't destroyed within 24 hours, roll 1d12. On a 12, the limb turns into a Troll. Otherwise, the limb withers away.
actions:
  - name: Rend
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 9 (2d4 + 4) Slashing damage."
```

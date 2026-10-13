---
title: Violet Fungus Necrohulk
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Plant
size: Large
habitat:
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Violet Fungus Necrohulk
size: Large
type: plant
alignment: Neutral Evil
ac: 17
hp: 123
hit_dice: 13d10 + 52
modifier: 4
speed: 40 ft.
stats: [ 19, 12, 18, 7, 14, 10 ]
damage_immunities: necrotic, poison
condition_immunities: blinded, charmed, deafened, frightened, poisoned
senses: Blindsight 60 ft., passive Perception 12
cr: "7"
actions:
  - name: Multiattack
    desc: The necrohulk makes two Rotting Slam attacks.
  - name: Rotting Slam
    desc: "*Melee Attack Roll:* +7, reach 10 ft. *Hit:* 9 (1d10 + 4) Bludgeoning damage plus 7 (2d6) Necrotic damage."
  - name: Spore Bomb (Recharge 5–6)
    desc: "*Constitution Saving Throw:* DC 15, each creature in a 20-foot-radius Sphere centred on a point the necrohulk can see within 60 feet. *Failure:* 28 (8d6) Necrotic damage, and the target has the Poisoned condition until the start of the necrohulk's next turn. While Poisoned, the target can't regain Hit Points. *Success:* Half damage only."
bonus_actions:
  - name: Absorb Body
    desc: |-
      *Strength Saving Throw:* DC 15, one Medium or Small creature the necrohulk can see within 5 feet. *Failure:* The target is pulled into the necrohulk's space and becomes grafted to its body. The necrohulk can have only one target grafted at a time.

      While grafted, the target has the Restrained condition and Disadvantage on Constitution saving throws. When the necrohulk moves, the grafted target moves with it. If the target dies while grafted, its body is destroyed, and the necrohulk regains 10 Hit Points.

      The grafted target or a creature within 5 feet of the necrohulk can take an action to make a DC 15 Strength (Athletics) check. On a successful check, the target is no longer grafted and moves to an unoccupied space within 5 feet of the necrohulk.
```

---
title: Darkmantle
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Aberration
size: Small
habitat:
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Darkmantle
size: Small
type: aberration
alignment: Unaligned
ac: 11
hp: 22
hit_dice: 5d6 + 5
modifier: 3
speed: 10 ft., fly 30 ft.
stats: [ 16, 12, 13, 2, 10, 5 ]
skillsaves:
  - stealth: 3
senses: Blindsight 60 ft., passive Perception 10
cr: 1/2
actions:
  - name: Crush
    desc: |-
      *Melee Attack Roll:* +5, reach 5 ft. *Hit:* 6 (1d6 + 3) Bludgeoning damage, and the darkmantle attaches to the target. If the target is a Medium or smaller creature and the darkmantle had Advantage on the attack roll, it covers the target, which has the Blinded condition and is suffocating while the darkmantle is attached in this way.

      While attached to a target, the darkmantle can attack only the target but has Advantage on its attack rolls. Its Speed becomes 0, it can't benefit from any bonus to its Speed, and it moves with the target.

      A creature can take an action to try to detach the darkmantle from itself, doing so with a successful DC 13 Strength (Athletics) check. On its turn, the darkmantle can detach itself by using 5 feet of movement.
  - name: Darkness Aura (1/Day)
    desc: Magical Darkness fills a 15-foot Emanation originating from the darkmantle. This effect lasts while the darkmantle maintains Concentration on it, up to 10 minutes. Darkvision can't penetrate this area, and no light can illuminate it.
```

---
title: Carrion Stalker
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Aberration
size: Tiny
habitat:
  - Swamp
  - Underdark
  - Urban
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Carrion Stalker
size: Tiny
type: aberration
alignment: Unaligned
ac: 15
hp: 55
hit_dice: 10d4 + 30
modifier: 3
speed: 30 ft., burrow 30 ft.
stats: [ 6, 17, 16, 2, 13, 6 ]
senses: Tremorsense 60 ft., passive Perception 11
cr: "3"
actions:
  - name: Multiattack
    desc: The carrion stalker makes two Tentacle attacks and one Stinger attack.
  - name: Tentacle
    desc: |-
      *Melee Attack Roll:* +5, reach 5 ft. *Hit:* 8 (2d4 + 3) Piercing damage, and the carrion stalker attaches to the target. While attached, the carrion stalker can't make Tentacle attacks against other targets.

      The carrion stalker can detach itself by spending 5 feet of movement. The target or a creature within 5 feet of it can detach the carrion stalker as an action.
  - name: Stinger
    desc: "*Melee Attack Roll:* +5 (with Advantage if the carrion stalker is attached to the target), reach 5 ft. *Hit:* 7 (2d6) Poison damage, and the target is subjected to the following effect. *Constitution Saving Throw:* DC 13. *Failure:* The target has the Poisoned condition. While Poisoned in this way, the target is infested with a carrion stalker larva. If the target is still Poisoned in this way after 24 hours, the effect ends as the larva becomes a fully grown Carrion Stalker, which bursts from the target's chest and kills it."
```

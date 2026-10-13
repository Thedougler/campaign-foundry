---
title: Mud Mephit
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.25
creature_type: Elemental
size: Small
habitat:
  - Planar (Elemental)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Mud Mephit
size: Small
type: elemental
alignment: Neutral Evil
ac: 11
hp: 13
hit_dice: 3d6 + 3
modifier: 1
speed: 20 ft., fly 20 ft., swim 20 ft.
stats: [ 8, 12, 12, 9, 11, 7 ]
skillsaves:
  - stealth: 3
damage_immunities: poison
condition_immunities: exhaustion, poisoned
senses: Darkvision 60 ft., passive Perception 10
languages: Primordial (Aquan, Terran)
cr: 1/4
traits:
  - name: Death Burst
    desc: The mephit explodes when it dies. *Dexterity Saving Throw:* DC 11, each creature in a 5-foot Emanation originating from the mephit. *Failure:* The target has the Restrained condition until the end of its next turn.
actions:
  - name: Slam
    desc: "*Melee Attack Roll:* +3, reach 5 ft. *Hit:* 4 (1d6 + 1) Bludgeoning damage."
  - name: Mud Breath (Recharge 6)
    desc: "*Dexterity Saving Throw:* DC 11, one creature the mephit can see within 15 feet. *Failure:* The target has the Restrained condition until the end of the mephit's next turn."
```

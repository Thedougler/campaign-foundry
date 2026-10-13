---
title: Magmin
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Elemental
size: Small
habitat:
  - Planar (Fire)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Magmin
size: Small
type: elemental
alignment: Chaotic Neutral
ac: 14
hp: 13
hit_dice: 3d6 + 3
modifier: 2
speed: 30 ft.
stats: [ 7, 15, 12, 8, 11, 10 ]
damage_immunities: fire
senses: Darkvision 60 ft., passive Perception 10
languages: Primordial (Ignan)
cr: 1/2
traits:
  - name: Death Burst
    desc: The magmin explodes when it dies. *Dexterity Saving Throw:* DC 11, each creature in a 10-foot Emanation originating from the magmin. *Failure:* 7 (2d6) Fire damage. *Success:* Half damage.
actions:
  - name: Touch
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 7 (2d4 + 2) Fire damage. If the target is a creature or a flammable object that isn't being worn or carried, it starts burning."
bonus_actions:
  - name: Ignited Illumination
    desc: The magmin sets itself ablaze or extinguishes its flames. While ablaze, the magmin sheds Bright Light in a 10-foot radius and Dim Light for an additional 10 feet.
```

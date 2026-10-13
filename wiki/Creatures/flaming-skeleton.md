---
title: Flaming Skeleton
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Undead
size: Medium
habitat:
  - Planar (Shadowfell)
  - Underdark
  - Urban
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Flaming Skeleton
size: Medium
type: undead
alignment: Lawful Evil
ac: 15
hp: 65
hit_dice: 10d8 + 20
modifier: 2
speed: 30 ft.
stats: [ 10, 14, 15, 10, 15, 8 ]
damage_vulnerabilities: bludgeoning
damage_immunities: fire, poison
condition_immunities: exhaustion, poisoned
senses: Darkvision 60 ft., passive Perception 12
languages: understands Common plus one other language but can't speak
cr: "3"
traits:
  - name: Death Burst
    desc: The skeleton explodes when it dies. *Dexterity Saving Throw:* DC 12, each creature in a 10-foot Emanation originating from the skeleton. *Failure:* 14 (4d6) Fire damage. *Success:* Half damage.
  - name: Illumination
    desc: The skeleton sheds Bright Light in a 15-foot radius and Dim Light for an additional 15 feet.
actions:
  - name: Multiattack
    desc: The skeleton makes two attacks, using Flame Sceptre or Hurl Flame in any combination.
  - name: Flame Sceptre
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 5 (1d6 + 2) Bludgeoning damage plus 3 (1d6) Fire damage."
  - name: Hurl Flame
    desc: "*Ranged Attack Roll:* +4, range 60 ft. *Hit:* 7 (1d10 + 2) Fire damage."
```

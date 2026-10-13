---
title: Magma Mephit
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
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
name: Magma Mephit
size: Small
type: elemental
alignment: Neutral Evil
ac: 11
hp: 18
hit_dice: 4d6 + 4
modifier: 1
speed: 30 ft., fly 30 ft.
stats: [ 8, 12, 12, 7, 10, 10 ]
skillsaves:
  - stealth: 3
damage_vulnerabilities: cold
damage_immunities: fire, poison
condition_immunities: exhaustion, poisoned
senses: Darkvision 60 ft., passive Perception 10
languages: Primordial (Ignan, Terran)
cr: 1/2
traits:
  - name: Death Burst
    desc: The mephit explodes when it dies. *Dexterity Saving Throw:* DC 11, each creature in a 5-foot Emanation originating from the mephit. *Failure:* 7 (2d6) Fire damage. *Success:* Half damage.
actions:
  - name: Claw
    desc: "*Melee Attack Roll:* +3, reach 5 ft. *Hit:* 3 (1d4 + 1) Slashing damage plus 3 (1d6) Fire damage."
  - name: Fire Breath (Recharge 6)
    desc: "*Dexterity Saving Throw:* DC 11, each creature in a 15-foot Cone. *Failure:* 7 (2d6) Fire damage. *Success:* Half damage."
```

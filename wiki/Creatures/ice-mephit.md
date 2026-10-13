---
title: Ice Mephit
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
name: Ice Mephit
size: Small
type: elemental
alignment: Neutral Evil
ac: 11
hp: 21
hit_dice: 6d6
modifier: 1
speed: 30 ft., fly 30 ft.
stats: [ 7, 13, 10, 9, 11, 12 ]
skillsaves:
  - perception: 2
  - stealth: 3
damage_vulnerabilities: fire
damage_immunities: cold, poison
condition_immunities: exhaustion, poisoned
senses: Darkvision 60 ft., passive Perception 12
languages: Primordial (Aquan, Auran)
cr: 1/2
traits:
  - name: Death Burst
    desc: The mephit explodes when it dies. *Constitution Saving Throw:* DC 10, each creature in a 5-foot Emanation originating from the mephit. *Failure:* 5 (2d4) Cold damage. *Success:* Half damage.
actions:
  - name: Claw
    desc: "*Melee Attack Roll:* +3, reach 5 ft. *Hit:* 3 (1d4 + 1) Slashing damage plus 2 (1d4) Cold damage."
  - name: Frost Breath (Recharge 6)
    desc: "*Constitution Saving Throw:* DC 10, each creature in a 15-foot Cone. *Failure:* 7 (3d4) Cold damage. *Success:* Half damage."
  - name: Fog Cloud (1/Day)
    desc: |
      The mephit casts *Fog Cloud*, requiring no spell components and using Charisma as the spellcasting ability.
```

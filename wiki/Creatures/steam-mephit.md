---
title: Steam Mephit
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
name: Steam Mephit
size: Small
type: elemental
alignment: Neutral Evil
ac: 10
hp: 17
hit_dice: 5d6
modifier: 0
speed: 30 ft., fly 30 ft.
stats: [ 5, 11, 10, 11, 10, 12 ]
skillsaves:
  - stealth: 2
damage_immunities: fire, poison
condition_immunities: exhaustion, poisoned
senses: Darkvision 60 ft., passive Perception 10
languages: Primordial (Aquan, Ignan)
cr: 1/4
traits:
  - name: Blurred Form
    desc: Attack rolls against the mephit are made with Disadvantage unless the mephit has the Incapacitated condition.
  - name: Death Burst
    desc: The mephit explodes when it dies. *Dexterity Saving Throw:* DC 10, each creature in a 5-foot Emanation originating from the mephit. *Failure:* 5 (2d4) Fire damage. *Success:* Half damage.
actions:
  - name: Claw
    desc: "*Melee Attack Roll:* +2, reach 5 ft. *Hit:* 2 (1d4) Slashing damage plus 2 (1d4) Fire damage."
  - name: Steam Breath (Recharge 6)
    desc: "*Constitution Saving Throw:* DC 10, each creature in a 15-foot Cone. *Failure:* 5 (2d4) Fire damage, and the target's Speed decreases by 10 feet until the end of the mephit's next turn. *Success:* Half damage only. *Failure or Success:* Being underwater doesn't grant Resistance to this Fire damage."
```

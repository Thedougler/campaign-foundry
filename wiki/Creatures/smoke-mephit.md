---
title: Smoke Mephit
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
name: Smoke Mephit
size: Small
type: elemental
alignment: Neutral Evil
ac: 12
hp: 13
hit_dice: 3d6 + 3
modifier: 2
speed: 30 ft., fly 30 ft.
stats: [ 6, 14, 12, 10, 10, 11 ]
skillsaves:
  - perception: 2
  - stealth: 4
damage_immunities: fire, poison
condition_immunities: exhaustion, poisoned
senses: Darkvision 60 ft., passive Perception 12
languages: Primordial (Auran, Ignan)
cr: 1/4
traits:
  - name: Death Burst
    desc: The mephit explodes when it dies. *Constitution Saving Throw:* DC 11, each creature in a 5-foot Emanation originating from the mephit. *Failure:* The target has the Poisoned condition until the end of its next turn.
actions:
  - name: Claw
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 4 (1d4 + 2) Slashing damage."
  - name: Cinder Breath (Recharge 6)
    desc: "*Dexterity Saving Throw:* DC 11, one creature the mephit can see within 15 feet. *Failure:* The target has the Blinded condition until the end of the mephit's next turn."
```

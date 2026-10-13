---
title: Dust Mephit
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
name: Dust Mephit
size: Small
type: elemental
alignment: Neutral Evil
ac: 12
hp: 17
hit_dice: 5d6
modifier: 2
speed: 30 ft., fly 30 ft.
stats: [ 5, 14, 10, 9, 11, 10 ]
skillsaves:
  - perception: 2
  - stealth: 4
damage_vulnerabilities: fire
damage_immunities: poison
condition_immunities: exhaustion, poisoned
senses: Darkvision 60 ft., passive Perception 12
languages: Primordial (Auran, Terran)
cr: 1/2
traits:
  - name: Death Burst
    desc: The mephit explodes when it dies. *Dexterity Saving Throw:* DC 10, each creature in a 5-foot Emanation originating from the mephit. *Failure:* 5 (2d4) Bludgeoning damage. *Success:* Half damage.
actions:
  - name: Claw
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 4 (1d4 + 2) Slashing damage."
  - name: Blinding Breath (Recharge 6)
    desc: "*Dexterity Saving Throw:* DC 10, each creature in a 15-foot Cone. *Failure:* The target has the Blinded condition until the end of the mephit's next turn."
  - name: Sleep (1/Day)
    desc: |
      The mephit casts the *Sleep* spell, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 10).
```

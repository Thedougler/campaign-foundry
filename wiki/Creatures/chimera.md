---
title: Chimera
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Monstrosity
size: Large
habitat:
  - Grassland
  - Hill
  - Mountain
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Chimera
size: Large
type: monstrosity
alignment: Chaotic Evil
ac: 14
hp: 114
hit_dice: 12d10 + 48
modifier: 0
speed: 30 ft., fly 60 ft.
stats: [ 19, 11, 19, 3, 14, 10 ]
skillsaves:
  - perception: 8
senses: Darkvision 60 ft., passive Perception 18
languages: understands Draconic but can't speak
cr: "6"
actions:
  - name: Multiattack
    desc: The chimera makes one Ram attack, one Bite attack, and one Claw attack. It can replace the Claw attack with a use of Fire Breath if available.
  - name: Bite
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 11 (2d6 + 4) Piercing damage, or 18 (4d6 + 4) Piercing damage if the chimera had Advantage on the attack roll."
  - name: Claw
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 7 (1d6 + 4) Slashing damage."
  - name: Ram
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 10 (1d12 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition."
  - name: Fire Breath (Recharge 5–6)
    desc: "*Dexterity Saving Throw:* DC 15, each creature in a 15-foot Cone. *Failure:* 31 (7d8) Fire damage. *Success:* Half damage."
```

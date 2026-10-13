---
title: Displacer Beast
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Monstrosity
size: Large
habitat:
  - Forest
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Displacer Beast
size: Large
type: monstrosity
alignment: Lawful Evil
ac: 13
hp: 76
hit_dice: 9d10 + 27
modifier: 4
speed: 40 ft.
stats: [ 18, 15, 16, 6, 12, 8 ]
senses: Darkvision 60 ft., passive Perception 11
languages: understands Sylvan but can't speak
cr: "3"
traits:
  - name: Avoidance
    desc: If the displacer beast is subjected to an effect that allows it to make a saving throw to take only half damage, it instead takes no damage if it succeeds on the save and half damage if it fails. It can't use this trait if it has the Incapacitated condition.
  - name: Displacement
    desc: Attack rolls against the displacer beast have Disadvantage, since it projects an illusion that makes it appear to be near its actual location. This trait is suppressed while the displacer beast has the Incapacitated condition.
actions:
  - name: Multiattack
    desc: The displacer beast makes one Rend attack and one Tentacle attack.
  - name: Rend
    desc: "*Melee Attack Roll:* +6, reach 5 feet. *Hit:* 9 (1d10 + 4) Slashing damage. If target is a Large or smaller creature, it has the Prone condition."
  - name: Tentacle
    desc: "*Melee Attack Roll:* +6, reach 10 feet. *Hit:* 11 (2d6 + 4) Piercing damage."
```

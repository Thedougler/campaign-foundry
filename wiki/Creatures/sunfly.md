---
title: Sunfly
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0
creature_type: Celestial
size: Tiny
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Sunfly
size: Tiny
type: celestial
alignment: typically Chaotic Good
ac: 13
hp: 2
hit_dice: 1d4
modifier: 3
speed: 10 ft., fly 40 ft.
stats: [ 4, 17, 10, 4, 10, 6 ]
senses: passive Perception 10
languages: understands Celestial but can't speak
cr: "0"
actions:
  - name: Sting
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 2 (1d4) piercing damage. Additionally, if the sunfly is on an Outer Plane, it injects the target with a toxin, the effect of which is determined by the sunfly's location:"
  - name: Upper Plane
    desc: The target sheds bright light in a 5-foot radius until the end of its next turn.
  - name: Neutral Plane
    desc: If the target is concentrating on a spell or similar effect, it makes the Constitution saving throw with disadvantage to maintain its concentration.
  - name: Lower Plane
    desc: The target's speed is reduced by 5 feet until the end of its next turn.
bonus_actions:
  - name: Illumination
    desc: The sunfly sheds bright light in a 5-foot radius and dim light for an additional 5 feet, or it uses a bonus action to extinguish the light.
```

---
title: Swarm of Sunflies
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Celestial
size: Medium
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Swarm of Sunflies
size: Medium
type: celestial
alignment: typically Chaotic Good
ac: 13
hp: 22
hit_dice: 5d8
modifier: 3
speed: 10 ft., fly 40 ft.
stats: [ 6, 17, 10, 4, 10, 6 ]
senses: passive Perception 10
languages: understands Celestial but can't speak
cr: "1"
traits:
  - name: Swarm
    desc: The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny dragonfly. The swarm can't regain hit points or gain temporary hit points.
actions:
  - name: Stings
    desc: "*Melee Weapon Attack:* +5 to hit, reach 0 ft., one creature in the swarm's space. *Hit:* 10 (3d4 + 3) piercing damage, or 5 (1d4 + 3) piercing damage if the swarm has half of its hit points or fewer. Additionally, if the swarm is on an Outer Plane, it injects the target with a toxin, the effect of which is determined by the swarm's location:"
  - name: Upper Plane
    desc: The target sheds bright light in a 5-foot radius until the end of its next turn. During that time, the invisible condition has no effect on it.
  - name: Neutral Plane
    desc: If the target is concentrating on a spell or similar effect, it loses its concentration.
  - name: Lower Plane
    desc: The target's speed is reduced by 10 feet until the end of its next turn.
  - name: Dazzling Lights (Recharge 6)
    desc: The swarm shines its lights in a dazzling display. Each creature within 15 feet of the swarm must succeed on a DC 10 Constitution saving throw or have the stunned condition for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
bonus_actions:
  - name: Illumination
    desc: The swarm sheds bright light in a 15-foot radius and dim light for an additional 15 feet, or it uses a bonus action to extinguish the light.
```

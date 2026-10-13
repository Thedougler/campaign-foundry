---
title: Orien Enforcer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Humanoid
size: Small or Medium
habitat: []
sourcebooks:
  - "Eberron: Forge of the Artificer"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Orien Enforcer
size: Small or Medium
type: humanoid
subtype: human
alignment: Neutral
ac: 16
hp: 55
hit_dice: 10d8 + 10
modifier: 6
speed: 35 ft.
stats: [ 12, 18, 13, 16, 14, 11 ]
saves:
  - dex: 6
  - wis: 4
skillsaves:
  - acrobatics: 6
  - perception: 4
gear:
  - six daggers
  - studded leather armour
senses: passive Perception 14
languages: Common plus two other languages
cr: "4"
actions:
  - name: Multiattack
    desc: The enforcer makes three Dagger attacks. It can replace one attack with a use of Lightning Cage if available.
  - name: Dagger
    desc: "*Melee or Ranged Attack Roll:* +6, reach 5 ft. or range 20/60 ft. *Hit:* 9 (2d4 + 4) Piercing damage plus 7 (2d6) Poison damage."
  - name: Lightning Cage (Recharge 5–6)
    desc: "*Constitution Saving Throw:* DC 13, each creature in a 20-foot-radius Sphere centred on a point the enforcer can see within 60 feet. *Failure:* 13 (3d8) Lightning damage, and the creature can't take Reactions until the end of the enforcer's next turn. *Success:* Half damage only."
bonus_actions:
  - name: Misty Step (2/Day)
    desc: |
      The enforcer casts *Misty Step*, using Intelligence as the spellcasting ability.
reactions:
  - name: Temporal Disruption (1/Day)
    desc: "Trigger: The enforcer takes damage from a melee attack. _Response:_ The enforcer teleports up to 30 feet to an unoccupied space it can see. Each creature within 10 feet of the space the enforcer left must succeed on a DC 13 Constitution saving throw, or its Speed is halved until the start of the enforcer's next turn."
```

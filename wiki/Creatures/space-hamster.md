---
title: Space Hamster
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.25
creature_type: Monstrosity
size: Tiny
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Space Hamster
size: Tiny
type: monstrosity
alignment: typically Neutral Good
ac: 15
hp: 10
hit_dice: 4d4
modifier: 5
speed: 20 ft., burrow 5 ft.
stats: [ 1, 20, 10, 6, 12, 6 ]
skillsaves:
  - perception: 3
  - stealth: 7
senses: passive Perception 13
languages: telepathy 5 ft.
cr: 1/4
actions:
  - name: Bite
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 1 piercing damage."
  - name: Go for the Eyes (Recharge 6)
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one creature. *Hit:* 8 (1d6 + 5) piercing damage, and the target must succeed on a DC 15 Dexterity saving throw or be blinded until the start of the hamster's next turn."
bonus_actions:
  - name: Escape
    desc: The hamster takes the Dash or Disengage action.
```

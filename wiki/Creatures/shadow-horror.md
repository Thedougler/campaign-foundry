---
title: Shadow Horror
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Aberration
size: Large
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Shadow Horror
size: Large
type: aberration
alignment: Neutral Evil
ac: 13
hp: 120
hit_dice: 16d10 + 32
modifier: 3
speed: 40 ft.
stats: [ 12, 16, 14, 2, 17, 18 ]
skillsaves:
  - perception: 7
  - stealth: 11
damage_vulnerabilities: radiant
condition_immunities: frightened
senses: darkvision 120 ft., passive Perception 17
cr: "9"
traits:
  - name: Incorporeal Movement
    desc: The horror can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
  - name: Shadow Stealth
    desc: While in dim light or darkness, the horror can take the Hide action as a bonus action.
  - name: Shadow Stride
    desc: As a bonus action, the horror can step into a shadow within 5 feet of it and magically appear in an unoccupied space within 5 feet of a second shadow that is up to 60 feet away. Both shadows must be cast by a Small or larger creature or object.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the horror has disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight.
actions:
  - name: Multiattack
    desc: "The horror makes three attacks: one with its bite and two with its claws."
  - name: Bite
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 21 (4d8 + 3) piercing damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 13 (3d6 + 3) slashing damage, and the target must succeed on a DC 16 Wisdom saving throw or be frightened of the horror until the end of the target's next turn."
  - name: Lashing Shadows (Recharge 5–6)
    desc: Each creature within 60 feet of the horror, except other horrors, must succeed on a DC 16 Dexterity saving throw or take 27 (6d8) necrotic damage.
```

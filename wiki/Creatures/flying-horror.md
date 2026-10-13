---
title: Flying Horror
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Aberration
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Flying Horror
size: Medium
type: aberration
alignment: Neutral Evil
ac: 16
ac_class: natural armour
hp: 49
hit_dice: 9d8 + 9
modifier: 5
speed: 30 ft., fly 60 ft.
stats: [ 9, 20, 12, 2, 15, 16 ]
skillsaves:
  - perception: 4
  - stealth: 7
damage_vulnerabilities: radiant
condition_immunities: frightened
senses: darkvision 120 ft., passive Perception 14
cr: "3"
traits:
  - name: Fear Frenzy
    desc: The horror has advantage on attack rolls against frightened creatures.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the horror has disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight.
actions:
  - name: Claws
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 8 (1d6 + 5) slashing damage plus 14 (4d6) psychic damage."
  - name: Frightening Screech (Recharge 5–6)
    desc: The horror screeches. Each creature within 30 feet of it that can hear it must succeed on a DC 13 Wisdom saving throw or be frightened of it for 1 minute. The frightened creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the horror's Frightening Screech for the next 24 hours.
```

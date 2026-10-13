---
title: Felidar
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Celestial
size: Large
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Felidar
size: Large
type: celestial
alignment: Lawful Neutral
ac: 17
ac_class: natural armour
hp: 93
hit_dice: 11d10 + 33
modifier: 3
speed: 40 ft.
stats: [ 19, 16, 17, 10, 17, 14 ]
saves:
  - dex: 6
  - wis: 6
  - cha: 5
skillsaves:
  - insight: 6
  - perception: 6
senses: truesight 120 ft., passive Perception 16
languages: understands Celestial and Common but can't speak
cr: "5"
traits:
  - name: Bonding
    desc: "The felidar can magically bond with one creature it can see, right after spending at least 1 hour observing that creature while within 30 feet of it. The bond lasts until the felidar bonds with a different creature or until the bonded creature dies. This bond has the following effects: The felidar and the bonded creature can communicate telepathically with each other at a distance of up to 100 feet. The felidar can sense the direction and distance to the bonded creature if they're on the same plane of existence. As an action, the felidar or the bonded creature can sense what the other sees and hears, during which time it loses its own sight and hearing. This effect lasts until the start of its next turn."
  - name: Keen Hearing and Sight
    desc: The felidar has advantage on Wisdom (Perception) checks that rely on hearing or sight.
  - name: Pounce
    desc: If the felidar moves at least 20 feet straight toward a creature and hits it with a claw attack on the same turn, that target must succeed on a DC 15 Strength saving throw or be knocked prone. If the target is prone, the felidar can make one claw attack against it as a bonus action.
actions:
  - name: Multiattack
    desc: "The felidar makes two attacks: one with its bite and one with its claws."
  - name: Bite
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 17 (3d8 + 4) piercing damage."
  - name: Claws
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 14 (3d6 + 4) slashing damage."
```

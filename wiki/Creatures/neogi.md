---
title: Neogi
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Aberration
size: Small
habitat:
  - Hill
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Neogi
size: Small
type: aberration
alignment: Typically Lawful Evil
ac: 15
ac_class: natural armour
hp: 33
hit_dice: 6d6 + 12
modifier: 3
speed: 30 ft., climb 30 ft.
stats: [ 6, 16, 14, 13, 12, 15 ]
skillsaves:
  - intimidation: 4
  - perception: 3
senses: darkvision 60 ft., passive Perception 13
languages: Common, Deep Speech, Undercommon
cr: "3"
traits:
  - name: Mental Fortitude
    desc: The neogi has advantage on saving throws against being charmed or frightened, and magic can't put the neogi to sleep.
  - name: Spider Climb
    desc: The neogi can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
actions:
  - name: Multiattack
    desc: The neogi makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage plus 14 (4d6) poison damage, and the target must succeed on a DC 12 Constitution saving throw or become poisoned for 1 minute. A target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
  - name: Claw
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 8 (2d4 + 3) slashing damage."
bonus_actions:
  - name: Enslave (Recharges after a Short or Long Rest)
    desc: The neogi targets one creature it can see within 30 feet of it. The target must succeed on a DC 14 Wisdom saving throw or be magically charmed by the neogi for 1 day, or until the neogi dies or is more than 1 mile from the target. The charmed target obeys the neogi's commands and can't take reactions, and the neogi and the target can communicate telepathically with each other at a distance of up to 1 mile. Whenever the charmed target takes damage, it can repeat the saving throw, ending the effect on itself on a success.
```

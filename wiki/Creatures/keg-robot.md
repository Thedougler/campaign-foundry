---
title: Keg Robot
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Construct
size: Medium
habitat: []
sourcebooks:
  - Acquisitions Incorporated
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Keg Robot
size: Medium
type: construct
alignment: Unaligned
ac: 14
ac_class: natural armour
hp: 39
hit_dice: 6d8 + 12
modifier: 3
speed: 30 ft.
stats: [ 16, 16, 15, 6, 8, 5 ]
skillsaves:
  - perception: 1
damage_resistances: bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison, psychic
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned
senses: darkvision 60 ft., passive Perception 11
languages: understands Common but can't speak
cr: "2"
traits:
  - name: Customizable Storage
    desc: A keg robot can hold up to three types of liquid payload totaling 12 gallons within its hollow, barrel-shaped body. A full keg robot can make one liquid attack per gallon before the liquid must be refilled. Filling a keg robot takes 2 rounds per gallon. Differing payloads can alter the keg robot's attacks from those presented here.
actions:
  - name: Fist
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 7 (1d8 + 3) bludgeoning damage."
  - name: Acid Squirt
    desc: "*Ranged Weapon Attack:* +5 to hit, range 20/40 ft., one target. *Hit:* 7 (1d8 + 3) acid damage."
  - name: Beer Shower
    desc: |-
      The keg robot spews an unnaturally potent beer in a 15-foot cone or in a 30-foot line that is 5 feet wide. Each creature in the area must succeed on a DC 13 Constitution saving throw or be poisoned. While poisoned in this way, a creature has its speed halved by exposure to the potent brew. An affected creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.

      Additionally, the beer shower extinguishes any fires or open flames in its area.
  - name: Hot Oil Spray (Recharge 5–6)
    desc: |-
      The keg robot sprays hot oil in a 15-foot cone or in a 30-foot line that is 5 feet wide. Each creature in the area must make a DC 13 Dexterity saving throw. On a failed save, a creature takes 7 (1d8 + 3) fire damage and falls prone. On a successful save, a creature takes half as much damage and doesn't fall prone.

      Any creature affected by the hot oil spray that takes fire damage before the oil dries (after 1 minute) takes an additional 3 (1d6) fire damage, and the oil burns away.

      If the oil that remains in the area of the spray is lit, it burns for 1d4 rounds and deals 3 (1d6) fire damage to any creature that enters the area for the first time on a turn or ends its turn there.
```

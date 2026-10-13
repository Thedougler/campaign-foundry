---
title: Dust Hulk
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Elemental
size: Large
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Dust Hulk
size: Large
type: elemental
alignment: typically Chaotic Neutral
ac: 16
ac_class: natural armour
hp: 68
hit_dice: 8d10 + 24
modifier: 4
speed: 0 ft., fly 30 ft. (hover)
stats: [ 15, 19, 16, 10, 12, 8 ]
damage_immunities: poison
condition_immunities: exhaustion, grappled, paralysed, petrified, poisoned, restrained
senses: darkvision 60 ft., passive Perception 11
languages: Giant, Terran
cr: "5"
traits:
  - name: Air Form
    desc: The dust hulk can enter a hostile creature's space and stop there. It can move through a space as narrow as 1 inch without squeezing.
  - name: Death Burst
    desc: When the dust hulk dies, it explodes in a burst of dust that fills a 10-foot-radius sphere centred on itself. Each creature in that area must succeed on a DC 14 Constitution saving throw or have the blinded condition for 1 minute. An affected creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
actions:
  - name: Multiattack
    desc: The dust hulk makes three Slam attacks. It can replace one of these attacks with Stinging Dust.
  - name: Slam
    desc: "*Melee Weapon Attack:* +7 to hit, reach 10 ft., one target. *Hit:* 13 (2d8 + 4) bludgeoning damage."
  - name: Stinging Dust
    desc: One creature of the dust hulk's choice inside its space must make a DC 14 Constitution saving throw. On a failed save, the creature takes 10 (3d6) bludgeoning damage and has the blinded condition until the end of its next turn. On a successful save, the creature takes half as much damage only.
```

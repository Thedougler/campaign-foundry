---
title: Choker
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Aberration
size: Small
habitat:
  - Forest
  - Mountain
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Choker
size: Small
type: aberration
alignment: Typically Chaotic Evil
ac: 16
ac_class: natural armour
hp: 13
hit_dice: 3d6 + 3
modifier: 2
speed: 30 ft.
stats: [ 16, 14, 13, 4, 12, 7 ]
skillsaves:
  - stealth: 6
senses: darkvision 60 ft., passive Perception 11
languages: Deep Speech
cr: "1"
traits:
  - name: Aberrant Quickness (Recharges after a Short or Long Rest)
    desc: The choker can take an extra action on its turn.
  - name: Boneless
    desc: The choker can move through and occupy a space as narrow as 4 inches wide without squeezing.
  - name: Spider Climb
    desc: The choker can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
actions:
  - name: Multiattack
    desc: The choker makes two Tentacle attacks.
  - name: Tentacle
    desc: "*Melee Weapon Attack:* +5 to hit, reach 10 ft., one target. *Hit:* 5 (1d4 + 3) piercing damage. If the target is a Large or smaller creature, it is grappled (escape DC 15). Until this grapple ends, the target is restrained, and the choker can't use this tentacle on another target. The choker has two tentacles. If this attack is a critical hit, the target also can't breathe or speak until the grapple ends."
```

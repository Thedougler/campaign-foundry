---
title: Balhannoth
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Aberration
size: Large
habitat:
  - Coastal
  - Mountain
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
  - Return to the Glory
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Balhannoth
size: Large
type: aberration
alignment: Typically Chaotic Evil
ac: 17
ac_class: natural armour
hp: 114
hit_dice: 12d10 + 48
modifier: -1
speed: 25 ft., climb 25 ft.
stats: [ 17, 8, 18, 6, 15, 8 ]
saves:
  - con: 8
skillsaves:
  - perception: 6
condition_immunities: blinded
senses: blindsight 500 ft. (blind beyond this radius), passive Perception 16
languages: understands Deep Speech, telepathy 1 mile
cr: "11"
traits:
  - name: Legendary Resistance (2/Day)
    desc: If the balhannoth fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The balhannoth makes one Bite attack and two Tentacle attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 19 (3d10 + 3) piercing damage."
  - name: Tentacle
    desc: "*Melee Weapon Attack:* +7 to hit, reach 10 ft., one target. *Hit:* 10 (2d6 + 3) bludgeoning damage, and the target is grappled (escape DC 15) and is moved up to 5 feet toward the balhannoth. Until this grapple ends, the target is restrained, and the balhannoth can't use this tentacle against other targets. The balhannoth has four tentacles."
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the balhannoth can expend a use to take one of the following actions. The balhannoth regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Bite
    desc: The balhannoth makes one Bite attack against one creature it has grappled.
  - name: Teleport
    desc: The balhannoth teleports, along with any equipment it is wearing or carrying and any creatures it has grappled, up to 60 feet to an unoccupied space it can see.
  - name: Vanish
    desc: The balhannoth magically becomes invisible for up to 10 minutes or until immediately after it makes an attack roll.
```

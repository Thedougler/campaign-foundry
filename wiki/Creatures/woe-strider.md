---
title: Woe Strider
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Aberration
size: Large
habitat: []
sourcebooks:
  - Mythic Odysseys of Theros
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Woe Strider
size: Large
type: aberration
alignment: Chaotic Evil
ac: 17
ac_class: natural armour
hp: 110
hit_dice: 13d10 + 39
modifier: 2
speed: 40 ft., climb 40 ft.
stats: [ 18, 15, 16, 8, 14, 14 ]
skillsaves:
  - intimidation: 5
  - perception: 5
condition_immunities: frightened
senses: darkvision 120 ft., passive Perception 15
languages: telepathy 120 ft.
cr: "7"
traits:
  - name: Antimagic Cone
    desc: The woe strider's open mouth creates an area of antimagic, as in the *antimagic field* spell, in a 60-foot cone. At the start of each of its turns, the woe strider decides which way the cone faces and whether its mouth is open or closed.
actions:
  - name: Multiattack
    desc: The woe strider makes two claw attacks and one bite attack. If both claws hit the same creature, the target is grappled (escape DC 14).
  - name: Claw
    desc: "*Melee Weapon Attack:* +7 to hit, reach 10 ft., one target. *Hit:* 7 (1d6 + 4) slashing damage plus 3 (1d6) psychic damage."
  - name: Bite
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one creature that is grappled, incapacitated, or restrained. *Hit:* 13 (2d8 + 4) piercing damage plus 16 (3d10) psychic damage. In addition, each magic item the creature is carrying that isn't an artifact has its magical properties suppressed for 1 minute."
```

---
title: Dolgaunt
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Aberration
size: Medium
habitat: []
sourcebooks:
  - "Eberron: Rising from the Last War"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Dolgaunt
size: Medium
type: aberration
alignment: Lawful Evil
ac: 16
ac_class: Unarmored Defense
hp: 33
hit_dice: 6d8 + 6
modifier: 4
speed: 40 ft.
stats: [ 14, 18, 12, 13, 14, 11 ]
skillsaves:
  - acrobatics: 6
  - perception: 4
  - stealth: 6
condition_immunities: blinded
senses: blindsight 120 ft. (blind beyond this radius), passive Perception 14
languages: Deep Speech, Goblin
cr: "3"
traits:
  - name: Evasion
    desc: If the dolgaunt is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the dolgaunt instead takes no damage if it succeeds on the saving throw, and only half damage if it fails. It can't use this trait if it's incapacitated.
  - name: Unarmored Defense
    desc: While the dolgaunt is wearing no armour and wielding no shield, its AC includes its Wisdom modifier.
actions:
  - name: Multiattack
    desc: The dolgaunt makes two tentacle attacks and two unarmed strikes. Up to two tentacle attacks can be replaced by Vitality Drain.
  - name: Tentacle
    desc: "*Melee Weapon Attack:* +6 to hit, reach 15 ft., one target. *Hit:* 7 (1d6 + 4) bludgeoning damage. The target is grappled (escape DC 12) if it is a Large or smaller creature. Until this grapple ends, the dolgaunt can't use the same tentacle on another target. The dolgaunt has two tentacles."
  - name: Unarmed Strike
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 6 (1d4 + 4) bludgeoning damage."
  - name: Vitality Drain
    desc: One creature grappled by a tentacle of the dolgaunt must make a DC 11 Constitution saving throw. On a failed save, the target takes 9 (2d8) necrotic damage, and the dolgaunt regains a number of hit points equal to half the necrotic damage taken.
```

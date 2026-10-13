---
title: Maelephant
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Fiend
size: Large
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Maelephant
size: Large
type: fiend
alignment: typically Lawful Evil
ac: 15
ac_class: half plate armour
hp: 161
hit_dice: 17d10 + 68
modifier: 0
speed: 40 ft.
stats: [ 19, 10, 18, 10, 16, 12 ]
saves:
  - str: 8
  - con: 8
skillsaves:
  - perception: 7
damage_resistances: acid, fire, lightning
damage_immunities: poison
condition_immunities: frightened, poisoned
gear:
  - glaive
senses: darkvision 120 ft., passive Perception 17
languages: Infernal
cr: "10"
traits:
  - name: Magic Resistance
    desc: The maelephant has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The maelephant makes one Barbed Trunk attack and two Glaive attacks.
  - name: Barbed Trunk
    desc: "*Melee Weapon Attack:* +8 to hit, reach 10 ft., one target. *Hit:* 13 (2d8 + 4) piercing damage plus 13 (2d12) poison damage. If the target is a Medium or smaller creature, it has the grappled condition (escape DC 14). Until this grapple ends, the target has the restrained condition. While it is grappling a creature, the maelephant can't use its barbed trunk to attack other creatures."
  - name: Glaive
    desc: "*Melee Weapon Attack:* +8 to hit, reach 10 ft., one target. *Hit:* 15 (2d10 + 4) slashing damage."
  - name: Mind Poison (Recharge 5–6)
    desc: The maelephant expels poisonous gas from its trunk in a 60-foot cone. Each creature in that area must make a DC 16 Constitution saving throw. On a failed save, a creature takes 39 (6d12) poison damage and has the poisoned condition. While poisoned in this way, the creature loses all weapon and skill proficiencies, it can't cast spells, it can't understand language, and it has disadvantage on Intelligence saving throws. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. On a successful save, the target takes half as much damage only and is immune to this maelephant's Mind Poison for 24 hours.
```

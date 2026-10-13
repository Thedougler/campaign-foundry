---
title: Udaak
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 16
creature_type: Fiend
size: Gargantuan
habitat: []
sourcebooks:
  - Explorer's Guide to Wildemount
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Udaak
size: Gargantuan
type: fiend
alignment: Neutral Evil
ac: 18
ac_class: natural armour
hp: 165
hit_dice: 10d20 + 60
modifier: 2
speed: 50 ft.
stats: [ 26, 14, 22, 3, 11, 10 ]
saves:
  - str: 13
  - con: 11
damage_vulnerabilities: thunder
damage_immunities: poison; bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: frightened, grappled, poisoned, restrained
senses: darkvision 120 ft., passive Perception 10
cr: "16"
traits:
  - name: Charge
    desc: If the udaak moves at least 20 feet straight toward a target and then hits it with a slam attack on the same turn, the target takes an extra 27 (6d8) bludgeoning damage. If the target is a creature, it must succeed on a DC 21 Strength saving throw or be pushed up to 20 feet away from the udaak and knocked prone.
  - name: Siege Monster
    desc: The udaak deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: "The udaak makes three attacks: one with its bite and two with its slam."
  - name: Bite
    desc: "*Melee Weapon Attack:* +13 to hit, reach 5 ft., one creature. *Hit:* 21 (2d12 + 8) piercing damage, and the target is grappled (escape DC 21). Until this grapple ends, the target is restrained, and the udaak can't bite another target."
  - name: Slam
    desc: "*Melee Weapon Attack:* +13 to hit, reach 10 ft., one target. *Hit:* 21 (3d8 + 8) bludgeoning damage."
  - name: Swallow
    desc: |-
      The udaak makes one bite attack against a Large or smaller target it is grappling. If the attack hits, the target is also swallowed, and the grapple ends. A swallowed creature is blinded and restrained, it has total cover against attacks and other effects outside the udaak, and it takes 21 (6d6) acid damage at the start of each of the udaak's turns.

      If the udaak takes 30 damage or more on a single turn from a creature inside it, the udaak must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, which fall prone in a space within 10 feet of the udaak. If the udaak dies, a swallowed creature is no longer restrained by it and can escape from the corpse by using 20 feet of movement, exiting prone.
```

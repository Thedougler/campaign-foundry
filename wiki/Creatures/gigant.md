---
title: Gigant
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 20
creature_type: Monstrosity
size: Gargantuan
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Gigant
size: Gargantuan
type: monstrosity
alignment: Unaligned
ac: 17
ac_class: natural armour
hp: 325
hit_dice: 21d20 + 105
modifier: 2
speed: 50 ft., burrow 50 ft., fly 80 ft.
stats: [ 24, 14, 21, 3, 14, 11 ]
saves:
  - dex: 8
  - wis: 8
skillsaves:
  - perception: 8
senses: darkvision 120 ft., passive Perception 18
cr: "20"
traits:
  - name: Spell-Resistant Carapace
    desc: The gigant has advantage on saving throws against spells, and any creature that makes a spell attack against the gigant has disadvantage on the attack roll.
actions:
  - name: Multiattack
    desc: The gigant makes one Mandibles attack and two Talons attacks.
  - name: Mandibles
    desc: "*Melee Weapon Attack:* +13 to hit, reach 10 ft., one creature. *Hit:* 21 (4d6 + 7) slashing damage, and the target has the grappled condition (escape DC 17). Until the grapple ends, the target takes 21 (4d6 + 7) slashing damage at the start of each of the gigant's turns. While the gigant is grappling a target, it can't use Mandibles against other targets."
  - name: Talons
    desc: "*Melee Weapon Attack:* +13 to hit, reach 20 ft., one target. *Hit:* 17 (3d6 + 7) slashing damage, and the target is pulled 10 feet straight toward the gigant."
  - name: Scale Dust (Recharge 5–6)
    desc: The gigant releases magical dust from its wings in a 30-foot cube. Each creature in that area must make a DC 19 Constitution saving throw, taking 45 (10d8) poison damage on a failed save, or half as much damage on a successful one. On a success or failure, the creature has the poisoned condition for 1 hour. While poisoned this way, the creature can't regain hit points.
bonus_actions:
  - name: Drone
    desc: The gigant produces a horrid droning sound by rapidly beating its wings. Each creature within 10 feet of the gigant must succeed on a DC 19 Constitution saving throw or take 10 (3d6) thunder damage and have the incapacitated condition until the end of its next turn. The gigant can then fly up to half its flying speed.
```

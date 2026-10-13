---
title: Regisaur
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 14
creature_type: Monstrosity
size: Gargantuan
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Regisaur
size: Gargantuan
type: monstrosity
subtype: dinosaur
alignment: Unaligned
ac: 17
ac_class: natural armour
hp: 181
hit_dice: 11d20 + 66
modifier: -1
speed: 40 ft.
stats: [ 27, 8, 23, 4, 12, 6 ]
senses: passive Perception 11
cr: "14"
traits:
  - name: Magic Resistance
    desc: The regisaur has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The regisaur makes one Bite attack and one Tail attack. The regisaur can't target the same creature with both attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +13 to hit, reach 10 ft., one target. *Hit:* 47 (6d12 + 8) piercing damage, and the target has the grappled condition (escape DC 18). Until this grapple ends, the target has the restrained condition, and the regisaur can't Bite another target."
  - name: Tail
    desc: "*Melee Weapon Attack:* +13 to hit, reach 20 ft., one target. *Hit:* 26 (4d8 + 8) bludgeoning damage."
bonus_actions:
  - name: Swallow
    desc: |-
      *Melee Weapon Attack:* +13 to hit, reach 5 ft., one Huge or smaller creature grappled by the regisaur. *Hit:* The regisaur swallows the target, and the grapple ends. A swallowed creature has the blinded and restrained conditions, it has total cover against attacks and other effects outside the regisaur, and it takes 7 (2d6) acid damage at the start of each of its turns. The regisaur can have up to two creatures swallowed at a time.

      If the regisaur takes 25 damage or more on a single turn from a swallowed creature, the regisaur must succeed on a DC 16 Constitution saving throw at the end of that turn or regurgitate the creature, which falls in a space within 5 feet of the regisaur and has the prone condition; the creature no longer has the blinded and restrained conditions.
```

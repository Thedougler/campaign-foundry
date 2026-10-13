---
title: Adult Time Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 18
creature_type: Dragon
size: Huge
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Adult Time Dragon
size: Huge
type: dragon
alignment: typically Neutral
ac: 19
ac_class: natural armour
hp: 250
hit_dice: 20d12 + 120
modifier: 2
speed: 40 ft., climb 40 ft., fly 80 ft.
stats: [ 25, 14, 23, 23, 16, 20 ]
saves:
  - dex: 8
  - con: 12
  - wis: 9
  - cha: 11
skillsaves:
  - arcana: 12
  - history: 18
  - perception: 15
  - stealth: 14
senses: blindsight 60 ft., darkvision 120 ft., passive Perception 25
languages: all
cr: "18"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The dragon makes three Rend attacks.
  - name: Rend
    desc: "*Melee Weapon Attack:* +13 to hit, reach 10 ft., one target. *Hit:* 14 (2d6 + 7) slashing damage plus 7 (2d6) force damage."
  - name: Time Breath (Recharge 5–6)
    desc: The dragon exhales a wave of shimmering light in a 60-foot cone. Nonmagical objects and vegetation in that area that aren't being worn or carried crumble to dust. Each creature in that area must make a DC 20 Constitution saving throw. On a failed save, a creature takes 36 (8d8) force damage and is magically weakened as it is desynchronized from the time stream. While the creature is in this state, attack rolls against it have advantage, and it has the poisoned condition. On a successful save, a creature takes half as much damage only. A weakened creature can repeat the saving throw at the end of each of its turns, ending the effect on itself after it succeeds on three of these saves.
reactions:
  - name: Reactive Rend
    desc: After using Legendary Resistance or in response to being hit by an attack roll, the dragon makes one Rend attack.
  - name: Slow Time
    desc: Immediately after a creature the dragon can see ends its turn, the dragon targets a creature it can see within 60 feet of itself that is weakened by its Time Breath. Until the weakened effect ends on the target, its speed becomes 0, and its speed can't increase.
  - name: Time Slip
    desc: The dragon halves the damage it takes from an attack made against it, provided it can see the attacker. The dragon can then immediately teleport, along with any equipment it is wearing or carrying, up to 30 feet to an unoccupied space it can see.
```

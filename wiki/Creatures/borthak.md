---
title: Borthak
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Monstrosity
size: Huge
habitat: []
sourcebooks:
  - "Vecna: Eve of Ruin"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Borthak
size: Huge
type: monstrosity
alignment: typically Chaotic Evil
ac: 16
ac_class: natural armour
hp: 200
hit_dice: 16d12 + 96
modifier: 3
speed: 30 ft.
stats: [ 25, 16, 22, 4, 14, 15 ]
saves:
  - str: 12
  - con: 11
  - cha: 7
damage_resistances: acid, cold
senses: darkvision 60 ft., passive Perception 12
cr: "15"
traits:
  - name: Glacial Aura
    desc: At the end of the borthak's turn, slippery ice covers surfaces within 10 feet of the borthak. This ice is difficult terrain. When a creature other than the borthak enters the ice's area for the first time on a turn or starts its turn there, it must succeed on a DC 16 Dexterity saving throw or have the prone condition. The ice disappears at the start of the borthak's next turn.
  - name: Webbed Feet
    desc: The borthak can move across icy surfaces without needing to make an ability check. Additionally, difficult terrain composed of ice or snow doesn't cost it extra movement.
actions:
  - name: Multiattack
    desc: The borthak makes one Bite attack or uses Noxious Regurgitation if available, and it makes two Stomp attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +12 to hit, reach 5 ft., one target. *Hit:* 16 (2d8 + 7) piercing damage plus 7 (2d6) acid damage."
  - name: Stomp
    desc: "*Melee Weapon Attack:* +12 to hit, reach 10 ft., one target. *Hit:* 11 (1d8 + 7) bludgeoning damage."
  - name: Noxious Regurgitation (Recharge 5–6)
    desc: The borthak spews acid at a creature it can see within 120 feet of itself. The target must make a DC 21 Constitution saving throw. On a failed save, the creature takes 24 (7d6) acid damage and has the poisoned condition until the start of the borthak's next turn. On a successful save, the creature takes half as much damage only.
reactions:
  - name: Reactive Tail
    desc: When a creature within 10 feet of the borthak hits the borthak with an attack roll, the borthak swings its tail in retaliation. The triggering creature and any creature within 5 feet of it must succeed on a DC 16 Dexterity saving throw or take 16 (2d8 + 7) bludgeoning damage.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the borthak can expend a use to take one of the following actions. The borthak regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Move
    desc: The borthak moves up to its speed without provoking opportunity attacks.
  - name: Bite (Costs 2 Actions)
    desc: The borthak makes one Bite attack.
```

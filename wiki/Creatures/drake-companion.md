---
title: Drake Companion
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: ""
creature_type: Dragon
size: Small
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Drake Companion
size: Small
type: dragon
alignment: Unaligned
ac_class: 14 + PB (natural armour)
hp: 5 + five times your ranger level (the drake has a number of Hit Dice [d10s] equal to your ranger level)
modifier: 1
speed: 40 ft.
stats: [ 16, 12, 15, 8, 14, 8 ]
saves:
  - name: Dexterity
    desc: +1 + PB
  - name: Wisdom
    desc: +2 + PB
damage_immunities: determined by the drake's draconic essence trait
senses: darkvision 60 ft., passive Perception 12
languages: Draconic
traits:
  - name: Draconic Essence
    desc: "When you summon the drake, choose a damage type: acid, cold, fire, lightning, or poison. The chosen type determines the drake's damage immunity and the damage of its Infused Strikes trait."
actions:
  - name: Bite
    desc: "*Melee Weapon Attack:* +3 plus PB to hit, reach 5 ft., one target. *Hit:* 1d6 plus PB piercing damage."
reactions:
  - name: Infused Strikes
    desc: When another creature within 30 feet of the drake that it can see hits a target with a weapon attack, the drake infuses the strike with its essence, causing the target to take an extra 1d6 damage of the type determined by its Draconic Essence.
```

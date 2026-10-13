---
title: Breath Drinker
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 14
creature_type: Aberration
size: Medium
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Breath Drinker
size: Medium
type: aberration
alignment: typically Chaotic Evil
ac: 18
ac_class: natural armour
hp: 157
hit_dice: 21d8 + 63
modifier: 4
speed: 0 ft., fly 60 ft. (hover)
stats: [ 5, 18, 16, 11, 15, 20 ]
saves:
  - int: 5
  - wis: 7
skillsaves:
  - perception: 7
  - stealth: 9
  - survival: 7
damage_vulnerabilities: necrotic
damage_resistances: acid; cold; fire; lightning; thunder; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison, radiant
condition_immunities: grappled, paralysed, petrified, poisoned, prone, restrained
senses: blindsight 60 ft., passive Perception 17
languages: Deep Speech, telepathy 120 ft.
cr: "14"
traits:
  - name: Incorporeal Movement
    desc: The breath drinker can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
  - name: Radiant Absorption
    desc: When the breath drinker is subjected to radiant damage, it takes no damage and instead regains a number of hit points equal to the radiant damage dealt.
actions:
  - name: Multiattack
    desc: The breath drinker makes two Enervating Claw attacks. It can also use Drink Breath.
  - name: Enervating Claw
    desc: "*Melee Weapon Attack:* +10 to hit, reach 5 ft., one creature. *Hit:* 12 (2d6 + 5) necrotic damage, and if the target is Large or smaller, it has the grappled condition (escape DC 18). The target must succeed on a DC 18 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken. This reduction lasts until the target finishes a long rest. The target dies if this effect reduces its hit point maximum to 0."
  - name: Drink Breath
    desc: The breath drinker targets a creature that has the incapacitated condition or that the breath drinker is grappling and that isn't a Construct or an Undead. The target must make a DC 18 Charisma saving throw. On a failed save, the target takes 36 (8d8) necrotic damage, and its Charisma score is reduced by 1d6. This reduction lasts until the target finishes a short or long rest. If this reduces the target's Charisma to 0, the target dies. Until the breath drinker dies, the dead target can't be returned to life by any means short of divine intervention. On a successful save, the target takes half as much necrotic damage only. On a successful or failed save, the breath drinker regains a number of hit points equal to the necrotic damage dealt.
  - name: Invisibility
    desc: The breath drinker has the invisible condition. This invisibility ends immediately after the breath drinker hits or misses with an attack roll or uses Drink Breath.
```

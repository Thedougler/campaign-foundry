---
title: Black Rose Bearer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - "Vecna: Eve of Ruin"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Black Rose Bearer
size: Medium
type: undead
alignment: typically Neutral Evil
ac: 11
ac_class: natural armour
hp: 110
hit_dice: 13d8 + 52
modifier: -2
speed: 20 ft.
stats: [ 17, 6, 18, 2, 10, 5 ]
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, poisoned
senses: darkvision 60 ft., passive Perception 10
languages: understands the languages it knew in life but can't speak
cr: "6"
traits:
  - name: Berserk
    desc: Whenever the bearer takes damage or makes a Strength or Dexterity saving throw, roll a d6. On a 5 or 6, the bearer goes berserk. On each of its turns while berserk, the bearer has advantage on melee attack rolls, it can Dash as a bonus action, and it must attack the nearest creature it can see. If no creature is near enough to move to and attack, the bearer attacks an object, with preference for an object smaller than itself. Once the bearer goes berserk, it remains berserk until it is destroyed or its creator gives it a pristine black rose.
  - name: Undead Fortitude
    desc: If damage reduces the bearer to 0 hit points, it must make a Constitution saving throw with a DC of 5 plus the damage taken, unless the damage is radiant or from a critical hit. On a successful save, the bearer drops to 1 hit point instead.
actions:
  - name: Multiattack
    desc: The bearer makes two Slam attacks.
  - name: Slam
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 12 (2d8 + 3) bludgeoning damage plus 11 (2d10) necrotic damage."
```

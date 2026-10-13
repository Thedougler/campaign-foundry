---
title: Fire Hellion
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Fiend
size: Huge
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Fire Hellion
size: Huge
type: fiend
subtype: devil
alignment: typically Lawful Evil
ac: 18
ac_class: plate
hp: 175
hit_dice: 14d12 + 84
modifier: 0
speed: 30 ft.
stats: [ 25, 10, 23, 16, 14, 21 ]
saves:
  - wis: 6
  - cha: 9
skillsaves:
  - arcana: 7
  - athletics: 11
  - perception: 6
damage_immunities: fire
condition_immunities: charmed, frightened
gear:
  - morningstar
senses: darkvision 120 ft., passive Perception 16
languages: Common, Giant, Infernal
cr: "11"
traits:
  - name: Magic Resistance
    desc: The hellion has advantage on saving throws against spells and other magical effects.
  - name: Soul Taker
    desc: A Giant or a Humanoid that is reduced to 0 hit points by the hellion dies, and its soul rises as a lemure (see the Monster Manual) on Avernus, one of the Nine Hells, in 1d4 hours. If the creature isn't revived before then, it can be restored to life only by a *wish* spell or by killing the lemure and casting true resurrection on the creature's original body.
actions:
  - name: Multiattack
    desc: The hellion makes two Morningstar attacks.
  - name: Morningstar
    desc: "*Melee Weapon Attack:* +11 to hit, reach 10 ft., one target. *Hit:* 20 (3d8 + 7) piercing damage plus 11 (2d10) fire damage. If the target is a creature, it can't regain hit points until the start of the hellion's next turn."
  - name: Infernal Orb
    desc: The hellion hurls a magical ball of fire that explodes in a 20-foot-radius sphere centred on a point the hellion can see within 120 feet of itself. The sphere spreads around corners. Each creature in that area must make a DC 17 Dexterity saving throw. A creature takes 18 (4d8) fire damage and 18 (4d8) necrotic damage on a failed save, or half as much damage on a successful one.
```

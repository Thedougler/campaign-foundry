---
title: Deadbark Dryad
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 13
creature_type: Fey
size: Medium
habitat: []
sourcebooks:
  - "Vecna: Eve of Ruin"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Deadbark Dryad
size: Medium
type: fey
alignment: typically Chaotic Evil
ac: 16
ac_class: natural armour
hp: 187
hit_dice: 22d8 + 88
modifier: 3
speed: 30 ft.
stats: [ 17, 16, 18, 11, 16, 18 ]
saves:
  - con: 9
  - cha: 9
skillsaves:
  - perception: 8
  - stealth: 8
damage_resistances: bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: poisoned
senses: darkvision 60 ft., passive Perception 18
languages: Elvish, Sylvan
cr: "13"
traits:
  - name: Bramble Walk
    desc: Difficult terrain composed of vegetation, such as foliage or thorns, doesn't cost the dryad extra movement.
  - name: Magic Resistance
    desc: The dryad has advantage on saving throws against spells and other magical effects.
  - name: Speak with Beasts and Plants
    desc: The dryad can communicate with Beasts and Plants as if they shared a language.
actions:
  - name: Multiattack
    desc: The dryad makes two Poisonous Thorn attacks and one Sapping Vine attack.
  - name: Poisonous Thorn
    desc: "*Melee or Ranged Weapon Attack:* +8 to hit, reach 5 ft. or range 120 ft., one target. *Hit:* 13 (4d4 + 3) piercing damage plus 10 (3d6) poison damage. If the target is a creature, it must succeed on a DC 17 Constitution saving throw or have the poisoned condition until the start of the dryad's next turn."
  - name: Sapping Vine
    desc: |-
      *Melee Weapon Attack:* +8 to hit, reach 30 ft., one target. *Hit:* The target has the grappled condition (escape DC 16). Until the grapple ends, the target has the restrained condition, and the dryad can't use the same vine on another target. A creature restrained in this way takes 13 (3d8) necrotic damage at the start of its turn.

      The dryad has six vines. Each vine can be attacked (AC 20; 10 hit points; immunity to poison and psychic damage). Destroying a vine deals no damage to the dryad, but any creature grappled by that vine no longer has the grappled condition. All vines immediately wither and disappear when the dryad is reduced to 0 hit points.
  - name: Spellcasting
    desc: |-
      The dryad casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 17):

      **At will:** *Druidcraft*

      **2/day each:** *Pass without Trace*, *Spike Growth*

      **1/day:** *Dispel Magic*
```

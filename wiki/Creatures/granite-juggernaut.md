---
title: Granite Juggernaut
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Construct
size: Large
habitat: []
sourcebooks:
  - "Vecna: Eve of Ruin"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Granite Juggernaut
size: Large
type: construct
alignment: Unaligned
ac: 14
ac_class: natural armour
hp: 157
hit_dice: 15d10 + 75
modifier: -5
speed: 30 ft. (in a straight line)
stats: [ 23, 1, 20, 2, 11, 3 ]
damage_immunities: poison; psychic; bludgeoning, piercing, slashing from nonmagical attacks that aren't adamantine
condition_immunities: charmed, exhaustion, frightened, paralysed, petrified, poisoned, prone
senses: blindsight 120 ft., passive Perception 10
cr: "12"
traits:
  - name: Magic Resistance
    desc: The juggernaut has advantage on saving throws against spells and other magical effects.
  - name: Siege Monster
    desc: The juggernaut deals double damage to objects and structures.
actions:
  - name: Slam
    desc: "*Melee Weapon Attack:* +10 to hit, reach 5 ft., one target. *Hit:* 11 (1d10 + 6) bludgeoning damage, and if the target is a Large or smaller creature, it must succeed on a DC 18 Strength saving throw or have the prone condition."
bonus_actions:
  - name: Devastating Roll
    desc: The juggernaut moves up to its speed. During this movement, the juggernaut can move through the spaces of creatures with the prone condition. When the juggernaut enters the space of a prone creature for the first time during this movement, the creature must make a DC 18 Dexterity saving throw, taking 55 (10d10) bludgeoning damage on a failed save or half as much damage on a successful one.
```

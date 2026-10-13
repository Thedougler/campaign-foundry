---
title: Mist Horror
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Undead
size: Large
habitat:
  - Any
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Mist Horror
size: Large
type: undead
alignment: Chaotic Evil
ac: 13
hp: 45
hit_dice: 7d10 + 7
modifier: 2
speed: 25 ft., fly 25 ft. (hover)
stats: [ 1, 15, 12, 6, 13, 16 ]
damage_resistances: bludgeoning, piercing, slashing
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, grappled, paralysed, petrified, poisoned, prone, restrained, unconscious
senses: Blindsight 120 ft., passive Perception 11
cr: "3"
traits:
  - name: Air Form
    desc: The mist horror can enter an enemy's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.
  - name: One with the Mists
    desc: While the mist horror is in fog or mist, it has the Invisible condition. The mist horror has the Incapacitated condition while it is outside an area of fog or mist.
actions:
  - name: Multiattack
    desc: The mist horror makes two Mind Rend attacks. It can replace one attack with a use of Spellcasting to cast *Command* if available.
  - name: Mind Rend
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 8 (1d10 + 3) Psychic damage."
  - name: Spellcasting
    desc: |-
      The mist horror casts one of the following spells, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 13):

      **At will:** *Fog Cloud*

      **1/day:** *Command*
bonus_actions:
  - name: Instil Dread (Recharge 4–6)
    desc: "*Wisdom Saving Throw:* DC 13, each creature in the mist horror's space. *Failure:* The target has the Frightened condition until the start of the mist horror's next turn."
```

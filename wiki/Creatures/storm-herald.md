---
title: Storm Herald
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 17
creature_type: Aberration
size: Huge
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Storm Herald
size: Huge
type: aberration
alignment: typically Lawful Evil
ac: 16
ac_class: natural armour
hp: 287
hit_dice: 23d12 + 138
modifier: 2
speed: 50 ft., swim 100 ft.
stats: [ 27, 14, 22, 24, 18, 18 ]
saves:
  - wis: 10
  - cha: 10
skillsaves:
  - arcana: 13
  - deception: 10
  - perception: 10
damage_resistances: cold, psychic
damage_immunities: lightning, thunder
condition_immunities: charmed, frightened
gear:
  - trident
senses: darkvision 120 ft., passive Perception 20
languages: Common, Giant, telepathy 120 ft.
cr: "17"
traits:
  - name: Amphibious
    desc: The herald can breathe air and water.
  - name: Magic Resistance
    desc: The herald has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The herald makes one Claw attack, one Tentacles attack, and one Trident attack.
  - name: Claw
    desc: "*Melee Weapon Attack:* +14 to hit, reach 10 ft., one target. *Hit:* 18 (3d6 + 8) slashing damage."
  - name: Tentacles
    desc: "*Melee Weapon Attack:* +14 to hit, reach 10 ft., one target. *Hit:* 21 (3d8 + 8) bludgeoning damage. If the target is a Large or smaller creature, it has the grappled condition (escape DC 18). It also has the restrained condition and takes 16 (3d10) psychic damage at the start of each of its turns until this grapple ends. The herald can have only one creature grappled this way at a time."
  - name: Trident
    desc: "*Melee Weapon Attack:* +14 to hit, reach 10 ft., one target. *Hit:* 18 (3d6 + 8) piercing damage or 21 (3d8 + 8) piercing damage if used with two hands, plus 13 (3d8) lightning damage."
  - name: Psychic Wave (Recharge 6)
    desc: |-
      The herald unleashes a blast of psionic energy into the minds of up to three creatures it can see within 90 feet of itself. Each target must make a DC 21 Intelligence saving throw. On a failed save, a target takes 23 (3d10 + 7) psychic damage and has the stunned condition for 1 minute. On a successful save, a target takes half as much damage only. An affected creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.

      If a creature is reduced to 0 hit points by this psychic damage, it dies and its head explodes if it has one.
  - name: Spellcasting (Psionics)
    desc: |-
      The herald casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 21):

      **At will:** *detect magic*, *detect thoughts*, *mage hand* (the hand is invisible)

      **1/day each:** *control water*, *control weather* (as an action), *sending*
```

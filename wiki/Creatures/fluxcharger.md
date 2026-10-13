---
title: Fluxcharger
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Elemental
size: Large
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Fluxcharger
size: Large
type: elemental
alignment: Chaotic Neutral
ac: 16
ac_class: natural armour
hp: 60
hit_dice: 8d10 + 16
modifier: 4
speed: 0 ft., fly 60 ft.
stats: [ 15, 18, 15, 6, 10, 7 ]
damage_resistances: thunder; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: lightning, poison
condition_immunities: exhaustion, grappled, paralysed, petrified, poisoned, prone, restrained, unconscious
senses: darkvision 60 ft., passive Perception 10
languages: Draconic
cr: "7"
traits:
  - name: Amplify Lightning
    desc: Whenever a spell that deals lightning damage includes one or more fluxchargers in its area, the spell deals an extra 9 (2d8) lightning damage.
actions:
  - name: Multiattack
    desc: The fluxcharger makes two slam attacks or uses Arc Lightning twice.
  - name: Slam
    desc: "*Melee Weapon Attack:* +7 to hit, reach 10 ft., one target. *Hit:* 13 (2d8 + 4) bludgeoning damage plus 10 (3d6) fire damage."
  - name: Arc Lightning
    desc: "*Ranged Spell Attack:* +7 to hit, range 30 ft., one target. *Hit:* 16 (3d10) lightning damage, and lightning jumps from the target to one creature of the fluxcharger's choice that it can see within 30 feet of the target. That second creature must succeed on a DC 15 Dexterity saving throw or take 13 (3d8) lightning damage. *Hit or Miss:* The fluxcharger takes 5 (1d10) force damage after resolving the attack."
```

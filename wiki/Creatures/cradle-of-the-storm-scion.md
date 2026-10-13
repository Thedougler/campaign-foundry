---
title: Cradle of the Storm Scion
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 27
creature_type: Elemental
size: Gargantuan
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Cradle of the Storm Scion
size: Gargantuan
type: elemental
alignment: typically Chaotic Good
ac: 19
ac_class: natural armour
hp: 682
hit_dice: 35d20 + 315
modifier: 2
speed: 40 ft., fly 60 ft. (hover), swim 60 ft.
stats: [ 30, 14, 29, 16, 23, 18 ]
damage_resistances: cold; fire; thunder; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: lightning, poison
condition_immunities: exhaustion, grappled, paralysed, petrified, poisoned, prone, restrained, stunned
senses: passive Perception 16
languages: Giant, Primordial
cr: "27"
traits:
  - name: Awakening of the Scion
    desc: The cradle is a container for the scion of Stronmaus. When the cradle drops to 0 hit points, its body bursts into light. The scion instantly appears in the space the cradle occupied and uses the cradle's initiative count.
  - name: Legendary Resistance (5/Day)
    desc: If the cradle fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The cradle has advantage on saving throws against spells and other magical effects.
  - name: Siege Monster
    desc: The cradle deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The cradle makes three Slam or Spit Hailstone attacks in any combination.
  - name: Slam
    desc: "*Melee Weapon Attack:* +18 to hit, reach 20 ft., one target. *Hit:* 36 (4d12 + 10) bludgeoning damage plus 19 (3d12) lightning damage."
  - name: Spit Hailstone
    desc: "*Ranged Weapon Attack:* +18 to hit, range 120 ft., one target. *Hit:* 32 (4d10 + 10) bludgeoning damage plus 14 (4d6) cold damage, and the target must succeed on a DC 26 Strength saving throw or have the prone condition."
  - name: Lightning Barrage (Recharge 5–6)
    desc: The cradle hurls multiple magical lightning bolts at up to two creatures it can see within 500 feet of itself. Each target must make a DC 22 Dexterity saving throw. On a failed save, the target takes 71 (11d12) lightning damage and has the stunned condition until the end of its next turn. On a successful save, the target takes half as much damage only.
reactions:
  - name: Booming Step
    desc: Immediately after taking damage, the cradle cracks with thunder and then magically teleports up to 60 feet to an unoccupied space it can see. Each creature within 10 feet of the space the cradle left must make a DC 22 Constitution saving throw, taking 14 (4d6) thunder damage on a failed save, or half as much damage on a successful one.
```

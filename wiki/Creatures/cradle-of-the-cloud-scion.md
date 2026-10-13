---
title: Cradle of the Cloud Scion
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 26
creature_type: Elemental
size: Gargantuan
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Cradle of the Cloud Scion
size: Gargantuan
type: elemental
alignment: typically Chaotic Neutral
ac: 19
ac_class: natural armour
hp: 624
hit_dice: 32d20 + 288
modifier: 5
speed: 0 ft., fly 90 ft. (hover)
stats: [ 29, 21, 28, 14, 22, 19 ]
saves:
  - int: 10
  - cha: 12
damage_resistances: cold; fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison, thunder
condition_immunities: exhaustion, grappled, paralysed, petrified, poisoned, prone, restrained, stunned
senses: passive Perception 16
languages: Giant, Primordial
cr: "26"
traits:
  - name: Awakening of the Scion
    desc: The cradle is a container for the scion of Memnor. When the cradle drops to 0 hit points, its body dissipates into cloud wisps. The scion instantly appears in the space the cradle occupied and uses the cradle's initiative count.
  - name: Flyby
    desc: The cradle doesn't provoke opportunity attacks when it flies out of an enemy's reach.
  - name: Legendary Resistance (5/Day)
    desc: If the cradle fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The cradle has advantage on saving throws against spells and other magical effects.
  - name: Siege Monster
    desc: The cradle deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The cradle makes three Slam or Wind Javelin attacks in any combination.
  - name: Slam
    desc: "*Melee Weapon Attack:* +17 to hit, reach 20 ft., one target. *Hit:* 31 (4d10 + 9) bludgeoning damage plus 19 (3d12) thunder damage."
  - name: Wind Javelin
    desc: "*Ranged Weapon Attack:* +17 to hit, range 120 ft., one target. *Hit:* 27 (4d8 + 9) bludgeoning damage plus 10 (3d6) thunder damage, and the target must succeed on a DC 25 Strength saving throw or have the prone condition."
  - name: Vortex (Recharge 5–6)
    desc: |-
      The cradle conjures a vortex of wind at a point it can see within 90 feet of itself. The wind vortex is a 30-foot-radius, 100-foot-high cylinder centred on that point. Each creature other than the cradle in that area must make a DC 25 Dexterity saving throw. On a failed save, a creature takes 71 (11d12) bludgeoning damage and has the restrained condition within the vortex. On a successful save, a creature takes half as much damage and is pushed to the nearest unoccupied space outside the cylinder. The vortex lasts until the start of the cradle's next turn. A creature with the restrained condition falls prone when the vortex ends.

      A creature with the restrained condition can use its action to try to escape the vortex. The creature makes a DC 19 Strength (Athletics) or Dexterity (Acrobatics) check. On a successful check, the creature escapes and moves 3d6 × 10 feet away from the vortex in a random direction.
reactions:
  - name: Thunderclap
    desc: Immediately after taking damage, the cradle unleashes a thunderclap in a 30-foot-radius sphere centred on itself. All other creatures in that area must succeed on a DC 25 Constitution saving throw or take 18 (4d8) thunder damage and have the deafened condition for 1 minute.
```

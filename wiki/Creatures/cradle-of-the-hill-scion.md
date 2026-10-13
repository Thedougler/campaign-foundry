---
title: Cradle of the Hill Scion
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 22
creature_type: Elemental
size: Gargantuan
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Cradle of the Hill Scion
size: Gargantuan
type: elemental
alignment: typically Chaotic Evil
ac: 19
ac_class: natural armour
hp: 402
hit_dice: 23d20 + 161
modifier: 0
speed: 40 ft.
stats: [ 25, 10, 24, 9, 16, 10 ]
saves:
  - wis: 10
  - cha: 7
damage_resistances: cold; fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: exhaustion, paralysed, petrified, poisoned, prone
senses: passive Perception 13
languages: Giant, Primordial
cr: "22"
traits:
  - name: Awakening of the Scion
    desc: The cradle is a container for the scion of Grolantor. When the cradle drops to 0 hit points, its body crumbles to dirt and moss. The scion instantly appears in the space the cradle occupied and uses the cradle's initiative count.
  - name: Legendary Resistance (5/Day)
    desc: If the cradle fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The cradle has advantage on saving throws against spells and other magical effects.
  - name: Siege Monster
    desc: The cradle deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: The cradle makes three Slam or Spit Rock attacks in any combination and one Grasping Root attack.
  - name: Slam
    desc: "*Melee Weapon Attack:* +14 to hit, reach 20 ft., one target. *Hit:* 33 (4d12 + 7) bludgeoning damage."
  - name: Spit Rock
    desc: "*Ranged Weapon Attack:* +14 to hit, range 120 ft., one target. *Hit:* 25 (4d8 + 7) bludgeoning damage, and the target must succeed on a DC 22 Strength saving throw or have the prone condition."
  - name: Grasping Root
    desc: "*Melee Weapon Attack:* +14 to hit, reach 30 ft., one creature not grappled by the cradle. *Hit:* the target has the grappled condition (escape DC 17). Until the grapple ends, the target takes 29 (4d10 + 7) bludgeoning damage at the start of each of its turns. The root has AC 19 and can be severed by dealing 15 or more slashing damage to it on one attack. Cutting the root doesn't hurt the cradle but ends the grapple."
  - name: Rolling Hills (Recharge 6)
    desc: |-
      The cradle magically creates a wave of dirt that extends from a point on the ground within 120 feet of itself. The wave is up to 30 feet long, up to 30 feet tall, and up to 30 feet wide. Each creature in the wave must make a DC 22 Strength saving throw. On a failed save, a creature takes 58 (9d12) bludgeoning damage, has the prone condition, and is buried under dirt. On a successful save, a creature takes half as much damage only.

      A buried creature has the restrained condition, has total cover, and can't breathe. As an action, a creature buried in this way, or another creature within 5 feet of it that isn't buried, can make a DC 17 Strength (Athletics) check. On a successful check, the buried creature no longer has the prone or restrained conditions.
```

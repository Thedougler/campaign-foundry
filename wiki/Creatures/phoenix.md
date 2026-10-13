---
title: Phoenix
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 16
creature_type: Elemental
size: Gargantuan
habitat:
  - Desert
  - Mountain
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Phoenix
size: Gargantuan
type: elemental
alignment: Typically Neutral
ac: 18
hp: 175
hit_dice: 10d20 + 70
modifier: 8
speed: 20 ft., fly 120 ft.
stats: [ 19, 26, 25, 2, 21, 18 ]
saves:
  - wis: 10
  - cha: 9
damage_resistances: bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: fire, poison
condition_immunities: exhaustion, grappled, paralysed, petrified, poisoned, prone, restrained, stunned
senses: darkvision 60 ft., passive Perception 15
cr: "16"
traits:
  - name: Fiery Death and Rebirth
    desc: |-
      If the phoenix dies, it explodes. Each creature in 60-foot-radius sphere centred on the phoenix must make a DC 20 Dexterity saving throw, taking 22 (4d10) fire damage on a failed save, or half as much damage on a successful one. The fire ignites flammable objects in the area that aren't being worn or carried.

      The explosion destroys the phoenix's body and leaves behind an egg-shaped cinder, which weighs 5 pounds. The cinder deals 21 (6d6) fire damage to any creature that touches it, though no more than once per round. The cinder is immune to all damage, and after 1d6 days, it hatches a new phoenix.
  - name: Fire Form
    desc: |-
      The phoenix can move through a space as narrow as 1 inch wide without squeezing.

      Any creature that touches the phoenix or hits it with a melee attack while within 5 feet of it takes 5 (1d10) fire damage. In addition, the phoenix can enter a hostile creature's space and stop there. The first time it enters a creature's space on a turn, that creature takes 5 (1d10) fire damage.

      With a touch, the phoenix can also ignite flammable objects that aren't worn or carried (no action required).
  - name: Flyby
    desc: The phoenix doesn't provoke opportunity attacks when it flies out of an enemy's reach.
  - name: Illumination
    desc: The phoenix sheds bright light in a 60-foot radius and dim light for an additional 30 feet.
  - name: Legendary Resistance (3/Day)
    desc: If the phoenix fails a saving throw, it can choose to succeed instead.
  - name: Siege Monster
    desc: The phoenix deals double damage to objects and structures.
actions:
  - name: Multiattack
    desc: "The phoenix makes two attacks: one Beak attack and one Fiery Talons attack."
  - name: Beak
    desc: "*Melee Weapon Attack:* +13 to hit, reach 15 ft., one target. *Hit:* 15 (2d6 + 8) fire damage."
  - name: Fiery Talons
    desc: "*Melee Weapon Attack:* +13 to hit, reach 15 ft., one target. *Hit:* 17 (2d8 + 8) fire damage."
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the phoenix can expend a use to take one of the following actions. The phoenix regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Move
    desc: The phoenix moves up to its speed.
  - name: Peck
    desc: The phoenix makes one beak attack.
  - name: Swoop (Costs 2 Actions)
    desc: The phoenix moves up to its speed and makes one Fiery Talons attack.
```

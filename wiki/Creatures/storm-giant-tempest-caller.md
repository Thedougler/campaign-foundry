---
title: Storm Giant Tempest Caller
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 20
creature_type: Giant
size: Huge
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Storm Giant Tempest Caller
size: Huge
type: giant
subtype: sorcerer
alignment: Any alignment
ac: 17
ac_class: natural armour
hp: 310
hit_dice: 27d12 + 135
modifier: 2
speed: 50 ft., fly 50 ft. (hover), swim 50 ft.
stats: [ 29, 14, 20, 21, 18, 25 ]
saves:
  - str: 15
  - con: 11
  - wis: 10
  - cha: 13
skillsaves:
  - arcana: 17
  - athletics: 15
  - perception: 10
damage_resistances: cold
damage_immunities: lightning, thunder
senses: truesight 120 ft., passive Perception 20
languages: Common, Giant, Primordial
cr: "20"
traits:
  - name: Alert
    desc: The giant can't be surprised, and it has advantage on initiative rolls.
  - name: Amphibious
    desc: The giant can breathe air and water.
  - name: Legendary Resistance (3/Day)
    desc: If the giant fails a saving throw, it can choose to succeed instead.
  - name: Scrying (Requires Storm Rune)
    desc: The giant can use its crystal ball to cast the *scrying* spell (save DC 17).
  - name: Storm Rune
    desc: |-
      The giant has a storm rune inscribed on a crystal ball. While the object bearing the rune is embedded in its body, the giant can use its Tempest Call action and its Scrying trait.

      The object bearing the storm rune has AC 17; 50 hit points; and immunity to necrotic, poison, and psychic damage. The object regains all its hit points at the end of every turn, but it turns to dust if reduced to 0 hit points or when the giant dies. If the rune is destroyed, the giant can inscribe a storm rune on another crystal ball in its possession when it finishes a short or long rest.
actions:
  - name: Multiattack
    desc: The giant makes three Lightning Blade or Lightning Lance attacks.
  - name: Lightning Blade
    desc: "*Melee Weapon Attack:* +15 to hit, reach 10 ft., one target. *Hit:* 22 (3d8 + 9) slashing damage plus 16 (3d10) lightning damage."
  - name: Lightning Lance
    desc: "*Ranged Spell Attack:* +13 to hit, range 500 ft., one target. *Hit:* 39 (5d12 + 7) lightning damage."
  - name: Tempest Call (Requires Storm Rune)
    desc: "The giant creates an elemental vortex that fills a 60-foot-radius sphere centred on itself. Each creature in that area other than the giant must make a DC 21 Dexterity saving throw. On a failed save, a creature takes 43 (8d8 + 7) damage of a type of the giant's choosing: cold, lightning, or thunder. On a successful save, a creature takes half as much damage."
  - name: Spellcasting
    desc: |-
      The giant casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 21, +13 to hit with spell attacks):

      **At will:** *detect magic*, *detect thoughts*

      **1/day each:** *control water*, *control weather* (as an action), *dispel magic*, *plane shift*, *sending*, *time stop*
```

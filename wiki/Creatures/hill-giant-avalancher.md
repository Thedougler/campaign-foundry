---
title: Hill Giant Avalancher
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Giant
size: Huge
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Hill Giant Avalancher
size: Huge
type: giant
subtype: druid
alignment: Any alignment
ac: 15
ac_class: natural armour
hp: 220
hit_dice: 21d12 + 84
modifier: -1
speed: 40 ft.
stats: [ 21, 8, 19, 9, 18, 10 ]
saves:
  - str: 9
  - con: 8
  - wis: 8
skillsaves:
  - nature: 7
  - perception: 8
gear:
  - greatclub
senses: passive Perception 18
languages: Common, Giant
cr: "12"
traits:
  - name: Hill Rune
    desc: |-
      The giant has a hill rune inscribed on a rock or some other object in its possession. While holding or wearing the object bearing the rune, the giant can use its Stone Avalanche action and Hill Rebuff reaction.

      The object bearing the rune has AC 15; 20 hit points; and immunity to necrotic, poison, and psychic damage. The object regains all its hit points at the end of every turn, but it turns to dust if reduced to 0 hit points or when the giant dies. If the rune is destroyed, the giant can inscribe a hill rune on an object in its possession when it finishes a short or long rest.
  - name: Legendary Resistance (3/Day)
    desc: If the giant fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The giant makes one Greatclub attack and uses Stone Bolas.
  - name: Greatclub
    desc: "*Melee Weapon Attack:* +9 to hit, reach 10 ft., one target. *Hit:* 18 (3d8 + 5) bludgeoning damage plus 9 (2d8) thunder damage."
  - name: Stone Bolas
    desc: The giant conjures three stone balls connected by lines of magical force and throws them at one creature it can see within 60 feet of itself. The target must make a DC 16 Dexterity saving throw. On a failed save, the target has the restrained condition until the start of the giant's next turn, and the stones erupt in a burst of thunderous energy that deals 14 (4d6) thunder damage to the target and each creature within 10 feet of the target. On a successful save, the stones vanish without erupting.
  - name: Stone Avalanche (Requires Hill Rune)
    desc: |-
      The giant conjures a hail of rocks in a 20-foot-radius, 40-foot-high cylinder centred on a point on the ground it can see within 120 feet of itself. Each creature in that area must make a DC 16 Dexterity saving throw. On a failed save, a creature takes 28 (8d6) bludgeoning damage and has the prone condition. On a successful save, a creature takes half as much damage only.

      The rocks turn the ground in that area into difficult terrain until the start of the giant's next turn, when the rocks vanish.
  - name: Spellcasting
    desc: |-
      The giant casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 16):

      **At will:** *druidcraft*, *guidance*

      **1/day each:** *stone shape*, *wall of stone*
reactions:
  - name: Hill Rebuff (Requires Hill Rune)
    desc: Immediately after the giant takes damage from a creature it can see within 10 feet of itself, that creature must succeed on a DC 16 Constitution saving throw or take 10 (3d6) force damage and be pushed horizontally 10 feet away from the giant.
```

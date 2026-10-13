---
title: Frost Giant Ice Shaper
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 17
creature_type: Giant
size: Huge
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Frost Giant Ice Shaper
size: Huge
type: giant
subtype: cleric
alignment: Any alignment
ac: 16
ac_class: chain mail
hp: 310
hit_dice: 27d12 + 135
modifier: 0
speed: 40 ft.
stats: [ 23, 10, 21, 11, 19, 16 ]
saves:
  - str: 12
  - con: 11
  - wis: 10
  - cha: 9
skillsaves:
  - athletics: 12
  - perception: 10
damage_immunities: cold
gear:
  - greataxe
senses: passive Perception 20
languages: Common, Giant
cr: "17"
traits:
  - name: Frost Rune
    desc: |-
      The giant has a frost rune inscribed on a chunk of ice or some other object in its possession. While holding or wearing the object bearing the rune, the giant can use its Ice Wolves action and Ice Armour reaction.

      The object bearing the rune has AC 16; 40 hit points; and immunity to necrotic, poison, and psychic damage. The object regains all its hit points at the end of every turn, but it turns to dust if reduced to 0 hit points or when the giant dies. If the rune is destroyed, the giant can inscribe a frost rune on an object in its possession when it finishes a short or long rest.
  - name: Legendary Resistance (3/Day)
    desc: If the giant fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The giant makes three attacks using Greataxe, Freezing Ray, or a combination of them.
  - name: Greataxe
    desc: "*Melee Weapon Attack:* +12 to hit, reach 10 ft., one target. *Hit:* 22 (3d10 + 6) slashing damage plus 9 (2d8) cold damage."
  - name: Freezing Ray
    desc: "*Ranged Spell Attack:* +10 to hit, range 120 ft., one target. *Hit:* 17 (3d8 + 4) cold damage, and the target must make a DC 18 Constitution saving throw. On a failed save, the target has the restrained condition until the end of its next turn. On a successful save, the target's speed is reduced by 10 feet until the end of its next turn."
  - name: Ice Wolves (Requires Frost Rune)
    desc: The giant magically summons 1d4 wolves made of ice (use the winter wolf stat block in the Monster Manual to represent them, but they are Elementals instead of Monstrosities). The wolves appear in unoccupied spaces the giant can see within 30 feet of itself. The wolves take their turn immediately after the giant on the same initiative count, and they obey the giant's commands. The wolves gain a +6 bonus to their attack and damage rolls while they are within 30 feet of the giant. The wolves disappear after 1 minute, when the giant dies, or when the giant uses this action again.
reactions:
  - name: Ice Armour (Requires Frost Rune)
    desc: When a creature the giant can see makes an attack roll against it, the giant can form a coat of ice around itself, granting it a +6 bonus to its AC against that attack. After the attack hits or misses, the ice shatters, and each creature within 5 feet of the giant must succeed on a DC 18 Dexterity saving throw or take 13 (3d8) cold damage.
```

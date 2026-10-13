---
title: Zodar
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 16
creature_type: Aberration
size: Medium
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Zodar
size: Medium
type: aberration
alignment: typically Neutral
ac: 20
ac_class: natural armour
hp: 200
hit_dice: 16d8 + 128
modifier: 0
speed: 30 ft., fly 30 ft. (hover)
stats: [ 30, 10, 26, 12, 15, 18 ]
saves:
  - con: 13
  - int: 6
  - wis: 7
  - cha: 9
damage_immunities: acid, fire, poison
condition_immunities: blinded, charmed, deafened, exhaustion, frightened, petrified, poisoned
senses: blindsight 120 ft. (blind beyond this radius), passive Perception 12
languages: see Disembodied Voice below
cr: "16"
traits:
  - name: Disembodied Voice
    desc: Up to three times in its life, the zodar can cause a message of up to twenty-five words to issue from the air around it. It speaks only when it has something profoundly important to say, and the message can be understood by any creature that has an Intelligence score of 2 or higher.
  - name: Legendary Resistance (3/Day)
    desc: If the zodar fails a saving throw, it can choose to succeed instead.
  - name: Transport Inhibitor
    desc: The zodar can't be teleported or sent to any plane of existence against its will.
  - name: Unusual Nature
    desc: The zodar doesn't require air, food, drink, or sleep.
actions:
  - name: Multiattack
    desc: The zodar makes two Crushing Fist attacks. Before or after these attacks, the zodar uses Forced Teleport.
  - name: Crushing Fist
    desc: "*Melee Weapon Attack:* +15 to hit, reach 5 ft., one target. *Hit:* 21 (2d10 + 10) force damage."
  - name: Forced Teleport
    desc: The zodar magically warps space around one creature it can see within 60 feet of itself. The target must make a DC 21 Constitution saving throw. On a failed save, the target takes 22 (4d10) force damage, and the zodar teleports it, along with any equipment it's wearing or carrying, up to 60 feet to an unoccupied space that the zodar can see and that can support the target. On a successful save, the target takes half as much damage and isn't teleported.
  - name: Wish
    desc: |
      The zodar casts the *wish* spell, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17). After casting this spell, the zodar turns to dust and is destroyed.
```

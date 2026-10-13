---
title: Amnizu
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 18
creature_type: Fiend
size: Medium
habitat: []
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Amnizu
size: Medium
type: fiend
subtype: devil
alignment: Typically Lawful Evil
ac: 21
ac_class: natural armour
hp: 202
hit_dice: 27d8 + 81
modifier: 1
speed: 30 ft., fly 40 ft.
stats: [ 11, 13, 16, 20, 12, 18 ]
saves:
  - dex: 7
  - con: 9
  - wis: 7
  - cha: 10
skillsaves:
  - perception: 7
damage_resistances: cold; bludgeoning, piercing, slashing from nonmagical attacks that aren't silvered
damage_immunities: fire, poison
condition_immunities: charmed, poisoned
senses: darkvision 120 ft., passive Perception 17
languages: Common, Infernal, telepathy 1,000 ft.
cr: "18"
traits:
  - name: Devil's Sight
    desc: Magical darkness doesn't impede the amnizu's darkvision.
  - name: Magic Resistance
    desc: The amnizu has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The amnizu uses Blinding Rot or Forgetfulness, if available. It also makes two Taskmaster Whip attacks.
  - name: Taskmaster Whip
    desc: "*Melee Weapon Attack:* +11 to hit, reach 10 ft., one target. *Hit:* 9 (1d8 + 5) slashing damage plus 16 (3d10) force damage."
  - name: Blinding Rot
    desc: The amnizu targets one or two creatures that it can see within 60 feet of it. Each target must succeed on a DC 19 Wisdom saving throw or take 26 (4d12) necrotic damage and be blinded until the start of the amnizu's next turn.
  - name: Forgetfulness (Recharge 6)
    desc: The amnizu targets one creature it can see within 60 feet of it. That creature must succeed on a DC 18 Intelligence saving throw or take 26 (4d12) psychic damage and become stunned for 1 minute. A stunned creature repeats the saving throw at the end of each of its turns, ending the effect on itself on a success. If the target is stunned for the full minute, it forgets everything it sensed, experienced, and learned during the last 5 hours.
  - name: Spellcasting
    desc: |-
      The amnizu casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 19):

      **At will:** *command*

      **3/day:** *dominate monster*

      **1/day:** *feeblemind*
reactions:
  - name: Instinctive Charm
    desc: When a creature within 60 feet of the amnizu makes an attack roll against it, and another creature is within the attack's range, the attacker must make a DC 19 Wisdom saving throw. On a failed save, the attacker must target the creature that is closest to it, not including the amnizu or itself. If multiple creatures are closest, the attacker chooses which one to target. If the saving throw is successful, the attacker is immune to the amnizu's Instinctive Charm for 24 hours.
```

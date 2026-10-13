---
title: Master of Cruelties
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Fiend
size: Large
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Master of Cruelties
size: Large
type: fiend
subtype: demon
alignment: Chaotic Evil
ac: 18
ac_class: plate armour
hp: 127
hit_dice: 15d10 + 45
modifier: 3
speed: 30 ft.
stats: [ 18, 17, 16, 19, 16, 21 ]
saves:
  - con: 7
  - int: 8
  - wis: 7
  - cha: 9
skillsaves:
  - deception: 9
  - intimidation: 9
  - performance: 9
  - persuasion: 9
damage_resistances: cold; fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: poisoned
gear:
  - spear
senses: truesight 120 ft., passive Perception 13
languages: Abyssal, Common, telepathy 120 ft.
cr: "9"
traits:
  - name: Innate Spellcasting
    desc: |-
      The master's innate spellcasting ability is Charisma (spell save DC 17). The master can innately cast the following spells, requiring no material components:

      **At will:** *charm person* (as a 3rd-level spell), crown of madness

      **1/day:** *dominate person*
  - name: Aura of Blood Lust
    desc: When any other creature starts its turn within 30 feet of the master, that creature must succeed on a DC 17 Wisdom saving throw, or it must immediately take the Attack action, making one melee attack against a random creature within reach. If no creatures are within reach, it makes a ranged attack against a random creature within range, throwing its weapon if necessary.
  - name: Feed on the Crowd
    desc: Whenever a creature within 60 feet of the master dies, the master gains 15 temporary hit points and has advantage on all attack rolls, ability checks, and saving throws until the end of its next turn.
  - name: Magic Resistance
    desc: The master has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The master makes two melee attacks with its spear.
  - name: Spear
    desc: "*Melee or Ranged Weapon Attack:* +8 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 11 (2d6 + 4) piercing damage, or 13 (2d8 + 4) piercing damage if used with two hands to make a melee attack, plus 13 (3d8) psychic damage."
  - name: Captivating Presence (Recharge 6)
    desc: Each creature within 120 feet of the master must succeed on a DC 17 Wisdom saving throw or be charmed by the master for 1 hour. While charmed in this way, a creature's speed is 0. If the charmed creature takes damage, it can repeat the saving throw, ending the effect on itself on a success. A target that succeeds on the saving throw is immune to the Captivating Presence of all masters of cruelties for the next 24 hours.
```

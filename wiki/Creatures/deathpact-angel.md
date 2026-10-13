---
title: Deathpact Angel
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 14
creature_type: Celestial
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Deathpact Angel
size: Medium
type: celestial
alignment: Lawful Evil
ac: 18
ac_class: natural armour
hp: 175
hit_dice: 27d8 + 54
modifier: 4
speed: 30 ft., fly 90 ft.
stats: [ 16, 18, 14, 19, 20, 23 ]
saves:
  - int: 9
  - wis: 10
  - cha: 11
skillsaves:
  - insight: 10
  - intimidation: 11
  - perception: 10
  - persuasion: 11
damage_resistances: necrotic; radiant; bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: charmed, exhaustion, frightened
senses: truesight 120 ft., passive Perception 20
languages: all
cr: "14"
traits:
  - name: Innate Spellcasting
    desc: |-
      The angel's innate spellcasting ability is Charisma (spell save DC 19, +11 to hit with spell attacks). The angel can innately cast the following spells, requiring no material components:

      **At will:** *command* (as a 2nd-level spell), *detect evil and good*

      **3/day each:** *charm person* (as a 5th-level spell), *darkness*, *suggestion*

      **1/day:** *raise dead*
  - name: Exploitation of the Debtors
    desc: As a bonus action, the angel targets a creature charmed by it that it can see within 30 feet of it. The angel deals 11 (2d10) necrotic damage to the target, and the angel gains temporary hit points equal to the damage dealt.
  - name: Flyby
    desc: The angel doesn't provoke an opportunity attack when it flies out of an enemy's reach.
  - name: Magic Resistance
    desc: The angel has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The angel makes two attacks with its scythe. It can substitute Chains of Obligation for one of these attacks.
  - name: Scythe
    desc: "*Melee Weapon Attack:* +9 to hit, reach 10 ft., one target. *Hit:* 9 (2d4 + 4) slashing damage plus 27 (6d8) necrotic damage."
  - name: Chains of Obligation
    desc: The angel targets one creature charmed by it that it can see within 90 feet of it. The target must succeed on a DC 19 Charisma saving throw or become paralysed for 1 minute or until it takes any damage.
```

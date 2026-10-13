---
title: Sahuagin Warlock of Uk'otoa
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Explorer's Guide to Wildemount
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Sahuagin Warlock of Uk'otoa
size: Medium
type: humanoid
subtype: sahuagin
alignment: Neutral Evil
ac: 14
ac_class: natural armour
hp: 22
hit_dice: 5d8
modifier: 0
speed: 30 ft., swim 40 ft.
stats: [ 14, 10, 11, 8, 8, 16 ]
skillsaves:
  - arcana: 1
  - persuasion: 5
senses: darkvision 120 ft., passive Perception 9
languages: Common, Sahuagin
cr: "3"
traits:
  - name: Innate Spellcasting
    desc: |-
      The warlock's innate spellcasting ability is Charisma (spell save DC 13, +5 to hit with spell attacks). It can innately cast the following spells, requiring no material components:

      **At will:** *eldritch blast* (see "Actions" below), *minor illusion*

      **1/day each:** armour of Agathys, arms of Hadar, *counterspell*, crown of madness, *invisibility*, hunger of Hadar
  - name: Blood Frenzy
    desc: The warlock has advantage on melee attack rolls against any creature that doesn't have all its hit points.
  - name: Limited Amphibiousness
    desc: The warlock can breathe air and water, but it needs to be submerged at least once every 4 hours to avoid suffocating.
  - name: Shark Telepathy
    desc: The warlock can magically command any shark within 120 feet of it, using a limited telepathy.
actions:
  - name: Multiattack
    desc: "The warlock makes two attacks: one with its bite and one with its Sword of Fathoms."
  - name: Bite
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one creature. *Hit:* 4 (1d4 + 2) piercing damage."
  - name: Sword of Fathoms
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 7 (1d10 + 2) slashing damage, and if the target is a creature, it must succeed on a DC 13 Constitution saving throw or begin choking. The choking creature is incapacitated until the end of its next turn, when the effect ends on it."
  - name: Eldritch Blast (Cantrip)
    desc: "*Ranged Spell Attack:* +5 to hit, range 120 ft., one creature. *Hit:* 5 (1d10) force damage."
```

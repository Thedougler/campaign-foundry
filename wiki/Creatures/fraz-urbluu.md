---
title: Fraz-Urb'luu
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 23
creature_type: Fiend
size: Large
habitat: []
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Fraz-Urb'luu
size: Large
type: fiend
subtype: demon
alignment: Chaotic Evil
ac: 18
ac_class: natural armour
hp: 337
hit_dice: 27d10 + 189
modifier: 1
speed: 40 ft., fly 40 ft.
stats: [ 29, 12, 25, 26, 24, 26 ]
saves:
  - dex: 8
  - con: 14
  - int: 15
  - wis: 14
skillsaves:
  - deception: 15
  - perception: 14
  - stealth: 8
damage_resistances: cold, fire, lightning
damage_immunities: poison; bludgeoning, piercing, slashing that is nonmagical
condition_immunities: charmed, exhaustion, frightened, poisoned
senses: truesight 120 ft., passive Perception 24
languages: all, telepathy 120 ft.
cr: "23"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If Fraz-Urb'luu fails a saving throw, he can choose to succeed instead.
  - name: Magic Resistance
    desc: Fraz-Urb'luu has advantage on saving throws against spells and other magical effects.
  - name: Undetectable
    desc: Fraz-Urb'luu can't be targeted by divination magic, perceived through magical scrying sensors, or detected by abilities that sense demons or Fiends.
actions:
  - name: Multiattack
    desc: Fraz-Urb'luu makes one Bite attack and two Fist attacks, and he uses Phantasmal Terror.
  - name: Bite
    desc: "*Melee Weapon Attack:* +16 to hit, reach 10 ft., one target. *Hit:* 19 (3d6 + 9) force damage."
  - name: Fist
    desc: "*Melee Weapon Attack:* +16 to hit, reach 10 ft., one target. *Hit:* 22 (3d8 + 9) force damage."
  - name: Phantasmal Terror
    desc: Fraz-Urb'luu targets one creature he can see within 120 feet of him. The target must succeed on a DC 23 Wisdom saving throw, or it takes 16 (3d10) psychic damage and is frightened of Fraz-Urb'luu until the end of its next turn.
  - name: Spellcasting
    desc: |-
      Fraz-Urb'luu casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 23):

      **At will:** *alter self* (can become Medium when changing his appearance), *detect magic*, *dispel magic*, *phantasmal force*

      **3/day each:** *mislead*, *programmed illusion*, *seeming*

      **1/day each:** *modify memory*, *project image*
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Fraz-Urb'luu can expend a use to take one of the following actions. Fraz-Urb'luu regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Tail
    desc: "*Melee Weapon Attack:* +16 to hit, reach 15 ft., one target. *Hit:* 20 (2d10 + 9) force damage. If the target is a Large or smaller creature, it is also grappled (escape DC 24), and it is restrained until the grapple ends. Fraz-Urb'luu can grapple only one creature with his tail at a time."
  - name: Terror (Costs 2 Actions)
    desc: Fraz-Urb'luu uses Phantasmal Terror.
```

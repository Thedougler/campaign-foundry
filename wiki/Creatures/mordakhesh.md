---
title: Mordakhesh
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Fiend
size: Medium
habitat: []
sourcebooks:
  - "Eberron: Rising from the Last War"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Mordakhesh
size: Medium
type: fiend
alignment: Lawful Evil
ac: 18
ac_class: plate armour
hp: 170
hit_dice: 20d8 + 80
modifier: 3
speed: 40 ft.
stats: [ 20, 16, 18, 15, 17, 20 ]
saves:
  - str: 10
  - con: 9
  - wis: 8
  - cha: 10
skillsaves:
  - athletics: 10
  - insight: 8
  - perception: 8
  - persuasion: 10
damage_vulnerabilities: piercing from magic weapons wielded by good creatures
damage_resistances: bludgeoning, piercing, slashing from nonmagical attacks that aren't silvered
gear:
  - greatsword
senses: darkvision 60 ft., passive Perception 18
languages: Common, Infernal
cr: "15"
traits:
  - name: Innate Spellcasting
    desc: |-
      Mordakhesh's spellcasting ability is Charisma (spell save DC 18, +10 to hit with spell attacks). Mordakhesh can innately cast the following spells, requiring no material components:

      **At will:** *chromatic orb* (see "Actions" below), *detect thoughts*, *disguise self*

      **1/day each:** banishing smite, destructive wave, *fly*, *mass suggestion*, staggering smite, *suggestion*, *true seeing*
  - name: Limited Magic Immunity
    desc: Mordakhesh can't be affected or detected by spells of 6th level or lower unless he wishes to be. Mordakhesh has advantage on saving throws against all other spells and magical effects.
actions:
  - name: Multiattack
    desc: Mordakhesh makes three greatsword attacks.
  - name: Greatsword
    desc: "*Melee Weapon Attack:* +10 to hit, reach 5 ft., one target. *Hit:* 12 (2d6 + 5) slashing damage plus 5 (1d10) force damage."
  - name: Chromatic Orb
    desc: "*Ranged Spell Attack:* +10 to hit, range 120 ft., one creature. *Hit:* 13 (3d8) damage of a type chosen by Mordakhesh: acid, cold, fire, lightning, poison, or thunder."
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Mordakhesh can expend a use to take one of the following actions. Mordakhesh regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Attack
    desc: Mordakhesh makes one weapon attack or casts *chromatic orb*.
  - name: Chromatic Resistance
    desc: Modakhesh gains resistance to one damage type of his choice, acid, cold, fire, lightning, poison, or thunder, until the start of his next turn.
  - name: Warlord's Command (Costs 2 Actions)
    desc: Mordakhesh targets up to two allies that he can see within 30 feet of him. If a target can see and hear him, the target can make one weapon attack as a reaction and gains advantage on the attack roll.
```

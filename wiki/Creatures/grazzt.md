---
title: Graz'zt
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 24
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
name: Graz'zt
size: Large
type: fiend
subtype: demon
alignment: Chaotic Evil
ac: 20
ac_class: natural armour
hp: 346
hit_dice: 33d10 + 165
modifier: 2
speed: 40 ft.
stats: [ 22, 15, 21, 23, 21, 26 ]
saves:
  - dex: 9
  - con: 12
  - wis: 12
skillsaves:
  - deception: 15
  - perception: 12
  - persuasion: 15
damage_resistances: cold, fire, lightning
damage_immunities: poison; bludgeoning, piercing, slashing that is nonmagical
condition_immunities: charmed, exhaustion, frightened, poisoned
senses: truesight 120 ft., passive Perception 22
languages: all, telepathy 120 ft.
cr: "24"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If Graz'zt fails a saving throw, he can choose to succeed instead.
  - name: Magic Resistance
    desc: Graz'zt has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: Graz'zt makes two Wave of Sorrow attacks. He can replace one attack with a use of Spellcasting.
  - name: Wave of Sorrow (Greatsword)
    desc: "*Melee Weapon Attack:* +13 to hit, reach 10 ft., one target. *Hit:* 20 (4d6 + 6) force damage plus 14 (4d6) acid damage."
  - name: Teleport
    desc: Graz'zt teleports, along with any equipment he is wearing or carrying, up to 120 feet to an unoccupied space he can see.
  - name: Spellcasting
    desc: |-
      Graz'zt casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 23):

      **At will:** *charm person*, *detect magic*, *dispel magic*

      **3/day each:** *darkness*, *dominate person*, *telekinesis*, *teleport*

      **1/day each:** *dominate monster*, *greater invisibility*
bonus_actions:
  - name: Change Shape
    desc: Graz'zt transforms into a form that resembles a Medium Humanoid or back into his true form. Aside from his size, his statistics are the same in each form. Any equipment he is wearing or carrying isn't transformed.
reactions:
  - name: Negate Spell (Recharge 5–6)
    desc: Graz'zt tries to interrupt a spell he sees a creature casting within 60 feet of him. If the spell is 3rd level or lower, the spell fails and has no effect. If the spell is 4th level or higher, Graz'zt makes a Charisma check against a DC of 10 + the spell's level. On a success, the spell fails and has no effect.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Graz'zt can expend a use to take one of the following actions. Graz'zt regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Abyssal Magic
    desc: Graz'zt uses Spellcasting or Teleport.
  - name: Attack
    desc: Graz'zt makes one Wave of Sorrow attack.
  - name: Dance, My Puppet!
    desc: One creature charmed by Graz'zt that Graz'zt can see must use its reaction to move up to its speed as Graz'zt directs.
```

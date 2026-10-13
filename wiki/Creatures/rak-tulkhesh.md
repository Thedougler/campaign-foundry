---
title: Rak Tulkhesh
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 28
creature_type: Fiend
size: Huge
habitat: []
sourcebooks:
  - "Eberron: Rising from the Last War"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Rak Tulkhesh
size: Huge
type: fiend
alignment: Neutral Evil
ac: 23
ac_class: natural armour; 25 versus ranged attacks
hp: 478
hit_dice: 33d12 + 264
modifier: 4
speed: 40 ft., climb 40 ft., fly 80 ft.
stats: [ 29, 19, 27, 21, 22, 26 ]
saves:
  - str: 17
  - con: 16
  - wis: 14
  - cha: 16
skillsaves:
  - athletics: 17
  - intimidation: 16
  - perception: 14
damage_resistances: cold, fire, lightning
damage_immunities: poison; bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: charmed, exhaustion, frightened, paralysed, poisoned, stunned
senses: truesight 120 ft., passive Perception 24
languages: all, telepathy 120 ft.
cr: "28"
traits:
  - name: Innate Spellcasting
    desc: |-
      Rak Tulkhesh's spellcasting ability is Charisma (spell save DC 24). He can innately cast the following spells, requiring no material components:

      **At will:** *detect thoughts*, *dispel magic*, *spirit guardians*

      **1/day each:** banishing smite, blinding smite, staggering smite
  - name: Deadly Critical
    desc: Rak Tulkhesh scores a critical hit on a roll of 19 or 20 and rolls the damage dice three times, instead of twice.
  - name: Legendary Resistance (3/Day)
    desc: If Rak Tulkhesh fails a saving throw, he can choose to succeed instead.
  - name: Magic Resistance
    desc: Rak Tulkhesh has advantage on saving throws against spells and other magical effects.
  - name: Whirlwind of Weapons
    desc: A magical aura of weapons surrounds Rak Tulkhesh in a 10 foot radius. At the start of each of his turns, any other creature in the aura takes 14 (4d6) force damage.
actions:
  - name: Multiattack
    desc: Rak Tulkhesh makes four weapon attacks.
  - name: Spawned Melee Weapon
    desc: "*Melee Weapon Attack:* +17 to hit, reach 10 ft., one target. *Hit:* 28 (3d12 + 9) force damage."
  - name: Spawned Ranged Weapon
    desc: "*Ranged Weapon Attack:* +12 to hit, range 150/600 ft., one target. *Hit:* 17 (3d8 + 4) force damage."
  - name: Change Shape
    desc: |-
      Rak Tulkhesh magically polymorphs into a humanoid, beast, or giant that has a challenge rating no higher than his own, or back into his true form. He reverts to his true form if he dies. Any equipment he is wearing or carrying is absorbed or borne by the new form (his choice).

      In a new form, Rak Tulkhesh retains his alignment, hit points, Hit Dice, ability to speak, proficiencies, Legendary Resistance, and Intelligence, Wisdom, and Charisma scores, as well as this action. His statistics and capabilities are otherwise replaced by those of the new form, except any class features or legendary actions of that form.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Rak Tulkhesh can expend a use to take one of the following actions. Rak Tulkhesh regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Attack
    desc: Rak Tulkhesh makes one weapon attack.
  - name: End Magic (Costs 2 Actions)
    desc: Rak Tulkhesh casts *dispel magic*.
  - name: Provoke Rage (Costs 3 Actions)
    desc: Each creature within 60 feet of Rak Tulkhesh must succeed on a DC 24 Wisdom saving throw or use its reaction to make a melee weapon attack against a random creature within reach. If no creatures are within reach, it makes a ranged weapon attack against a random creature within range, throwing its weapon if necessary. This attack is made with advantage and gains a +4 bonus to the damage roll.
```

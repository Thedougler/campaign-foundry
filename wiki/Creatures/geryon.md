---
title: Geryon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 22
creature_type: Fiend
size: Huge
habitat: []
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Geryon
size: Huge
type: fiend
subtype: devil
alignment: Lawful Evil
ac: 19
ac_class: natural armour
hp: 300
hit_dice: 24d12 + 144
modifier: 3
speed: 30 ft., fly 50 ft.
stats: [ 29, 17, 22, 19, 16, 23 ]
saves:
  - dex: 10
  - con: 13
  - wis: 10
  - cha: 13
skillsaves:
  - deception: 13
  - intimidation: 13
  - perception: 10
damage_resistances: bludgeoning, piercing, slashing from nonmagical attacks that aren't silvered
damage_immunities: cold, fire, poison
condition_immunities: charmed, exhaustion, frightened, poisoned
senses: truesight 120 ft., passive Perception 20
languages: all, telepathy 120 ft.
cr: "22"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If Geryon fails a saving throw, he can choose to succeed instead.
  - name: Magic Resistance
    desc: Geryon has advantage on saving throws against spells and other magical effects.
  - name: Regeneration
    desc: Geryon regains 20 hit points at the start of his turn. If he takes radiant damage, this trait doesn't function at the start of his next turn. Geryon dies only if he starts his turn with 0 hit points and doesn't regenerate.
actions:
  - name: Multiattack
    desc: Geryon makes one Claw attack and one Stinger attack.
  - name: Claw
    desc: "*Melee Weapon Attack:* +16 to hit, reach 15 ft., one target. *Hit:* 23 (4d6 + 9) cold damage. If the target is Large or smaller, it is grappled (DC 24), and it is restrained until the grapple ends. Geryon can grapple one creature at a time. If the target is already grappled by Geryon, the target takes an extra 27 (6d8) cold damage."
  - name: Stinger
    desc: "*Melee Weapon Attack:* +16 to hit, reach 20 ft., one creature. *Hit:* 14 (2d4 + 9) force damage, and the target must succeed on a DC 21 Constitution saving throw or take 13 (2d12) poison damage and become poisoned until it finishes a short or long rest. The target's hit point maximum is reduced by an amount equal to half the poison damage taken. This reduction lasts until the poisoned condition is removed. The target dies if its hit point maximum is reduced to 0."
  - name: Teleport
    desc: Geryon teleports, along with any equipment he is wearing and carrying, up to 120 feet to an unoccupied space he can see.
  - name: Spellcasting
    desc: |-
      Geryon casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 21):

      **At will:** *alter self* (can become Medium when changing his appearance), *detect magic*, *ice storm*, *invisibility* (self only), *locate object*, *suggestion*, *wall of ice*

      **1/day:** *banishment*
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Geryon can expend a use to take one of the following actions. Geryon regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Infernal Glare
    desc: Geryon targets one creature he can see within 60 feet of him. The target must succeed on a DC 23 Wisdom saving throw or become frightened of Geryon until the end of its next turn.
  - name: Teleport
    desc: Geryon uses Teleport.
  - name: Swift Sting (Costs 2 Actions)
    desc: Geryon makes one Stinger attack.
```

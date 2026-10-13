---
title: Frost Giant Everlasting One
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Giant
size: Huge
habitat:
  - Coastal
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Frost Giant Everlasting One
size: Huge
type: giant
alignment: Typically Chaotic Evil
ac: 15
ac_class: patchwork armour
hp: 189
hit_dice: 14d12 + 98
modifier: -1
speed: 40 ft.
stats: [ 25, 9, 24, 9, 10, 12 ]
saves:
  - str: 11
  - con: 11
  - wis: 4
skillsaves:
  - athletics: 11
  - perception: 4
damage_immunities: cold
gear:
  - greataxe
senses: darkvision 60 ft., passive Perception 14
languages: Giant
cr: "12"
traits:
  - name: Extra Heads
    desc: The giant has a 25 percent chance of having more than one head. If it has more than one, it has advantage on Wisdom (Perception) checks and on saving throws against being blinded, charmed, deafened, frightened, stunned, or knocked unconscious.
  - name: Regeneration
    desc: The giant regains 10 hit points at the start of its turn. If the giant takes acid or fire damage, this trait doesn't function at the start of its next turn. The giant dies only if it starts its turn with 0 hit points and doesn't regenerate.
actions:
  - name: Multiattack
    desc: The giant makes two Greataxe or Rock attacks.
  - name: Greataxe
    desc: "*Melee Weapon Attack:* +11 to hit, reach 10 ft., one target. *Hit:* 26 (3d12 + 7) slashing damage, or 30 (3d12 + 11) slashing damage while raging."
  - name: Rock
    desc: "*Ranged Weapon Attack:* +11 to hit, range 60/240 ft., one target. *Hit:* 29 (4d10 + 7) bludgeoning damage."
bonus_actions:
  - name: Vaprak's Rage (Recharges after a Short or Long Rest)
    desc: |-
      The giant enters a rage. The rage lasts for 1 minute or until the giant is incapacitated. While raging, the giant gains the following benefits:

      - The giant has advantage on Strength checks and Strength saving throws.  
      - When it makes a melee weapon attack, the giant gains a +4 bonus to the damage roll.  
      - The giant has resistance to bludgeoning, piercing, and slashing damage.
```

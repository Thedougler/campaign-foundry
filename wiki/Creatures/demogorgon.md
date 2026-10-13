---
title: Demogorgon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 26
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
name: Demogorgon
size: Huge
type: fiend
subtype: demon
alignment: Chaotic Evil
ac: 22
ac_class: natural armour
hp: 464
hit_dice: 32d12 + 256
modifier: 2
speed: 50 ft., swim 50 ft.
stats: [ 29, 14, 26, 20, 17, 25 ]
saves:
  - dex: 10
  - con: 16
  - wis: 11
  - cha: 15
skillsaves:
  - insight: 11
  - perception: 19
damage_resistances: cold, fire, lightning
damage_immunities: poison; bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: charmed, exhaustion, frightened, poisoned
senses: truesight 120 ft., passive Perception 29
languages: all, telepathy 120 ft.
cr: "26"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If Demogorgon fails a saving throw, he can choose to succeed instead.
  - name: Magic Resistance
    desc: Demogorgon has advantage on saving throws against spells and other magical effects.
  - name: Two Heads
    desc: Demogorgon has advantage on saving throws against being blinded, deafened, stunned, or knocked unconscious.
actions:
  - name: Multiattack
    desc: Demogorgon makes two Tentacle attacks. He can replace one attack with a use of Gaze.
  - name: Tentacle
    desc: "*Melee Weapon Attack:* +17 to hit, reach 10 ft., one target. *Hit:* 28 (3d12 + 9) force damage. If the target is a creature, it must succeed on a DC 23 Constitution saving throw, or its hit point maximum is reduced by an amount equal to the damage taken. This reduction lasts until the target finishes a long rest. The target dies if its hit point maximum is reduced to 0."
  - name: Gaze
    desc: |-
      Demogorgon turns his magical gaze toward one creature he can see within 120 feet of him. The target must succeed on a DC 23 Wisdom saving throw or suffer one of the following effects (choose one or roll a d6):

      - **1–2 Beguiling Gaze.** The target is stunned until the start of Demogorgon's next turn or until Demogorgon is no longer within line of sight.  
      - **3–4 Confusing Gaze.** The target suffers the effect of the *confusion* spell without making a saving throw. The effect lasts until the start of Demogorgon's next turn. Demogorgon doesn't need to concentrate on the spell.  
      - **5–6 Hypnotic Gaze.** The target is charmed by Demogorgon until the start of Demogorgon's next turn. Demogorgon chooses how the charmed target uses its action, reaction, and movement.  
  - name: Spellcasting
    desc: |-
      Demogorgon casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 23):

      **At will:** *detect magic*, *major image*

      **3/day each:** *dispel magic*, *fear*, *telekinesis*

      **1/day each:** *feeblemind*, *project image*
legendary_description: "Legendary Action Uses: 2. Immediately after another creature's turn, Demogorgon can expend a use to take one of the following actions. Demogorgon regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Gaze
    desc: Demogorgon uses Gaze and must use either Beguiling Gaze or Confusing Gaze.
  - name: Tail
    desc: "*Melee Weapon Attack:* +17 to hit, reach 15 ft., one target. *Hit:* 20 (2d10 + 9) bludgeoning damage plus 11 (2d10) necrotic damage."
  - name: Cast a Spell (Costs 2 Actions)
    desc: Demogorgon uses Spellcasting.
```

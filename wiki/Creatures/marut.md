---
title: Marut
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 25
creature_type: Construct
size: Large
habitat: []
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Marut
size: Large
type: construct
subtype: inevitable
alignment: Typically Lawful Neutral
ac: 22
ac_class: natural armour
hp: 432
hit_dice: 32d10 + 256
modifier: 1
speed: 40 ft., fly 30 ft. (hover)
stats: [ 28, 12, 26, 19, 15, 18 ]
saves:
  - int: 12
  - wis: 10
  - cha: 12
skillsaves:
  - insight: 10
  - intimidation: 12
  - perception: 10
damage_resistances: thunder; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: charmed, frightened, paralysed, poisoned, unconscious
senses: darkvision 60 ft., passive Perception 20
languages: all but rarely speaks
cr: "25"
traits:
  - name: Immutable Form
    desc: The marut is immune to any spell or effect that would alter its form.
  - name: Legendary Resistance (3/Day)
    desc: If the marut fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The marut has advantage on saving throws against spells and other magical effects.
  - name: Unusual Nature
    desc: The marut doesn't require air, food, drink, or sleep.
actions:
  - name: Multiattack
    desc: The marut makes two Unerring Slam attacks.
  - name: Unerring Slam
    desc: "*Melee Weapon Attack:* automatic hit, reach 5 ft., one target. *Hit:* 60 force damage, and the target is pushed up to 5 feet away from the marut if it is Huge or smaller."
  - name: Blazing Edict (Recharge 5–6)
    desc: Arcane energy emanates from the marut's chest in a 60-foot cube. Every creature in that area takes 45 radiant damage. Each creature that takes any of this damage must succeed on a DC 20 Wisdom saving throw or be stunned until the end of the marut's next turn.
  - name: Plane Shift (3/Day)
    desc: |
      The marut casts *plane shift*, requiring no material components and using Intelligence as the spellcasting ability. The marut can cast the spell normally, or it can cast the spell on an unwilling creature it can see within 60 feet of it. If it uses the latter option, the targeted creature must succeed on a DC 20 Charisma saving throw or be banished to a teleportation circle in the Hall of Concordance in Sigil.
```

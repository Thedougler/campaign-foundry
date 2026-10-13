---
title: Alhoon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Undead
size: Medium
habitat:
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Alhoon
size: Medium
type: undead
subtype: mind flayer, wizard
alignment: Typically Neutral Evil
ac: 15
ac_class: natural armour
hp: 150
hit_dice: 20d8 + 60
modifier: 1
speed: 30 ft., fly 15 ft. (hover)
stats: [ 11, 12, 16, 19, 17, 17 ]
saves:
  - con: 7
  - int: 8
  - wis: 7
  - cha: 7
skillsaves:
  - arcana: 8
  - deception: 7
  - history: 8
  - insight: 7
  - perception: 7
  - stealth: 5
damage_resistances: cold, lightning, necrotic
damage_immunities: poison
condition_immunities: charmed, exhaustion, frightened, paralysed, poisoned
senses: truesight 120 ft., passive Perception 17
languages: Deep Speech, Undercommon, telepathy 120 ft.
cr: "10"
traits:
  - name: Magic Resistance
    desc: The alhoon has advantage on saving throws against spells and other magical effects.
  - name: Turn Resistance
    desc: The alhoon has advantage on saving throws against any effect that turns Undead.
actions:
  - name: Multiattack
    desc: The alhoon makes two Chilling Grasp or Arcane Bolt attacks.
  - name: Chilling Grasp
    desc: "*Melee Spell Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 14 (4d6) cold damage, and the alhoon regains 14 hit points."
  - name: Arcane Bolt
    desc: "*Ranged Spell Attack:* +8 to hit, range 120 ft., one target. *Hit:* 28 (8d6) force damage."
  - name: Mind Blast (Recharge 5–6)
    desc: The alhoon magically emits psychic energy in a 60-foot cone. Each creature in that area must succeed on a DC 16 Intelligence saving throw or take 22 (4d8 + 4) psychic damage and be stunned for 1 minute. A target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
  - name: Spellcasting
    desc: |-
      The alhoon casts one of the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 16):

      **At will:** *dancing lights*, *detect magic*, *detect thoughts*, *disguise self*, *mage hand*, *prestidigitation*

      **1/day each:** *dominate monster*, *globe of invulnerability*, *invisibility*, *modify memory*, *plane shift* (self only), *wall of force*
reactions:
  - name: Negate Spell (3/Day)
    desc: The alhoon targets one creature it can see within 60 feet of it that is casting a spell. If the spell is 3rd level or lower, the spell fails, but any spell slots or charges are not wasted.
```

---
title: Inspired
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - "Eberron: Rising from the Last War"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Inspired
size: Medium
type: humanoid
subtype: human
alignment: Lawful Evil
ac: 12
ac_class: 15 with *mage armour*
hp: 40
hit_dice: 9d8
modifier: 2
speed: 30 ft.
stats: [ 11, 14, 10, 16, 10, 16 ]
saves:
  - int: 5
  - wis: 2
skillsaves:
  - deception: 7
  - insight: 2
  - persuasion: 7
damage_resistances: psychic
condition_immunities: charmed, frightened
senses: passive Perception 10
languages: Common, Quori
cr: "2"
traits:
  - name: Innate Spellcasting (Psionics)
    desc: |-
      The Inspired's spellcasting ability is Intelligence (spell save DC 13). It can innately cast the following spells, requiring no material components:

      **At will:** *mage hand*, *vicious mockery* (see "Actions" below)

      **1/day each:** *charm person*, *dissonant whispers*, *hex*, *hold person*, *mage armour*
  - name: Dual Mind
    desc: The Inspired has advantage on Wisdom saving throws.
actions:
  - name: Multiattack
    desc: The Inspired makes two crysteel dagger attacks. It can replace one attack with vicious mockery.
  - name: Crysteel Dagger
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 4 (1d4 + 2) piercing damage plus 10 (3d6) force damage."
  - name: Vicious Mockery (Cantrip)
    desc: The Inspired unleashes a string of insults laced with subtle enchantments at one creature it can see within 60 feet of it. If the target can hear the Inspired, the target must succeed on a DC 13 Wisdom saving throw or take 2 (1d4) psychic damage and have disadvantage on the next attack roll it makes before the end of its next turn.
```

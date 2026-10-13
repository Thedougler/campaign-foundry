---
title: Yuan-ti Pit Master
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Monstrosity
size: Medium
habitat:
  - Desert
  - Forest
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Yuan-ti Pit Master
size: Medium
type: monstrosity
subtype: warlock
alignment: Typically Neutral Evil
ac: 14
ac_class: natural armour
hp: 88
hit_dice: 16d8 + 16
modifier: 2
speed: 30 ft.
stats: [ 16, 14, 13, 14, 12, 16 ]
saves:
  - wis: 4
  - cha: 6
skillsaves:
  - deception: 6
  - stealth: 5
damage_immunities: poison
condition_immunities: poisoned
senses: darkvision 120 ft., passive Perception 11
languages: Abyssal, Common, Draconic
cr: "5"
traits:
  - name: Devil's Sight
    desc: Magical darkness doesn't impede the yuan-ti's darkvision.
  - name: Magic Resistance
    desc: The yuan-ti has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The yuan-ti makes three Bite attacks or two Spectral Fangs attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 5 (1d4 + 3) piercing damage plus 7 (2d6) poison damage."
  - name: Spectral Fangs
    desc: "*Ranged Spell Attack:* +6 to hit, range 120 ft., one target. *Hit:* 16 (3d8 + 3) poison damage."
  - name: Merrshaulk's Slumber (1/Day)
    desc: The yuan-ti targets up to five creatures that it can see within 60 feet of it. Each target must succeed on a DC 13 Constitution saving throw or fall into a magical sleep and be unconscious for 10 minutes. A sleeping target awakens if it takes damage or if someone uses an action to shake or slap it awake. This magical sleep has no effect on a creature immune to being charmed.
  - name: Spellcasting (Yuan-ti Form Only)
    desc: |-
      The yuan-ti casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 14):

      **At will:** *animal friendship* (snakes only), *guidance*, *mage hand*, *message*

      **3/day:** *suggestion*

      **2/day each:** *hold person*, *invisibility*
bonus_actions:
  - name: Change Shape
    desc: The yuan-ti transforms into a Medium snake or back into its true form. Its statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed. It doesn't change form if it dies.
```

---
title: Githzerai Uniter
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Aberration
size: Medium
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Githzerai Uniter
size: Medium
type: aberration
subtype: gith
alignment: Any alignment
ac: 16
ac_class: psychic defense
hp: 123
hit_dice: 19d8 + 38
modifier: 3
speed: 40 ft.
stats: [ 13, 17, 15, 15, 17, 16 ]
saves:
  - str: 4
  - dex: 6
  - int: 5
  - wis: 6
skillsaves:
  - insight: 6
  - perception: 6
senses: passive Perception 16
languages: Common, Gith
cr: "7"
traits:
  - name: Psychic Defense
    desc: While the githzerai is wearing no armour and wielding no shield, its AC includes its Wisdom modifier.
actions:
  - name: Multiattack
    desc: The githzerai makes three Unarmed Strike or Psychic Bolt attacks. It can replace any of these attacks with one use of its Pacifying Touch.
  - name: Unarmed Strike
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 7 (1d8 + 3) bludgeoning damage plus 10 (3d6) psychic damage."
  - name: Psychic Bolt
    desc: "*Ranged Spell Attack:* +6 to hit, range 60 ft., one creature. *Hit:* 17 (5d6) psychic damage."
  - name: Pacifying Touch
    desc: "The githzerai touches one creature it can see within 5 feet of itself. The target must succeed on a DC 14 Intelligence saving throw, or the githzerai chooses an action for that target: Attack, Cast a Spell, or Dash. The affected target can't take that action for 1 minute. At the end of each of the target's turns, it can repeat the saving throw, ending the effect on itself on a successful save. A target that succeeds on the saving throw becomes immune to this githzerai's Pacifying Touch for 24 hours."
  - name: Spellcasting (Psionics)
    desc: |-
      The githzerai casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability (spell save DC 14):

      **At will:** *mage hand* (the hand is invisible), *see invisibility*

      **1/day each:** *plane shift* (self only), *telekinesis*
```

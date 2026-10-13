---
title: Firbolg Wanderer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Firbolg Wanderer
size: Medium
type: humanoid
subtype: cleric
alignment: Any alignment
ac: 16
ac_class: breastplate
hp: 90
hit_dice: 12d8 + 36
modifier: 2
speed: 30 ft.
stats: [ 16, 14, 16, 14, 17, 16 ]
saves:
  - dex: 5
  - cha: 6
skillsaves:
  - perception: 6
  - persuasion: 6
  - stealth: 5
gear:
  - longsword
senses: passive Perception 16
languages: Common, Giant
cr: "5"
actions:
  - name: Multiattack
    desc: The firbolg makes two attacks using Longsword, Bewitching Bolt, or a combination of them.
  - name: Longsword
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands, plus 9 (2d8) psychic damage."
  - name: Bewitching Bolt
    desc: "*Ranged Spell Attack:* +6 to hit, range 60 ft., one creature. *Hit:* 10 (2d6 + 3) psychic damage, and the target must succeed on a DC 14 Charisma saving throw or have the charmed condition until the start of the target's next turn."
  - name: Spellcasting
    desc: |-
      The firbolg casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 14):

      **At will:** *mage hand*, *minor illusion*, *Tasha's hideous laughter*

      **1/day each:** *detect magic*, *disguise self*, *dispel magic*, *polymorph*
bonus_actions:
  - name: Duplicitous Movement (1/Day)
    desc: |-
      The firbolg projects an illusory duplicate of itself in an unoccupied space it can see within 30 feet of itself. The firbolg can then swap places with the illusion. The illusion vanishes after 1 minute, if the firbolg is incapacitated, or if the illusion is more than 120 feet from the firbolg.

      As a bonus action on later turns, the firbolg can move the illusion up to 30 feet and can then swap places with it.
```

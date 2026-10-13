---
title: Bheur Hag
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Fey
size: Medium
habitat:
  - Arctic
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Bheur Hag
size: Medium
type: fey
alignment: Typically Chaotic Evil
ac: 17
ac_class: natural armour
hp: 91
hit_dice: 14d8 + 28
modifier: 3
speed: 30 ft., fly 50 ft. (hover, Graystaff magic)
stats: [ 13, 16, 14, 12, 13, 16 ]
saves:
  - wis: 4
skillsaves:
  - nature: 4
  - perception: 4
  - stealth: 6
  - survival: 4
damage_immunities: cold
senses: darkvision 60 ft., passive Perception 14
languages: Auran, Common, Giant
cr: "7"
traits:
  - name: Control Weather (1/Day)
    desc: The hag can cast the *control weather* spell, requiring no material components and using Charisma as the spellcasting ability.
  - name: Graystaff Magic
    desc: The hag carries a graystaff, a magic staff. The hag can use its flying speed only while astride the staff. If the staff is lost or destroyed, the hag must craft another, which takes a year and a day. Only a bheur hag can use a graystaff
  - name: Ice Walk
    desc: The hag can move across and climb icy surfaces without needing to make an ability check, and difficult terrain composed of ice or snow doesn't cost the hag extra movement.
actions:
  - name: Multiattack
    desc: The hag makes two Slam or Frost Shard attacks.
  - name: Slam
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 10 (2d8 + 1) bludgeoning damage plus 18 (4d8) cold damage."
  - name: Frost Shard
    desc: "*Ranged Spell Attack:* +6 to hit, range 60 ft., one target. *Hit:* 30 (6d8 + 3) cold damage, and the target's speed is reduced by 10 feet until the start of the hag's next turn."
  - name: Horrific Feast
    desc: The hag feeds on the corpse of one enemy within reach that died within the past minute. Each creature of the hag's choice that is within 60 feet and able to see the feeding must succeed on a DC 15 Wisdom saving throw or be frightened of the hag for 1 minute. While frightened in this way, a creature is incapacitated, can't understand what others say, can't read, and speaks only in gibberish. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the hag's Horrific Feast for the next 24 hours.
  - name: Spellcasting
    desc: |-
      While holding or riding the graystaff, the hag casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 14):

      **At will:** *hold person*

      **1/day each:** *cone of cold*, *ice storm*, *wall of ice*
```

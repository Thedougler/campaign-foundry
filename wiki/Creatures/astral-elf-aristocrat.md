---
title: Astral Elf Aristocrat
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Astral Elf Aristocrat
size: Medium
type: humanoid
subtype: wizard
alignment: Any alignment
ac: 16
ac_class: elven chain
hp: 103
hit_dice: 23d8
modifier: 2
speed: 30 ft.
stats: [ 11, 14, 10, 21, 18, 18 ]
saves:
  - int: 8
  - wis: 7
  - cha: 7
skillsaves:
  - arcana: 8
  - deception: 7
  - insight: 7
  - persuasion: 7
gear:
  - scimitar
senses: darkvision 60 ft., passive Perception 14
languages: Celestial, Common, Draconic, Elvish
cr: "8"
traits:
  - name: Fey Ancestry
    desc: The elf has advantage on saving throws it makes to avoid or end the charmed condition on itself, and magic can't put it to sleep.
  - name: Special Equipment
    desc: The elf wears a suit of elven chain.
  - name: Unusual Nature
    desc: The elf doesn't require sleep.
actions:
  - name: Multiattack
    desc: The elf makes two Scimitar attacks and uses Radiant Beam (if available).
  - name: Scimitar
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) slashing damage plus 10 (3d6) radiant damage."
  - name: Radiant Beam (3/Day)
    desc: A magical beam of radiance flashes out from the elf's hand in a 5-foot-wide, 60-foot-long line. Each creature in the line must make a DC 16 Constitution saving throw, taking 18 (4d8) radiant damage on a failed save, or half as much damage on a successful one.
  - name: Spellcasting
    desc: |-
      The elf casts one of the following spells, using Intelligence as the spellcasting ability:

      **1/day each:** *fly*, *mislead*, *sending*
bonus_actions:
  - name: Starlight Step (3/Day)
    desc: The elf magically teleports up to 30 feet, along with anything it is wearing or carrying, to an unoccupied space it can see.
  - name: Summon Solar Dragon (1/Day)
    desc: The elf has a 50 percent chance of magically summoning a young solar dragon. A summoned dragon appears in an unoccupied space that the summoner can see, acts on its own initiative count, and is an ally of its summoner. It remains for 10 minutes, until it or its summoner dies, or until its summoner dismisses it as an action.
```

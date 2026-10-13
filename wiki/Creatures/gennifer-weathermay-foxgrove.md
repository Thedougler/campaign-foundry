---
title: Gennifer Weathermay-Foxgrove
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Gennifer Weathermay-Foxgrove
size: Medium
type: humanoid
subtype: human, lycanthrope
alignment: Lawful Good
ac: 14
hp: 44
hit_dice: 8d8 + 8
modifier: 2
speed: 30 ft.
stats: [ 10, 14, 13, 15, 17, 10 ]
skillsaves:
  - arcana: 4
  - investigation: 4
  - medicine: 5
  - stealth: 4
gear:
  - component pouch
  - dagger
senses: passive Perception 13
languages: Common, Draconic, Infernal
cr: "3"
traits:
  - name: Suppressed Lycanthropy
    desc: If reduced to 0 Hit Points, Gennifer succumbs to lycanthropy. Her statistics are replaced by those of the Werewolf stat block, but she retains her alignment; personality; Intelligence, Wisdom, and Charisma scores; proficiencies; and languages known. She then immediately revives in her hybrid form with all her Hit Points.
actions:
  - name: Multiattack
    desc: Gennifer makes two attacks, using Blessed Dagger or Radiant Wisp in any combination.
  - name: Blessed Dagger
    desc: "*Melee or Ranged Attack Roll:* +4, reach 5 ft. or range 20/60 ft. *Hit:* 4 (1d4 + 2) Piercing damage plus 9 (2d8) Radiant damage."
  - name: Radiant Wisp
    desc: "*Ranged Attack Roll:* +5, range 60 ft. *Hit:* 14 (2d10 + 3) Radiant damage."
  - name: Esoteric Ward (Recharge 6)
    desc: "*Constitution Saving Throw:* DC 13, each creature in a 15-foot Emanation originating from Gennifer. *Failure:* 18 (4d8) Radiant damage. If the target is an Undead creature, it has the Stunned condition until the end of its next turn."
  - name: Spellcasting
    desc: |-
      Gennifer casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13):

      **At will:** *Light*, *Mending*

      **1/day each:** *Locate Animals or Plants*, *Magic Circle*, *Protection from Poison*
bonus_actions:
  - name: Occult Aid (2/Day)
    desc: |
      Gennifer casts *Healing Word*, using the same spellcasting ability as Spellcasting.
```

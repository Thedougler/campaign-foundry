---
title: Aranea
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Monstrosity
size: Medium
habitat:
  - Forest
  - Swamp
sourcebooks:
  - "Forgotten Realms: Adventures in Faerûn"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Aranea
size: Medium
type: monstrosity
alignment: Neutral
ac: 14
hp: 66
hit_dice: 12d8 + 12
modifier: 3
speed: 30 ft., climb 30 ft. (spider or hybrid form only)
stats: [ 10, 17, 12, 12, 10, 15 ]
skillsaves:
  - perception: 2
  - stealth: 5
gear:
  - sling
senses: Darkvision 60 ft., passive Perception 12
languages: Common
cr: "2"
traits:
  - name: Spider Climb (Hybrid or Spider Form Only)
    desc: The aranea can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  - name: Web Walker
    desc: The aranea ignores movement restrictions caused by webs, and it knows the location of any other creature in contact with the same web.
actions:
  - name: Multiattack
    desc: The aranea makes two attacks, using Bite, Slam, or Sling in any combination.
  - name: Bite (Hybrid or Spider Form Only)
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 6 (1d6 + 3) Piercing damage plus 2 (1d4) Poison damage."
  - name: Slam
    desc: "*Melee Attack Roll:* +5, reach 5 ft. *Hit:* 7 (1d8 + 3) Bludgeoning damage."
  - name: Sling (Humanoid or Hybrid Form Only)
    desc: "*Ranged Attack Roll:* +5, range 30/120 ft. *Hit:* 8 (2d4 + 3) Bludgeoning damage."
  - name: Spellcasting
    desc: |-
      The aranea casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 12):

      **At will:** Friends, *Silent Image*

      **1/day:** *Hold Person*
bonus_actions:
  - name: Shape-Shift
    desc: The aranea shape-shifts into a humanoid form, into a humanoid-spider hybrid form, or back into its true spider form. Its game statistics are the same in each form, except where noted. Any equipment it is wearing or carrying isn't transformed.
```

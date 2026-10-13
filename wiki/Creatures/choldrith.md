---
title: Choldrith
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Monstrosity
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
name: Choldrith
size: Medium
type: monstrosity
subtype: cleric
alignment: Typically Chaotic Evil
ac: 15
ac_class: natural armour
hp: 66
hit_dice: 12d8 + 12
modifier: 3
speed: 30 ft., climb 30 ft.
stats: [ 12, 16, 12, 11, 14, 10 ]
skillsaves:
  - athletics: 5
  - religion: 2
  - stealth: 5
gear:
  - dagger
senses: darkvision 60 ft., passive Perception 12
languages: Undercommon
cr: "3"
traits:
  - name: Fey Ancestry
    desc: The choldrith has advantage on saving throws against being charmed, and magic can't put the choldrith to sleep.
  - name: Spider Climb
    desc: The choldrith can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the choldrith has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.
  - name: Web Sense
    desc: While in contact with a web, the choldrith knows the exact location of any other creature in contact with the same web.
  - name: Web Walker
    desc: The choldrith ignores movement restrictions caused by webbing.
actions:
  - name: Dagger
    desc: "*Melee or Ranged Weapon Attack:* +5 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 5 (1d4 + 3) piercing damage plus 10 (3d6) poison damage."
  - name: Web (Recharge 5–6)
    desc: "*Ranged Weapon Attack:* +5 to hit, range 30/60 ft., one Large or smaller creature. *Hit:* The target is restrained by webbing. As an action, the restrained target can make a DC 11 Strength check, bursting the webbing on a success. The webbing can also be attacked and destroyed (AC 10; 5 hit points; vulnerability to fire damage; immunity to bludgeoning, poison, and psychic damage)."
  - name: Spellcasting
    desc: |-
      The choldrith casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 12):

      **At will:** *guidance*, *thaumaturgy*

      **1/day each:** *bane*, *hold person*
bonus_actions:
  - name: Spectral Dagger (Recharges after a Short or Long Rest)
    desc: |-
      The choldrith conjures a floating, spectral dagger within 60 feet of itself. The choldrith can make a melee spell attack (+4 to hit) against one creature within 5 feet of the dagger. On a hit, the target takes 6 (1d8 + 2) force damage.

      The dagger lasts for 1 minute. As a bonus action on later turns, the choldrith can move the dagger up to 20 feet and repeat the attack against one creature within 5 feet of the dagger.
```

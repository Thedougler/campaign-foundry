---
title: Cackler
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Fiend
size: Small
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Cackler
size: Small
type: fiend
subtype: demon
alignment: Chaotic Evil
ac: 15
ac_class: natural armour
hp: 10
hit_dice: 3d6
modifier: 3
speed: 30 ft.
stats: [ 9, 16, 11, 11, 7, 12 ]
skillsaves:
  - deception: 3
  - perception: 0
  - performance: 3
damage_resistances: cold; fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: poisoned
senses: darkvision 120 ft., passive Perception 10
languages: Abyssal, Common
cr: 1/2
traits:
  - name: Innate Spellcasting
    desc: |-
      The cackler's innate spellcasting ability is Charisma (spell save DC 11, +3 to hit with spell attacks). The cackler can innately cast the following spells, requiring no material components:

      **At will:** *fire bolt*

      **1/day:** *Tasha's hideous laughter*
  - name: Last Laugh
    desc: When the cackler dies, it releases a dying laugh that scars the minds of other nearby creatures. Each creature within 10 feet of the cackler must succeed on a DC 11 Wisdom saving throw or take 2 (1d4) psychic damage.
  - name: Mimicry
    desc: The cackler can mimic any sounds it has heard, including voices. A creature that hears the sounds can tell they are imitations with a successful DC 11 Wisdom (Insight) check.
actions:
  - name: Bite
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 5 (1d4 + 3) piercing damage."
  - name: Spiked Chain
    desc: "*Melee Weapon Attack:* +5 to hit, reach 10 ft., one target. *Hit:* 6 (1d6 + 3) slashing damage."
```

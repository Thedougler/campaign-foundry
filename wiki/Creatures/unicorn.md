---
title: Unicorn
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Celestial
size: Large
habitat:
  - Forest
  - Planar (Feywild)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Unicorn
size: Large
type: celestial
alignment: Lawful Good
ac: 12
hp: 97
hit_dice: 13d10 + 26
modifier: 8
speed: 50 ft.
stats: [ 18, 14, 15, 11, 17, 16 ]
damage_immunities: poison
condition_immunities: charmed, paralysed, poisoned
senses: Darkvision 60 ft., passive Perception 13
languages: Celestial, Elvish, Sylvan; telepathy 120 ft.
cr: "5"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the unicorn fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The unicorn has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The unicorn makes one Hooves attack and one Radiant Horn attack.
  - name: Hooves
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 11 (2d6 + 4) Bludgeoning damage."
  - name: Radiant Horn
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 9 (1d10 + 4) Radiant damage."
  - name: Spellcasting
    desc: |-
      The unicorn casts one of the following spells, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 14):

      **At will:** *Detect Evil and Good*, *Druidcraft*

      **1/day each:** *Calm Emotions*, *Dispel Evil and Good*, *Entangle*, *Pass without Trace*, *Word of Recall*
bonus_actions:
  - name: Unicorn's Blessing (3/Day)
    desc: |
      The unicorn touches another creature with its horn and casts *Cure Wounds* or *Lesser Restoration* on that creature, using the same spellcasting ability as Spellcasting.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the unicorn can expend a use to take one of the following actions. The unicorn regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Charging Horn
    desc: The unicorn moves up to half its Speed without provoking Opportunity Attacks, and it makes one Radiant Horn attack.
  - name: Shimmering Shield
    desc: The unicorn targets itself or one creature it can see within 60 feet of itself. The target gains 10 (3d6) Temporary Hit Points, and its AC increases by 2 until the end of the unicorn's next turn. The unicorn can't take this action again until the start of its next turn.
```

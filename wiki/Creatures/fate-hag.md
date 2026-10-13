---
title: Fate Hag
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Fey
size: Medium
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Fate Hag
size: Medium
type: fey
alignment: typically Neutral
ac: 14
ac_class: natural armour
hp: 71
hit_dice: 13d8 + 13
modifier: 2
speed: 30 ft.
stats: [ 12, 14, 13, 12, 18, 15 ]
saves:
  - con: 3
  - wis: 6
skillsaves:
  - arcana: 5
  - deception: 6
  - history: 5
  - perception: 6
condition_immunities: charmed
senses: truesight 60 ft., passive Perception 16
languages: all
cr: "4"
traits:
  - name: Legendary Resistance (2/Day)
    desc: If the hag fails a saving throw, it can choose to succeed instead.
  - name: Trace the Threads (1/Day)
    desc: The hag can cast the *Legend Lore* spell, requiring no material components and using Wisdom as the spellcasting ability.
actions:
  - name: Multiattack
    desc: The hag makes two Shears attacks. It can replace one attack with a use of Spellcasting.
  - name: Shears
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 4) force damage. If the target is a creature, it has disadvantage on attack rolls until the end of the hag's next turn."
  - name: Spellcasting
    desc: |-
      While holding its shears, the hag casts one of the following spells, requiring no material components and using Wisdom as the spellcasting ability (spell save DC 14):

      **At will:** *Bless*, *Guidance*, *Silent Image*

      **1/day each:** *Bane*, *Bestow Curse*, *Divination*, *Scrying* (as an action)
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the fate hag can expend a use to take one of the following actions. The fate hag regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Destined Jaunt
    desc: The hag magically teleports, along with any equipment it is wearing or carrying, to an unoccupied space it can see within 30 feet of itself.
  - name: Tangle Threads
    desc: The hag magically tangles a creature it can see within 60 feet of itself in spectral silver threads. The creature must succeed on a DC 14 Strength saving throw, or its speed is reduced to 0 until the end of its next turn.
  - name: Destiny Curse (Costs 2 Actions)
    desc: The hag magically curses a creature it can see within 60 feet of itself. The creature must make a DC 14 Wisdom saving throw, and the creature has disadvantage on this save if it has damaged the hag within the last minute. On a failed save, the creature has disadvantage on ability checks, attack rolls, and saving throws until the curse ends. Once per turn, when the cursed creature fails one of those d20 rolls, it takes 7 (2d6) force damage. The curse ends after 1 minute; when the creature succeeds on a total of three ability checks, attack rolls, or saving throws in any combination; or when the hag uses this action again.
```

---
title: Duergar Soulblade
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Humanoid
size: Medium
habitat:
  - Mountain
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Duergar Soulblade
size: Medium
type: humanoid
subtype: dwarf
alignment: Any alignment
ac: 14
ac_class: leather armour
hp: 27
hit_dice: 6d8
modifier: 3
speed: 25 ft.
stats: [ 16, 16, 10, 11, 10, 12 ]
damage_resistances: poison
senses: darkvision 120 ft., passive Perception 10
languages: Dwarvish, Undercommon
cr: "1"
traits:
  - name: Duergar Resilience
    desc: The duergar has advantage on saving throws against spells and the charmed, paralysed, and poisoned conditions.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the duergar has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.
actions:
  - name: Soulblade
    desc: "*Melee Spell Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 10 (2d6 + 3) force damage, or 13 (3d6 + 3) force damage while under the effect of Enlarge."
  - name: Invisibility (Recharges after a Short or Long Rest)
    desc: The duergar magically turns invisible for up to 1 hour or until it attacks, it forces a creature to make a saving throw, or its concentration is broken (as if concentrating on a spell). Any equipment the duergar wears or carries is invisible with it.
bonus_actions:
  - name: Enlarge (Recharges after a Short or Long Rest)
    desc: For 1 minute, the duergar magically increases in size, along with anything it is wearing or carrying. While enlarged, the duergar is Large, doubles its damage dice on Strength-based weapon attacks (included in the attacks), and makes Strength checks and Strength saving throws with advantage. If the duergar lacks the room to become Large, it attains the maximum size possible in the space available.
```

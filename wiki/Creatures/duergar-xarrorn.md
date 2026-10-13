---
title: Duergar Xarrorn
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
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
name: Duergar Xarrorn
size: Medium
type: humanoid
subtype: dwarf
alignment: Any alignment
ac: 18
ac_class: plate armour
hp: 26
hit_dice: 4d8 + 8
modifier: 0
speed: 25 ft.
stats: [ 16, 11, 14, 11, 10, 9 ]
damage_resistances: poison
senses: darkvision 120 ft., passive Perception 10
languages: Dwarvish, Undercommon
cr: "2"
traits:
  - name: Duergar Resilience
    desc: The duergar has advantage on saving throws against spells and the charmed, paralysed, and poisoned conditions.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the duergar has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.
actions:
  - name: Fire Lance
    desc: "*Melee Weapon Attack:* +5 to hit, reach 10 ft., one target. *Hit:* 9 (1d12 + 3) piercing damage, or 16 (2d12 + 3) piercing damage while under the effect of Enlarge, plus 3 (1d6) fire damage."
  - name: Fire Spray (Recharge 5–6)
    desc: From its fire lance, the duergar shoots a 15-foot cone of fire or a line of fire 30 feet long and 5 feet wide. Each creature in that area must make a DC 12 Dexterity saving throw, taking 10 (3d6) fire damage on a failed save, or half as much damage on a successful one.
  - name: Invisibility (Recharges after a Short or Long Rest)
    desc: The duergar magically turns invisible for up to 1 hour or until it attacks, it forces a creature to make a saving throw, or its concentration is broken (as if concentrating on a spell). Any equipment the duergar wears or carries is invisible with it.
bonus_actions:
  - name: Enlarge (Recharges after a Short or Long Rest)
    desc: For 1 minute, the duergar magically increases in size, along with anything it is wearing or carrying. While enlarged, the duergar is Large, doubles its damage dice on Strength-based weapon attacks (included in the attacks), and makes Strength checks and Strength saving throws with advantage. If the duergar lacks the room to become Large, it attains the maximum size possible in the space available.
```

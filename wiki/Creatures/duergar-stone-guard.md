---
title: Duergar Stone Guard
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
name: Duergar Stone Guard
size: Medium
type: humanoid
subtype: dwarf
alignment: Any alignment
ac: 18
ac_class: chain mail, shield
hp: 39
hit_dice: 6d8 + 12
modifier: 0
speed: 25 ft.
stats: [ 18, 11, 14, 11, 10, 9 ]
damage_resistances: poison
gear:
  - javelin
  - shortsword
senses: darkvision 120 ft., passive Perception 10
languages: Dwarvish, Undercommon
cr: "2"
traits:
  - name: Duergar Resilience
    desc: The duergar has advantage on saving throws against spells and the charmed, paralysed, and poisoned conditions.
  - name: Phalanx Formation
    desc: The duergar has advantage on attack rolls and Dexterity saving throws while standing within 5 feet of an ally wielding a shield.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the duergar has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.
actions:
  - name: Multiattack
    desc: The duergar makes two Shortsword or Javelin attacks.
  - name: Shortsword
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 7 (1d6 + 4) piercing damage, or 11 (2d6 + 4) piercing damage while under the effect of Enlarge."
  - name: Javelin
    desc: "*Melee or Ranged Weapon Attack:* +6 to hit, reach 5 ft. or range 30/120 ft., one target. *Hit:* 7 (1d6 + 4) piercing damage, or 11 (2d6 + 4) piercing damage while under the effect of Enlarge."
  - name: Invisibility (Recharges after a Short or Long Rest)
    desc: The duergar magically turns invisible for up to 1 hour or until it attacks, it forces a creature to make a saving throw, or its concentration is broken (as if concentrating on a spell). Any equipment the duergar wears or carries is invisible with it.
bonus_actions:
  - name: Enlarge (Recharges after a Short or Long Rest)
    desc: For 1 minute, the duergar magically increases in size, along with anything it is wearing or carrying. While enlarged, the duergar is Large, doubles its damage dice on Strength-based weapon attacks (included in the attacks), and makes Strength checks and Strength saving throws with advantage. If the duergar lacks the room to become Large, it attains the maximum size possible in the space available.
```

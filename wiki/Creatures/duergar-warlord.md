---
title: Duergar Warlord
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
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
name: Duergar Warlord
size: Medium
type: humanoid
subtype: dwarf
alignment: Any alignment
ac: 20
ac_class: plate armour, shield
hp: 75
hit_dice: 10d8 + 30
modifier: 0
speed: 25 ft.
stats: [ 18, 11, 17, 12, 12, 14 ]
damage_resistances: poison
gear:
  - javelin
senses: darkvision 120 ft., passive Perception 11
languages: Dwarvish, Undercommon
cr: "6"
traits:
  - name: Duergar Resilience
    desc: The duergar has advantage on saving throws against spells and the charmed, paralysed, and poisoned conditions.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the duergar has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.
actions:
  - name: Multiattack
    desc: The duergar makes three Psychic-Attuned Hammer or Javelin attacks and uses Call to Attack.
  - name: Psychic-Attuned Hammer
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 9 (1d10 + 4) bludgeoning damage, or 15 (2d10 + 4) bludgeoning damage while under the effect of Enlarge, plus 5 (1d10) psychic damage."
  - name: Javelin
    desc: "*Melee or Ranged Weapon Attack:* +7 to hit, reach 5 ft. or range 30/120 ft., one target. *Hit:* 7 (1d6 + 4) piercing damage, or 11 (2d6 + 4) piercing damage while under the effect of Enlarge."
  - name: Call to Attack
    desc: Up to three allies within 120 feet of this duergar that can hear it can each use their reaction to make one weapon attack.
  - name: Invisibility (Recharge 4–6)
    desc: The duergar magically turns invisible for up to 1 hour or until it attacks, it forces a creature to make a saving throw, or its concentration is broken (as if concentrating on a spell). Any equipment the duergar wears or carries is invisible with it.
bonus_actions:
  - name: Enlarge (Recharges after a Short or Long Rest)
    desc: For 1 minute, the duergar magically increases in size, along with anything it is wearing or carrying. While enlarged, the duergar is Large, doubles its damage dice on Strength-based weapon attacks (included in the attacks), and makes Strength checks and Strength saving throws with advantage. If the duergar lacks the room to become Large, it attains the maximum size possible in the space available.
reactions:
  - name: Scouring Instruction
    desc: When an ally that the duergar can see makes a d20 roll, the duergar can roll a d6, and the ally can add the number rolled to the d20 by taking 3 (1d6) psychic damage.
```

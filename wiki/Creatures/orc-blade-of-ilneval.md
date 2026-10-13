---
title: Orc Blade of Ilneval
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Humanoid
size: Medium
habitat:
  - Underdark
  - Mountain
  - Grassland
  - Forest
  - Hill
sourcebooks:
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Orc Blade of Ilneval
size: Medium
type: humanoid
subtype: orc
alignment: Chaotic Evil
ac: 18
ac_class: chain mail, shield
hp: 60
hit_dice: 8d8 + 24
modifier: 0
speed: 30 ft.
stats: [ 17, 11, 17, 10, 12, 14 ]
saves:
  - wis: 3
skillsaves:
  - insight: 3
  - intimidation: 4
  - perception: 3
gear:
  - javelin
  - longsword
senses: darkvision 60 ft., passive Perception 13
languages: Common, Orc
cr: "4"
traits:
  - name: Aggressive
    desc: As a bonus action, the orc can move up to its speed toward a hostile creature that it can see.
  - name: Foe Smiter of Ilneval
    desc: The orc deals an extra die of damage when it hits with a longsword attack (included in the attack).
actions:
  - name: Multiattack
    desc: The orc makes two melee attacks with its longsword or two ranged attacks with its javelins. If Ilneval's Command is available to use, the orc can use it after these attacks.
  - name: Longsword
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 12 (2d8 + 3) slashing damage, or 14 (2d10 + 3) slashing damage when used with two hands."
  - name: Javelin
    desc: "*Melee or Ranged Weapon Attack:* +5 to hit, reach 5 ft. or range 30/120 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage."
  - name: Ilneval's Command (Recharge 4–6)
    desc: Up to three allied orcs within 120 feet of this orc that can hear it can use their reactions to each make one weapon attack.
```

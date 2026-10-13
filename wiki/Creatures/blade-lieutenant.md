---
title: Blade Lieutenant
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Construct
size: Medium
habitat: []
sourcebooks:
  - "Vecna: Eve of Ruin"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Blade Lieutenant
size: Medium
type: construct
subtype: warforged
alignment: typically Lawful Evil
ac: 16
ac_class: natural armour
hp: 153
hit_dice: 18d8 + 72
modifier: 1
speed: 30 ft.
stats: [ 18, 13, 19, 14, 14, 17 ]
saves:
  - int: 6
  - cha: 7
skillsaves:
  - insight: 6
  - intimidation: 7
  - perception: 6
damage_resistances: poison
condition_immunities: exhaustion, poisoned
gear:
  - longsword
senses: passive Perception 16
languages: Common
cr: "9"
traits:
  - name: Pack Tactics
    desc: The lieutenant has advantage on an attack roll against a creature if at least one of the lieutenant's allies is within 5 feet of the creature and the ally doesn't have the incapacitated condition.
actions:
  - name: Multiattack
    desc: The lieutenant makes three Longsword or Javelin Launcher attacks.
  - name: Longsword
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 17 (3d8 + 4) slashing damage, or 20 (3d10 + 4) slashing damage if used with two hands."
  - name: Javelin Launcher
    desc: "*Ranged Weapon Attack:* +8 to hit, range 30/120 ft., one target. *Hit:* 14 (3d6 + 4) piercing damage, and the target has the prone condition."
bonus_actions:
  - name: Command Ally
    desc: The lieutenant targets one ally it can see within 30 feet of itself. If the target can see or hear the lieutenant, the target can make one melee attack using its reaction, if available, and has advantage on the attack roll.
  - name: Rally the Troops (1/Day)
    desc: The lieutenant ends the charmed and frightened conditions on itself and each creature of its choice that it can see within 30 feet of itself.
reactions:
  - name: Parry
    desc: The lieutenant adds 3 to its AC against one melee attack that would hit it. To do so, the lieutenant must see the attacker and be wielding a melee weapon.
```

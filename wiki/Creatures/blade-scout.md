---
title: Blade Scout
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Construct
size: Medium
habitat: []
sourcebooks:
  - "Vecna: Eve of Ruin"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Blade Scout
size: Medium
type: construct
subtype: warforged
alignment: typically Lawful Evil
ac: 18
ac_class: natural armour
hp: 105
hit_dice: 14d8 + 42
modifier: 5
speed: 30 ft.
stats: [ 14, 20, 16, 10, 19, 10 ]
saves:
  - dex: 8
  - wis: 7
skillsaves:
  - acrobatics: 8
  - perception: 7
  - stealth: 8
damage_resistances: poison
condition_immunities: exhaustion, poisoned
senses: passive Perception 17
languages: Common
cr: "7"
traits:
  - name: Pack Tactics
    desc: The scout has advantage on an attack roll against a creature if at least one of the scout's allies is within 5 feet of the creature and the ally doesn't have the incapacitated condition.
actions:
  - name: Multiattack
    desc: The scout makes three Armblade or Bolt Launcher attacks. It can replace one of the attacks with a use of Snare Trap.
  - name: Armblade
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 12 (2d6 + 5) slashing damage."
  - name: Bolt Launcher
    desc: "*Ranged Weapon Attack:* +8 to hit, range 80/320 ft., one target. *Hit:* 9 (1d8 + 5) piercing damage."
  - name: Snare Trap (1/Day)
    desc: The scout deploys a Tiny mechanical trap on a solid surface within 5 feet of itself. The trap is hidden, requiring a successful DC 17 Intelligence (Investigation) check to find. The trap lasts for 1 minute. Whenever an enemy enters a space within 10 feet of the trap or starts its turn there, it must succeed on a DC 16 Dexterity saving throw or take 21 (6d6) piercing damage and have the prone condition. A creature makes this saving throw only once per turn.
bonus_actions:
  - name: Dash
    desc: The scout moves up to its speed without provoking opportunity attacks.
```

---
title: Grim Champion of Bloodshed
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 20
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - The Book of Many Things
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Grim Champion of Bloodshed
size: Medium
type: undead
alignment: Chaotic Evil
ac: 18
ac_class: plate armour
hp: 280
hit_dice: 33d8 + 132
modifier: 1
speed: 40 ft.
stats: [ 23, 12, 18, 10, 17, 21 ]
saves:
  - str: 12
  - dex: 7
  - con: 10
skillsaves:
  - athletics: 12
  - intimidation: 11
  - perception: 9
damage_resistances: cold; necrotic; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: poison
condition_immunities: blinded, charmed, deafened, exhaustion, frightened, poisoned, stunned, unconscious
senses: darkvision 60 ft., passive Perception 19
languages: Common
cr: "20"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the champion fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The champion makes four Blazing Morningstar attacks. It can replace one of these attacks with Blade Storm, if available.
  - name: Blazing Morningstar
    desc: "*Melee Weapon Attack:* +12 to hit, reach 5 ft., one target. *Hit:* 10 (1d8 + 6) piercing damage plus 14 (4d6) fire damage."
  - name: Blade Storm (Recharge 5–6)
    desc: The champion conjures a churning storm of spectral blades that fills a 20-foot cube centred on a point it can see within 120 feet of itself. The storm lasts until the start of the champion's next turn. While the storm is active, the area of the storm is difficult terrain. Whenever a creature enters the storm for the first time on a turn or starts its turn there, it must make a DC 19 Dexterity saving throw, taking 27 (6d8) slashing damage on a failed saving throw, or half as much damage on a successful one.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the grim champion of bloodshed can expend a use to take one of the following actions. The grim champion of bloodshed regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Furious Pursuit
    desc: The champion moves up to its speed or commands its mount to move up to its speed. This movement doesn't provoke opportunity attacks.
  - name: Induce Violence
    desc: The champion targets one creature it can see within 60 feet of itself. The target must succeed on a DC 19 Wisdom saving throw or immediately make one melee weapon attack against another creature of the champion's choice that is within the target's reach. If no creature is within the target's reach or if the target has the incapacitated condition, the target instead takes 11 (2d10) psychic damage.
  - name: Menace (Costs 2 Actions)
    desc: The champion chooses any number of creatures it can see within 30 feet of itself. Each target must succeed on a DC 19 Wisdom saving throw or have the frightened condition until the end of its next turn.
```

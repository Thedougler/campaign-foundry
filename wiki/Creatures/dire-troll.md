---
title: Dire Troll
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 13
creature_type: Giant
size: Huge
habitat:
  - Arctic
  - Forest
  - Hill
  - Mountain
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Dire Troll
size: Huge
type: giant
alignment: Typically Chaotic Evil
ac: 15
ac_class: natural armour
hp: 172
hit_dice: 15d12 + 75
modifier: 2
speed: 40 ft.
stats: [ 22, 15, 21, 9, 11, 5 ]
saves:
  - wis: 5
  - cha: 2
skillsaves:
  - perception: 5
damage_resistances: bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: frightened, poisoned
senses: darkvision 60 ft., passive Perception 15
languages: Giant
cr: "13"
traits:
  - name: Regeneration
    desc: The troll regains 10 hit points at the start of its turn. If the troll takes acid or fire damage, it regains only 5 hit points at the start of its next turn. The troll dies only if it is hit by an attack that deals 10 or more acid or fire damage while the troll has 0 hit points.
actions:
  - name: Multiattack
    desc: The troll makes one Bite attack and four Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +11 to hit, reach 10 ft., one target. *Hit:* 10 (1d8 + 6) piercing damage plus 5 (1d10) poison damage."
  - name: Claws
    desc: "*Melee Weapon Attack:* +11 to hit, reach 10 ft., one target. *Hit:* 16 (3d6 + 6) slashing damage."
  - name: Whirlwind of Claws (Recharge 5–6)
    desc: Each creature within 10 feet of the troll must make a DC 19 Dexterity saving throw, taking 44 (8d10) slashing damage on a failed save, or half as much damage on a successful one.
```

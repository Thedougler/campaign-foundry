---
title: Darkweaver
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Aberration
size: Medium
habitat: []
sourcebooks:
  - Morte's Planar Parade
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Darkweaver
size: Medium
type: aberration
alignment: typically Chaotic Evil
ac: 16
ac_class: natural armour
hp: 149
hit_dice: 23d8 + 46
modifier: 3
speed: 50 ft., climb 50 ft.
stats: [ 10, 17, 14, 17, 14, 15 ]
saves:
  - dex: 7
  - wis: 6
skillsaves:
  - perception: 6
  - stealth: 7
damage_resistances: cold
damage_immunities: necrotic
senses: darkvision 120 ft., passive Perception 16
languages: Abyssal, Deep Speech, telepathy 120 ft.
cr: "10"
traits:
  - name: Shadowy Form
    desc: While the darkweaver is in dim light or darkness, attack rolls against it are made with disadvantage unless the darkweaver has the incapacitated condition.
  - name: Spider Climb
    desc: The darkweaver can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
  - name: Sunlight Hypersensitivity
    desc: The darkweaver takes 10 radiant damage when it starts its turn in sunlight. While in sunlight, it has disadvantage on attack rolls and ability checks.
actions:
  - name: Multiattack
    desc: The darkweaver makes two Shadow Web attacks and one Bite attack. It can use Reel after any of these attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +7 to hit, reach 10 ft., one target. *Hit:* 13 (3d6 + 3) piercing damage plus 17 (5d6) necrotic damage, and if the target is a creature, the target's hit point maximum is reduced by an amount equal to the necrotic damage taken. This reduction lasts until the target finishes a long rest. The target dies if its hit point maximum is reduced to 0."
  - name: Shadow Web
    desc: "*Ranged Weapon Attack:* +7 to hit, reach 120 ft., one creature. *Hit:* 16 (3d10) necrotic damage, and the target has the grappled condition (escape DC 15). The shadow web can be attacked and destroyed (AC 16; 20 hit points; vulnerability to radiant damage; immunity to bludgeoning, necrotic, poison, and psychic damage). The darkweaver can grapple up to six creatures at a time using its shadow web."
  - name: Reel
    desc: The darkweaver pulls each creature it has grappled up to 60 feet toward itself.
```

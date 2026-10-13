---
title: Blood Drinker Vampire
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - Guildmasters' Guide to Ravnica
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Blood Drinker Vampire
size: Medium
type: undead
alignment: Lawful Evil
ac: 16
ac_class: natural armour
hp: 90
hit_dice: 12d8 + 36
modifier: 4
speed: 40 ft., fly 40 ft. (hover)
stats: [ 16, 18, 17, 16, 13, 19 ]
saves:
  - dex: 7
  - con: 6
  - wis: 4
skillsaves:
  - intimidation: 7
  - perception: 4
  - stealth: 7
damage_resistances: necrotic; bludgeoning, piercing, slashing from nonmagical attacks
gear:
  - rapier
senses: darkvision 60 ft., passive Perception 14
languages: the languages it knew in life
cr: "8"
actions:
  - name: Multiattack
    desc: The vampire makes three melee attacks, only one of which can be a bite attack.
  - name: Bite
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one willing creature, or a creature that is grappled by the vampire, incapacitated, or restrained. *Hit:* 7 (1d6 + 4) piercing damage plus 7 (2d6) necrotic damage. If the target is humanoid, it must succeed on a DC 15 Charisma saving throw or be charmed by the vampire for 1 minute. While charmed in this way, the target is infatuated with the vampire. The target's hit point maximum is reduced by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. The reduction lasts until the target finishes a long rest. The target dies if its hit point maximum is reduced to 0."
  - name: Rapier
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 4) piercing damage."
  - name: Unarmed Strike
    desc: "*Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 7 (1d8 + 3) bludgeoning damage. The vampire can also grapple the target (escape DC 14) if it is a creature and the vampire has a hand free."
reactions:
  - name: Parry
    desc: The vampire adds 3 to its AC against one melee attack that would hit it. To do so, the vampire must see the attacker and be wielding a melee weapon.
```

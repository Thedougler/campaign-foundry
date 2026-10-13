---
title: Zakya Rakshasa
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Fiend
size: Medium
habitat: []
sourcebooks:
  - "Eberron: Rising from the Last War"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Zakya Rakshasa
size: Medium
type: fiend
alignment: Lawful Evil
ac: 18
ac_class: scale mail, shield
hp: 59
hit_dice: 7d8 + 28
modifier: 2
speed: 30 ft.
stats: [ 18, 14, 18, 12, 13, 11 ]
skillsaves:
  - athletics: 7
  - perception: 4
damage_vulnerabilities: piercing from magic weapons wielded by good creatures
damage_resistances: bludgeoning, piercing, slashing from nonmagical attacks
gear:
  - javelin
  - longsword
senses: darkvision 60 ft., passive Perception 14
languages: Common, Infernal
cr: "5"
traits:
  - name: Innate Spellcasting
    desc: |-
      The rakshasa's innate spellcasting ability is Charisma (spell save DC 11). The rakshasa can innately cast the following spells, requiring no material components:

      **At will:** *detect thoughts*, *disguise self*

      **1/day:** *shield*
  - name: Limited Magic Immunity
    desc: The rakshasa can't be affected or detected by spells of 1st level or lower unless it wishes to be. It has advantage on saving throws against all other spells and magical effects.
  - name: Magic Weapons
    desc: The rakshasa's weapon attacks are magical.
  - name: Martial Prowess (1/Turn)
    desc: When the rakshasa hits a creature with a melee weapon attack, the attack deals an extra 11 (2d10) damage of the weapon's type, and the creature must make a DC 15 Strength saving throw. On a failure, the rakshasa can push the creature up to 10 feet away from it, knock the creature prone, or make the creature drop one item it is holding of the rakshasa's choice.
actions:
  - name: Multiattack
    desc: The rakshasa makes three melee weapon attacks. Alternatively, it can make two ranged attacks with its javelins.
  - name: Longsword
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 4) slashing damage, or 9 (1d10 + 4) slashing damage if used with two hands."
  - name: Javelin
    desc: "*Melee or Ranged Weapon Attack:* +7 to hit, reach 5 ft. or range 30/120 ft., one target. *Hit:* 7 (1d6 + 4) piercing damage."
```

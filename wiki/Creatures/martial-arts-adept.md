---
title: Martial Arts Adept
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Humanoid
size: Medium
habitat:
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Martial Arts Adept
size: Medium
type: humanoid
alignment: Any alignment
ac: 16
ac_class: Unarmored Defense
hp: 60
hit_dice: 11d8 + 11
modifier: 3
speed: 40 ft.
stats: [ 11, 17, 13, 11, 16, 10 ]
skillsaves:
  - acrobatics: 5
  - insight: 5
  - stealth: 5
gear:
  - dart
senses: passive Perception 13
languages: any one language (usually Common)
cr: "3"
traits:
  - name: Unarmored Defense
    desc: While the adept is wearing no armour and wielding no shield, its AC includes its Wisdom modifier.
actions:
  - name: Multiattack
    desc: The adept makes three Unarmed Strike attacks or five Dart attacks.
  - name: Unarmed Strike
    desc: |-
      *Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 7 (1d8 + 3) bludgeoning damage. Once per turn, the adept can cause one of the following additional effects (choose one or roll a d4):

      - **1–2 Knock Down..** The target must succeed on a DC 13 Dexterity saving throw or be knocked prone.  
      - **3–4 Push..** The target must succeed on a DC 13 Strength saving throw or be pushed up to 10 feet directly away from the adept.  
  - name: Dart
    desc: "*Ranged Weapon Attack:* +5 to hit, range 20/60 ft., one target. *Hit:* 5 (1d4 + 3) piercing damage."
reactions:
  - name: Deflect Missile
    desc: In response to being hit by a ranged weapon attack, the adept deflects the missile. The damage it takes from the attack is reduced by 1d10 + 3. If the damage is reduced to 0, the adept catches the missile if it's small enough to hold in one hand and the adept has a hand free.
```

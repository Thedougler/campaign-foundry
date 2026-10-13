---
title: Oinoloth
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Fiend
size: Medium
habitat:
  - Desert
  - Underdark
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Mordenkainen's Tome of Foes
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Oinoloth
size: Medium
type: fiend
subtype: yugoloth
alignment: Typically Neutral Evil
ac: 17
ac_class: natural armour
hp: 119
hit_dice: 14d8 + 56
modifier: 3
speed: 40 ft.
stats: [ 19, 17, 18, 17, 16, 19 ]
saves:
  - con: 8
  - wis: 7
skillsaves:
  - deception: 8
  - intimidation: 8
  - perception: 7
damage_resistances: cold; fire; lightning; bludgeoning, piercing, slashing from nonmagical attacks
damage_immunities: acid, poison
condition_immunities: poisoned
senses: blindsight 60 ft., darkvision 60 ft., passive Perception 17
languages: Abyssal, Infernal, telepathy 60 ft.
cr: "12"
traits:
  - name: Magic Resistance
    desc: The oinoloth has advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The oinoloth makes two Claw attacks, and it uses Spellcasting or Teleport.
  - name: Claw
    desc: "*Melee Weapon Attack:* +8 to hit, reach 5 ft., one target. *Hit:* 14 (3d6 + 4) slashing damage plus 22 (4d10) necrotic damage."
  - name: Corrupted Healing (Recharge 6)
    desc: "The oinoloth touches one willing creature within 5 feet of it. The target regains all its hit points. In addition, the oinoloth can end one disease on the target or remove one of the following conditions from it: blinded, deafened, paralysed, or poisoned. The target then gains 1 level of exhaustion, and its hit point maximum is reduced by 7 (2d6). This reduction can be removed only by a *wish* spell or by casting *greater restoration* on the target three times within the same hour. The target dies if its hit point maximum is reduced to 0."
  - name: Teleport
    desc: The oinoloth teleports, along with any equipment it is wearing or carrying, up to 60 feet to an unoccupied space it can see.
  - name: Spellcasting
    desc: |-
      The oinoloth casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 16):

      **At will:** *darkness*, *detect magic*, *dispel magic*, *hold monster*, *invisibility* (self only)

      **1/day each:** *feeblemind*, *globe of invulnerability*
bonus_actions:
  - name: Bringer of Plagues (Recharge 5–6)
    desc: |-
      The oinoloth blights the area in a 30-foot-radius sphere centred on itself. The blight lasts for 24 hours. While the area is blighted, all normal plants there wither and die.

      Furthermore, when a creature moves into the blighted area or starts its turn there, that creature must make a DC 16 Constitution saving throw. On a failed save, the creature takes 14 (4d6) poison damage and is poisoned. On a successful save, the creature is immune to the oinoloth's Bringer of Plagues for the next 24 hours.

      The poisoned creature can't regain hit points. After every 24 hours that elapse, the poisoned creature can repeat the saving throw. On a failed save, the creature's hit point maximum is reduced by 5 (1d10). This reduction lasts until the poison ends, and the target dies if its hit point maximum is reduced to 0. The poison ends after the creature successfully saves against it three times.
```

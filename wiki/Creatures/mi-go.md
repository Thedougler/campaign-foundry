---
title: Mi-Go
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 9
creature_type: Aberration
size: Medium
habitat:
  - Forest
  - Hill
  - Mountain
  - Underdark
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Mi-Go
size: Medium
type: aberration
alignment: Neutral Evil
ac: 16
hp: 120
hit_dice: 16d8 + 48
modifier: 6
speed: 30 ft., fly 30 ft.
stats: [ 20, 15, 16, 21, 15, 12 ]
saves:
  - dex: 6
  - int: 9
  - wis: 6
skillsaves:
  - arcana: 9
  - perception: 6
  - stealth: 6
damage_resistances: acid, lightning
condition_immunities: charmed, frightened
senses: Truesight 120 ft., passive Perception 16
languages: all; telepathy 120 ft.
cr: "9"
traits:
  - name: Magic Resistance
    desc: The mi-go has Advantage on saving throws against spells and other magical effects.
  - name: Silver Canister
    desc: |-
      The mi-go has a silver canister. While holding or carrying the canister, the mi-go can use its Extract Brain action.

      The canister has AC 15, HP 40, and Resistance to all damage. The canister breaks if reduced to 0 Hit Points. If the canister is broken, any brains inside it are destroyed. The mi-go can create a new canister after 7 days.
actions:
  - name: Multiattack
    desc: The mi-go makes two Pincer attacks. It can replace one attack with a use of Dazing Ray if available.
  - name: Pincer
    desc: "*Melee Attack Roll:* +9, reach 5 ft. *Hit:* 23 (4d8 + 5) Slashing damage plus 16 (3d10) Acid damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 15) from one of two pincers."
  - name: Dazing Ray (Recharge 4–6)
    desc: "*Dexterity Saving Throw:* DC 17, one creature the mi-go can see within 60 feet. *Failure:* 22 (4d10) Lightning damage plus 10 (3d6) Force damage, and the target has the Stunned condition until the end of the mi-go's next turn."
  - name: Extract Brain (Requires Silver Canister)
    desc: "*Constitution Saving Throw:* DC 17, one creature that is Grappled by the mi-go or that has the Stunned condition. *Failure:* 77 (14d10) Piercing damage. *Success:* Half damage. *Failure or Success:* If this damage reduces the target to 0 Hit Points, the mi-go kills it, removes its brain, and places the brain in its silver canister."
  - name: Spellcasting
    desc: |-
      The mi-go casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 17):

      **1/day each:** *Modify Memory*, *Plane Shift* (self only)
```

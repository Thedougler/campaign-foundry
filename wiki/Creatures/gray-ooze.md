---
title: Gray Ooze
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.5
creature_type: Ooze
size: Medium
habitat:
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Gray Ooze
size: Medium
type: ooze
alignment: Unaligned
ac: 9
hp: 22
hit_dice: 3d8 + 9
modifier: -2
speed: 10 ft., climb 10 ft.
stats: [ 12, 6, 16, 1, 6, 2 ]
skillsaves:
  - stealth: 2
damage_resistances: acid, cold, fire
condition_immunities: blinded, charmed, deafened, exhaustion, frightened, grappled, prone, restrained
senses: Blindsight 60 ft., passive Perception 8
cr: 1/2
traits:
  - name: Amorphous
    desc: The ooze can move through a space as narrow as 1 inch without expending extra movement to do so.
  - name: Corrosive Form
    desc: |-
      Nonmagical ammunition is destroyed immediately after hitting the ooze and dealing any damage. Any nonmagical weapon takes a cumulative -1 penalty to attack rolls immediately after dealing damage to the ooze and coming into contact with it. The weapon is destroyed if the penalty reaches -5. The penalty can be removed by casting the *Mending* spell on the weapon.

      The ooze can eat through 2-inch-thick, nonmagical metal or wood in 1 round.
actions:
  - name: Pseudopod
    desc: "*Melee Attack Roll:* +3, reach 5 ft. *Hit:* 10 (2d8 + 1) Acid damage. Nonmagical armour worn by the target takes a -1 penalty to the AC it offers. The armour is destroyed if the penalty reduces its AC to 10. The penalty can be removed by casting the *Mending* spell on the armour."
```

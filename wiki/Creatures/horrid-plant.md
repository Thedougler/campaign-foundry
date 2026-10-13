---
title: Horrid Plant
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Plant
size: Large
habitat: []
sourcebooks:
  - Quests from the Infinite Staircase
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Horrid Plant
size: Large
type: plant
alignment: Unaligned
ac: 6
hp: 42
hit_dice: 5d10 + 15
modifier: -4
speed: 5 ft.
stats: [ 18, 3, 17, 1, 10, 1 ]
condition_immunities: blinded, deafened
senses: blindsight 60 ft. (can't see beyond this radius), passive Perception 10
cr: "4"
traits:
  - name: Horrid Plant Varieties
    desc: "A horrid plant comes in one of three varieties (choose or roll a d6): 1–2, dew drinker; 3–4, purple blossom; or 5–6, snapper saw. This form determines certain traits in this stat block."
  - name: False Appearance
    desc: If the horrid plant is motionless at the start of combat, it has advantage on its initiative roll. Moreover, if a creature hasn't observed the horrid plant move or act, that creature must succeed on a DC 18 Intelligence (Nature) check to discern that the horrid plant isn't an ordinary plant.
actions:
  - name: Multiattack
    desc: The horrid plant makes two Tendril attacks.
  - name: Tendril
    desc: "*Melee Weapon Attack:* +6 to hit, reach 30 ft., one target. *Hit:* 7 (2d6) bludgeoning damage. If the target is a Huge or smaller creature, it has the grappled condition (escape DC 14), and the horrid plant can pull the target up to 25 feet closer to itself. Until the grapple ends, the target has the restrained condition, and the horrid plant can't use the same tendril on another target. The horrid plant has two tendrils."
bonus_actions:
  - name: Sap Squirt (Purple Blossom Only)
    desc: The horrid plant targets one creature it can see within 15 feet of itself. The target must succeed on a DC 14 Dexterity saving throw or take 28 (8d6) acid damage and become covered in acidic sap. This sap lasts for 1 minute or until a creature uses its action to scrape the sap off itself or another creature it can reach. A creature covered in sap takes 14 (4d6) acid damage at the start of each of its turns.
  - name: Spiked Leaves (Snapper Saw Only)
    desc: Creatures within 10 feet of the horrid plant and not behind total cover must make a DC 14 Dexterity saving throw, taking 21 (6d6) slashing damage on a failed save or half as much damage on a successful one.
  - name: Vampiric Tendril (Dew Drinker Only)
    desc: One creature grappled by the horrid plant must make a DC 13 Constitution saving throw, taking 10 (3d6) necrotic damage on a failed save or half as much damage on a successful one. The target's hit point maximum is reduced by an amount equal to the damage taken, and the horrid plant regains hit points equal to that amount. This reduction lasts until the target finishes a long rest. The target dies if this effect reduces its hit point maximum to 0.
```

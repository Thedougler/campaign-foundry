---
title: Black Pudding
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Ooze
size: Large
habitat:
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Black Pudding
size: Large
type: ooze
alignment: Unaligned
ac: 7
hp: 68
hit_dice: 8d10 + 24
modifier: -3
speed: 20 ft., climb 20 ft.
stats: [ 16, 5, 16, 1, 6, 1 ]
damage_immunities: acid, cold, lightning, slashing
condition_immunities: charmed, deafened, exhaustion, frightened, grappled, prone, restrained
senses: Blindsight 60 ft., passive Perception 8
cr: "4"
traits:
  - name: Amorphous
    desc: The pudding can move through a space as narrow as 1 inch without expending extra movement to do so.
  - name: Corrosive Form
    desc: |-
      A creature that hits the pudding with a melee attack roll takes 4 (1d8) Acid damage. Nonmagical ammunition is destroyed immediately after hitting the pudding and dealing any damage. Any nonmagical weapon takes a cumulative -1 penalty to attack rolls immediately after dealing damage to the pudding and coming into contact with it. The weapon is destroyed if the penalty reaches -5. The penalty can be removed by casting the *Mending* spell on the weapon.

      In 1 minute, the pudding can eat through 2 feet of nonmagical wood or metal.
  - name: Spider Climb
    desc: The pudding can climb difficult surfaces, including along ceilings, without needing to make an ability check.
actions:
  - name: Dissolving Pseudopod
    desc: "*Melee Attack Roll:* +5, reach 10 ft. *Hit:* 17 (4d6 + 3) Acid damage. Nonmagical armour worn by the target takes a -1 penalty to the AC it offers. The armour is destroyed if the penalty reduces its AC to 10. The penalty can be removed by casting the *Mending* spell on the armour."
reactions:
  - name: Split
    desc: "Trigger: While the pudding is Large or Medium and has 10+ Hit Points, it becomes Bloodied or is subjected to Lightning or Slashing damage. _Response:_ The pudding splits into two new Black Puddings. Each new pudding is one size smaller than the original pudding and acts on its Initiative. The original pudding's Hit Points are divided evenly between the new puddings (round down)."
```

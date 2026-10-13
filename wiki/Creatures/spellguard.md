---
title: Spellguard
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Humanoid
size: Medium
habitat:
  - Urban
sourcebooks:
  - Arcana Unleashed
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Spellguard
size: Medium
type: humanoid
alignment: Lawful Neutral
ac: 20
hp: 105
hit_dice: 14d8 + 42
modifier: 3
speed: 30 ft.
stats: [ 18, 11, 16, 12, 13, 10 ]
skillsaves:
  - arcana: 4
  - athletics: 7
  - perception: 4
gear:
  - flail
  - six javelins
  - plate armour
  - shield
senses: passive Perception 14
languages: Common
cr: "5"
traits:
  - name: Superior Magic Resistance
    desc: The spellguard has Advantage on saving throws against spells and other magical effects. Spell attack rolls have Disadvantage against the spellguard.
actions:
  - name: Multiattack
    desc: The spellguard makes two attacks, using Force Flail or Javelin in any combination.
  - name: Force Flail
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 8 (1d8 + 4) Bludgeoning damage plus 7 (2d6) Force damage."
  - name: Javelin
    desc: "*Melee or Ranged Attack Roll:* +7, reach 5 ft. or range 30/120 ft. *Hit:* 14 (3d6 + 4) Piercing damage."
reactions:
  - name: Defensive Divination
    desc: "Trigger: A creature the spellguard can see hits an ally within 5 feet of the spellguard with an attack roll, or an ally within 5 feet of the spellguard fails a saving throw against a spell or other magical effect. _Response:_ The spellguard rolls 1d20 and chooses whether to use that roll in place of the d20 rolled for the attack roll or saving throw."
```

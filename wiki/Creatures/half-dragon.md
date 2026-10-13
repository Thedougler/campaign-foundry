---
title: Half-Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Dragon
size: Medium
habitat:
  - Any
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Half-Dragon
size: Medium
type: dragon
alignment: Neutral
ac: 18
hp: 105
hit_dice: 14d8 + 42
modifier: 5
speed: 40 ft.
stats: [ 19, 14, 16, 10, 15, 14 ]
saves:
  - dex: 5
  - wis: 5
skillsaves:
  - athletics: 7
  - perception: 5
  - stealth: 5
damage_resistances: Damage type chosen for the Draconic Origin trait below
senses: Blindsight 10 ft., Darkvision 60 ft., passive Perception 15
languages: Common, Draconic
cr: "5"
traits:
  - name: Draconic Origin
    desc: "The half-dragon is related to a type of dragon associated with one of the following damage types (DM's choice): Acid, Cold, Fire, Lightning, or Poison. This choice affects other aspects of the stat block."
actions:
  - name: Multiattack
    desc: The half-dragon makes two Claw attacks.
  - name: Claw
    desc: "*Melee Attack Roll:* +7, reach 10 ft. *Hit:* 6 (1d4 + 4) Slashing damage plus 7 (2d6) damage of the type chosen for the Draconic Origin trait."
  - name: Dragon's Breath (Recharge 5–6)
    desc: "*Dexterity Saving Throw:* DC 14, each creature in a 30-foot Cone. *Failure:* 28 (8d6) damage of the type chosen for the Draconic Origin trait. *Success:* Half damage."
bonus_actions:
  - name: Leap
    desc: The half-dragon jumps up to 30 feet by spending 10 feet of movement.
```

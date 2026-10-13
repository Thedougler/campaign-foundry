---
title: Gold Dragon Wyrmling
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Dragon
size: Medium
habitat:
  - Forest
  - Grassland
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Gold Dragon Wyrmling
size: Medium
type: dragon
subtype: metallic
alignment: Lawful Good
ac: 17
hp: 60
hit_dice: 8d8 + 24
modifier: 4
speed: 30 ft., fly 60 ft., swim 30 ft.
stats: [ 19, 14, 17, 14, 11, 16 ]
saves:
  - dex: 4
  - wis: 2
skillsaves:
  - perception: 4
  - stealth: 4
damage_immunities: fire
senses: Blindsight 10 ft., Darkvision 60 ft., passive Perception 14
languages: Draconic
cr: "3"
traits:
  - name: Amphibious
    desc: The dragon can breathe air and water.
actions:
  - name: Multiattack
    desc: The dragon makes two Rend attacks.
  - name: Rend
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 9 (1d10 + 4) Slashing damage."
  - name: Fire Breath (Recharge 5–6)
    desc: "*Dexterity Saving Throw:* DC 13, each creature in a 15-foot Cone. *Failure:* 22 (4d10) Fire damage. *Success:* Half damage."
  - name: Weakening Breath
    desc: "*Strength Saving Throw:* DC 13, each creature that isn't currently affected by this breath in a 15-foot Cone. *Failure:* The target has Disadvantage on Strength-based D20 Tests and subtracts 2 (1d4) from its damage rolls. It repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically."
```

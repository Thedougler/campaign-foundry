---
title: Young Gold Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Dragon
size: Large
habitat:
  - Forest
  - Grassland
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Young Gold Dragon
size: Large
type: dragon
subtype: metallic
alignment: Lawful Good
ac: 18
hp: 178
hit_dice: 17d10 + 85
modifier: 6
speed: 40 ft., fly 80 ft., swim 40 ft.
stats: [ 23, 14, 21, 16, 13, 20 ]
saves:
  - dex: 6
  - wis: 5
skillsaves:
  - insight: 5
  - perception: 9
  - persuasion: 9
  - stealth: 6
damage_immunities: fire
senses: Blindsight 30 ft., Darkvision 120 ft., passive Perception 19
languages: Common, Draconic
cr: "10"
traits:
  - name: Amphibious
    desc: The dragon can breathe air and water.
actions:
  - name: Multiattack
    desc: The dragon makes three Rend attacks. It can replace one attack with a use of Weakening Breath.
  - name: Rend
    desc: "*Melee Attack Roll:* +10, reach 10 ft. *Hit:* 17 (2d10 + 6) Slashing damage."
  - name: Fire Breath (Recharge 5–6)
    desc: "*Dexterity Saving Throw:* DC 17, each creature in a 30-foot Cone. *Failure:* 55 (10d10) Fire damage. *Success:* Half damage."
  - name: Weakening Breath
    desc: "*Strength Saving Throw:* DC 17, each creature that isn't currently affected by this breath in a 30-foot Cone. *Failure:* The target has Disadvantage on Strength-based D20 Tests and subtracts 3 (1d6) from its damage rolls. It repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically."
```

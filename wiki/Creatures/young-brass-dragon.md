---
title: Young Brass Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Dragon
size: Large
habitat:
  - Desert
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Young Brass Dragon
size: Large
type: dragon
subtype: metallic
alignment: Chaotic Good
ac: 17
hp: 110
hit_dice: 13d10 + 39
modifier: 3
speed: 40 ft., burrow 20 ft., fly 80 ft.
stats: [ 19, 10, 17, 12, 11, 15 ]
saves:
  - dex: 3
  - wis: 3
skillsaves:
  - perception: 6
  - persuasion: 5
  - stealth: 3
damage_immunities: fire
senses: Blindsight 30 ft., Darkvision 120 ft., passive Perception 16
languages: Common, Draconic
cr: "6"
actions:
  - name: Multiattack
    desc: The dragon makes three Rend attacks. It can replace two attacks with a use of Sleep Breath.
  - name: Rend
    desc: "*Melee Attack Roll:* +7, reach 10 ft. *Hit:* 15 (2d10 + 4) Slashing damage."
  - name: Fire Breath (Recharge 5–6)
    desc: "*Dexterity Saving Throw:* DC 14, each creature in a 40-foot-long, 5-foot-wide Line. *Failure:* 38 (11d6) Fire damage. *Success:* Half damage."
  - name: Sleep Breath
    desc: "*Constitution Saving Throw:* DC 14, each creature in a 30-foot Cone. *Failure:* The target has the Incapacitated condition until the end of its next turn, at which point it repeats the save. *2Nd Failure:* The target has the Unconscious condition for 1 minute. This effect ends for the target if it takes damage or a creature within 5 feet of it takes an action to wake it."
```

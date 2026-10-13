---
title: Juvenile Shadow Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Dragon
size: Medium
habitat:
  - Planar (Shadowfell)
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Juvenile Shadow Dragon
size: Medium
type: dragon
alignment: Chaotic Evil
ac: 15
hp: 45
hit_dice: 6d8 + 18
modifier: 4
speed: 30 ft., climb 30 ft., fly 60 ft.
stats: [ 17, 14, 17, 12, 11, 15 ]
saves:
  - dex: 4
skillsaves:
  - perception: 4
  - stealth: 6
damage_resistances: See Living Shadow
damage_immunities: necrotic
senses: Blindsight 10 ft., Darkvision 60 ft., passive Perception 14
languages: Common, Draconic
cr: "4"
traits:
  - name: Living Shadow
    desc: While in Dim Light or Darkness, the dragon has Resistance to damage that isn't Force, Psychic, or Radiant.
  - name: Sunlight Sensitivity
    desc: While in sunlight, the dragon has Disadvantage on ability checks and attack rolls.
actions:
  - name: Multiattack
    desc: The dragon makes two Rend attacks.
  - name: Rend
    desc: "*Melee Attack Roll:* +5, reach 10 ft. *Hit:* 7 (1d8 + 3) Slashing damage plus 3 (1d6) Necrotic damage."
  - name: Shadow Breath (Recharge 5–6)
    desc: "*Dexterity Saving Throw:* DC 13, each creature in a 30-foot Cone. *Failure:* 17 (5d6) Necrotic damage. *Success:* Half damage. *Failure or Success:* A Humanoid reduced to 0 Hit Points by this damage dies, and a Shadow rises from its corpse. The shadow is under the dragon's control and shares the dragon's Initiative count but acts immediately after the dragon."
bonus_actions:
  - name: Shadow Stealth
    desc: While in Dim Light or Darkness, the dragon takes the Hide action.
```

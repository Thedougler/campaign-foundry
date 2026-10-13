---
title: Pirate Admiral
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 12
creature_type: Humanoid
size: Small or Medium
habitat:
  - Any
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Pirate Admiral
size: Small or Medium
type: humanoid
alignment: Neutral
ac: 20
hp: 182
hit_dice: 28d8 + 56
modifier: 10
speed: 30 ft.
stats: [ 14, 22, 14, 12, 14, 19 ]
saves:
  - str: 6
  - dex: 10
  - wis: 6
  - cha: 8
skillsaves:
  - acrobatics: 10
  - athletics: 6
  - perception: 6
gear:
  - pistol
  - scimitar
senses: passive Perception 16
languages: Common plus one other language
cr: "12"
actions:
  - name: Multiattack
    desc: The pirate makes three attacks, using Scimitar or Pistol in any combination.
  - name: Scimitar
    desc: |-
      *Melee Attack Roll:* +10, reach 5 ft. *Hit:* 16 (3d6 + 6) Slashing damage plus 7 (2d6) Poison damage, and the target suffers one of the following effects of the pirate's choice:

      - **Awestruck.** The target has the Charmed condition until the start of the pirate's next turn.  
      - **Poison.** The target has the Poisoned condition until the start of the pirate's next turn.  
  - name: Pistol
    desc: "*Ranged Attack Roll:* +10, range 30/90 ft. *Hit:* 28 (4d10 + 6) Piercing damage."
bonus_actions:
  - name: Rally (1/Day)
    desc: The pirate chooses up to three other creatures it can see within 30 feet. Until the start of the pirate's next turn, the targets have Advantage on attack rolls and saving throws.
reactions:
  - name: Defensive Stance
    desc: "Trigger: The pirate is hit by a melee attack roll while holding a weapon. _Response:_ The pirate adds 4 to its AC against melee attack rolls (including the triggering attack) until the start of its next turn, possibly causing the attacks to miss."
```

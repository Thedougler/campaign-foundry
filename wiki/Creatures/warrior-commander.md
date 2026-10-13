---
title: Warrior Commander
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
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
name: Warrior Commander
size: Small or Medium
type: humanoid
alignment: Neutral
ac: 18
hp: 161
hit_dice: 19d8 + 76
modifier: 9
speed: 30 ft.
stats: [ 21, 20, 18, 14, 16, 14 ]
saves:
  - str: 9
  - dex: 9
  - con: 8
  - wis: 7
skillsaves:
  - athletics: 9
  - insight: 7
  - perception: 7
gear:
  - greatsword
  - longbow
  - plate armour
senses: passive Perception 17
languages: Common plus one other language
cr: "10"
actions:
  - name: Multiattack
    desc: The warrior makes three attacks, using Greatsword or Longbow in any combination.
  - name: Greatsword
    desc: |-
      *Melee Attack Roll:* +9, reach 5 ft. *Hit:* 19 (4d6 + 5) Slashing damage. The warrior also creates one of the following effects:

      - **Sap.** The target has Disadvantage on its next attack roll before the start of the warrior's next turn.  
      - **Manoeuvre.** One ally who can see or hear the warrior can take a Reaction to move up to half the ally's Speed without provoking Opportunity Attacks.  
  - name: Longbow
    desc: "*Ranged Attack Roll:* +9, range 150/600 ft. *Hit:* 18 (3d8 + 5) Piercing damage, and the target's Speed decreases by 10 feet until the end of the target's next turn."
bonus_actions:
  - name: Tactical Charge
    desc: The warrior moves up to half its Speed straight toward an enemy it can see without provoking Opportunity Attacks.
reactions:
  - name: Counterattack
    desc: "Trigger: The warrior is hit by an attack roll. _Response:_ The warrior adds 4 to its AC against that attack, possibly causing it to miss. On a miss, the warrior can make one Greatsword or Longbow attack against the attacker."
```

---
title: Vampire Spawn
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 5
creature_type: Undead
size: Small or Medium
habitat:
  - Underdark
  - Urban
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Vampire Spawn
size: Small or Medium
type: undead
alignment: Neutral Evil
ac: 16
hp: 90
hit_dice: 12d8 + 36
modifier: 3
speed: 30 ft.
stats: [ 16, 16, 16, 11, 10, 12 ]
saves:
  - dex: 6
  - wis: 3
skillsaves:
  - perception: 3
  - stealth: 6
damage_resistances: necrotic
senses: Darkvision 60 ft., passive Perception 13
languages: Common plus one other language
cr: "5"
traits:
  - name: Spider Climb
    desc: The vampire can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  - name: Vampire Weakness
    desc: |-
      The vampire has these weaknesses:

      - **Forbiddance.** The vampire can't enter a residence without an invitation from an occupant.  
      - **Running Water.** The vampire takes 20 Acid damage if it ends its turn in running water.  
      - **Stake to the Heart.** The vampire is destroyed if a weapon that deals Piercing damage is driven into the vampire's heart while the vampire has the Incapacitated condition.  
      - **Sunlight.** The vampire takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.  
actions:
  - name: Multiattack
    desc: The vampire makes two Claw attacks and uses Bite.
  - name: Claw
    desc: "*Melee Attack Roll:* +6, reach 5 ft. *Hit:* 8 (2d4 + 3) Slashing damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 13) from one of two claws."
  - name: Bite
    desc: "*Constitution Saving Throw:* DC 14, one creature within 5 feet that is willing or that has the Grappled, Incapacitated, or Restrained condition. *Failure:* 5 (1d4 + 3) Piercing damage plus 10 (3d6) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and the vampire regains Hit Points equal to that amount."
bonus_actions:
  - name: Deathless Agility
    desc: The vampire takes the Dash or Disengage action.
```

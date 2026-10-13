---
title: Inquisitor of the Mind Fire
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Humanoid
size: Small or Medium
habitat:
  - Any
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Inquisitor of the Mind Fire
size: Small or Medium
type: humanoid
alignment: Lawful Neutral
ac: 16
hp: 104
hit_dice: 16d8 + 32
modifier: 2
speed: 30 ft.
stats: [ 10, 14, 15, 17, 16, 21 ]
saves:
  - int: 6
  - wis: 6
  - cha: 8
skillsaves:
  - insight: 6
  - perception: 6
condition_immunities: charmed, frightened
gear:
  - breastplate
  - silvered longsword
senses: Truesight 30 ft., passive Perception 16
languages: Common plus two other languages
cr: "8"
actions:
  - name: Multiattack
    desc: The inquisitor makes three Silvered Longsword attacks or uses Mind Fire three times. It can replace one attack or one use of Mind Fire with a use of Spellcasting to cast *Hold Monster* if available.
  - name: Silvered Longsword
    desc: "*Melee Attack Roll:* +8, reach 5 ft. *Hit:* 14 (2d8 + 5) Slashing damage plus 4 (1d8) Psychic damage, and the target has the Frightened condition until the start of the inquisitor's next turn. Critical *Hit:* If the target is a shape-shifted creature, it takes an additional 4 (1d8) Slashing damage."
  - name: Inquisitor's Command (Recharge 5–6)
    desc: "*Wisdom Saving Throw:* DC 16, each creature of the inquisitor's choice that it can see within 60 feet. *Failure:* The target has the Charmed condition until the start of the inquisitor's next turn. On the Charmed target's turn, the inquisitor can telepathically control the target's move and make the target take the Attack action (the inquisitor chooses the target), the Dash action, or no action."
  - name: Mind Fire
    desc: "*Intelligence Saving Throw:* DC 16, one creature the inquisitor can see within 120 feet. *Failure:* 9 (1d8 + 5) Psychic damage, and the target has the Stunned condition until the start of the inquisitor's next turn."
  - name: Spellcasting
    desc: |-
      The inquisitor casts one of the following spells, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 16):

      **At will:** *Detect Magic*, *Detect Thoughts*, *Dispel Magic*, *Mage Hand* (the hand is Invisible), *Sending*

      **1/day each:** *Hold Monster*, *Modify Memory*
```

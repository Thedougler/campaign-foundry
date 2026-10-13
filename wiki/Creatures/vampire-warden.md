---
title: Vampire Warden
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 10
creature_type: Undead
size: Medium
habitat:
  - Underdark
  - Urban
sourcebooks:
  - Astarion's Book of Hungers
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Vampire Warden
size: Medium
type: undead
alignment: Neutral Evil
ac: 18
hp: 190
hit_dice: 21d8 + 96
modifier: 6
speed: 30 ft.
stats: [ 21, 15, 18, 10, 14, 17 ]
saves:
  - con: 8
  - wis: 6
skillsaves:
  - athletics: 9
  - perception: 10
damage_resistances: necrotic
condition_immunities: exhaustion, frightened
senses: Darkvision 120 ft., passive Perception 20
languages: Common
cr: "10"
traits:
  - name: Magic Resistance
    desc: The vampire has Advantage on saving throws against spells and other magical effects.
  - name: Vampire Weakness
    desc: |-
      The vampire has these weaknesses:

      - **Forbiddance.** The vampire can't enter a residence without an invitation from an occupant.  
      - **Running Water.** The vampire takes 20 Acid damage if it ends its turn in running water.  
      - **Stake to the Heart.** If a weapon that deals Piercing damage is driven into the vampire's heart while the vampire has the Incapacitated condition, the vampire has the Paralysed condition until the weapon is removed.  
      - **Sunlight.** The vampire takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.  
      - **Immobile Restoration.** If the vampire drops to 0 Hit Points while it doesn't have the Petrified condition, it turns to stone, regains 50 Hit Points, and has the Petrified condition for 1 hour.  
actions:
  - name: Multiattack
    desc: The vampire makes two Claw attacks and uses Bite or Guardian's Command.
  - name: Claw
    desc: "*Melee Attack Roll:* +9, reach 5 ft. *Hit:* 14 (2d8 + 5) Slashing damage plus 7 (2d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16) from one of two claws."
  - name: Bite
    desc: "*Constitution Saving Throw:* DC 16, one creature within 5 feet that is willing or that has the Grappled, Incapacitated, or Restrained condition. *Failure:* 7 (1d4 + 5) Piercing damage plus 7 (2d6) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and the vampire regains Hit Points equal to that amount."
  - name: Guardian's Command
    desc: |
      The vampire casts *Compulsion*, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 15).
reactions:
  - name: Resilient Flesh
    desc: "Trigger: The vampire is hit by a melee attack roll from an attacker the vampire can see. _Response:_ The vampire reduces the damage it takes from the attack by 11 (2d6 + 4)."
```

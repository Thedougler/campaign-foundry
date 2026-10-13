---
title: Vampire Umbral Lord
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
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
name: Vampire Umbral Lord
size: Small or Medium
type: undead
alignment: Lawful Evil
ac: 16
hp: 187
hit_dice: 22d8 + 88
modifier: 14
speed: 40 ft., climb 40 ft., fly 40 ft. (hover)
stats: [ 20, 18, 18, 19, 16, 21 ]
saves:
  - str: 10
  - dex: 9
  - wis: 8
  - cha: 10
skillsaves:
  - arcana: 9
  - perception: 13
  - stealth: 9
damage_immunities: cold, necrotic
condition_immunities: charmed, exhaustion
senses: Blindsight 120 ft., passive Perception 23
languages: Common plus three other languages
cr: "15"
traits:
  - name: Legendary Resistance (3/Day, or 4/Day in Lair)
    desc: If the vampire fails a saving throw, it can choose to succeed instead.
  - name: Shadow Escape
    desc: If the vampire drops to 0 Hit Points outside its resting place, it teleports into its resting place unless it is in running water or sunlight. If it can't teleport, it is destroyed. Once inside its resting place, it has the Paralysed condition for 1 hour, after which it regains 1 Hit Point.
  - name: Vampire Weakness
    desc: |-
      The vampire has these weaknesses:

      - **Forbiddance.** The vampire can't enter a residence without an invitation from an occupant.  
      - **Running Water.** The vampire takes 20 Acid damage if it ends its turn in running water.  
      - **Stake to the Heart.** If a weapon that deals Piercing damage is driven into the vampire's heart while the vampire has the Incapacitated condition in its resting place, the vampire has the Paralysed condition until the weapon is removed.  
      - **Sunlight.** The vampire takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.  
actions:
  - name: Multiattack
    desc: The vampire makes two attacks, using Grave Strike or Sickening Ray in any combination.
  - name: Grave Strike
    desc: "*Melee Attack Roll:* +10, reach 5 ft. *Hit:* 9 (1d8 + 5) Slashing damage plus 13 (3d8) Necrotic damage."
  - name: Sickening Ray
    desc: "*Ranged Attack Roll:* +10, range 120 ft. *Hit:* 16 (2d10 + 5) Necrotic damage, and the target has the Poisoned condition until the start of the vampire's next turn."
  - name: Hunger of Hadar (Recharge 5–6)
    desc: |
      The vampire casts Hunger of Hadar (level 5 version), requiring no spell components and using Charisma as the spellcasting ability (spell save DC 18).
bonus_actions:
  - name: Sanguine Drain
    desc: "*Constitution Saving Throw:* DC 18, one creature the vampire can see within 30 feet that isn't a Construct or an Undead. *Failure:* 14 (4d6) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the damage taken, and the vampire regains Hit Points equal to that amount."
legendary_description: "Legendary Action Uses: 3 (4 in Lair). Immediately after another creature's turn, the vampire umbral lord can expend a use to take one of the following actions. The vampire umbral lord regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Umbral Strike
    desc: The vampire moves up to half its Speed, and it makes one Grave Strike or Sickening Ray attack.
  - name: Beguile
    desc: |
      The vampire casts *Command*, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 18). The vampire can't take this action again until the start of its next turn.
```

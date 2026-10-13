---
title: Dead Three Scion
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 16
creature_type: Humanoid
size: Small or Medium
habitat:
  - Underdark
  - Urban
sourcebooks:
  - "Forgotten Realms: Adventures in Faerûn"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Dead Three Scion
size: Small or Medium
type: humanoid
alignment: Neutral Evil
ac: 17
hp: 221
hit_dice: 26d8 + 104
modifier: 7
speed: 30 ft.
stats: [ 20, 14, 19, 18, 21, 24 ]
saves:
  - con: 9
  - wis: 10
skillsaves:
  - arcana: 9
  - intimidation: 12
  - stealth: 7
damage_immunities: necrotic
condition_immunities: charmed, frightened
senses: Truesight 120 ft., passive Perception 15
languages: Common
cr: "16"
traits:
  - name: Culling Aura
    desc: "*Constitution Saving Throw:* DC 20, each Bloodied creature in a 30-foot Emanation originating from the scion at the end of the scion's turn. *Failure:* The target can't regain Hit Points until the start of the scion's next turn."
  - name: Legendary Resistance (3/Day)
    desc: If the scion fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The scion has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The scion makes two attacks, using Death Touch or Mindwrack Bolt in any combination.
  - name: Death Touch
    desc: "*Melee Attack Roll:* +12, reach 5 ft. *Hit:* 25 (4d8 + 7) Necrotic damage."
  - name: Mindwrack Bolt
    desc: "*Ranged Attack Roll:* +12, range 120 ft. *Hit:* 21 (6d6) Psychic damage and the target has the Poisoned condition until the start of the scion's next turn."
  - name: Spellcasting
    desc: |-
      The scion casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 20):

      **At will:** *Detect Thoughts*, *Dispel Magic*

      **2/day each:** *Dimension Door*, *Invisibility*, *Scrying*

      **1/day each:** *Circle of Death*, *Create Undead*
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the dead three scion can expend a use to take one of the following actions. The dead three scion regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Attack
    desc: The scion makes a Death Touch or Mindwrack Bolt attack.
  - name: Command
    desc: |
      The scion casts *Command* (level 2 version), using the same spellcasting ability as Spellcasting. The scion can't take this action again until the start of its next turn.
```

---
title: Empyrean
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 23
creature_type: ""
size: Huge
habitat:
  - Any
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Empyrean
size: Huge
subtype: titan
alignment: Neutral
ac: 22
hp: 346
hit_dice: 21d12 + 210
modifier: 19
speed: 50 ft., fly 50 ft. (hover), swim 50 ft.
stats: [ 30, 21, 30, 21, 22, 27 ]
saves:
  - str: 17
  - wis: 13
skillsaves:
  - insight: 13
  - perception: 13
damage_resistances: bludgeoning, piercing, slashing
damage_immunities: necrotic, radiant
senses: Truesight 120 ft., passive Perception 23
languages: all
cr: "23"
traits:
  - name: Legendary Resistance (4/Day)
    desc: If the empyrean fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The empyrean has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The empyrean makes two attacks, using Sacred Weapon or Divine Ray in any combination.
  - name: Sacred Weapon
    desc: "*Melee Attack Roll:* +17, reach 10 ft. *Hit:* 31 (6d6 + 10) Force damage, and the target has the Stunned condition until the start of the empyrean's next turn. The target can choose not to be Stunned, in which case it takes an extra 21 Force damage that bypasses Resistance or Immunity."
  - name: Divine Ray
    desc: "*Ranged Attack Roll:* +15, range 600 ft. *Hit:* 35 (6d8 + 8) Necrotic or Radiant damage (empyrean's choice)."
  - name: Spellcasting
    desc: |-
      The empyrean casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 23):

      **At will:** *Calm Emotions*, *Greater Restoration*, *Pass without Trace*, *Water Breathing*

      **1/day each:** *Commune*, *Dispel Evil and Good*, *Plane Shift*
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the empyrean can expend a use to take one of the following actions. The empyrean regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Bolster
    desc: The empyrean gains 10 Temporary Hit Points, and the empyrean and each ally within 30 feet of it gain Advantage on D20 Tests until the end of the empyrean's next turn. The empyrean can't take this action again until the start of its next turn.
  - name: Shockwave of Glory
    desc: "*Constitution Saving Throw:* DC 23, each creature in a 30-foot Emanation originating from the empyrean. *Failure:* 27 (6d8) Force damage, and the target has the Prone condition. *Success:* Half damage only. *Failure or Success:* The empyrean can't take this action again until the start of its next turn."
  - name: Smite
    desc: The empyrean makes one Divine Ray attack.
```

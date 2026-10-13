---
title: Death Knight Aspirant
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 11
creature_type: Undead
size: Small or Medium
habitat:
  - Any
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Death Knight Aspirant
size: Small or Medium
type: undead
alignment: Chaotic Evil
ac: 20
hp: 178
hit_dice: 21d8 + 84
modifier: 4
speed: 30 ft.
stats: [ 20, 10, 18, 10, 12, 16 ]
saves:
  - dex: 4
  - wis: 5
damage_immunities: necrotic, poison
condition_immunities: exhaustion, frightened, poisoned
senses: Darkvision 120 ft., passive Perception 11
languages: Abyssal, Common
cr: "11"
traits:
  - name: Magic Resistance
    desc: The aspirant has Advantage on saving throws against spells and other magical effects.
  - name: Marshal Undead
    desc: Undead creatures of the aspirant's choice (excluding itself) in a 60-foot Emanation originating from it have Advantage on attack rolls and saving throws. It can't use this trait if it has the Incapacitated condition.
actions:
  - name: Multiattack
    desc: The aspirant makes three Dread Blade attacks.
  - name: Dread Blade
    desc: "*Melee Attack Roll:* +9, reach 5 ft. *Hit:* 14 (2d8 + 5) Slashing damage plus 10 (3d6) Necrotic damage."
  - name: Hellfire Orb (Recharge 5–6)
    desc: "*Dexterity Saving Throw:* DC 15, each creature in a 20-foot-radius Sphere centred on a point the aspirant can see within 120 feet of itself. *Failure:* 21 (6d6) Fire damage plus 21 (6d6) Necrotic damage. *Success:* Half damage."
  - name: Spellcasting
    desc: |-
      The aspirant casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 15):

      **At will:** *Phantom Steed*

      **1/day each:** Destructive Wave (Necrotic), *Dispel Magic*
reactions:
  - name: Parry
    desc: "Trigger: The aspirant is hit by a melee attack roll while holding a weapon. _Response:_ The aspirant adds 4 to its AC against that attack, possibly causing it to miss."
```

---
title: Death Knight
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 17
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
name: Death Knight
size: Small or Medium
type: undead
alignment: Chaotic Evil
ac: 20
hp: 199
hit_dice: 21d8 + 105
modifier: 12
speed: 30 ft.
stats: [ 20, 11, 20, 12, 16, 18 ]
saves:
  - dex: 6
  - wis: 9
damage_immunities: necrotic, poison
condition_immunities: exhaustion, frightened, poisoned
senses: Darkvision 120 ft., passive Perception 13
languages: Abyssal, Common
cr: "17"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the death knight fails a saving throw, it can choose to succeed instead.
  - name: Magic Resistance
    desc: The death knight has Advantage on saving throws against spells and other magical effects.
  - name: Marshal Undead
    desc: Undead creatures of the death knight's choice (excluding itself) in a 60-foot Emanation originating from it have Advantage on attack rolls and saving throws. It can't use this trait if it has the Incapacitated condition.
  - name: Undead Restoration
    desc: If the death knight is destroyed before it atones for its evil, it gains a new body in 1d10 days, reviving with all its Hit Points. The new body appears in a location significant to the death knight.
actions:
  - name: Multiattack
    desc: The death knight makes three Dread Blade attacks.
  - name: Dread Blade
    desc: "*Melee Attack Roll:* +11, reach 5 ft. *Hit:* 12 (2d6 + 5) Slashing damage plus 13 (3d8) Necrotic damage."
  - name: Hellfire Orb (Recharge 5–6)
    desc: "*Dexterity Saving Throw:* DC 18, each creature in a 20-foot-radius Sphere centred on a point the death knight can see within 120 feet. *Failure:* 35 (10d6) Fire damage plus 35 (10d6) Necrotic damage. *Success:* Half damage."
  - name: Spellcasting
    desc: |-
      The death knight casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 18):

      **At will:** *Command*, *Phantom Steed*

      **2/day each:** Destructive Wave (Necrotic), *Dispel Magic*
reactions:
  - name: Parry
    desc: "Trigger: The death knight is hit by a melee attack roll while holding a weapon. _Response:_ The death knight adds 6 to its AC against that attack, possibly causing it to miss."
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the death knight can expend a use to take one of the following actions. The death knight regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Dread Authority
    desc: The death knight uses Spellcasting to cast *Command*. The death knight can't take this action again until the start of its next turn.
  - name: Fell Word
    desc: "*Constitution Saving Throw:* DC 18, one creature the death knight can see within 120 feet. *Failure:* 17 (5d6) Necrotic damage, and the target's Hit Point maximum decreases by an amount equal to the damage taken. *Failure or Success:* The death knight can't take this action again until the start of its next turn."
  - name: Lunge
    desc: The death knight moves up to half its Speed, and it makes one Dread Blade attack.
```

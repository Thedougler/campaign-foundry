---
title: Ramya Vasavadan
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Undead
size: Medium
habitat: []
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ramya Vasavadan
size: Medium
type: undead
alignment: Chaotic Evil
ac: 18
hp: 190
hit_dice: 20d8 + 100
modifier: 15
speed: 30 ft.
stats: [ 14, 20, 20, 12, 16, 18 ]
saves:
  - str: 7
  - wis: 8
skillsaves:
  - perception: 8
  - persuasion: 9
damage_immunities: necrotic, poison
condition_immunities: exhaustion, frightened, poisoned
senses: Darkvision 120 ft., passive Perception 18
languages: Abyssal, Common
cr: "15"
traits:
  - name: Darklord Restoration
    desc: If Ramya dies, her body dissolves into mist, and she gains a new body in 1d10 weeks, reviving with all her Hit Points somewhere in Kalakeri.
  - name: Legendary Resistance (3/Day, or 4/Day in Domain)
    desc: If Ramya fails a saving throw, she can choose to succeed instead.
  - name: Magic Resistance
    desc: Ramya has Advantage on saving throws against spells and other magical effects.
  - name: Marshal Undead
    desc: Undead creatures of Ramya's choice (excluding herself) in a 60-foot Emanation originating from her have Advantage on attack rolls and saving throws. She can't use this trait if she has the Incapacitated condition.
actions:
  - name: Multiattack
    desc: Ramya makes three Dread Blade attacks.
  - name: Dread Blade
    desc: "*Melee Attack Roll:* +10, reach 5 ft. *Hit:* 12 (2d6 + 5) Slashing damage plus 9 (2d8) Necrotic damage."
  - name: Vengeful Fire (Recharge 5–6)
    desc: "*Dexterity Saving Throw:* DC 17, each creature in a 20-foot-radius Sphere centred on a point Ramya can see within 120 feet. *Failure:* 28 (8d6) Fire damage plus 28 (8d6) Necrotic damage. *Success:* Half damage."
  - name: Spellcasting
    desc: |-
      Ramya casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 17):

      **At will:** *Phantom Steed*

      **1/day:** *Create Undead*
bonus_actions:
  - name: Illusory Disguise
    desc: |
      Ramya casts *Disguise Self* using the same spellcasting ability as Spellcasting. The spell lasts until Ramya drops to 80 Hit Points or fewer or uses her Vengeful Fire action. Intelligence (Investigation) checks to discern her true appearance are made with Disadvantage.

      When the disguise ends, each creature in a 30-foot Emanation originating from Ramya is subjected to the following effect. Wisdom Saving Throw: DC 17 (the target succeeds automatically if it is a Construct or an Undead). Failure: The target has the Frightened condition for 1 minute. While Frightened, the target has Disadvantage on saving throws.
reactions:
  - name: Parry
    desc: "Trigger: Ramya is hit by a melee attack roll while holding a weapon. _Response:_ Ramya adds 5 to her AC against that attack, possibly causing it to miss."
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, Ramya can expend a use to take one of the following actions. Ramya regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Lunge
    desc: Ramya moves up to half her Speed and makes one Dread Blade attack.
  - name: Words of Silence
    desc: "*Constitution Saving Throw:* DC 17, one creature Ramya can see within 120 feet. *Failure:* 21 (6d6) Psychic damage, and the target is cursed until the end of its next turn. Until the curse ends, the target can't speak or cast spells with a Verbal component. *Success:* Half damage only."
  - name: Dread Authority
    desc: |
      Ramya casts *Command*, using the same spellcasting ability as Spellcasting. Ramya can't take this action again until the start of her next turn.
```

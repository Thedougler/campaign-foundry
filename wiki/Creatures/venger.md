---
title: Venger
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 17
creature_type: Fiend
size: Medium
habitat: []
sourcebooks:
  - Arcana Unleashed
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Venger
size: Medium
type: fiend
alignment: Neutral Evil
ac: 19
hp: 202
hit_dice: 27d8 + 81
modifier: 17
speed: 30 ft., fly 30 ft.
stats: [ 18, 20, 16, 17, 14, 21 ]
skillsaves:
  - arcana: 9
  - deception: 11
  - intimidation: 11
  - perception: 8
damage_resistances: cold, fire, lightning, poison
condition_immunities: poisoned
senses: passive Perception 18
languages: Abyssal, Common, Infernal
cr: "17"
traits:
  - name: Fiendish Restoration
    desc: If Venger dies, his body dissipates into crimson dust, and he gains a new body in 1d10 days, reviving with all his Hit Points somewhere in one of his lairs.
  - name: Legendary Resistance (3/Day, or 4/Day in Lair)
    desc: If Venger fails a saving throw, he can choose to succeed instead.
  - name: Magic Resistance
    desc: Venger has Advantage on saving throws against spells and magical effects.
  - name: Mounted Adept
    desc: While Venger is mounted, he and his mount have Advantage on Dexterity saving throws, and Venger can force an attack targeting his mount to target him instead. Venger can't use this trait if he has the Incapacitated condition.
actions:
  - name: Multiattack
    desc: Venger makes three attacks, using Crimson Claw or Crimson Blast in any combination.
  - name: Crimson Claw
    desc: "*Melee Attack Roll:* +11, reach 5 ft. *Hit:* 14 (2d8 + 5) Slashing damage plus 10 (3d6) Fire damage."
  - name: Crimson Blast
    desc: "*Ranged Attack Roll:* +11, range 120 ft. *Hit:* 24 (3d12 + 5) Force damage."
  - name: Spellcasting
    desc: |-
      Venger casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 19):

      **At will:** *Detect Magic*, *Invisibility*, *Mage Hand*, *Silent Image*

      **2/day each:** *Alter Self*, *Contact Other Plane*, *Create Undead*, *Dimension Door*

      **1/day each:** *Control Weather*, *Imprisonment*
bonus_actions:
  - name: Telekinesis (2/Day)
    desc: |
      Venger casts *Telekinesis*, using the same spellcasting ability as Spellcasting.
reactions:
  - name: Protective Magic
    desc: |
      Venger casts *Counterspell* or *Shield* in response to the spell's trigger, using the same spellcasting ability as Spellcasting.
legendary_description: "Legendary Action Uses: 3 (4 in Lair). Immediately after another creature's turn, Venger can expend a use to take one of the following actions. Venger regains all expended uses at the start of each of their turns."
legendary_actions:
  - name: Booming Censure
    desc: "*Wisdom Saving Throw:* DC 19, one creature Venger can see within 60 feet. *Failure:* 14 (4d6) Psychic damage, and the target has the Frightened condition until the end of its next turn. *Success:* Half damage only."
  - name: Crimson Strike
    desc: Venger makes one Crimson Claw or Crimson Blast attack.
  - name: Magic-Binding Chains
    desc: "*Dexterity Saving Throw:* DC 19, one creature Venger can see within 30 feet. *Failure:* The target has the Restrained condition until the end of its next turn. While Restrained, the target can't take the Magic action. *Failure or Success:* Venger can't take this action again until the start of his next turn."
```

---
title: Ez d'Avenir
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 8
creature_type: Humanoid
size: Medium
habitat: []
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ez d'Avenir
size: Medium
type: humanoid
subtype: human
alignment: Chaotic Good
ac: 14
hp: 120
hit_dice: 16d8 + 48
modifier: 7
speed: 30 ft.
stats: [ 14, 19, 16, 18, 11, 17 ]
saves:
  - dex: 7
  - wis: 3
skillsaves:
  - acrobatics: 7
  - deception: 6
  - perception: 3
  - stealth: 7
  - survival: 3
gear:
  - light crossbow
  - rapier
senses: passive Perception 13
languages: Common, Elvish
cr: "8"
actions:
  - name: Multiattack
    desc: Ez makes three attacks, using Hunter's Blade or Fiery Bolt in any combination.
  - name: Hunter's Blade
    desc: "*Melee Attack Roll:* +7, reach 5 ft. *Hit:* 8 (1d8 + 4) Piercing damage plus 11 (2d10) Radiant damage."
  - name: Fiery Bolt
    desc: "*Ranged Attack Roll:* +7, range 120 ft. *Hit:* 19 (3d10 + 3) Fire damage."
  - name: Spellcasting
    desc: |-
      Ez casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 15):

      **At will:** *Light*, *Mage Hand*

      **1/day each:** *Dispel Evil and Good*, *Lightning Bolt*, *Magic Circle*
bonus_actions:
  - name: Bolster Allies
    desc: Ez chooses up to six allies within 60 feet. Each target that can hear her has Ez's choice of (A) Advantage on the next attack roll it makes before the end of its next turn or (B) Resistance to Acid, Necrotic, and Poison damage until the end of its next turn.
  - name: Curse of the All-Seeing Eye (1/Day)
    desc: |-
      Ez chooses a damage type. *Wisdom Saving Throw:* DC 15, one target within 30 feet that Ez can see. *Failure:* The target is cursed. Until the curse ends, the target has Vulnerability to the chosen damage type. The curse ends early if Ez uses this action again.

      If the target drops to 0 Hit Points before the curse ends, Ez can take a Bonus Action on a later turn to curse a new creature.
  - name: Inspiring Rally
    desc: Ez chooses up to six allies within 60 feet. Each target that can hear her can take a Reaction to move up to its Speed without provoking Opportunity Attacks.
reactions:
  - name: Shield (3/Day)
    desc: |
      Ez casts *Shield* in response to that spell's trigger, using the same spellcasting ability as Spellcasting.
```

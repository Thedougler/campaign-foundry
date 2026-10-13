---
title: Adult Topaz Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 13
creature_type: Dragon
size: Huge
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Adult Topaz Dragon
size: Huge
type: dragon
subtype: gem
alignment: typically Chaotic Neutral
ac: 18
ac_class: natural armour
hp: 210
hit_dice: 20d12 + 80
modifier: 1
speed: 40 ft., fly 80 ft., swim 40 ft.
stats: [ 19, 12, 19, 18, 17, 18 ]
saves:
  - dex: 6
  - con: 9
  - wis: 8
  - cha: 9
skillsaves:
  - intimidation: 14
  - perception: 13
  - stealth: 6
damage_resistances: cold, necrotic
senses: blindsight 60 ft., darkvision 120 ft., passive Perception 23
languages: Common, Draconic, telepathy 120 ft.
cr: "13"
traits:
  - name: Amphibious
    desc: The dragon can breathe both air and water.
  - name: Fabricate (1/Day)
    desc: The dragon can cast *fabricate*, requiring no spell components and using Intelligence as the spellcasting ability.
  - name: Legendary Resistance (3/Day)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The dragon makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +9 to hit, reach 10 ft., one target. *Hit:* 15 (2d10 + 4) piercing damage plus 3 (1d6) necrotic damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +9 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 4) slashing damage."
  - name: Desiccating Breath (Recharge 5–6)
    desc: The dragon exhales yellowish necrotic energy in a 60-foot cone. Each creature in that area must make a DC 17 Constitution saving throw. On a failed save, the creature takes 35 (10d6) necrotic damage and is weakened until the end of its next turn. A weakened creature has disadvantage on Strength-based ability checks and Strength saving throws, and the creature's weapon attacks that rely on Strength deal half damage. On a successful save, the creature takes half as much damage and isn't weakened.
  - name: Spellcasting (Psionics)
    desc: |-
      The dragon casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 17):

      **1/day each:** *bane*, *control water*, *create or destroy water*
bonus_actions:
  - name: Change Shape
    desc: The dragon magically transforms into any creature that is Medium or Small, while retaining its game statistics (other than its size). This transformation ends if the dragon is reduced to 0 hit points or uses a bonus action to end it.
  - name: Psychic Step
    desc: The dragon magically teleports to an unoccupied space it can see within 60 feet of it.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the dragon can expend a use to take one of the following actions. The dragon regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Claw
    desc: The dragon makes one Claw attack.
  - name: Psionics (Costs 2 Actions)
    desc: The dragon uses Psychic Step or Spellcasting.
  - name: Essential Reduction (Costs 3 Actions)
    desc: The dragon targets a creature or an object not being worn or carried that it can see within 60 feet of it. The target must succeed on a DC 17 Constitution saving throw or take 28 (8d6) necrotic damage. If this damage reduces the target to 0 hit points, it crumbles to dust.
```

---
title: Adult Amethyst Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 16
creature_type: Dragon
size: Huge
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Adult Amethyst Dragon
size: Huge
type: dragon
subtype: gem
alignment: typically Neutral
ac: 19
ac_class: natural armour
hp: 229
hit_dice: 17d12 + 119
modifier: 2
speed: 40 ft., fly 80 ft. (hover), swim 40 ft.
stats: [ 25, 14, 25, 20, 17, 21 ]
saves:
  - dex: 7
  - con: 12
  - wis: 8
  - cha: 10
skillsaves:
  - arcana: 15
  - perception: 13
  - persuasion: 10
  - stealth: 7
damage_resistances: force, psychic
condition_immunities: frightened, prone
senses: blindsight 60 ft., darkvision 120 ft., passive Perception 23
languages: Common, Draconic, telepathy 120 ft.
cr: "16"
traits:
  - name: Amphibious
    desc: The dragon can breathe both air and water.
  - name: Legendary Resistance (3/Day)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The dragon makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +12 to hit, reach 10 ft., one target. *Hit:* 18 (2d10 + 7) piercing damage plus 9 (2d8) force damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +12 to hit, reach 10 ft., one target. *Hit:* 11 (1d8 + 7) slashing damage."
  - name: Singularity Breath (Recharge 5–6)
    desc: The dragon creates a shining bead of gravitational force in its mouth, then releases the energy in a 90-foot cone. Each creature in that area must make a DC 20 Strength saving throw. On a failed save, the creature takes 45 (10d8) force damage, and its speed becomes 0 until the start of the dragon's next turn. On a successful save, the creature takes half as much damage, and its speed isn't reduced.
  - name: Spellcasting (Psionics)
    desc: |-
      The dragon casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 18):

      **1/day each:** *blink*, *control water*, *dispel magic*, *protection from evil and good*, *sending*
bonus_actions:
  - name: Change Shape
    desc: The dragon magically transforms into any creature that is Medium or Small, while retaining its game statistics (other than its size). This transformation ends if the dragon is reduced to 0 hit points or uses a bonus action to end it.
  - name: Psychic Step
    desc: The dragon magically teleports to an unoccupied space it can see within 60 feet of it.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the dragon can expend a use to take one of the following actions. The dragon regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Claw
    desc: The dragon makes one claw attack.
  - name: Psionics (Costs 2 Actions)
    desc: The dragon uses Psychic Step or Spellcasting.
  - name: Explosive Crystal (Costs 3 Actions)
    desc: The dragon spits an amethyst that explodes at a point it can see within 60 feet of it. Each creature within a 20-foot-radius sphere centred on that point must succeed on a DC 20 Dexterity saving throw or take 13 (3d8) force damage and be knocked prone.
```

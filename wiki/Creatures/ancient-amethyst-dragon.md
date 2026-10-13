---
title: Ancient Amethyst Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 23
creature_type: Dragon
size: Gargantuan
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ancient Amethyst Dragon
size: Gargantuan
type: dragon
subtype: gem
alignment: typically Neutral
ac: 20
ac_class: natural armour
hp: 444
hit_dice: 24d20 + 192
modifier: 2
speed: 40 ft., fly 80 ft. (hover), swim 40 ft.
stats: [ 26, 14, 27, 26, 19, 23 ]
saves:
  - dex: 9
  - con: 15
  - wis: 11
  - cha: 13
skillsaves:
  - arcana: 22
  - perception: 18
  - persuasion: 13
  - stealth: 9
damage_resistances: force, psychic
condition_immunities: frightened, prone
senses: blindsight 60 ft., darkvision 120 ft., passive Perception 28
languages: Common, Draconic, telepathy 120 ft.
cr: "23"
traits:
  - name: Amphibious
    desc: The dragon can breathe both air and water.
  - name: Legendary Resistance (3/Day)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The dragon makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +15 to hit, reach 15 ft., one target. *Hit:* 19 (2d10 + 8) piercing damage plus 13 (3d8) force damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +15 to hit, reach 10 ft., one target. *Hit:* 15 (2d6 + 8) slashing damage."
  - name: Singularity Breath (Recharge 5–6)
    desc: The dragon creates a shining bead of gravitational force in its mouth, then releases the energy in a 90-foot cone. Each creature in that area must make a DC 23 Strength saving throw. On a failed save, the creature takes 63 (14d8) force damage, and its speed becomes 0 until the start of the dragon's next turn. On a successful save, the creature takes half as much damage, and its speed isn't reduced.
  - name: Spellcasting (Psionics)
    desc: |-
      The dragon casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 23, +15 to hit with spell attacks):

      **1/day each:** *blink*, *control water*, *dispel magic*, *freedom of movement*, *globe of invulnerability*, *plane shift*, *protection from evil and good*, *sending*
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
    desc: The dragon spits an amethyst that explodes at a point it can see within 60 feet of it. Each creature within a 20-foot-radius sphere centred on that point must succeed on a DC 23 Dexterity saving throw or take 18 (4d8) force damage and be knocked prone.
```

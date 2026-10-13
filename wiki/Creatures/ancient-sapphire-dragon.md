---
title: Ancient Sapphire Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 22
creature_type: Dragon
size: Gargantuan
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Ancient Sapphire Dragon
size: Gargantuan
type: dragon
subtype: gem
alignment: typically Lawful Neutral
ac: 20
ac_class: natural armour
hp: 370
hit_dice: 20d20 + 160
modifier: 2
speed: 40 ft., burrow 40 ft., climb 40 ft., fly 80 ft.
stats: [ 27, 14, 27, 21, 19, 20 ]
saves:
  - dex: 9
  - con: 15
  - wis: 11
  - cha: 12
skillsaves:
  - history: 12
  - perception: 18
  - persuasion: 19
  - stealth: 9
damage_resistances: lightning, thunder
condition_immunities: frightened
senses: blindsight 60 ft., darkvision 120 ft., passive Perception 28
languages: Common, Draconic, telepathy 120 ft.
cr: "22"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
  - name: Spider Climb
    desc: The dragon can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
  - name: Tunneler
    desc: The dragon can burrow through solid rock at half its burrowing speed and can leave a 20-foot-diameter tunnel in its wake.
actions:
  - name: Multiattack
    desc: The dragon makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +15 to hit, reach 15 ft., one target. *Hit:* 19 (2d10 + 8) piercing damage plus 11 (2d10) thunder damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +15 to hit, reach 10 ft., one target. *Hit:* 15 (2d6 + 8) slashing damage."
  - name: Debilitating Breath (Recharge 5–6)
    desc: The dragon exhales a pulse of high-pitched, nearly inaudible sound in a 90-foot cone. Each creature in that area must make a DC 23 Constitution saving throw. On a failed save, the creature takes 55 (10d10) thunder damage and is incapacitated until the end of its next turn. On a successful save, the creature takes half as much damage and isn't incapacitated.
  - name: Spellcasting (Psionics)
    desc: |-
      The dragon casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 20):

      **1/day each:** *dissonant whispers*, *hold monster*, *meld into stone*, *telekinesis*, *teleport*
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
  - name: Telekinetic Fling (Costs 3 Actions)
    desc: The dragon chooses one Medium or smaller object that isn't being worn or carried that it can see within 60 feet of it, and it magically hurls the object at a creature it can see within 60 feet of the object. The target must succeed on a DC 20 Dexterity saving throw or take 42 (12d6) bludgeoning damage.
```

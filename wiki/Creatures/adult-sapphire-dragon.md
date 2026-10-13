---
title: Adult Sapphire Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 15
creature_type: Dragon
size: Huge
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Adult Sapphire Dragon
size: Huge
type: dragon
subtype: gem
alignment: typically Lawful Neutral
ac: 18
ac_class: natural armour
hp: 225
hit_dice: 18d12 + 108
modifier: 2
speed: 40 ft., burrow 30 ft., climb 40 ft., fly 80 ft.
stats: [ 23, 14, 22, 18, 17, 18 ]
saves:
  - dex: 7
  - con: 11
  - wis: 8
  - cha: 9
skillsaves:
  - history: 9
  - perception: 13
  - persuasion: 14
  - stealth: 7
damage_resistances: lightning, thunder
condition_immunities: frightened
senses: blindsight 60 ft., darkvision 120 ft., passive Perception 23
languages: Common, Draconic, telepathy 120 ft.
cr: "15"
traits:
  - name: Legendary Resistance (3/Day)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
  - name: Spider Climb
    desc: The dragon can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
  - name: Tunneler
    desc: The dragon can burrow through solid rock at half its burrowing speed and can leave a 10-foot-diameter tunnel in its wake.
actions:
  - name: Multiattack
    desc: The dragon makes one Bite attack and two Claw attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +11 to hit, reach 10 ft., one target. *Hit:* 17 (2d10 + 6) piercing damage plus 5 (1d10) thunder damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +11 to hit, reach 5 ft., one target. *Hit:* 10 (1d8 + 6) slashing damage."
  - name: Debilitating Breath (Recharge 5–6)
    desc: The dragon exhales a pulse of high-pitched, nearly inaudible sound in a 60-foot cone. Each creature in that area must make a DC 19 Constitution saving throw. On a failed save, the creature takes 44 (8d10) thunder damage and is incapacitated until the end of its next turn. On a successful save, the creature takes half as much damage and isn't incapacitated.
  - name: Spellcasting (Psionics)
    desc: |-
      The dragon casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save DC 17):

      **1/day each:** *dissonant whispers*, *hold monster*, *meld into stone*, *telekinesis*
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
    desc: The dragon chooses one Small or smaller object that isn't being worn or carried that it can see within 60 feet of it, and it magically hurls the object at a creature it can see within 60 feet of the object. The target must succeed on a DC 17 Dexterity saving throw or take 31 (9d6) bludgeoning damage.
```

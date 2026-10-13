---
title: Animal Lord
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 20
creature_type: Celestial
size: Medium
habitat:
  - Planar (Beastlands)
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Animal Lord
size: Medium
type: celestial
alignment: Neutral
ac: 19
hp: 323
hit_dice: 34d8 + 170
modifier: 19
speed: 60 ft., fly 60 ft. (hover), swim 60 ft.
stats: [ 24, 25, 20, 19, 23, 22 ]
saves:
  - con: 11
  - wis: 12
skillsaves:
  - acrobatics: 13
  - athletics: 13
  - perception: 18
  - stealth: 13
damage_resistances: cold, fire, necrotic, psychic, radiant
condition_immunities: charmed, frightened, stunned
senses: Truesight 120 ft., passive Perception 28
languages: all
cr: "20"
traits:
  - name: Animal Lordship
    desc: An animal lord represents a Forager, Hunter, or Sage (DM's choice), which determines certain traits in this stat block.
  - name: Legendary Resistance (4/Day)
    desc: If the animal lord fails a saving throw, it can choose to succeed instead.
  - name: Lordly Presence
    desc: |-
      *Wisdom Saving Throw:* DC 20, any enemy that starts its turn in a 30-foot Emanation originating from the animal lord. *Failure:* The target suffers one of the following effects:

      - **Captivated (Forager Only).** The target has the Charmed condition until the end of its next turn. While Charmed, the target has the Incapacitated condition.  
      - **Fearful (Hunter Only).** The target has the Frightened condition until the end of its next turn.  
      - **Mired (Sage Only).** The target takes 10 (3d6) Psychic damage, and the target is magically bewildered until the end of its next turn. While bewildered, the target subtracts 1d4 from its saving throws.  
  - name: Magic Resistance
    desc: The animal lord has Advantage on saving throws against spells and other magical effects.
actions:
  - name: Multiattack
    desc: The animal lord makes two attacks, using Rend or Radiant Ray in any combination, and uses Animal Spirit.
  - name: Rend
    desc: "*Melee Attack Roll:* +13, reach 5 ft. *Hit:* 14 (2d6 + 7) Slashing damage plus 7 (2d6) Force damage."
  - name: Radiant Ray
    desc: "*Ranged Attack Roll:* +12, range 120 ft. *Hit:* 20 (4d6 + 6) Radiant damage."
  - name: Animal Spirit
    desc: |-
      The animal lord conjures an animal spirit that strikes at a creature and then disappears. *Dexterity Saving Throw:* DC 20, one creature the animal lord can see within 120 feet. *Failure:* 28 (4d10 + 6) Radiant damage. *Success:* Half damage. *Failure or Success:* One of the following effects occurs:

      - **Fortify (Forager Only).** The animal lord gains 20 Temporary Hit Points.  
      - **Marked as Prey (Hunter Only).** The animal lord has Advantage on attack rolls against the target until the start of the animal lord's next turn.  
      - **Pesky Swarm (Sage Only).** The target has Disadvantage on attack rolls and ability checks until the end of its next turn.  
  - name: Spellcasting
    desc: |-
      The animal lord casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 20):

      **At will:** *Animal Friendship*, *Animal Messenger*, *Speak with Animals*

      **2/day each:** *Awaken*, *Greater Restoration*

      **1/day each:** *Animal Shapes*, *Sunburst*
bonus_actions:
  - name: Shape-Shift
    desc: The animal lord shape-shifts into a Huge or smaller version of the animal it represents or a Medium or Small Humanoid, or it returns to its true form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the animal lord can expend a use to take one of the following actions. The animal lord regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Feral Strike
    desc: The animal lord moves up to its Speed without provoking Opportunity Attacks, and it makes one Rend attack.
  - name: Radiant Strike
    desc: The animal lord makes one Radiant Ray attack.
```

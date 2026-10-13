---
title: Doppelganger
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Monstrosity
size: Medium
habitat:
  - Underdark
  - Urban
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Doppelganger
size: Medium
type: monstrosity
alignment: Neutral
ac: 14
hp: 52
hit_dice: 8d8 + 16
modifier: 4
speed: 30 ft.
stats: [ 11, 18, 14, 11, 12, 14 ]
skillsaves:
  - deception: 6
  - insight: 3
condition_immunities: charmed
senses: Darkvision 60 ft., passive Perception 11
languages: Common plus three other languages
cr: "3"
actions:
  - name: Multiattack
    desc: The doppelganger makes two Slam attacks and uses Unsettling Visage if available.
  - name: Slam
    desc: "*Melee Attack Roll:* +6 (with Advantage during the first round of each combat), reach 5 ft. *Hit:* 11 (2d6 + 4) Bludgeoning damage."
  - name: Unsettling Visage (Recharge 6)
    desc: "*Wisdom Saving Throw:* DC 12, each creature in a 15-foot Emanation originating from the doppelganger that can see the doppelganger. *Failure:* The target has the Frightened condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically."
  - name: Read Thoughts
    desc: |
      The doppelganger casts *Detect Thoughts*, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 12).
bonus_actions:
  - name: Shape-Shift
    desc: The doppelganger shape-shifts into a Medium or Small Humanoid, or it returns to its true form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed.
```

---
title: Spectator
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Aberration
size: Medium
habitat:
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Spectator
size: Medium
type: aberration
subtype: beholder
alignment: Lawful Neutral
ac: 14
hp: 45
hit_dice: 7d8 + 14
modifier: 2
speed: 5 ft., fly 30 ft. (hover)
stats: [ 8, 14, 14, 13, 14, 11 ]
skillsaves:
  - perception: 6
condition_immunities: exhaustion, prone
senses: Darkvision 120 ft., passive Perception 16
languages: Deep Speech, Undercommon; telepathy 120 ft.
cr: "3"
actions:
  - name: Multiattack
    desc: The spectator uses Eye Rays twice.
  - name: Bite
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 5 (1d6 + 2) Piercing damage."
  - name: Eye Rays
    desc: |-
      The spectator randomly shoots one of the following magical rays at a target it can see within 90 feet of itself (roll 1d4; reroll if the spectator has already used that ray during this turn):

      - **1 Confusion Ray.** *Wisdom Saving Throw:* DC 12. *Failure:* 5 (2d4) Psychic damage, and the target can't take Reactions until the end of its next turn. On its next turn, the target can't move, and it uses its action to make a melee or ranged attack against a randomly determined creature within range. If the target can't attack, it does nothing on that turn.  
      - **2 Paralysing Ray.** *Constitution Saving Throw:* DC 12. *Failure:* The target has the Paralysed condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.  
      - **3 Fear Ray.** *Wisdom Saving Throw:* DC 12. *Failure:* 5 (2d4) Psychic damage, and the target has the Frightened condition until the end of its next turn.  
      - **4 Wounding Ray.** *Constitution Saving Throw:* DC 12. *Failure:* 16 (3d10) Necrotic damage. *Success:* Half damage.  
reactions:
  - name: Spell Reflection
    desc: "Trigger: The spectator succeeds on a saving throw against a spell, or a spell's attack roll misses it. _Response, _*Dexterity Saving Throw:* DC 12, one creature the spectator can see within 120 feet. *Failure:* 10 (3d6) Force damage."
```

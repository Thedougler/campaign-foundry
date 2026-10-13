---
title: Death Tyrant
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 14
creature_type: Undead
size: Large
habitat:
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Death Tyrant
size: Large
type: undead
subtype: beholder
alignment: Lawful Evil
ac: 19
hp: 195
hit_dice: 26d10 + 52
modifier: 12
speed: 5 ft., fly 40 ft. (hover)
stats: [ 18, 14, 14, 19, 15, 19 ]
saves:
  - con: 7
  - wis: 7
skillsaves:
  - perception: 12
damage_immunities: poison
condition_immunities: charmed, exhaustion, paralysed, petrified, poisoned, prone
senses: Darkvision 120 ft., passive Perception 22
languages: Deep Speech, Undercommon
cr: "14"
traits:
  - name: Legendary Resistance (3/Day, or 4/Day in Lair)
    desc: If the death tyrant fails a saving throw, it can choose to succeed instead.
actions:
  - name: Multiattack
    desc: The death tyrant uses Eye Rays three times.
  - name: Bite
    desc: "*Melee Attack Roll:* +9, reach 5 feet. *Hit:* 13 (2d8 + 4) Piercing damage."
  - name: Eye Rays
    desc: |-
      The death tyrant randomly shoots one of the following magical rays at a target it can see within 120 feet of itself (roll 1d10; reroll if the death tyrant has already used that ray during this turn):

      - **1 Charm Ray.** *Wisdom Saving Throw:* DC 17. *Failure:* 13 (3d8) Psychic damage, and the target has the Charmed condition for 1 hour or until it takes damage. *Success:* Half damage only.  
      - **2 Paralysing Ray.** *Constitution Saving Throw:* DC 17. *Failure:* The target has the Paralysed condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.  
      - **3 Fear Ray.** *Wisdom Saving Throw:* DC 17. *Failure:* 10 (3d6) Psychic damage, and the target has the Frightened condition until the end of its next turn. *Success:* Half damage only.  
      - **4 Slowing Ray.** *Constitution Saving Throw:* DC 17. *Failure:* 18 (4d8) Necrotic damage. Until the end of the target's next turn, the target can't take Reactions; its Speed is halved; and it can take either an action or a Bonus Action on its turn, not both. *Success:* Half damage only.  
      - **5 Enervation Ray.** *Constitution Saving Throw:* DC 17. *Failure:* 16 (3d10) Poison damage, and the target has the Poisoned condition until the end of its next turn. While Poisoned, the target can't regain Hit Points. *Success:* Half damage only.  
      - **6 Telekinetic Ray.** *Strength Saving Throw:* DC 17 (the target succeeds automatically if it is Gargantuan). *Failure:* The death tyrant moves the target up to 30 feet in any direction. The target has the Restrained condition until the start of the death tyrant's next turn or until the death tyrant has the Incapacitated condition. The death tyrant can also exert fine control on objects with this ray, such as manipulating a tool or opening a door or container.  
      - **7 Sleep Ray.** *Wisdom Saving Throw:* DC 17 (the target succeeds automatically if it is a Construct or an Undead). *Failure:* The target has the Unconscious condition for 1 minute. The condition ends if the target takes damage or a creature within 5 feet of it takes an action to wake it.  
      - **8 Petrification Ray.** *Constitution Saving Throw:* DC 17. *1St Failure:* The target has the Restrained condition and repeats the save at the end of its next turn if it is still Restrained, ending the effect on itself on a success. *2Nd Failure:* The target has the Petrified condition instead of the Restrained condition.  
      - **9 Disintegration Ray.** *Dexterity Saving Throw:* DC 17. *Failure:* 36 (8d8) Force damage. If the target is a nonmagical object or a creation of magical force, a 10-foot Cube of it disintegrates into dust. *Success:* Half damage. *Failure or Success:* If the target is a creature and this damage reduces it to 0 Hit Points, it disintegrates into dust.  
      - **10 Death Ray.** *Dexterity Saving Throw:* DC 17. *Failure:* 55 (10d10) Necrotic damage. *Success:* Half damage. *Failure or Success:* The target dies if the ray reduces it to 0 Hit Points.  
bonus_actions:
  - name: Negative Energy Cone
    desc: The death tyrant's central eye emits an imperceptible, magical wave of negative energy in a 150-foot Cone. Creatures in that area can't regain Hit Points until the start of the death tyrant's next turn. An intact Humanoid corpse there instantly rises as a Zombie under the death tyrant's control and takes its turn immediately after the death tyrant on the same initiative count.
legendary_description: "Legendary Action Uses: 3 (4 in Lair). Immediately after another creature's turn, the death tyrant can expend a use to take one of the following actions. The death tyrant regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Chomp
    desc: The death tyrant makes two Bite attacks.
  - name: Glare
    desc: The death tyrant uses Eye Rays.
```

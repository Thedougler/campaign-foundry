---
title: Space Clown
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Fiend
size: Medium
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Space Clown
size: Medium
type: fiend
alignment: typically Chaotic Evil
ac: 13
hp: 58
hit_dice: 9d8 + 18
modifier: 3
speed: 30 ft.
stats: [ 16, 16, 14, 11, 11, 16 ]
skillsaves:
  - acrobatics: 5
  - performance: 5
  - sleight of hand: 5
senses: darkvision 60 ft., passive Perception 10
languages: Abyssal, Common
cr: "2"
traits:
  - name: Dying Burst
    desc: When the clown drops to 0 hit points, it pops like a balloon, releasing a splash of putrid, corrosive ichor. Each creature within 5 feet of the clown when it bursts must make a DC 12 Dexterity saving throw, taking 10 (3d6) acid damage on a failed save, or half as much damage on a successful one.
  - name: Squeakers
    desc: The clown wears shoes that squeak when it walks. The squeaking can be heard out to a range of 30 feet. The squeaking is silenced while the clown's Phantasmal Form is in effect.
actions:
  - name: Shock
    desc: "*Melee Spell Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 17 (4d6 + 3) lightning damage."
  - name: Ray Gun
    desc: "*Ranged Spell Attack:* +5 to hit, range 120 ft., one creature. *Hit:* 7 (2d6) psychic damage, and if the target is a Humanoid with an Intelligence score of 3 or higher, it must make a DC 12 Wisdom saving throw. On a failed save, the target perceives everything it sees or hears as hilariously funny and is incapacitated for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
  - name: Spellcasting
    desc: |-
      The clown casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability:

      **At will:** friends, *mage hand*, *prestidigitation*

      **1/day each:** *mirror image*, *spider climb*
bonus_actions:
  - name: Phantasmal Form (3/Day)
    desc: The clown veils itself and everything it is wearing and carrying in an illusion that makes it look like some other creature of its size or smaller (such as a child) or an object small enough to fit in the clown's space (such as a floating balloon). Maintaining this effect requires the clown's concentration (as if concentrating on a spell), and the illusion fails to hold up to physical inspection. As an action, a creature that can see the clown's illusory form can make a DC 15 Wisdom (Insight) check, piercing the illusion and discerning the clown's true form on a success.
```

---
title: Neogi Void Hunter
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Aberration
size: Medium
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Neogi Void Hunter
size: Medium
type: aberration
subtype: warlock
alignment: typically Lawful Evil
ac: 14
ac_class: natural armour
hp: 58
hit_dice: 9d8 + 18
modifier: 3
speed: 30 ft., climb 30 ft.
stats: [ 6, 16, 14, 16, 12, 18 ]
saves:
  - wis: 3
  - cha: 6
skillsaves:
  - arcana: 5
  - deception: 6
  - intimidation: 6
  - perception: 3
  - persuasion: 6
senses: darkvision 120 ft., passive Perception 13
languages: Common, Deep Speech, telepathy 30 ft., Undercommon
cr: "4"
traits:
  - name: Devil's Sight
    desc: Magical darkness doesn't impede the neogi's darkvision.
  - name: Mental Fortitude
    desc: The neogi has advantage on saving throws against being charmed or frightened, and magic can't put the neogi to sleep.
  - name: Spider Climb
    desc: The neogi can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
actions:
  - name: Multiattack
    desc: The neogi makes one Bite attack and two Claw attacks, or it makes two Eldritch Bolt attacks.
  - name: Bite
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 7 (1d8 + 3) piercing damage plus 14 (4d6) poison damage, and the target must succeed on a DC 12 Constitution saving throw or become poisoned for 1 minute. A target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
  - name: Claw
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 7 (1d8 + 3) piercing damage."
  - name: Eldritch Bolt
    desc: "*Ranged Spell Attack:* +6 to hit, range 120 ft., one creature. *Hit:* 20 (3d10 + 4) force damage."
  - name: Spellcasting
    desc: |-
      The neogi casts one of the following spells, using Charisma as the spellcasting ability:

      **1/day each:** *dimension door*, *invisibility*
bonus_actions:
  - name: Enslave (Recharges after a Short or Long Rest)
    desc: The neogi targets one creature it can see within 30 feet of itself. The target must succeed on a DC 14 Wisdom saving throw or be magically charmed by the neogi for 1 day, or until the neogi dies or is more than 1 mile from the target. The charmed target obeys the neogi's commands and can't take reactions, and the neogi and the target can communicate telepathically with each other at a distance of up to 1 mile. Whenever the charmed target takes damage, it can repeat the saving throw, ending the effect on itself on a success.
```

---
title: Elder Brain Dragon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 22
creature_type: Aberration
size: Gargantuan
habitat: []
sourcebooks:
  - Fizban's Treasury of Dragons
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Elder Brain Dragon
size: Gargantuan
type: aberration
alignment: typically Lawful Evil
ac: 17
ac_class: natural armour
hp: 350
hit_dice: 20d20 + 140
modifier: 1
speed: 40 ft., fly 80 ft. (hover)
stats: [ 27, 13, 25, 21, 19, 24 ]
saves:
  - con: 14
  - int: 12
  - wis: 11
  - cha: 14
skillsaves:
  - arcana: 12
  - insight: 18
  - perception: 18
damage_immunities: psychic
condition_immunities: charmed, frightened
senses: blindsight 120 ft., passive Perception 28
languages: Deep Speech, Draconic, telepathy 5 miles
cr: "22"
traits:
  - name: Legendary Resistance (4/Day)
    desc: If the dragon fails a saving throw, it can choose to succeed instead.
  - name: Siege Monster
    desc: The dragon deals double damage to objects and structures.
  - name: Unusual Nature
    desc: The dragon doesn't require air or sleep.
actions:
  - name: Multiattack
    desc: The dragon makes one Bite attack, two Claw attacks, and one Tentacle attack.
  - name: Bite
    desc: "*Melee Weapon Attack:* +15 to hit, reach 15 ft., one target. *Hit:* 19 (2d10 + 8) piercing damage plus 11 (2d10) psychic damage."
  - name: Claw
    desc: "*Melee Weapon Attack:* +15 to hit, reach 10 ft., one target. *Hit:* 11 (1d6 + 8) slashing damage."
  - name: Tentacle
    desc: "*Melee Weapon Attack:* +15 to hit, reach 15 ft., one creature. *Hit:* 12 (1d8 + 8) psychic damage. If the target is Huge or smaller, it is grappled (escape DC 18). The dragon can have up to four targets grappled at a time."
  - name: Tadpole Brine Breath (Recharge 5–6)
    desc: |-
      The dragon exhales brine in a 120-foot line that is 15 feet wide. Each creature in that area must make a DC 22 Constitution saving throw, taking 55 (10d10) psychic damage on a failed save, or half as much damage on a successful one. On a success or failure, if the creature isn't a Construct or an Undead, it becomes infested with illithid tadpoles.

      While infested, the creature takes 16 (3d10) psychic damage at the start of each of its turns. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself after it succeeds on three of these saves. If the creature is targeted by magic that ends a curse or restores 40 hit points or more, the tadpoles infesting the creature are killed instantly, ending the effect on the creature.

      If a Humanoid is reduced to 0 hit points while infested, the creature is stable but remains unconscious for 6d12 hours. When the period of unconsciousness ends, the creature transforms into a mind flayer (see the Monster Manual) with all its hit points. Casting a *wish* spell on the unconscious creature rids it of the infestation and prevents it from turning into a mind flayer.
legendary_description: "Legendary Action Uses: 3. Immediately after another creature's turn, the elder brain dragon can expend a use to take one of the following actions. The elder brain dragon regains all expended uses at the start of each of its turns."
legendary_actions:
  - name: Tentacle
    desc: The dragon makes one Tentacle attack.
  - name: Shatter Concentration (Costs 2 Actions)
    desc: The dragon targets a creature it is grappling. The target's concentration on a spell it has cast or an ability it is maintaining ends, and the target takes 19 (3d12) psychic damage.
```

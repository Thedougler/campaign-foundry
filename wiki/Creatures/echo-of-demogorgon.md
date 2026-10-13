---
title: Echo of Demogorgon
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Fiend
size: Large
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Echo of Demogorgon
size: Large
type: fiend
subtype: demon
alignment: typically Chaotic Evil
ac: 14
ac_class: natural armour
hp: 85
hit_dice: 10d10 + 30
modifier: 0
speed: 40 ft.
stats: [ 22, 10, 17, 10, 12, 14 ]
saves:
  - str: 9
  - cha: 5
skillsaves:
  - perception: 7
damage_resistances: cold, fire, lightning
condition_immunities: charmed, frightened
senses: darkvision 60 ft., passive Perception 17
languages: Abyssal, Giant, Orc
cr: "6"
traits:
  - name: Magic Resistance
    desc: The echo has advantage on saving throws against spells and other magical effects.
  - name: Wakeful
    desc: When one of the echo's heads is asleep, its other head is awake.
actions:
  - name: Multiattack
    desc: The echo makes two Tentacle attacks.
  - name: Tentacle
    desc: "*Melee Weapon Attack:* +9 to hit, reach 10 ft., one target. *Hit:* 13 (2d6 + 6) bludgeoning damage plus 9 (2d8) necrotic damage."
bonus_actions:
  - name: Discordant Screams
    desc: |-
      The echo directs its frenzied howls at one creature it can see within 60 feet of itself. The target must succeed on a DC 13 Wisdom saving throw or suffer one of the following effects of the echo's choice:

      - **Confused Reaction.** The target must use its reaction to make a melee attack against another creature of the echo's choice that the echo can see.  
      - **Psychic Torment.** The target takes 13 (2d12) psychic damage.
```

---
title: Grinning Cat
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Fey
size: Large
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Grinning Cat
size: Large
type: fey
alignment: typically Chaotic Neutral
ac: 12
hp: 45
hit_dice: 7d10 + 7
modifier: 2
speed: 40 ft., climb 40 ft.
stats: [ 14, 15, 13, 15, 14, 16 ]
skillsaves:
  - perception: 4
  - stealth: 6
senses: darkvision 60 ft., passive Perception 14
languages: Common, Sylvan
cr: "1"
traits:
  - name: Magic Resistance
    desc: The grinning cat has advantage on saving throws against spells and other magical effects.
actions:
  - name: Bite
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 7 (1d10 + 2) piercing damage."
  - name: Claws
    desc: "*Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 9 (2d6 + 2) slashing damage. If the grinning cat was invisible before it attacked, the target must succeed on a DC 12 Strength saving throw or have the prone condition. If the target has the prone condition, the cat can make a Bite attack against it as a bonus action."
  - name: Fade Away
    desc: The grinning cat magically becomes invisible for 1 hour or until it attacks, gradually fading away over the course of its turn. It can choose to leave part of its body visible, such as its tail, its head, or its grinning mouth. Any equipment the cat wears or carries is invisible with it.
bonus_actions:
  - name: Fade Back
    desc: The grinning cat becomes visible or makes part of its body visible. Any equipment the cat wears or carries on a visible part of its body also becomes visible.
  - name: Grinning Step
    desc: The grinning cat teleports, along with any equipment it is wearing or carrying, up to 60 feet to an unoccupied space it can see.
```

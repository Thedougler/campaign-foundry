---
title: Gaj
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 4
creature_type: Aberration
size: Large
habitat: []
sourcebooks:
  - Boo's Astral Menagerie
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Gaj
size: Large
type: aberration
alignment: typically Neutral Evil
ac: 16
ac_class: natural armour
hp: 75
hit_dice: 10d10 + 20
modifier: 0
speed: 30 ft., climb 30 ft.
stats: [ 16, 10, 15, 12, 15, 7 ]
skillsaves:
  - perception: 6
  - stealth: 4
senses: darkvision 60 ft., passive Perception 16
languages: understands all languages but can't speak
cr: "4"
actions:
  - name: Multiattack
    desc: The gaj makes one Mandibles attack and uses Mind-Probing Antennae or Paralyse (if available).
  - name: Mandibles
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one creature. *Hit:* 10 (2d6 + 3) slashing damage, and the target is grappled (escape DC 11). Until the grapple ends, the target takes 10 (2d6 + 3) slashing damage at the start of each of the gaj's turns. While it is grappling a creature, the gaj can't use its mandibles to attack other creatures."
  - name: Mind-Probing Antennae
    desc: The gaj targets one creature grappled by it. The target must make a DC 12 Wisdom saving throw. On a failed save, the target takes 16 (3d10) psychic damage, and the gaj magically pulls one piece of information from the target's mind that the gaj wants to know. On a successful save, the target takes half as much damage, and the gaj learns nothing.
  - name: Paralyse (Recharge 6)
    desc: The gaj magically targets one creature it can see within 60 feet of itself. The target must succeed on a DC 12 Wisdom saving throw or be paralysed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
```

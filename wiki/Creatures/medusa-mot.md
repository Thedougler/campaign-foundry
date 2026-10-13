---
title: Medusa (MOT)
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 6
creature_type: Monstrosity
size: Medium
habitat: []
sourcebooks:
  - Mythic Odysseys of Theros
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Medusa
size: Medium
type: monstrosity
alignment: Lawful Evil
ac: 15
ac_class: natural armour
hp: 127
hit_dice: 17d8 + 51
modifier: 2
speed: 30 ft.
stats: [ 10, 15, 16, 12, 13, 15 ]
skillsaves:
  - deception: 5
  - insight: 4
  - perception: 4
  - stealth: 5
gear:
  - longbow
  - shortsword
senses: darkvision 60 ft., passive Perception 14
languages: Common
cr: "6"
traits:
  - name: Petrifying Gaze
    desc: |-
      When a creature that can see the medusa's eyes starts its turn within 30 feet of the medusa, the medusa can force it to make a DC 14 Constitution saving throw if the medusa isn't incapacitated and can see the creature. If the saving throw fails by 5 or more, the creature is instantly petrified. Otherwise, a creature that fails the save begins to turn to stone and is restrained. The restrained creature must repeat the saving throw at the end of its next turn, becoming petrified on a failure or ending the effect on a success. The petrification lasts until the creature is freed by the *greater restoration* spell or other magic.

      Unless surprised, a creature can avert its eyes to avoid the saving throw at the start of its turn. If the creature does so, it can't see the medusa until the start of its next turn, when it can avert its eyes again. If the creature looks at the medusa in the meantime, it must immediately make the save.

      If the medusa sees itself reflected on a polished surface within 30 feet of it and in an area of bright light, the medusa is, due to its curse, affected by its own gaze.
actions:
  - name: Multiattack
    desc: The medusa makes either three melee attacks, one with its snake hair, one to constrict, and one with its shortsword, or two ranged attacks with its longbow.
  - name: Snake Hair
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one creature. *Hit:* 4 (1d4 + 2) piercing damage plus 14 (4d6) poison damage."
  - name: Shortsword
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) piercing damage."
  - name: Longbow
    desc: "*Ranged Weapon Attack:* +5 to hit, range 150/600 ft., one target. *Hit:* 6 (1d8 + 2) piercing damage plus 7 (2d6) poison damage."
  - name: Constrict
    desc: "*Melee Weapon Attack:* +3 to hit, reach 10 ft., one target. *Hit:* 7 (2d6) bludgeoning damage, and the target is grappled (escape DC 11). Until this grapple ends, the target is restrained, and the medusa can't constrict another target."
```

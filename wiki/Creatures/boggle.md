---
title: Boggle
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 0.125
creature_type: Fey
size: Small
habitat:
  - Forest
  - Hill
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Boggle
size: Small
type: fey
alignment: Typically Chaotic Neutral
ac: 14
hp: 18
hit_dice: 4d6 + 4
modifier: 4
speed: 30 ft., climb 30 ft.
stats: [ 8, 18, 13, 6, 12, 7 ]
skillsaves:
  - perception: 5
  - sleight of hand: 6
  - stealth: 6
damage_resistances: fire
senses: darkvision 60 ft., passive Perception 15
languages: Sylvan
cr: 1/8
actions:
  - name: Pummel
    desc: "*Melee Weapon Attack:* +1 to hit, reach 5 ft., one target. *Hit:* 2 (1d6 - 1) bludgeoning damage."
  - name: Oil Puddle
    desc: |-
      The boggle creates a puddle of nonflammable oil. The puddle is 1 inch deep and covers the ground in the boggle's space. The puddle is difficult terrain for all creatures except boggles and lasts for 1 hour. The oil has one of the following additional effects of the boggle's choice:

      - **Slippery Oil.** Any non-boggle creature that enters the puddle or starts its turn there must succeed on a DC 11 Dexterity saving throw or fall prone.  
      - **Sticky Oil.** Any non-boggle creature that enters the puddle or starts its turn there must succeed on a DC 11 Strength saving throw or be restrained. On its turn, a creature can use an action to try to extricate itself, ending the effect and moving into the nearest unoccupied space of its choice with a successful DC 11 Strength check.  
bonus_actions:
  - name: Boggle Oil
    desc: |-
      The boggle excretes nonflammable oil from its pores, giving itself one of the following benefits of its choice until it uses this bonus action again:

      - **Slippery Oil.** The boggle has advantage on Dexterity (Acrobatics) checks made to escape bonds and end grapples, and it can move through openings large enough for a Tiny creature without squeezing.  
      - **Sticky Oil.** The boggle has advantage on Strength (Athletics) checks made to grapple and any ability check made to maintain a hold on another creature, a surface, or an object. The boggle can also climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.  
  - name: Dimensional Rift
    desc: The boggle creates an invisible and immobile rift within an opening or frame it can see within 5 feet of it, provided that the space is no bigger than 10 feet on any side. The dimensional rift bridges the distance between that space and a point within 30 feet of it that the boggle can see or specify by distance and direction (such as "30 feet straight up"). While next to the rift, the boggle can see through it and is considered to be next to the destination as well, and anything the boggle puts through the rift (including a portion of its body) emerges at the destination. Only the boggle can use the rift, and it lasts until the end of the boggle's next turn.
```

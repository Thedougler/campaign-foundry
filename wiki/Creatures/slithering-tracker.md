---
title: Slithering Tracker
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 3
creature_type: Ooze
size: Medium
habitat:
  - Underdark
  - Urban
sourcebooks:
  - "Mordenkainen Presents: Monsters of the Multiverse"
  - Volo's Guide to Monsters
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Slithering Tracker
size: Medium
type: ooze
alignment: Typically Chaotic Evil
ac: 14
hp: 39
hit_dice: 6d8 + 12
modifier: 4
speed: 30 ft., climb 30 ft., swim 30 ft.
stats: [ 16, 19, 15, 10, 14, 11 ]
skillsaves:
  - stealth: 8
  - survival: 6
damage_vulnerabilities: cold, fire
damage_resistances: bludgeoning, piercing, slashing from nonmagical attacks
condition_immunities: blinded, deafened, exhaustion, grappled, paralysed, petrified, prone, restrained, unconscious
senses: blindsight 120 ft., passive Perception 12
languages: understands languages it knew in its previous form but can't speak
cr: "3"
traits:
  - name: False Appearance
    desc: If the slithering tracker is motionless at the start of combat, it has advantage on its initiative roll. Moreover, if a creature hasn't observed the slithering tracker move or act, that creature must succeed on a DC 18 Intelligence (Investigation) check to discern that the slithering tracker isn't a puddle.
  - name: Liquid Form
    desc: The slithering tracker can enter an enemy's space and stop there. It can also move through a space as narrow as 1 inch wide without squeezing.
  - name: Spider Climb
    desc: The slithering tracker can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.
actions:
  - name: Slam
    desc: "*Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 8 (1d10 + 3) bludgeoning damage."
  - name: Life Leech
    desc: |-
      One Large or smaller creature that the slithering tracker can see within 5 feet of it must succeed on a DC 13 Dexterity saving throw or be grappled (escape DC 13). Until this grapple ends, the target is restrained and unable to breathe unless it can breathe water. In addition, the grappled target takes 16 (3d10) necrotic damage at the start of each of its turns. The slithering tracker can grapple only one target at a time.

      While grappling the target, the slithering tracker takes only half any damage dealt to it (rounded down), and the target takes the other half.
bonus_actions:
  - name: Watery Stealth
    desc: If underwater, the slithering tracker takes the Hide action, and it makes the Dexterity (Stealth) check with advantage.
```

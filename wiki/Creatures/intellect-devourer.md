---
title: Intellect Devourer
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 2
creature_type: Aberration
size: Tiny
habitat:
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Intellect Devourer
size: Tiny
type: aberration
alignment: Lawful Evil
ac: 12
hp: 28
hit_dice: 8d4 + 8
modifier: 2
speed: 40 ft.
stats: [ 6, 14, 13, 14, 11, 10 ]
skillsaves:
  - perception: 2
  - stealth: 4
damage_resistances: psychic
senses: Blindsight 60 ft., passive Perception 12
languages: understands Deep Speech but can't speak; telepathy 60 ft.
cr: "2"
traits:
  - name: Detect Intelligence
    desc: The intellect devourer magically senses the location of any creature within 300 feet of itself that has an Intelligence score of 3 or higher, regardless of interposing barriers.
actions:
  - name: Multiattack
    desc: The intellect devourer makes one Claw attack and uses Devour Intellect.
  - name: Claw
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 7 (2d4 + 2) Slashing damage."
  - name: Devour Intellect
    desc: "*Intelligence Saving Throw:* DC 12, one creature the intellect devourer can see within 5 feet. *Failure:* 11 (2d10) Psychic damage, and the target has the Stunned condition until the end of the intellect devourer's next turn."
  - name: Steal Body
    desc: |-
      *Intelligence Saving Throw:* DC 12, one Small or Medium creature within 5 feet that has the Incapacitated condition, is a Humanoid or Beast, and has 10 Hit Points or fewer. *Failure:* The intellect devourer possesses the target, consumes its brain, and teleports inside its skull. While there, the intellect devourer has Total Cover against attacks and other effects originating outside its host. The intellect devourer retains its Intelligence, Wisdom, and Charisma scores; its understanding of Deep Speech; its telepathy; and its Detect Intelligence trait. It otherwise adopts the target's game statistics. It knows everything the target knew, including spells and languages.

      If the host body dies, the intellect devourer must leave it. The intellect devourer is also forced out if the target regains its devoured brain by means of a *Wish* spell. By spending 5 feet of its movement, the intellect devourer can voluntarily leave the body, teleporting to the nearest unoccupied space within 5 feet of it. The body then dies unless its brain is restored before the end of the intellect devourer's next turn.
```

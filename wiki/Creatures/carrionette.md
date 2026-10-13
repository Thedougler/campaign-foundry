---
title: Carrionette
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Construct
size: Tiny
habitat:
  - Urban
sourcebooks:
  - "Ravenloft: The Horrors Within"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Carrionette
size: Tiny
type: construct
alignment: Chaotic Evil
ac: 15
hp: 17
hit_dice: 5d4 + 5
modifier: 4
speed: 25 ft.
stats: [ 8, 15, 12, 8, 14, 14 ]
skillsaves:
  - stealth: 6
damage_resistances: poison, psychic
condition_immunities: charmed, exhaustion, frightened, poisoned
senses: Darkvision 60 ft., passive Perception 12
languages: Common plus one other language
cr: "1"
actions:
  - name: Silver Needle
    desc: "*Melee Attack Roll:* +4, reach 5 ft. *Hit:* 1 Piercing damage plus 3 (1d6) Necrotic damage. If the target is a Humanoid not cursed by a carrionette, it is subjected to the following effect. *Charisma Saving Throw:* DC 11. *Failure:* The target is cursed for 1 minute. Until the curse ends, the target has the Poisoned condition, and its Speed is reduced by 10 feet."
  - name: Soul Swap (Recharge 5–6)
    desc: |-
      *Charisma Saving Throw:* DC 11, one Humanoid the carrionette can see within 15 feet that is cursed by its Silver Needle. *Failure:* The carrionette possesses the target's body, and the target possesses the carrionette's body and has the Unconscious condition for 1 hour. While possessing another body, the carrionette and target retain their alignments; personalities; Intelligence, Wisdom, and Charisma scores; and languages known. They otherwise adopt the other creature's game statistics, though the target can't use this Soul Swap action.

      The possession is undone if the target (while in the carrionette's body) deals damage to the carrionette (in the target's original body) with its Silver Needle. If either body is destroyed, both the carrionette and the target die.
```

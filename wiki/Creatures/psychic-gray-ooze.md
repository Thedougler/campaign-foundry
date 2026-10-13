---
title: Psychic Gray Ooze
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 1
creature_type: Ooze
size: Medium
habitat:
  - Underdark
sourcebooks:
  - Monster Manual (2025)
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Psychic Gray Ooze
size: Medium
type: ooze
alignment: Unaligned
ac: 9
hp: 37
hit_dice: 5d8 + 15
modifier: -1
speed: 10 ft., climb 10 ft.
stats: [ 12, 8, 16, 10, 6, 2 ]
skillsaves:
  - stealth: 3
damage_resistances: acid, cold, fire, psychic
condition_immunities: blinded, charmed, deafened, exhaustion, frightened, grappled, prone, restrained
senses: Blindsight 60 ft., passive Perception 8
cr: "1"
traits:
  - name: Amorphous
    desc: The ooze can move through a space as narrow as 1 inch without expending extra movement to do so.
actions:
  - name: Pseudopod
    desc: "*Melee Attack Roll:* +3, reach 5 ft. *Hit:* 11 (3d6 + 1) Acid damage, and the target has Disadvantage on Intelligence saving throws until the end of the ooze's next turn."
  - name: Psychic Crush
    desc: "*Intelligence Saving Throw:* DC 10, one creature the ooze can see within 60 feet. *Failure:* 13 (3d8) Psychic damage."
reactions:
  - name: Mind Corrosion
    desc: "Trigger: The ooze fails a saving throw against a spell or another magical effect created by a creature. _Response:_ The triggering creature takes 3 (1d6) Psychic damage."
```

---
title: Troll Mutate
type: Creature
summary: ""
sources:
  - archive/bestiary-sublist-data.json
cr: 7
creature_type: Giant
size: Large
habitat: []
sourcebooks:
  - "Bigby Presents: Glory of the Giants"
---

## Statblock

```statblock
layout: Basic 5e Layout
name: Troll Mutate
size: Large
type: giant
alignment: typically Chaotic Evil
ac: 16
ac_class: natural armour
hp: 95
hit_dice: 10d10 + 40
modifier: 1
speed: 30 ft., fly 30 ft. (winged form only)
stats: [ 19, 13, 18, 17, 9, 12 ]
saves:
  - con: 7
  - int: 6
skillsaves:
  - perception: 5
  - stealth: 4
senses: blindsight 60 ft., passive Perception 15
languages: Giant, telepathy 60 ft.
cr: "7"
traits:
  - name: Mutation
    desc: "When the troll mutate is created, it gains one of four possible body mutations at random: 1, Elastic Body; 2, Psionic Mirror; 3, Spell Scarred; or 4, Winged Form. This mutation determines certain traits in this stat block."
  - name: Amorphous (Elastic Body Only)
    desc: The mutate can move through a space as narrow as 1 inch without squeezing.
  - name: Magic Resistance (Spell Scarred Only)
    desc: The mutate has advantage on saving throws against spells and other magical effects.
  - name: Psychic Rebuke (Psionic Mirror Only)
    desc: If the mutate takes psychic damage, each creature within 20 feet of it takes that damage as well.
  - name: Regeneration
    desc: The mutate regains 10 hit points at the start of its turn. If the mutate takes acid or fire damage, this trait doesn't function at the start of the mutate's next turn. The mutate dies only if it starts its turn with 0 hit points and doesn't regenerate. If the mutate starts its turn with 0 hit points and regenerates, it randomly gains a mutation it doesn't already have (up to a maximum of four mutations).
actions:
  - name: Multiattack
    desc: The mutate makes two Rend attacks.
  - name: Rend
    desc: "*Melee Weapon Attack:* +7 to hit, reach 5 ft. (or 15 ft. if the mutate has the Elastic Body mutation), one target. *Hit:* 15 (2d10 + 4) slashing damage plus 9 (2d8) force damage."
  - name: Psychic Burst (Recharge 5–6)
    desc: The mutate unleashes a wave of psychic energy. Each creature within 30 feet of the mutate must make a DC 14 Intelligence saving throw, taking 28 (8d6) psychic damage on a failed save, or half as much damage on a successful one.
```
